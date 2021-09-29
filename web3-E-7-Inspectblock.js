const Web3 = require("web3");
const RpcURL = "https://ropsten.infura.io/v3/fe9586d46e4a44e78b03b5c7d6deeffd";
const web3 = new Web3(RpcURL);

//web3.eth.getBlock('latest').then(console.log) // this will get lastest block number

//web3.eth.getBlock(11053869).then(console.log) // get a particular block

// get transaction from a block 

const hash = "0x92ffed656930c0da8c664cd0baf1090b378256ff1a7b6843debd78d15934d41c";

web3.eth.getTransactionFromBlock(hash,4).then(console.log);