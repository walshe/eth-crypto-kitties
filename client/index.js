var web3 = new Web3(Web3.givenProvider);

var instance; //contract instance

var user;

var contractAddress = "0x2edd3D0780F247afDA77923B052921Df5aa6A84b";

var account;

$(document).ready(function(){
    
    window.ethereum.enable().then(function(accounts){
        console.log(accounts)
        account = accounts[0]
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0];
        console.log("contract instance:", instance)


        instance.events.Birth({filter: {owner: account}}).on('data', function(event){
            alert("Kitty successfully birthed on the blockchain. Token id is" + event.returnValues.kittenId);


            let owner = event.returnValues.owner;
            let kittenId = event.returnValues.kittenId;
            let mumId = event.returnValues.mumId;
            let dadId = event.returnValues.dadId;
            let genes = event.returnValues.genes;

            $("#kittyCreation").css("display", "block");
            $("#kittyCreation").text("owner:" +owner + " kittenId:" + kittenId + " mumId:" +mumId + " dadId:" +dadId + " genes:" +genes);

        }).on("error", console.error("Error receiving Birth event"))
        

    })

    
})

function createKittyInBlockchain(dna){
    
    instance.methods.createKittyGen0(dna).send({}, function(error, txHash){
        if(error){
            alert("Transaction Error" + error.message)
            return
        } else{
            console.log(txHash)
            alert("Transaction successfully sent!")
        }   
        
        
    })

    


}