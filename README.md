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

After starting the node for the first time, it will sync up with the blockchain, outputting lines like the below for a few minutes:

```
...
got 0 logs in blocks { fromBlock: 8715109, toBlock: 8715828 }
Fetching blocks details from 8509189 to 8509908
got 0 logs in blocks { fromBlock: 8715829, toBlock: 8716548 }
Fetching blocks details from 8510469 to 8510469
Fetching blocks details from 8510629 to 8511348
new block: 8510469, 1535353000 (Mon Aug 27 2018 06:56:40 GMT+0000 (Coordinated Universal Time))
Processing 1 logs
...
```

The block numbers and dates give an indication of the progress. When it's done syncing, you'll see recent blocks appearing as below. The node is then ready to use.

```
...
new block: 10140787, 1548066740 (Mon Jan 21 2019 10:32:20 GMT+0000 (Coordinated Universal Time))
new block: 10140788, 1548066756 (Mon Jan 21 2019 10:32:36 GMT+0000 (Coordinated Universal Time))
new block: 10140789, 1548066760 (Mon Jan 21 2019 10:32:40 GMT+0000 (Coordinated Universal Time))
new block: 10140790, 1548066764 (Mon Jan 21 2019 10:32:44 GMT+0000 (Coordinated Universal Time))
new block: 10140791, 1548066776 (Mon Jan 21 2019 10:32:56 GMT+0000 (Coordinated Universal Time))
new block: 10140792, 1548066792 (Mon Jan 21 2019 10:33:12 GMT+0000 (Coordinated Universal Time))
...
```





### Augur.js

Specify desired network, account and private key with environment variables:
```
export NETWORK=['mainnet' or 'kovan']
export ACCOUNT=[your Ethereum address, 40 characters prepended with "0x"]
export KEY=[your private key, 64 characters prepended with "0x"]
```

*Never hard code your private key or commit it to git. Use environment variables to pass it to code. Only expose private keys on a machine that you trust.*

Next, jump into `reg.js` and set market properties as desired.

Finally, run with:
```
node reg
```

A successful run on the Kovan network looks [like this](https://asciinema.org/a/T23UgBJ6Hw7DOj7wVg9zrTBYR).

You can see the market you created on an Augur app, for example those created by the Augur project:
- Kovan testnet: https://kovan.augur.net/
- Ethereum mainnet: https://www.augur.net/ipfs-redirect.html

## Tips and troubleshooting

### Account registration

[add note on uncommenting account approval code and when/why it's necessary]

### Getting Kovan testnet REP tokens

To run on Kovan, you need REP test tokens on the Kovan testnet. The only way to get these is currently by using `augur-ui`.

```
git clone https://github.com/AugurProject/augur-ui.git
cd augur-ui
yarn
yarn build
yarn start
```

Then open the app on http://localhost:8080, and use the faucet.

### Error messages

Error messages currently aren't very descriptive. In many cases you'll get `Error: VM execution error` and an undescriptive stack trace.

Common errors include:
- The Augur node is not running or not up to date
- You don't enough (test) ETH or (test) REP in your account
- You have entered the address or private key in the wrong format (they need to start with '0x'). 
