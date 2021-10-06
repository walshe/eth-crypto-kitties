const KittyContract = artifacts.require("Kittycontract"); //not filename..but contract name

module.exports = function (deployer) {
  deployer.deploy(KittyContract);


};
