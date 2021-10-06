var kittyContractAddress = "0x72dd5C36C4101939a77ab1a4e8cd9a4cfD386BB3";
var marketplaceContractAddress = "0x301d19516Ef5c83211bA60382BcEc75cE65Ef3ec";

var web3 = new Web3(Web3.givenProvider);



var kittyContractInstance; 
var marketplaceContractInstance;

var user;



var account;

var ownedKitties;


$(document).ready(function(){

    console.log('loading web3')
    
    window.ethereum.enable().then(function(accounts){
        console.log(accounts)
        account = accounts[0]
        kittyContractInstance = new web3.eth.Contract(abi.kittyContract, kittyContractAddress, {from: accounts[0]})
        user = accounts[0];
        //console.log("contract kittyContractInstance:", kittyContractInstance);

        marketplaceContractInstance = new web3.eth.Contract(abi.marketplaceContract, marketplaceContractAddress, {from: accounts[0]})

        getAllKittiesOwned();


        kittyContractInstance.events.Birth({filter: {owner: account}}).on('data', function(event){
            alert("Kitty successfully birthed on the blockchain. Token id is" + event.returnValues.kittenId);


            let owner = event.returnValues.owner;
            let kittenId = event.returnValues.kittenId;
            let mumId = event.returnValues.mumId;
            let dadId = event.returnValues.dadId;
            let genes = event.returnValues.genes;

            $("#kittyCreation").css("display", "block");
            $("#kittyCreation").text("owner:" +owner + " kittenId:" + kittenId + " mumId:" +mumId + " dadId:" +dadId + " genes:" +genes);

            getAllKittiesOwned();

        }).on("error", console.error("Error receiving Birth event"))

        marketplaceContractInstance.events.MarketTransaction().on('data', function(event){
            var eventType = event.returnValues("TxType").toString();

            alert("Received "+ eventType);

        }).on("error", console.error("Error receiving MarketTransaction event"))
        

        

    })

    
})

async function createKittyInBlockchain(dna){
    try {
        await kittyContractInstance.methods.createKittyGen0(dna).send();
        await getAllKittiesOwned();
    } catch (error) {
        console.error(error)
        alert("Error occurred")    
    }
    

}

const getAllKittiesOwned = async() => {

    try{
        let _ownedKitties = [];
        const events = await kittyContractInstance.getPastEvents('Transfer', {
            filter: {to : account},
            fromBlock: 0,
            toBlock: 'latest'
        })

        //for each event, check if we still own the token otherwise discard
        if(events){
            for(var i =0; i< events.length; i++){
                const tokenId = events[i].returnValues["tokenId"]
                console.log("checking if user still owns ", )
                const owner = await kittyContractInstance.methods.ownerOf(tokenId).call()
                if( owner.toLowerCase() == account.toLowerCase()){
                    let kitty = await kittyContractInstance.methods.getKitty(tokenId).call()
                    kitty.tokenId = tokenId
                    console.log("kitty:" +kitty)
                    _ownedKitties.push(kitty)
                }
                
            }
            ownedKitties = _ownedKitties;
        }
        

    }catch(err){
        console.error(err)
    }

}

async function breed(dameId, sireId){

    try {
        await kittyContractInstance.methods.breed(parseInt(sireId), parseInt(dameId)).send()    
        await getAllKittiesOwned();
    } catch (error) {
        alert("Error occurred trying to breed kitties")
        console.error(error)
    }
    
    

}

function getInventory(){
    //TODO get all kitties on offer
    console.log("in getInventory")

    var arrayOfIds = marketplaceContractInstance.methods.getAllTokenOnSale().call();
    console.log(`arrayOfIds: ${arrayOfIds}`);

    for(i=0;i<arrayOfIds;i++){
        //dont forget to exclude the one at zeroth position as thats a fake one for special purposes (no one owns it or should be able to purchase it)   
    }

}

async function initMarketplace(){
    console.log("in initMarketplace")
    //check if already approved

    //else display alert tellign them they need to approve, then send trans

    var marketplaceApprovedAsOperator = await kittyContractInstance.methods.isApprovedForAll(user, marketplaceContractAddress).call();

    if(marketplaceApprovedAsOperator){
        
        getInventory()

    }else{
        alert("We will need you to approve the marletplace as an operator for your Kitties");
        await kittyContractInstance.methods.setApprovalForAll(marketplaceContractAddress, true).send()
        .on('transactionHash', function(hash){
            
        })
        .on('confirmation', function(confirmationNumber, receipt){
            
        })
        .on('receipt', function(receipt){
            getInventory()
        }).on('error', function(error, receipt) { 
            console.error(error)
        });
    }

}

async function sellKitty(tokenId, price){
    //marketplace setOffer
    var amount = web3.utils.toWei(price, "ether")
    try {
        await marketplaceContractInstance.methods.setOffer(amount, tokenId).send()
        
    } catch (error) {
        alert("Error occurred trying to put Kitty up for sale")
        console.error(error)
    }
}

async function buyKitty(tokenId, price){
    //marketplace buyKitty
    
}


async function removeOffer(tokenId){
    try {
        await marketplaceContractInstance.methods.removeOffer(tokenId).send()
        
    } catch (error) {
        alert("Error occurred trying to put cancel sale")
        console.error(error)
    }
}
    

async function getOffer(tokenId){
    return await marketplaceContractInstance.methods.getOffer(tokenId).call();    
    
}