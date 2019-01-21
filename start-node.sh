#!/bin/bash

onred='\033[41m'
onyellow='\033[43m'
endcolor='\033[0m'

# Handle errors
set -e
error_report() {
    echo -e "${onred}Error: start-node.sh failed on line $1.$endcolor"
}
trap 'error_report $LINENO' ERR

cd augur-node

if [[ $1 == mainnet ]]; then
    echo -e "${onyellow}Starting on mainnet.$endcolor"
    export ETHEREUM_HTTP=https://mainnet.infura.io/augur;
    export ETHEREUM_WS=wss://mainnet.infura.io/ws;
else
    echo "${onyellow}Starting on Kovan testnet.$endcolor"
    export ETHEREUM_HTTP=https://kovan.augur.net/ethereum-http
    export ETHEREUM_WS=wss://kovan.augur.net/ethereum-ws
fi


if [ ! "$(docker ps -q -f name=augur-postgres)" ]; then
    npm run docker:pg:start
else
    npm run docker:pg:restart
fi
export DATABASE_URL='postgresql://augur:augur@localhost:5432/augur'

npm run clean-start
