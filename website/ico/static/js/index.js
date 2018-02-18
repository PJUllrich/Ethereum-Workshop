var contractABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "MULTIPLIER",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "buy",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "buyersLength",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "buyers",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "by",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Bought",
        "type": "event"
    }
];

var contractAddress = "0xc305c901078781C232A2a521C2aF7980f8385ee9";
var contract;
var account;

window.addEventListener('load', function () {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.log('Using MetaMask connection');
        // Use Mist/MetaMask's provider
        w3 = new Web3(web3.currentProvider);
    } else {
        console.log('No w3? You should consider trying MetaMask!');
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        w3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    contract = w3.eth.contract(contractABI).at(contractAddress);
    account = w3.eth.defaultAccount;

    startApp()

});

function startApp() {
    updateActiveAccount();
    updateActiveBalance();
    updateActiveContract();
    updateBalances();
}

function updateActiveAccount() {
    document.getElementById('activeAccount').innerHTML = account;
}

function updateActiveBalance() {
    w3.eth.getBalance(account, function (err, res) {
        if (err) {
            console.error('Error in getBalance: ' + err);
        } else {
            document.getElementById('activeBalance').innerHTML = res.toNumber();
        }
    });
}

function updateActiveContract() {
    var content;
    if (typeof contract !== 'undefined') {
        content = contract.address;
    } else {
        content = 'No deployed contract could be found!'
    }
    document.getElementById('activeContract').innerHTML = content;
}

function updateBalances() {
    contract.buyersLength(function (err, res) {
        if (err) {
            console.error('Error in buyersLength: ' + err);
        } else {
            var arraySize = res.toNumber();
            var table = document.getElementById('balanceTable').getElementsByTagName('tbody')[0];

            for (var i = 0; i < arraySize; i++) {
                var address = contract.buyers(i);
                var balance = contract.balances(address);

                var newRow = table.insertRow();
                newRow.insertCell(0).innerHTML(address);
                newRow.insertCell(1).innerHTML(balance);
            }
        }
    })
}

function buy() {
    var amount = document.getElementById('buyAmountInput').value;
    if (!amount > 0) {
        console.error('You have to specify an amount of ETH you want to send!');
        return;
    }

    contract.buy({'value': amount}, function(err, res) {
        if (err) {
            console.error('Error in buyersLength: ' + err);
        } else {
            console.log(res)
        }
    })
}