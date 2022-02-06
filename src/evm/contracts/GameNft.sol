 //SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {FlowManagement, ISuperToken, IConstantFlowAgreementV1, ISuperfluid} from "./FlowManagement.sol";
import {ERC721} from "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";


contract GameNFT is ERC721, FlowManagement {

  constructor (
    address owner,
    string memory _name,
    string memory _symbol,
    ISuperfluid host,
    IConstantFlowAgreementV1 cfa,
    ISuperToken acceptedToken
  )
    ERC721 ( _name, _symbol )
    FlowManagement (
      host,
      cfa,
      acceptedToken,
      owner
     )
      {

      _mint(owner, 1);
  }

}
