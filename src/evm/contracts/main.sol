
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "./chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { GameNFT } from './GameNft.sol';

contract NftBet is ChainlinkClient {
  using Chainlink for Chainlink.Request;

  // chainlink vars
  uint256 public price;
  address private oracle;
  bytes32 private jobId;
  uint256 private fee;

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
    bytes32 results;
    mapping(address => uint) userBalance;
  }

  event GameCreated(address creator /* @todo more fields here */);

  modifier adminOnly {
    require(msg.sender == adminAddress);
    _;
  }

  /**
  * Network: Polygon Mumbai Testnet
  * Oracle: 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9
  * Job ID: da20aae0e4c843f6949e5cb3f7cfe8c4
  * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
  * Fee: 0.01 LINK
  */
  constructor() {
    adminAddress = msg.sender;
    // chainlink details
    // setPublicChainlinkToken();
    setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
    // https://docs.polygon.technology/docs/develop/oracles/chainlink/
    oracle = 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9;
    jobId = "a82495a8fd5b4cb492b17dc0cc31a4fe"; // HTTP GET, returns bytes32
    // @note fee varies by network and job
    fee = 10 ** 16; // 0.01 LINK
  }

  function createGame
  (
      string gameName,
      string gameSymbol,
      address requiredCollection,
      string calldata url,
      string tokenAddress,
      address oracle,
      string jobid,
      ISuperfluid host,
      IConstantFlowAgreementV1 cfa,
      ISuperToken acceptedToken
  )
    public returns (bool) {

    // converting token to SuperToken?

    Game memory game;

    // TO-DO: value checks
    game.creator = msg.sender;
    game.tokenAddress = tokenAddress;
    game.oracle = oracle;
    game.jobId = jobid;
    game.url = url;

    gameArray.push(game);

    // mint NFT and set user as owner
    GameNFT nft = new GameNFT(msg.sender, gameName, gameSymbol, host, cfa, acceptedToken);
    emit GameCreated(msg.sender);

  }

  function resolveGame
  (
    uint tokenId,
    string matchId
  ) public returns (bool) {

    oracle = games[tokenId].oracle;
    jobId = games[tokenId].jobId;

    // call chainlink to see if result is available
    requestData(tokenId, oracle, jobId, matchId);
    // NOTE: result is returned later when chainklink calls "fulfill"
  }

  // https://api.covalenthq.com/v1/137/nft_market/collection/0xdc0479cc5bba033b3e7de9f178607150b3abce1f/?quote-currency=USD&format=JSON&from=2022-02-04&to=2022-02-04&key=ckey_200682d8e34b495f9557869dacd
  function requestData
  (
    string apiKey,
    string networkId,
    address nftCollectionAddress,
    string date, // YYYY-MM-DD
    string memory _matchId
  )
    public
    onlyOwner
    returns (bytes32 requestId)
  {
    // construct the covalent API URL
    string url = string(abi.encodePacked(
      "https://api.covalenthq.com/v1/", networkId,
      "/nft_market/collection/", nftCollectionAddress,
      "/?quote-currency=USD&format=JSON&from=", date, "&to=", date,
      "&key=", apiKey
    ));

    Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
    // Set the URL to perform the GET request on
    request.add("get", url);
    
    // Set the path to find the desired data in the API response, where the response format is:
    // {
    //     "data": {
    //         "updated_at": "2022-02-06T07:38:15.085691731Z",
    //         "items": [
    //             {
    //                 "chain_id": 137,
    //                 "collection_name": "Crypto Unicorns",
    //                 "collection_address": "0xdc0479cc5bba033b3e7de9f178607150b3abce1f",
    //                 "collection_ticker_symbol": "UNICORNS",
    //                 "opening_date": "2022-02-04",
    //                 "volume_wei_day": "202178128362215000000000",
    //                 "volume_quote_day": 308219.44,
    //                 "average_volume_wei_day": "4594957462777610000000",
    //                 "average_volume_quote_day": 7004.9873,
    //                 "unique_token_ids_sold_count_day": 44,
    //                 "floor_price_wei_7d": "3942721197683260000000",
    //                 "floor_price_quote_7d": 6010.6567,
    //                 "gas_quote_rate_day": 1.5244945,
    //                 "quote_currency": "USD"
    //             }
    //         ],
    //         "pagination": null
    //     },
    //     "error": false,
    //     "error_message": null,
    //     "error_code": null
    // }
    request.add("path", "data.items.0.floor_price_wei_7d");
    
    // // Multiply the result by 1000000000000000000 to remove decimals
    // int timesAmount = 10**18;
    // request.addInt("times", timesAmount);
    
    // Sends the request
    return sendChainlinkRequestTo(oracle, request, fee);
  }

  function fulfill(bytes32 _requestId, bytes32 _data)
    public
    recordChainlinkFulfillment(_requestId)
  {
    games[tokenId].results = _data;
    // TO-DO: distribute funds
  }

  function setBetStream(uint tokenId, uint streamRate, bool gameResult) public returns (bool) {
    // @todo how to set which game to stream to?
    // if stream rate is 0, stop stream

    // if stream rate is different, set new stream rate
  }

  // @todo probably some view or pure methods as utility



  // sports bet chainlink code

  // function resolveGame
  // (
  //   uint tokenId,
  //   string matchId
  // ) public returns (bool) {

  //   oracle = games[tokenId].oracle;
  //   jobId = games[tokenId].jobId;

  //   // call chainlink to see if result is available
  //   requestData(tokenId, oracle, jobId, matchId);
  //   // NOTE: result is returned later when chainklink calls "fulfill"
  // }

  // function requestData
  // (
  //   uint tokenId,
  //   address _oracle,
  //   bytes32 _jobId,
  //   string memory _matchId
  // )
  //   public
  //   onlyOwner
  // {
  //   Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfill.selector);
  //   req.add("matchId", "_matchid");
  //   sendChainlinkRequestTo(_oracle, req, oraclePayment);
  // }


}
