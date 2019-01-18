# Custom-Augur-Market

Code for creating an Augur prediction market with custom parameters.

Runs on the mainnet and Kovan testnet.

## Requirements

- Linux with `build-essential` and `git`, or MacOS with command line tools.
- Docker & Node 10.
- An Ethereum account with some ETH & REP. Current costs are approx 0.013ETH and 0.35REP per market instantiation.

## Installing

```
./install.sh
```

## Running

Two components: Augur node and Augur.JS.

### Starting an Augur Node

```
./start_node.sh
```
By default, this will start on the Kovan testnet. Add the option `mainnet` for the mainnet.

### Augur.js

Specify desired network, account and private key with environment variables:
```
export NETWORK=[mainnet or kovan]
export ACCOUNT=[your Ethereum address]
export KEY=[your private key]
```

*Never hard code your private key or commit it to git. Use environment variables to pass it to code.*

Next, jump into `reg.js` and set market properties as desired.

Finally, run with:
```
node reg
```
