var BigNumber = require('big-number');
var http = require('http');
var Web3 = require('web3');
// const json = require('./Token.json')
const address = "0x509a51394CC4D6bb474FeFB2994b8975A55A6e79"
var jsonFile = require('./Token.json')
let result;

http.createServer(async function (req, res) {
  try {
    const web3 = new Web3('https://bsc-dataseed.binance.org/')
    const contract = new web3.eth.Contract(jsonFile, address)

    const totalSupply = await contract.methods.totalSupply().call()
    let circulatingSupply = BigInt(totalSupply)
    let sumWallet = BigInt(0);
    const accounts = [
      "0x61607Ae1A5cbfBb9ED87Ff2d092dfB8190BD5c14",
      "0x2ba9c35C525fac58a5c546D52F749ed275467269",
      "0xBd903d00E9B5d6D76CD7991194e15023fe98c9F5",
      "0x71DB980a1abC1959A217F5E10AEC3E87eC39c1a6",
      "0xe562069aDb543e7693C1900316959b309354d117",
      "0x658669C9aEa4207afa4A7B98BA16e4Ca805F57e5",
      "0x083D652056416983B0BF5B4215Be34C16BC9bf16",
      "0x1CE5339f5C384Bc356B90Bd88247863570FBDD6d",
      "0x5D5c6643B985c73Fa6aD6376Df6A6668fE677d20",
      "0xac3b9680E27F6659B01D4421189FDAA0d8e1b88e",
    ]
    for (let account of accounts) {
      let temp = await contract.methods.balanceOf(account).call()
      sumWallet += BigInt(temp)
    }
    circulatingSupply -= sumWallet
    let temp = circulatingSupply / BigInt(10 ** 18)
    result = temp.toString()
  } catch (error) {
    // console.log(error);
  }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(result.toString());
}).listen(8080);