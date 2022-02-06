
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "./chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { GameNFT } from './GameNft.sol';

contract NftBet is ChainlinkClient {
  using Chainlink for Chainlink.Request;

  address adminAddress;
  // games[gameID] = GAME
  mapping(uint => Game) public games;
  Game[] public gameArray;
  uint private gameCounter = 0;

  // @todo need to decide how to track total contribution to a game by a user streaming
  // considering when they started streaming, or updated their stream rate
  // keeping in mind the user is ultimately streaming to the contract, and thus balances
  // must be tracked to be sure we know who contributed what tokens
  // @note this may be facilitated by the superfluid app callbacks which let us track
  // the start/change/stop stream events and update user balances at those times
  // while knowing the game/token id since they must call setBetStream with this value
  // to update their stream bet

  struct Game {
    string name;
    string symbol;
    address creator;
    address collectionAddress;
    string date;
    string floor_price; //wei
    uint gameID;
    bytes32 results;
  }

  event GameCreated(address creator /* @todo more fields here */);

  modifier adminOnly {
    require(msg.sender == adminAddress);
    _;
  }

  constructor() {
    adminAddress = msg.sender;
  }

  function createGame
  (
      string gameName,
      string gameSymbol,
      address collectionAddress,
      string date,
      string floor_price,
      uint gameID

  )
    public returns (bool) {

    Game memory game;

    // TO-DO: value checks
    game.creator = msg.sender;
    game.name = gameName;
    game.symbol = gameSymbol;
    game.collectionAddress = collectionAddress;
    game.date = date;
    game.floor_price = floor_price;
    game.gameID = ++gameCounter;

    gameArray.push(game);
    games[gameCounter] = game;

    // mint NFT and set user as owner
    GameNFT nft = new GameNFT(msg.sender, gameName, gameSymbol);
    emit GameCreated(msg.sender);

  }

  function resolveGame
  (
    uint gameID,
    string matchId
  ) public returns (bool) {

    oracle = games[gameID].oracle;
    jobId = games[gameID].jobId;

    // call chainlink to see if result is available
    requestData(gameID, oracle, jobId, matchId);
    // NOTE: result is returned later when chainklink calls "fulfill"
  }

  function requestData
  (
    uint gameID,
    address _oracle,
    bytes32 _jobId,
    string memory _matchId
  )
    public
    onlyOwner
  {
    Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfill.selector);
    req.add("matchId", "_matchid");
    sendChainlinkRequestTo(_oracle, req, oraclePayment);
  }

  function fulfill(bytes32 _requestId, bytes32 _data)
    public
    recordChainlinkFulfillment(_requestId)
  {
    games[gameID].results = _data;
    // TO-DO: distribute funds
  }

  // @todo probably some view or pure methods as utility


}
