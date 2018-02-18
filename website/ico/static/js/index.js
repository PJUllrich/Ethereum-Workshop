window.addEventListener('load', function () {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3js !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3js = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!');
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    startApp()

});

function startApp() {
    updateActiveAccount();
    updateActiveBalance();
}

function updateActiveAccount() {
    var account = web3js.eth.coinbase;
    document.getElementById('activeAccount').innerHTML = account;
}

function updateActiveBalance() {
    var account = web3js.eth.coinbase;
    document.getElementById('activeBalance').innerHTML = fetchBalance(account);
}

function fetchBalance(account) {
    return web3js.eth.getBalance(account).toNumber()
}