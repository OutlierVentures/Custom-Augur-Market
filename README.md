# Custom-Augur-Market

Code for creating an Augur prediction market with custom parameters.

## Requirements

Docker, Node.

## Running

We work with two components: the Augur node and Augur.js.

### Augur Node

Install an Augur node:
```
git clone https://github.com/AugurProject/augur-node.git
cd augur-node
npm install
```

The Augur node abstracts Ethereum. There are two components to think about: the connection script and local database.

First specify the Ethereum node you'll be running through:

Kovan testnet:
```
export ETHEREUM_HTTP=https://kovan.augur.net/ethereum-http
export ETHEREUM_WS=wss://kovan.augur.net/ethereum-ws
```

Mainnet:
```
export ETHEREUM_HTTP=https://mainnet.infura.io/augur
export ETHEREUM_WS=wss://mainnet.infura.io/ws
```

Start the local database (PostGresSQL):
```
npm run docker:pg:start
```

To stop at any point, run `npm run docker:pg:stop`. If changing between Kovan and Mainnet you'll need to restart the database service with `npm run docker:pg:restart`.

Finally, start the connection script:
```
export DATABASE_URL='postgresql://augur:augur@localhost:5432/augur'
```

### Augur.js

Open a new terminal window and navigate to this project folder.

Install Augur.js and Ethereum utilities:
```
npm install augur.js ethereumjs-util
```

Export your `ETHEREUM_HTTP` and `ETHEREUM_WS` varaibles as above.

Specify your account and private key with environment variables:
```
export ETH_ACCOUNT=[YOUR_ADDRESS]
export PRIVATE_KEY=[YOUR_PRIVATE_KEY]
```

*Never hard code your private key or commit it to git. Use environment variuables to pass it to executing code.*

Jump into `reg.js` and set your market properties as desired, then just run with `node reg`.

_Current error: VM execution error. Being discussed in dev discord, looking to have a fix up ASAP._
