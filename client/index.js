var web3 = new Web3(Web3.givenProvider);

var instance; //contract instance

var user;

var contractAddress = "0xEE8F3A3821c1AF3f0894B3080131ECa10ee289a9";

var account;

var ownedKitties;


$(document).ready(function(){

    console.log('loading web3')
    
    window.ethereum.enable().then(function(accounts){
        console.log(accounts)
        account = accounts[0]
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0];
        console.log("contract instance:", instance)

        getAllKittiesOwned();


        instance.events.Birth({filter: {owner: account}}).on('data', function(event){
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

const getAllKittiesOwned = async() => {

    try{
        let _ownedKitties = [];
        const events = await instance.getPastEvents('Transfer', {
            filter: {to : account},
            fromBlock: 0,
            toBlock: 'latest'
        })

        //for each event, check if we still own the token otherwise discard
        if(events){
            for(var i =0; i< events.length; i++){
                const tokenId = events[i].returnValues["tokenId"]
                console.log("checking if user still owns ", )
                const owner = await instance.methods.ownerOf(tokenId).call()
                if( owner.toLowerCase() == account.toLowerCase()){
                    let kitty = await instance.methods.getKitty(tokenId).call()
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