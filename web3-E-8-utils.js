const Web3 = require("web3");
const RpcURL = "https://ropsten.infura.io/v3/fe9586d46e4a44e78b03b5c7d6deeffd";
const web3 = new Web3(RpcURL);
/*
web3.eth.getGasPrice().then((result) => {
    console.log("the gas price is " + result);
    console.log(web3.utils.fromWei(result,"ether"));
});
*/
console.log(web3.utils.sha3("Zeeshan"));
console.log(web3.utils.keccak256("Zeeshan"));
console.log(web3.utils.randomHex(32)); // generate a 32 byte random hex

// installed underscore library using npm install underscore-node.
var _ = require('underscore-node');
_.each({key1: "Zee", key2: "Ahmad"},(value,key) =>{
    console.log(key);
});
