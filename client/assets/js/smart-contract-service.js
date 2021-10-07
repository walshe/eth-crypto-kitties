var kittyContractAddress = "0x6c545C6130d061FfcFB96B08Ea6151a643281754";
var marketplaceContractAddress = "0x31646B95763C8Fe686C6C042ba2184c20C3Db342";

var web3 = new Web3(Web3.givenProvider);

var kittyContractInstance;
var marketplaceContractInstance;

var user;

var account;

var ownedKitties;
var kittiesForSale;

$(document).ready(async function () {
  console.log("loading web3");

  async function initAccountAndContracts(userAccount){
    account = userAccount;
    user = userAccount

    kittyContractInstance = new web3.eth.Contract(
      abi.kittyContract,
      kittyContractAddress,
      { from: account }
    );
  

    marketplaceContractInstance = new web3.eth.Contract(
      abi.marketplaceContract,
      marketplaceContractAddress,
      { from: account }
    ); 

    await getAllKittiesOwned();

    kittyContractInstance.events
      .Birth({ filter: { owner: account } })
      .on("data", async function (event) {
        let owner = event.returnValues.owner;
        let kittenId = event.returnValues.kittenId;
        let mumId = event.returnValues.mumId;
        let dadId = event.returnValues.dadId;
        let genes = event.returnValues.genes;

        $("#kittyCreation").css("display", "block");
        $("#kittyCreation").text(
          "owner:" +
            owner +
            " kittenId:" +
            kittenId +
            " mumId:" +
            mumId +
            " dadId:" +
            dadId +
            " genes:" +
            genes
        );

        alert(
          "Kitty successfully birthed on the blockchain and is now in your catalogue, Token id is " +
            kittenId
        );
        await getAllKittiesOwned();
        loadPage("./catalogue.html");
      })
      .on("error", () => console.error("Error receiving Birth event"));

    marketplaceContractInstance.events
      .MarketTransaction()
      .on("data", function (event) {
        var eventType = event.returnValues["TxType"].toString();
        var tokenId = event.returnValues["tokenId"];

        if (eventType == "Buy") {
          //successful purchase
          alert(
            "Kitty purchase complete, Kitty can now be found in your catalogue"
          );
          loadPage("./catalogue.html");
        } else if (eventType == "Create Offer") {
          // successfully put up for sale
          //this is really where the UI should be changed to Cancel Sale
          debugger
          alert("Kitty successfully offered up for sale");
          loadPage("./catalogue.html");
        } else if (eventType == "Remove Offer") {
          //Successfully cancelled the sale
          alert("Kitty sale canceled");
          loadPage("./catalogue.html");
        }
      })
      .on("error", () => console.error("Error receiving MarketTransaction event"));
  };

  window.ethereum.on('accountsChanged', async function (accounts) {
    console.log(`account changed to ${accounts[0]}`)
    await initAccountAndContracts(accounts[0])
    loadPage("./catalogue.html")
  })



  window.ethereum.enable().then(async function (accounts) {

    await initAccountAndContracts(accounts[0])
  })

    
});

async function createKittyInBlockchain(dna) {
  try {
    await kittyContractInstance.methods.createKittyGen0(dna).send();
    await getAllKittiesOwned();
  } catch (error) {
    console.error(error);
    alert("Error occurred");
  }
}

const getAllKittiesOwned = async () => {
  try {
    const _ownedKitties = [];
    const events = await kittyContractInstance.getPastEvents("Transfer", {
      filter: { to: account },
      fromBlock: 0,
      toBlock: "latest",
    });

    console.log("events are " + JSON.stringify(events))

    //for each event, check if we still own the token otherwise discard
    if (events) {
      for (var i = 0; i < events.length; i++) {
        const tokenId = events[i].returnValues["tokenId"];
        console.log("checking if user still owns ");
        const owner = await kittyContractInstance.methods
          .ownerOf(tokenId)
          .call();
        if (owner.toLowerCase() == account.toLowerCase()) {
          let kitty = await kittyContractInstance.methods
            .getKitty(tokenId)
            .call();
          kitty.tokenId = tokenId;
          console.log("kitty:" + kitty);
          _ownedKitties.push(kitty);
        }
      }
      ownedKitties = _ownedKitties;
    }
  } catch (err) {
    console.error(err);
  }
};

async function breed(dameId, sireId) {
  try {
    await kittyContractInstance.methods
      .breed(parseInt(sireId), parseInt(dameId))
      .send();
    await getAllKittiesOwned();
  } catch (error) {
    alert("Error occurred trying to breed kitties");
    console.error(error);
  }
}

async function getInventory() {
  //TODO get all kitties on offer
  console.log("in getInventory");

  var arrayOfIds = [... new Set(await marketplaceContractInstance.methods
    .getAllTokenOnSale()
    .call())]; //de-duplicate due to bug with getAllTokenOnSale
  console.log(`arrayOfIds: ${arrayOfIds}`);

  var _kittiesForSale = [];
  //debugger
  for (i = 0; i < arrayOfIds.length; i++) {
    //debugger
    const tokenId = arrayOfIds[i];
    console.log(`getting kitty with token id ${tokenId}`);
    //dont forget to exclude the one at zeroth position as thats a fake one for special purposes (no one owns it or should be able to purchase it)
    if (tokenId != 0) {
      console.log("getting offer for tokenId ", tokenId);
      let offer = await marketplaceContractInstance.methods
        .getOffer(tokenId)
        .call();
      if (offer.active) {
        let kitty = await kittyContractInstance.methods
          .getKitty(tokenId)
          .call();

        _kittiesForSale.push(Object.assign(offer, kitty));
      }
    }
  }

  console.log("kitties for sale: " + JSON.stringify(_kittiesForSale));

  kittiesForSale = _kittiesForSale;
}

async function initMarketplace() {
  console.log("in initMarketplace");
  //check if already approved

  //else display alert tellign them they need to approve, then send trans

  var marketplaceApprovedAsOperator = await kittyContractInstance.methods
    .isApprovedForAll(user, marketplaceContractAddress)
    .call();

  if (marketplaceApprovedAsOperator) {
    await getInventory();
  } else {
    alert(
      "We will need you to approve the marletplace as an operator for your Kitties"
    );
    await kittyContractInstance.methods
      .setApprovalForAll(marketplaceContractAddress, true)
      .send();
  }
}

async function sellKitty(tokenId, price) {
  //marketplace setOffer
  var amount = web3.utils.toWei(price, "ether");
  try {
    await marketplaceContractInstance.methods.setOffer(amount, tokenId).send();
  } catch (error) {
    alert("Error occurred trying to put Kitty up for sale");
    console.error(error);
  }
}

async function buyKitty(tokenId, price) {
  //marketplace buyKitty

  var amount = web3.utils.toWei(price, "ether");
  try {
    await marketplaceContractInstance.methods
      .buyKitty(tokenId)
      .send({ value: price });
  } catch (error) {
    alert("Error occurred trying to buy Kitty");
    console.error(error);
  }
}

async function removeOffer(tokenId) {
  try {
    await marketplaceContractInstance.methods.removeOffer(tokenId).send();
  } catch (error) {
    alert("Error occurred trying to put cancel sale");
    console.error(error);
  }
}

async function getOffer(tokenId) {
  return await marketplaceContractInstance.methods.getOffer(tokenId).call();
}
