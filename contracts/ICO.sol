pragma solidity ^0.4.0;

contract ICO {
    address public owner;
    mapping(address => uint) public balances;

    uint constant public MULTIPLIER = 1000;

    event Bought(address by, uint amount);

    function ICO() public {
        owner = msg.sender;
    }

    function buy() public payable returns (uint) {
        uint coins = msg.value * MULTIPLIER;
        balances[msg.sender] += coins;

        Bought(msg.sender, coins);
    }
}
