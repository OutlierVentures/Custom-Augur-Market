var EthUtil = require('ethereumjs-util')
var Augur = require('augur.js')
var augur = new Augur()

const account = process.env.ETH_ACCOUNT
const privateKeyString = process.env.PRIVATE_KEY
const privateKeyBuffer = EthUtil.toBuffer(privateKeyString)

var ethereumNode = { 
  httpAddresses: [
    process.env.ETHEREUM_HTTP
  ],
  wsAddresses: [
    process.env.ETHEREUM_WS
  ]
  // ipc addresses can also be specified as:
  // ipcAddresses: [ ... ]
}
// To connect to a hosted Augur Node instead of a local Augur Node, substitute its WebSocket address below.
var augurNode = "ws://127.0.0.1:9001" // local WebSocket address for an Augur Node

// Attempt to connect to a local Ethereum node
// If that fails, fall back to the hosted Ethereum node
augur.connect({ ethereumNode, augurNode }, function (err, connectionInfo) {

  //console.log(connectionInfo.ethereumNode.contracts.Universe)

  /*
  // Approve account
  augur.accounts.approveAugur({
    address: account, 
    meta: {
      accountType: "privateKey",
      address: account,
      signer: privateKeyBuffer,
    },
    onSent: function(result) { console.log(result) },
    onSuccess: function(result) { console.log("Approval was successful.") },
    onFailed: function(result) { console.log("Approval failed due to error:", result) }
  })
  */

  // Create binary market
  var _extraInfo = {
    "resolutionSource": "https://www.nasdaq.com/symbol/msft",
    "tags": [ "Stocks", "Microsoft" ],
    "longDescription": ""
  }
  augur.createMarket.createYesNoMarket({
    universe: connectionInfo.ethereumNode.contracts.Universe,
    _endTime: 1553108038,
    _feePerEthInWei: 1193046,
    _denominationToken: "0xd2ee83a8a2a904181ccfddd8292f178614062aa0",
    _designatedReporterAddress: account,
    _topic: "stocks",
    _description: "Will Microsoft stock (MSFT) be below $50 at any point during 2018?",
    _extraInfo: JSON.stringify(_extraInfo),
    meta: {
      accountType: "privateKey",
      address: account,
      signer: privateKeyBuffer,
    },
    onSent: function (result) { console.log(result) },
    onSuccess: function (result) { console.log(result) },
    onFailed: function (result) { console.log(result) }
  })

  /*
  // Create categorical market
  var _extraInfo = {
    "resolutionSource": "By virtue of the fact that this market exists",
    "tags": ["programming", "API"],
    "outcomeNames": ["Yes", "No"],
    "longDescription": ""
  }
  augur.createMarket.createCategoricalMarket({
    universe: connectionInfo.ethereumNode.contracts.Universe,
    _endTime: 1540875600,
    _feePerEthInWei: 1193046,
    _denominationToken: "0xd2ee83a8a2a904181ccfddd8292f178614062aa0",
    _designatedReporterAddress: account,
    _outcomes: ["Yes","No"],
    _topic: "sports",
    _description: "Can you create Kovan markets programatically?",
    _extraInfo: JSON.stringify(_extraInfo),
    meta: {
      accountType: "privateKey",
      address: account,
      signer: privateKeyBuffer,
    },
    onSent: function (result) { console.log(result) },
    onSuccess: function (result) { console.log(result) },
    onFailed: function (result) { console.log(result) }
  })
  */
  
  // Disconnect
  augur.disconnect()
  
})
