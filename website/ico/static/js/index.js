const contractABI = [
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
        "name": "getBuyersLength",
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
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getBuyerAt",
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
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
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

const contractBytecode = "0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506104c38061005e6000396000f300606060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063059f8b161461008857806327e235e3146100b157806330be0545146100fe5780636bb9b466146101275780638da5cb5b1461018a578063a6f2ae3a146101df578063f2aa8218146101e9575b600080fd5b341561009357600080fd5b61009b61024c565b6040518082815260200191505060405180910390f35b34156100bc57600080fd5b6100e8600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610252565b6040518082815260200191505060405180910390f35b341561010957600080fd5b61011161026a565b6040518082815260200191505060405180910390f35b341561013257600080fd5b6101486004808035906020019091905050610277565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561019557600080fd5b61019d6102bb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101e76102e0565b005b34156101f457600080fd5b61020a6004808035906020019091905050610407565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103e881565b60016020528060005260406000206000915090505481565b6000600280549050905090565b600060028281548110151561028857fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006103e83402905080600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055506002805480600101828161034a9190610446565b9160005260206000209001600033909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550507fc55650ccda1011e1cdc769b1fbf546ebb8c97800b6072b49e06cd560305b1d673382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a150565b60028181548110151561041657fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b81548183558181151161046d5781836000526020600020918201910161046c9190610472565b5b505050565b61049491905b80821115610490576000816000905550600101610478565b5090565b905600a165627a7a7230582090514c4b1a111c310c02ba3c3f14627c28121d9a91915f16268e38e2f7ec87340029";
let contract;
let account;
let w3;

window.addEventListener('load', function () {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    // if (typeof web3 !== 'undefined') {
    //     console.log('Using MetaMask connection');
    //
    //     // Use Mist/MetaMask's provider
    //     w3 = new Web3(web3.currentProvider);
    // } else {
    //     console.log('No w3? You should consider trying MetaMask!');
    //
    //     // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    //     w3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    // }

    w3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    account = w3.eth.defaultAccount;

    let contractScheme = w3.eth.contract(contractABI);
    let gasEstimate = w3.eth.estimateGas({data: contractBytecode});
    contract = contractScheme.new({
        data: contractBytecode,
        from: account,
        gas: gasEstimate
    }, function (err, res) {
        if (err) {
            console.error('Error occurred in Contract Creation: ' + err)
        } else {
            // Callback fires twice. Once upon reception of the TransactionHash and
            // once the contract receives an address.
            if (!res.address) {
                console.log('TransactionID for Contract Creation ' + res.transactionHash)
            }
            if (res.address) {
                console.log('Contract Address: ' + res.address);
                startApp()
            }
        }
    });

});

function startApp() {
    updateActiveAccount();
    updateActiveBalance();
    updateActiveContract();
    updateBalances();
    setupEventWatcher();
}

function updateActiveAccount() {
    document.getElementById('activeAccount').innerHTML = account;
}

function updateActiveBalance() {
    w3.eth.getBalance(account, function (err, res) {
        if (err) {
            console.error('Error in getBalance: ' + err);
        } else {
            let amount = res.toNumber() / (10e17);
            document.getElementById('activeBalance').innerHTML = amount + ' Eth';
        }
    });
}

function updateActiveContract() {
    let content;
    if (typeof contract !== 'undefined') {
        content = contract.address;
    } else {
        content = 'No deployed contract could be found!'
    }
    document.getElementById('activeContract').innerHTML = content;
}

function updateBalances() {
    contract.getBuyersLength(function (err, res) {
        if (err) {
            console.error('Error in getBuyers: ' + err);
        } else {
            console.log('Count of Buyers: ' + res);

            if (res.length === 0) {
                console.log('There are no buyers yet.');
                return;
            }

            emptyTable();

            let arraySize = res.toNumber();
            let table = document.getElementById('balanceTable').getElementsByTagName('tbody')[0];
            let addressSet = new Set();

            for (let i = 0; i < arraySize; i++) {
                let address = contract.getBuyerAt(i);
                let balance = contract.balances(address);

                if (!addressSet.has(address)) {
                    addressSet.add(address);

                    let newRow = table.insertRow();
                    newRow.insertCell(0).innerHTML = address;
                    newRow.insertCell(1).innerHTML = w3.fromWei(balance, 'kether');
                    newRow.insertCell(2);
                }
            }
        }
    })
}

function emptyTable() {
    let tbody_old = document.getElementById('balanceTable').getElementsByTagName('tbody')[0];
    let tbody_new = document.createElement('tbody');
    tbody_old.parentNode.replaceChild(tbody_new, tbody_old);
}

function buy() {
    let input = document.getElementById('buyAmountInput').value;
    if (!input > 0) {
        console.error('You have to specify an amount of ETH you want to send!');
        return;
    }
    let amount = w3.toWei(input, 'ether');
    console.log('Going to buy Coins for ' + amount + ' Wei');

    contract.buy({"value": amount, "from": account}, function (err, res) {
        if (err) {
            console.error('Error in buyersLength: ' + err);
        } else {
            console.log('Transaction created: ' + res);
            updateActiveBalance();

            waitForReceipt(res, updateBalances);
        }
    })
}

async function waitForReceipt(txId, callback) {
    w3.eth.getTransactionReceipt(txId, function (err, res) {
        if (err) {
            console.error('Error in getTransactionReceipt: ' + err)
        } else {
            console.log('Coins were bought successfully!');

            callback();
        }
    });
}

function setupEventWatcher() {
    let event = contract.allEvents();
    event.watch(function (err, res) {
        if (err) {
            console.error('Error in Bought Event Watcher: ' + err);
        } else {
            console.log('Received an event: ' + res);
        }
    })
}