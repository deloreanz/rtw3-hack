
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "./chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { GameNFT } from './game.sol';

contract NftBet is ChainlinkClient {
  using Chainlink for Chainlink.Request;

  address adminAddress;
  // games[TOKEN_ID] = GAME
  mapping(uint => Game) public games;
  Game[] public gameArray;

  // @todo need to decide how to track total contribution to a game by a user streaming
  // considering when they started streaming, or updated their stream rate
  // keeping in mind the user is ultimately streaming to the contract, and thus balances
  // must be tracked to be sure we know who contributed what tokens
  // @note this may be facilitated by the superfluid app callbacks which let us track
  // the start/change/stop stream events and update user balances at those times
  // while knowing the game/token id since they must call setBetStream with this value
  // to update their stream bet

  struct Game {
    address creator;
    address tokenAddress;
    address oracle;
    bytes32 jobId;
    string url;
    // @todo more game criteria?
    mapping(address => uint) userBalance;
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
      address requiredCollection,
      string calldata url,
      string tokenAddress,
      address oracle,
      string jobid

    )
    public returns (bool) {

    Game memory game;

    // TO-DO: value checks
    game.creator = msg.sender;
    game.tokenAddress = tokenAddress;
    game.oracle = oracle;
    game.jobId = jobid;
    game.url = url;

    gameArray.push(game);

    // TO-DO:
    // ISuperfluid host,
    // IConstantFlowAgreementV1 cfa,
    // ISuperToken acceptedToken

    // mint NFT and set user as owner
    GameNFT nft = new GameNFT(msg.sender, gameName, gameSymbol, host, cfa, tokenAddress);
    emit GameCreated(msg.sender);

  }

  function resolveGame
  (
    uint tokenId,
    string matchId
    ) public returns (bool){
      address oracle;
      bytes32 jobId;
      // lookup game to get _oracle and _jobId
      // (get oracle and jobid from the game object)

      // call chainlink to see if result is available
      requestData(oracle, jobId, matchId);

      // NOTE: result is returned later when chainklink calls "fulfill"
    }

    function requestData
    (
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

    bytes32 public gameResults; // TO-DO: remove this will need to mutate the appropriate game instead

    function fulfill(bytes32 _requestId, bytes32 _data)
      public
      recordChainlinkFulfillment(_requestId)
    {
      gameResults = _data;

      // handle result returned from chainlink

      // distribute funds
    }

  function setBetStream(uint tokenId, uint streamRate, bool gameResult) public returns (bool) {
    // @todo how to set which game to stream to?
    // if stream rate is 0, stop stream

    // if stream rate is different, set new stream rate
  }


  // @todo probably some view or pure methods as utility


}
