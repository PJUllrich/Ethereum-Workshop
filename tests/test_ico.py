import asyncio
import random


def async(f):
    def wrapper(*args, **kwargs):
        coro = asyncio.coroutine(f)
        future = coro(*args, **kwargs)
        loop = asyncio.get_event_loop()
        loop.run_until_complete(future)

    return wrapper


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


def test_bought_watch(chain):
    contract, deploy_tx_id = chain.provider.get_or_deploy_contract('ICO')
    watcher = contract.on('Bought')
    test_value = random.randint(1, 1000)

    watcher.watch(lambda event: print('Hallo'))
    tx_id = contract.transact({'value': test_value}).buy()
    receipt = chain.wait.for_receipt(tx_id)
    print(receipt)
