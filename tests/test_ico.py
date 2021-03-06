import random


def _get_owner(chain):
    return chain.web3.eth.coinbase


def test_owner(chain):
    owner_should_be = _get_owner(chain)

    contract, deploy_tx_id = chain.provider.get_or_deploy_contract('ICO')

    owner_is = contract.call().owner()

    assert owner_should_be == owner_is


def test_buy(chain):
    test_value = random.randint(1, 1000)

    # Get the address of the calling account
    caller_address = chain.web3.eth.coinbase

    # Deploy the contract
    contract, deploy_tx_id = chain.provider.get_or_deploy_contract('ICO')

    # The account should first have a balance of 0
    balance_before = contract.call().balances(caller_address)
    assert balance_before == 0

    # "Buy" coins and retrieve the new balance
    contract.transact({'value': test_value, 'from': caller_address}).buy()
    balance_after = contract.call().balances(caller_address)

    assert balance_after == test_value * contract.call().MULTIPLIER()


def test_buyers_length(chain):
    test_value = random.randint(1, 1000)

    # Get the address of the calling account
    caller_address = chain.web3.eth.coinbase

    # Deploy the contract
    contract, deploy_tx_id = chain.provider.get_or_deploy_contract('ICO')

    # Buyers Length should be 0 before
    length = contract.call().getBuyersLength()
    assert length == 0

    # "Buy" coins and retrieve the new balance
    contract.transact({'value': test_value, 'from': caller_address}).buy()

    length = contract.call().getBuyersLength()
    assert length == 1


def test_bought_event(chain):
    contract, deploy_tx_id = chain.provider.get_or_deploy_contract('ICO')
    test_value = random.randint(1, 1000)

    # Create an event watcher for the 'Bought' event
    watcher = contract.on('Bought')

    # There should be no events at this point
    events_before = watcher.get()
    assert len(events_before) == 0

    # "Buy" some coins and create a Bought event
    contract.transact({'value': test_value}).buy()

    # Check that the Bought event was received
    events_after = watcher.get()
    assert len(events_after) == 1


# This test is for development purposes only
def test_retrieve_contract_data(chain):
    data = chain.provider.get_contract_factory('ICO')
    print(data)
    assert True
