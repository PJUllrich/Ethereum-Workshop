# Ethereum Workshop
This is an introductory workshop for how to develop Ethereum smart contracts with Python3.
The popular Python library [`Populus`](http://populus.readthedocs.io/en/latest/quickstart.html) will be used to test and deploy smart contracts. Smart contracts are generally written in [`Solidity`](http://solidity.readthedocs.io/en/develop/) which is a programming language specifically developed to run on the Ethereum Virtual Machine.

## Getting Started
1. Clone this project into a new folder on your machine
1. Install all `System Dependencies`, which are stated [in this article](http://populus.readthedocs.io/en/latest/quickstart.html#system-dependencies)
1. Install the `Solidity Compiler` as explained [in this article](http://solidity.readthedocs.io/en/latest/installing-solidity.html#installing-the-solidity-compiler)
1. Install `geth` as described [here](https://geth.ethereum.org/downloads/)
1. Create a new `Virtual Environment` with Python 3.5 or later. [This article](http://docs.python-guide.org/en/latest/dev/virtualenvs/#lower-level-virtualenv) explains how.
1. Activate your Virtual Environment as described in the article.
1. Install all requirements with `pip install -r requirements.txt`
1. Start the local Ethereum network with ``
1. Run `populus compile`. You should the compiled contract in the folder `/build`
1. Run the tests with `py.test tests`.

## How to run the project
1. Run the local chain
1. Deploy contract to the local chain
1. Run Django server with `python manage.py runserver`
1. In your browser, go to [`http://localhost:8000`](http://localhost:8000)

## Challenges
The goal of the workshop is to get an understanding of how to write and deploy Smart Contracts.
Once you have the project up and running, you can try to extend the Smart Contract with either your own functionality, or alternatively, you can pick from one of these challenges:
* **Add a maximum amount of coins that buyers can buy**
    * Think about what message you send when that amount is reached and how you send it.
* **Add discounts for buying coins**
    * Buyers could get a 50% discount for the first 10.000 coins, 40% for the next 10.000 and so on.
* **Add a refund function**
    * Think about who should be able to call this function (probably only the `owner`)
    * Will all coins be refunded or only a part?
    * Advanced: Add a time frame in which a refund can be requested. Buyers are not able to request a refund after that time frame expired.
*  **Add functionality that can only be executed using the coins**
    * Like a Voting function, or requesting a funny message

## Resources
Here are some links to interesting resources about Ethereum and Smart Contracts
* [Solidity Readme and Introduction](https://solidity.readthedocs.io/en/develop/)
* [Ethereum Readme](http://www.ethdocs.org/en/latest/)
* [Populus Readme](http://populus.readthedocs.io/en/latest/)
* [Web3Py Readme](https://web3py.readthedocs.io/en/stable/)

# Add
1. Install geth
1. How to check in browser console
1. How to log in using MetaMask