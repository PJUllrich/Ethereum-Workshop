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

    startApp()

});

function startApp() {
    updateActiveAccount();
    updateActiveBalance();
}

function updateActiveAccount() {
    var account = w3.eth.defaultAccount;
    document.getElementById('activeAccount').innerHTML = account;
}

function updateActiveBalance() {
    var account = w3.eth.defaultAccount;
    fetchBalance(account, function (err, res) {
        if (err) {
            console.error('Error in fetchBalance: ' + err);
        } else {
            document.getElementById('activeBalance').innerHTML = res.toNumber();
        }
    });
}

function fetchBalance(account, callback) {
    w3.eth.getBalance(account, callback);
}