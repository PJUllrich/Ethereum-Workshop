# Ethereum Workshop
This is an introductory workshop for how to develop Ethereum smart contracts with Python3.
The popular Python library [`Populus`](http://populus.readthedocs.io/en/latest/quickstart.html) will be used to test and deploy smart contracts. Smart contracts are generally written in [`Solidity`](http://solidity.readthedocs.io/en/develop/) which is a programming language specifically developed to run on the Ethereum Virtual Machine.

## Getting Started
1. Clone this project into a new folder on your machine
1. Install all System Dependencies, which are stated [in this article](http://populus.readthedocs.io/en/latest/quickstart.html#system-dependencies)
1. Install the Solidity Compiler as explained [in this article](http://solidity.readthedocs.io/en/latest/installing-solidity.html#installing-the-solidity-compiler)
1. Create a new Virtual Environment with Python 3.5 or later. [This article](http://docs.python-guide.org/en/latest/dev/virtualenvs/#lower-level-virtualenv) explains how.
1. Activate your Virtual Environment as described in the article.
1. Install all requirements with `pip install -r requirements.txt`
1. Start the local Ethereum network with `testrpc -s 0`. The `-s 0` part will give you always the same addresses, which is handy for testing. 
1. Run `populus compile`. You should the compiled contract in the folder `/build`
1. Run the tests with `py.test tests`. 

## Overview of the Project
1. 

## Resources
Here are some links to interesting resources about Ethereum and Smart Contracts
* [Solidity Readme and Introduction](https://solidity.readthedocs.io/en/develop/)
* [Ethereum Readme](http://www.ethdocs.org/en/latest/)
* [Populus Readme](http://populus.readthedocs.io/en/latest/)
* [Web3Py Readme](https://web3py.readthedocs.io/en/stable/)
