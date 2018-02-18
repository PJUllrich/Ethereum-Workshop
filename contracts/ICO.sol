pragma solidity ^0.4.0;

contract ICO {
    address public owner;
    mapping(address => uint) public balances;
    address[] public buyers;

    uint constant public MULTIPLIER = 1000;

    event Bought(address by, uint amount);

    function ICO() public {
        owner = msg.sender;
    }

    function buyersLength() public constant returns (uint) {
        return buyers.length;
    }

    function buy() public payable returns (uint) {
        uint coins = msg.value * MULTIPLIER;
        balances[msg.sender] += coins;
        buyers.push(msg.sender);

        Bought(msg.sender, coins);
    }
}
