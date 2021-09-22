
# Crypto Kitties

Digital cats on the blockchain

Demonstrates NFTs on Ethereum (ERC-721)


## Development environment

Run simple webserver from **client** dir:

    python3 -m http.server 8000


## Notes

var defaultDNA = {
    "headColor" : 10,  //between 10 and 98 to avoid leading zeros getting dropped
    "mouthColor" : 13,
    "eyesColor" : 96,
    "earsColor" : 10,
    "tailColor" : 15,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
    }


 ## Deploying contract

 truffle develop env:

    truffle develop (start local blockchain)


    migrate --reset


 Using truffle console to interrogate deployed contract   

````
    truffle(develop)> var instance = await Kittycontract.deployed()
    undefined
    truffle(develop)> in
    in                instanceof

    inspector         instance          interfaceAdapter

    truffle(develop)> instance.name()
    'Emmett-Kitties'
    truffle(develop)> instance.symbol()
    'EK'
    truffle(develop)> instance.totalSupply()
    BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
````    


````
truffle(develop)> var instance = await Kittycontract.deployed()
undefined
truffle(develop)> instance.totalSupply();
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(develop)> instance.createKittyGen0(999)
{
  tx: '0x7c8f50405f2f3e136738265a17010be4ab877b5bdf8a609596f0ac9659f54103',
  receipt: {
    transactionHash: '0x7c8f50405f2f3e136738265a17010be4ab877b5bdf8a609596f0ac9659f54103',
    transactionIndex: 0,
    blockHash: '0x5ad19c0e3cb1c46271e0afe2c20fbae86691e841b8e10ecbe6cb331ce386b21f',
    blockNumber: 32,
    from: '0x3c34a9098c33d64a295bb60fbf151ac780285aa0',
    to: '0xf7a59cbb726c21bf004feaee4dc103132f854b14',
    gasUsed: 157636,
    cumulativeGasUsed: 157636,
    contractAddress: null,
    logs: [ [Object], [Object] ],
    status: true,
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000008000000000000000010000000000000000000000000000000020000000000000000000800000000000000000000000110000020000000000000000000000000000000000000000000000000000000000000000000001000000000040000000000000000000000000000000000000000000000000000000002000000000010000000000000000000000000000000000000000020000000000100000000000000000000000000000000000000000000001000000000',
    rawLogs: [ [Object], [Object] ]
  },
  logs: [
    {
      logIndex: 0,
      transactionIndex: 0,
      transactionHash: '0x7c8f50405f2f3e136738265a17010be4ab877b5bdf8a609596f0ac9659f54103',
      blockHash: '0x5ad19c0e3cb1c46271e0afe2c20fbae86691e841b8e10ecbe6cb331ce386b21f',
      blockNumber: 32,
      address: '0xf7a59CBb726C21bf004FEaEE4Dc103132f854b14',
      type: 'mined',
      id: 'log_64dc620f',
      event: 'Transfer',
      args: [Result]
    },
    {
      logIndex: 1,
      transactionIndex: 0,
      transactionHash: '0x7c8f50405f2f3e136738265a17010be4ab877b5bdf8a609596f0ac9659f54103',
      blockHash: '0x5ad19c0e3cb1c46271e0afe2c20fbae86691e841b8e10ecbe6cb331ce386b21f',
      blockNumber: 32,
      address: '0xf7a59CBb726C21bf004FEaEE4Dc103132f854b14',
      type: 'mined',
      id: 'log_d094b54e',
      event: 'Birth',
      args: [Result]
    }
  ]
}
truffle(develop)> instance.ownerOf(0)
'0x3C34a9098c33D64a295Bb60fbF151Ac780285aA0'
truffle(develop)> accounts[0]
'0x3C34a9098c33D64a295Bb60fbF151Ac780285aA0'
truffle(develop)> instance.balanceOf(accounts[0])
BN { negative: 0, words: [ 1, <1 empty item> ], length: 1, red: null }
truffle(develop)> var result = await instance.getKitty(0)
undefined
truffle(develop)> result
Result {
  '0': BN {
    negative: 0,
    words: [ 999, <1 empty item> ],
    length: 1,
    red: null
  },
  '1': BN {
    negative: 0,
    words: [ 21693288, 24, <1 empty item> ],
    length: 2,
    red: null
  },
  '2': BN {
    negative: 0,
    words: [ 0, <1 empty item> ],
    length: 1,
    red: null
  },
  '3': BN {
    negative: 0,
    words: [ 0, <1 empty item> ],
    length: 1,
    red: null
  },
  '4': BN {
    negative: 0,
    words: [ 0, <1 empty item> ],
    length: 1,
    red: null
  },
  genes: BN {
    negative: 0,
    words: [ 999, <1 empty item> ],
    length: 1,
    red: null
  },
  birthTime: BN {
    negative: 0,
    words: [ 21693288, 24, <1 empty item> ],
    length: 2,
    red: null
  },
  mumId: BN {
    negative: 0,
    words: [ 0, <1 empty item> ],
    length: 1,
    red: null
  },
  dadId: BN {
    negative: 0,
    words: [ 0, <1 empty item> ],
    length: 1,
    red: null
  },
  generation: BN {
    negative: 0,
    words: [ 0, <1 empty item> ],
    length: 1,
    red: null
  }
}
truffle(develop)> result["genes"].toNumber()
999

````



Using truffle to deploy and interact with Ganache (also configure Ganache in metamask first)


    truffle console --network=development


    truffle migrate --reset