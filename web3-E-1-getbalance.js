const Web3 = require("web3");
const RpcURL = "https://mainnet.infura.io/v3/fe9586d46e4a44e78b03b5c7d6deeffd";
const web3 = new Web3(RpcURL);
const account = "0x829BD824B016326A401d083B33D092293333A830";
web3.eth.getBalance(account,(err,bal) => {
     const balance = web3.utils.fromWei(bal,"ether");
       console.log(balance);   
       //console.log("the error is " + err); 
})