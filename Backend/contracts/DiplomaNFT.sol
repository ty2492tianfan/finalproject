// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DiplomaNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    mapping(address => bool) public approvedIssuers;

    constructor(address initialOwner) ERC721("DiplomaNFT", "DIP") Ownable(initialOwner) {
        tokenCounter = 0;
        approvedIssuers[initialOwner] = true;
    }

    modifier onlyIssuer() {
        require(approvedIssuers[msg.sender], "Not an approved issuer");
        _;
    }

    function approveIssuer(address issuer) public onlyOwner {
        approvedIssuers[issuer] = true;
    }

    function revokeIssuer(address issuer) public onlyOwner {
        approvedIssuers[issuer] = false;
    }

    function issueDiploma(address student, string memory tokenURI) public onlyIssuer {
        uint256 tokenId = tokenCounter;
        _safeMint(student, tokenId);
        _setTokenURI(tokenId, tokenURI);
        tokenCounter += 1;
    }

    // Soulbound (non-transferable): override 0.8.28 function signature
    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);
        require(from == address(0), "Diplomas are soulbound (non-transferable)");
        return super._update(to, tokenId, auth);
    }
}
