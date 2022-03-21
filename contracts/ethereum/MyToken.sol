// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyToken is ERC1155, Ownable {
    uint price;
    uint constant FAN = 0;
    uint constant OKO = 1;
    uint constant POTIONS = 2;
    uint constant PLEX = 3;

    constructor() ERC1155("https://gateway.pinata.cloud/ipfs/QmWDK9MpzBTZjsyozFrftkkDj1hkPy3NE4RWr39DCm9f4Z/{id}.json") {
        _mint(msg.sender, FAN, 1, "");
        _mint(msg.sender, OKO, 100, "");
        _mint(msg.sender, POTIONS, 50, "");
        _mint(msg.sender, PLEX, 25, "");
        price = 1000000000000000 wei; //0.001 ether
    }

    modifier verifyAmount() {
        require(msg.value >= price);
        _;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setPrice(uint _price) public onlyOwner {
        price = _price;
    }
    
    function mint(uint256 id, uint256 amount)
        public
        payable verifyAmount
    {
        _mint(msg.sender, id, amount, "");
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "Balance is 0");
        (bool sent, ) = owner().call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

    function hello() public pure returns(string memory) {
        return "hello world";
    }

    receive() external payable {}

    fallback() external payable {}

    function uri(uint256 _tokenId) override public pure returns (string memory) {
        return string(abi.encodePacked(
            "https://gateway.pinata.cloud/ipfs/QmWDK9MpzBTZjsyozFrftkkDj1hkPy3NE4RWr39DCm9f4Z/", Strings.toString(_tokenId), ".json"));
    }

}

// Mumbai Polygon address: 0xaeCc8F00CB9f370e1D0BA8f4D8417F31c554A692
// Optimistc Kovan address: 0x94779A0b55Af0C27427e598fa614ff2E43357a5F