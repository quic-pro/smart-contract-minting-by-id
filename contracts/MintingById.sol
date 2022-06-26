// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract MintingById is Ownable, ERC721 {
    uint public _numberTokens = 16;
    uint public _price = 1 ether;

    mapping(uint => bool) public _mintedTokens;
    uint public _numberMintedTokens;


    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}


    function mint(uint ID) public payable {
        require(_numberMintedTokens < _numberTokens, "NFTs are out of stock!");
        require(ID < _numberTokens, "Invalid ID!");
        require(!_mintedTokens[ID], "Specified token has already been minted!");
        require(msg.value >= _price, "Value sent is not correct!");

        _safeMint(msg.sender, ID);
        _mintedTokens[ID] = true;
        _numberMintedTokens++;
    }

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
