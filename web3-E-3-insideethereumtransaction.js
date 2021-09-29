const Web3 = require("web3");
const RpcURL = "https://ropsten.infura.io/v3/fe9586d46e4a44e78b03b5c7d6deeffd";
const web3 = new Web3(RpcURL);
const Tx = require("ethereumjs-tx").Transaction;
const account1 = "0xA9533eb1eEe5C42Df810a23de6A1d8724B63bEB3";
const account2 = "0x8b6Ff998ad924CefdECDb3108BfcE45513113351";
const privateKey1 = Buffer.from("93a48226124056e01a253759e4aed2bb8b6d660342a6361e563f9457666ce189","hex");

web3.eth.getTransactionCount(account1, (err, txCount) => {

    const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }
  const tx = new Tx(txObject,{'chain': 'ropsten'});
  tx.sign(privateKey1);
  const serializedTx = tx.serialize();
  const raw = '0x' + serializedTx.toString('hex');
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    if (!err) {
        console.log('txHash:', txHash)     
    }
    else {
        console.log('Zee Error is :', err)    
    }
    })
  })