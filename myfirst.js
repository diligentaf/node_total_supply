// import * as json from './Token.json'
var http = require('http');
var Web3 = require('web3');
const json = require('./Token.json')

http.createServer(function (req, res) {
  const abi = json.default
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')
  const temp = new web3.eth.Contract(abi, "0x509a51394CC4D6bb474FeFB2994b8975A55A6e79")
//   console.log(temp.methods.totalSupply().call())
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);