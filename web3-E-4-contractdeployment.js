const Web3 = require("web3");
var Tx = require('ethereumjs-tx').Transaction;
const RpcURL = "https://ropsten.infura.io/v3/fe9586d46e4a44e78b03b5c7d6deeffd";
const web3 = new Web3(RpcURL);

const account = "0xA9533eb1eEe5C42Df810a23de6A1d8724B63bEB3";
const privateKey = "93a48226124056e01a253759e4aed2bb8b6d660342a6361e563f9457666ce189";

const byteCode ="08060405234801561001057600080fd5b50610164806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063967e6e651461003b578063d5dcf12714610059575b600080fd5b610043610089565b60405161005091906100f2565b60405180910390f35b610073600480360381019061006e91906100ba565b610092565b60405161008091906100f2565b60405180910390f35b60008054905090565b6000816000819055506000549050919050565b6000813590506100b481610117565b92915050565b6000602082840312156100cc57600080fd5b60006100da848285016100a5565b91505092915050565b6100ec8161010d565b82525050565b600060208201905061010760008301846100e3565b92915050565b6000819050919050565b6101208161010d565b811461012b57600080fd5b5056fea2646970667358221220575e5b597a30ad00e07893bfcdec6167b8eada1d8abcb70b1c8635bc1dd4f3e064736f6c63430008000033";

const byteCodeBuffer = Buffer.from(byteCode,"hex");
const privatekeyBuffer = Buffer.from(privateKey,"hex");

const contractDeployAsync = async() => {
    try {
        let txcount = await web3.eth.getTransactionCount(account);
        txObj = {
            nonce: web3.utils.toHex(txcount),
            date: byteCodeBuffer,
            gasLimit: web3.utils.toHex(3000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei("10","gwei"))
        }
        const tx = new Tx(txObj,{'chain': 'ropsten', 'hardfork': "petersburg"});
        tx.sign(privatekeyBuffer);
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
        let signedTransaction = await web3.eth.sendSignedTransaction(raw);
        console.log("transaction hash is " , signedTransaction);
    }
    catch(error) {
        console.log("the error is " + error);
    }
}
contractDeployAsync()