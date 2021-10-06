const KittyContract = artifacts.require("Kittycontract"); //not filename..but contract name
const KittyMarketPlace = artifacts.require("KittyMarketPlace"); //not filename..but contract name

module.exports = function (deployer, accounts){
  
  //pass kittcontract address to the KittymarletPLace contract constructor
  deployer.deploy(KittyMarketPlace, KittyContract.address);

  
};
