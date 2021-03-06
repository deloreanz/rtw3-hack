 //SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

// import {ERC721} from "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract GameNFT is ERC721 {

  constructor (
    address owner,
    string memory _name,
    string memory _symbol
  )
    ERC721 ( _name, _symbol )
    {
      _mint(owner, 1);
    }

    function getAddress() public view returns (address) {
      return address(this);
    }

}
