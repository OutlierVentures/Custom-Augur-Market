#!/bin/bash

onred='\033[41m'
ongreen='\033[42m'
endcolor='\033[0m'

# Handle errors
set -e
error_report() {
    echo -e "${onred}Error: install.sh failed on line $1.$endcolor"
}
trap 'error_report $LINENO' ERR

npm install augur.js ethereumjs-util
git clone https://github.com/AugurProject/augur-node.git
cd augur-node
rm -rf node_modules
npm install npm-run-all
npm run build
npm install

echo -e "${ongreen}Custom Augur market installed.$endcolor"
