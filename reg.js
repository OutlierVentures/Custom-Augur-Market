const network = process.env.NETWORK
const account = process.env.ACCOUNT
const key = process.env.KEY

if (network && account && key) {

  console.log("\033[43mCreating market...\033[0m")
  const EthUtil = require("ethereumjs-util")
  const privateKeyBuffer = EthUtil.toBuffer(key)

  const Augur = require("augur.js")
  const augur = new Augur()

  // Set config depending on network choice
  var ethHTTP = "https://kovan.augur.net/ethereum-http"
  var ethWS = "wss://kovan.augur.net/ethereum-ws"
  var cashWrapper = "0xa265726f41b51bacb5d8e2907abceda9bc21b69b"
  if (network == "main") {
    ethHTTP = "https://mainnet.infura.io/augur"
    ethWS = "wss://mainnet.infura.io/ws"
    cashWrapper = "0xd5524179cb7ae012f5b642c1d6d700bbaa76b96b"
  }

  // Set node options
  const ethereumNode = { 
    httpAddresses: [
      ethHTTP
    ],
    wsAddresses: [
      ethWS
    ]
    // ipcAddresses: [ ... ]
  }
  const augurNode = "ws://127.0.0.1:9001"

  // Connect to Ethereum & local Augur node
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
    // Other market types: docs.augur.net/#create-market-functions
    // ***************************************************************************
    // SET MARKET OPTIONS BELOW
    // ***************************************************************************
    var _extraInfo = {
      "resolutionSource": "https://www.nasdaq.com/symbol/msft",
      "tags": [ "Stocks", "Microsoft" ],
      "longDescription": ""
    }
    augur.createMarket.createYesNoMarket({
      universe: connectionInfo.ethereumNode.contracts.Universe,
      _endTime: 1577836800, // End time as unix epoch, use converter epochconverter.com
      _feePerEthInWei: 1193046,
      _denominationToken: cashWrapper,
      _designatedReporterAddress: account,
      _topic: "stocks",
      _description: "Will Microsoft stock (MSFT) be below $50 at any point during 2019?",
    // ***************************************************************************
    // SET MARKET OPTIONS ABOVE
    // ***************************************************************************
      _extraInfo: JSON.stringify(_extraInfo),
      meta: {
        accountType: "privateKey",
        address: account,
        signer: privateKeyBuffer,
      },
      onSent: function (result) {
        console.log(result)
       },
      onSuccess: function (result) {
        console.log(result)
        console.log("\033[42mMarket successfully created.\033[0m")
        augur.augurNode.disconnect()
        augur.disconnect()
        process.exit()
      },
      onFailed: function (result) {
        console.log(result)
        console.log("\033[41mMarket creation failed. See error log above.\033[0m")
        augur.augurNode.disconnect()
        augur.disconnect()
        process.exit()
      }
    })
    
  })

}
else {

  console.log("\033[42mPlease set your NETWORK, ACCOUNT and KEY environment variables.\033[0m")

}