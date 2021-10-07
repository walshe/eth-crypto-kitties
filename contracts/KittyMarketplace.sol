pragma solidity ^0.5.0;

import "./IKittyMarketplace.sol";
import "./Ownable.sol";

/*
 * Market place to trade kitties (should **in theory** be used for any ERC721 token)
 * It needs an existing Kitty contract to interact with
 * Note: it does not inherit from the kitty contracts
 * Note: The contract needs to be an operator for everyone who is selling through this contract.
 */
contract KittyMarketPlace is IKittyMarketPlace, Ownable{

    Kittycontract private _kittyContract;

    struct Offer {
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }

    //array is used so that we can return list of offers to frontend.. (we cant do that with a mapping)
    Offer[] offers;

    mapping(uint256 => Offer) tokenIdToOffer;



    constructor(address _kittyContractAddress) public{
        owner = msg.sender;
        setKittyContract(_kittyContractAddress);
        
    }

    /**
    * Set the current KittyContract address and initialize the instance of Kittycontract.
    * Requirement: Only the contract owner can call.
     */
    function setKittyContract(address _kittyContractAddress) public onlyOwner{
        require(_kittyContractAddress != address(0));
        _kittyContract = Kittycontract(_kittyContractAddress);
    }

    /**
    * Get the details about a offer for _tokenId. Throws an error if there is no active offer for _tokenId.
     */
    function getOffer(uint256 _tokenId) external view returns ( address seller, uint256 price, uint256 index, uint256 tokenId, bool active){
        Offer storage offer = tokenIdToOffer[_tokenId];
        
        

        seller = offer.seller;
        price = offer.price;
        index = offer.index;
        tokenId = offer.tokenId;
        active = offer.active;
    }

    /**
    * Get all tokenId's that are currently for sale. Returns an empty array if none exist.
     */
    function getAllTokenOnSale() external view  returns(uint256[] memory listOfOffers){
        uint256 totalOffers = offers.length;

        if(totalOffers == 0){
            return new uint256[](0); //return zero length array
        }else{
            listOfOffers = new  uint256[](totalOffers);
            uint256 offerId;

            for(offerId = 0; offerId < totalOffers; offerId ++){
                if(offers[offerId].active == true){
                    listOfOffers[offerId] = offers[offerId].tokenId;    
                }
                
            }  
            

        }
        
    }

    /**
    * Creates a new offer for _tokenId for the price _price.
    * Emits the MarketTransaction event with txType "Create offer"
    * Requirement: Only the owner of _tokenId can create an offer.
    * Requirement: There can only be one active offer for a token at a time.
    * Requirement: Marketplace contract (this) needs to be an approved operator when the offer is created.
     */
    function setOffer(uint256 _price, uint256 _tokenId) external{
        require(_kittyContract.ownerOf(_tokenId) == msg.sender, "You must own the Kitty" );

        require(tokenIdToOffer[_tokenId].active == false, "Cannot sell twice"); 
        require(_kittyContract.isApprovedForAll( msg.sender, address(this)), "Marketplace needs to be approved to sell");


        Offer memory offer = Offer({seller: msg.sender, price : _price, index : offers.length, tokenId : _tokenId, active :true});
        offers.push(offer);
        tokenIdToOffer[_tokenId] = offer; //TODO ask question is element in map and array a reference to the same memory ?


        emit MarketTransaction("Create Offer", msg.sender, _tokenId);
    
    }

    /**
    * Removes an existing offer.
    * Emits the MarketTransaction event with txType "Remove offer"
    * Requirement: Only the seller of _tokenId can remove an offer.
     */
    function removeOffer(uint256 _tokenId) external{
        
        Offer storage offer = tokenIdToOffer[_tokenId];
        require(offer.seller == msg.sender, "You don't own the Kitty" );

    
        //remove from tokenIdToOffer
        delete tokenIdToOffer[_tokenId];
        //mark element in array as inactive
        offers[offer.index].active = false; 

        emit MarketTransaction("Remove Offer", msg.sender, _tokenId);
    }

    /**
    * Executes the purchase of _tokenId.
    * Sends the funds to the seller and transfers the token using transferFrom in Kittycontract.
    * Emits the MarketTransaction event with txType "Buy".
    * Requirement: The msg.value needs to equal the price of _tokenId
    * Requirement: There must be an active offer for _tokenId
     */
    function buyKitty(uint256 _tokenId) external payable{
        Offer memory offer = tokenIdToOffer[_tokenId];

        //checks
        require(msg.value == offer.price, "Value sent must equal price" );
        require(offer.active == true, "Offer must be active"); // TODO why do we not check the active from the array element

        //effect - this prevents rentrancy attacks
        delete tokenIdToOffer[_tokenId]; // TODO so delete really just removes the offer from the mapping but leave the offer var intact ?
        offers[offer.index].active = false; // we dont want to delete from array else we screw up indexes
        

        //interaction
        //TODO make pull instead of push - will save gas!
        if(offer.price > 0){
            offer.seller.transfer(offer.price);
        }

        _kittyContract.transferFrom(offer.seller, msg.sender, _tokenId);

        
        emit MarketTransaction("Buy", msg.sender, _tokenId);
    }
}
