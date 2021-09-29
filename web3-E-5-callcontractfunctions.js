const Web3 = require("web3");
const RpcURL = "https://ropsten.infura.io/v3/fe9586d46e4a44e78b03b5c7d6deeffd";
const web3 = new Web3(RpcURL);
const Tx = require("ethereumjs-tx").Transaction;
const account1 = "0xA9533eb1eEe5C42Df810a23de6A1d8724B63bEB3";
const account2 = "0x8b6Ff998ad924CefdECDb3108BfcE45513113351";
const privateKey1 = Buffer.from("93a48226124056e01a253759e4aed2bb8b6d660342a6361e563f9457666ce189","hex");
const abi =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const contAdd = "0xEaE5d4BDbb5E91D7B07F145A973d4b6aB22ABa47"; //ZeeTockenAddress
const contract = new web3.eth.Contract(abi, contAdd);
web3.eth.getTransactionCount(account1, (err, txCount) => {

    const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(2100000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    data: contract.methods.transfer(account2, 1000).encodeABI()
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

  // Check Token balance for account1
contract.methods.balanceOf(account1).call((err, balance) => {
    console.log({ err, balance })
  })
  
  // Check Token balance for account2
  contract.methods.balanceOf(account2).call((err, balance) => {
    console.log({ err, balance })
  })