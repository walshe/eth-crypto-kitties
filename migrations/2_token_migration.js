const Token = artifacts.require("Kittycontract"); //not filename..but contract name

module.exports = function (deployer) {
  deployer.deploy(Token);
};
