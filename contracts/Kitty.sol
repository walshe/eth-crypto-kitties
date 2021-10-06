pragma solidity ^0.5.12;

import "./IERC721.sol";
import "./Ownable.sol";
import "./IERC721Receiver.sol";

contract Kittycontract is IERC721, Ownable {
    string public constant _name = "Emmett-Kitties";
    string public constant _symbol = "EK";
    uint256 public constant CREATION_LIMIT_GEN0 = 10; //keep gen0 cats rare!

    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd; //xor of all the bytes4(keccack256) of each implemented function of the interface
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7; //bytes4(keccack256) of the single supportsInterface function

    event Birth(
        address owner,
        uint256 kittenId,
        uint256 mumId,
        uint256 dadId,
        uint256 genes
    );

    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    Kitty[] kitties;
    mapping(uint256 => address) public kittyIndexToOwner; //todo take away public
    mapping(address => uint256) public ownershipTokenCount; //todo take away public

    //approved adddresses for kitty transfer
    mapping(uint256 => address) public kittyIndexToApproved;

    //mapping of an addresses approvers i.e. check if an operator was approved for a particular token owner
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    uint256 gen0Counter;

    constructor() public Ownable() {
        owner = msg.sender;
        //create a cat that no one will own, we will use it so that no cat can have an token id of zero (which would cause issues in the marketplace offers array)
        _createKitty(0, 0, 0, uint256(-1), address(0));
    }

    function breed(uint256 dadId, uint256 mumId) public returns (uint256){
        //check ownership of parents
        require(_owns(msg.sender, mumId), "User doesnt own mum/dame");
        require(_owns(msg.sender, dadId), "User doesnt own dad/sire");
        
        (uint256 dadGenes, , , , uint256 dadGeneration) = getKitty(dadId); //save memory by not loading values into vars
        (uint256 mumGenes, , , , uint256 mumGeneration) = getKitty(mumId); //save memory by not loading values into vars
        
        uint256 newGenes = _mixDna(dadGenes, mumGenes);
        
        //get generation
        uint256 kidGen = 0;
        if(dadGeneration < mumGeneration){
            kidGen = mumGeneration + 1;
            kidGen/=2;
        }else if(dadGeneration > mumGeneration) {
            kidGen = dadGeneration + 1;
            kidGen/=2;
        }else{
            kidGen = mumGeneration + 1;
        }

        //create new cat with new props for this sender
        _createKitty(mumId, dadId, uint32(kidGen), newGenes, msg.sender);
    }



    //ERC165 often appears when contract to contract interaction is needed
    function supportsInterface(bytes4 _interfaceId) external pure returns (bool){
        return (_interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165);
    }

    function createKittyGen0(uint256 genes) public onlyOwner returns (uint256) {
        require(gen0Counter < CREATION_LIMIT_GEN0);

        gen0Counter++;

        //no owner, owned by contract
        return _createKitty(0, 0, 0, genes, msg.sender);
    }

    function getKitty(uint256 tokenId)
        public
        view
        returns (
            uint256 genes,
            uint256 birthTime,
            uint256 mumId,
            uint256 dadId,
            uint256 generation
        )
    {
        //use a pointer to storage instead of making copy
        Kitty storage kitty = kitties[tokenId];

        genes = kitty.genes;
        birthTime = uint256(kitty.birthTime);
        mumId = uint256(kitty.mumId);
        dadId = uint256(kitty.dadId);
        generation = uint256(kitty.generation);
        
    }

    /**
        returns id of new Kitty (which is its position in kitties array)
     */
    function _createKitty(
        uint256 mumId,
        uint256 dadId,
        uint32 generation,
        uint256 genes,
        address owner
    ) private returns (uint256) {
        //note easier to pass in uint256 and cast to uint32
        Kitty memory kitty = Kitty({
            genes: genes,
            birthTime: uint64(now),
            mumId: uint32(mumId),
            dadId: uint32(dadId),
            generation: uint16(generation)
        });

        uint256 newKittenId = kitties.push(kitty) - 1;

        _transfer(address(0), owner, newKittenId);

        emit Birth(owner, newKittenId, mumId, dadId, genes);

        return newKittenId;
    }

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance) {
        return ownershipTokenCount[owner];
    }

    /*
     * @dev Returns the total number of tokens in circulation.
     */
    function totalSupply() external view returns (uint256 total) {
        return kitties.length;
    }

    /*
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory tokenName) {
        return _name;
    }

    /*
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory tokenSymbol) {
        return _symbol;
    }

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address) {
        require(kittyIndexToOwner[tokenId] != address(0));
        return kittyIndexToOwner[tokenId];
    }

    /* @dev Transfers `tokenId` token from `msg.sender` to `to`.
     *
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `to` can not be the contract address.
     * - `tokenId` token must be owned by `msg.sender`.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 tokenId) external {
        require(to != address(0));
        require(to != address(this));
        require(_owns(msg.sender, tokenId));

        _transfer(msg.sender, to, tokenId);
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal {
        ownershipTokenCount[to]++;
        kittyIndexToOwner[tokenId] = to;

        if (from != address(0)) {
            ownershipTokenCount[from]--;
            delete kittyIndexToApproved[tokenId]; //if you seel a token you want to delete the current approvals it has or else new owner could be in for a shock !
        }

        emit Transfer(from, to, tokenId);
    }

    function _owns(address claimant, uint256 tokenId)
        internal
        view
        returns (bool)
    {
        require(kittyIndexToOwner[tokenId] == claimant);
        return true;
    }

    function _approve(uint256 _tokenId, address _approved)
        internal
    {
        kittyIndexToApproved[_tokenId] = _approved;
    }

    function safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal{
        _transfer(_from, _to, _tokenId);
        require(checkERC721Support(_from, _to, _tokenId, _data));
    }



    /// @notice Change or reaffirm the approved address for an NFT
    /// @dev The zero address indicates there is no approved address.
    ///  Throws unless `msg.sender` is the current NFT owner, or an authorized
    ///  operator of the current owner.
    /// @param _approved The new approved NFT controller
    /// @param _tokenId The NFT to approve
    function approve(address _approved, uint256 _tokenId) external{
        
        require( _owns(msg.sender, _tokenId) || _operatorApprovals[kittyIndexToOwner[_tokenId]][msg.sender] );
        
        _approve(_tokenId, _approved);

        emit Approval(msg.sender, _approved, _tokenId);
    }

    /// @notice Enable or disable approval for a third party ("operator") to manage
    ///  all of `msg.sender`'s assets
    /// @dev Emits the ApprovalForAll event. The contract MUST allow
    ///  multiple operators per owner.
    /// @param _operator Address to add to the set of authorized operators
    /// @param _approved True if the operator is approved, false to revoke approval
    function setApprovalForAll(address _operator, bool _approved) external{
        
        require(_operator != msg.sender);

        _operatorApprovals[msg.sender][_operator] = _approved;

        emit ApprovalForAll(msg.sender, _operator, _approved);

    }

    /// @notice Get the approved address for a single NFT
    /// @dev Throws if `_tokenId` is not a valid NFT.
    /// @param _tokenId The NFT to find the approved address for
    /// @return The approved address for this NFT, or the zero address if there is none
    function getApproved(uint256 _tokenId) external view returns (address){

        require(_tokenId < kitties.length); // simple check for existance
        return kittyIndexToApproved[_tokenId];
    }

    /// @notice Query if an address is an authorized operator for another address
    /// @param _owner The address that owns the NFTs
    /// @param _operator The address that acts on behalf of the owner
    /// @return True if `_operator` is an approved operator for `_owner`, false otherwise
    function isApprovedForAll(address _owner, address _operator) public view returns (bool){
                
        return _operatorApprovals[_owner][_operator];

    }

    /// @notice Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
    ///  TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE
    ///  THEY MAY BE PERMANENTLY LOST
    /// @dev Throws unless `msg.sender` is the current owner, an authorized
    ///  operator, or the approved address for this NFT. Throws if `_from` is
    ///  not the current owner. Throws if `_to` is the zero address. Throws if
    ///  `_tokenId` is not a valid NFT.
    /// @param _from The current owner of the NFT
    /// @param _to The new owner
    /// @param _tokenId The NFT to transfer
    function transferFrom(address _from, address _to, uint256 _tokenId) external{
        _isApprovedOrOwner(msg.sender, _from, _to, _tokenId);

        //reuse _trasnfer
        _transfer(_from, _to, _tokenId);
    }

    /// @notice Transfers the ownership of an NFT from one address to another address
    /// @dev This works identically to the other function with an extra data parameter,
    ///  except this function just sets data to "".
    /// @param _from The current owner of the NFT
    /// @param _to The new owner
    /// @param _tokenId The NFT to transfer
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external{
        this.safeTransferFrom( _from,  _to,  _tokenId, "");   
    }

    /// @notice Transfers the ownership of an NFT from one address to another address
    /// @dev Throws unless `msg.sender` is the current owner, an authorized
    ///  operator, or the approved address for this NFT. Throws if `_from` is
    ///  not the current owner. Throws if `_to` is the zero address. Throws if
    ///  `_tokenId` is not a valid NFT. When transfer is complete, this function
    ///  checks if `_to` is a smart contract (code size > 0). If so, it calls
    ///  `onERC721Received` on `_to` and throws if the return value is not
    ///  `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    /// @param _from The current owner of the NFT
    /// @param _to The new owner
    /// @param _tokenId The NFT to transfer
    /// @param data Additional data with no specified format, sent in call to `_to`
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) external{
        
        _isApprovedOrOwner(msg.sender, _from, _to, _tokenId);
        
        _safeTransferFrom( _from,  _to,  _tokenId,  data);    
    }

    /// @notice Transfers the ownership of an NFT from one address to another address
    /// @dev This works identically to the other function with an extra data parameter,
    ///  except this function just sets data to "".
    /// @param _from The current owner of the NFT
    /// @param _to The new owner
    /// @param _tokenId The NFT to transfer
    function _safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory _data) internal{
        require(checkERC721Support(_from, _to, _tokenId, _data));
        _transfer(_from, _to, _tokenId);
    }

    function _isApprovedOrOwner(address sender, address _from, address _to, uint256 _tokenId) internal view returns (bool){

        require(_to != address(0));
        require(sender == _from || sender == kittyIndexToOwner[_tokenId] || isApprovedForAll(_from, sender)); //spender is from or spender is approved for tokenId or spender is operator for from
        require(_owns(_from, _tokenId));
        require(_tokenId < kitties.length); // simple check for valid NFT / token exists   

    }

    function checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns (bool){
        
        if(!isContract(_to)){
            return true;
        }
        
        //call onERC721Received
        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);

        //check return value
        return returnData == MAGIC_ERC721_RECEIVED;

    }

    function isContract(address _to) internal view returns (bool){
        uint32 size;

       //get size of code, If 0 then its not a contract
        assembly{
            size := extcodesize(_to) 
        }

        return size > 0;
    }

    function _mixDna(uint256 dadGenes, uint256 mumGenes) internal pure returns(uint256){
        uint256 firstHalf = dadGenes/100000000;
        uint256 secondHalf = mumGenes%100000000;

        uint256 newDna = firstHalf * 100000000;
        newDna = newDna + secondHalf;
        return newDna;

    }

    function _mixDnaComplex(uint256 dadGenes, uint256 mumGenes) internal view returns(uint256){
        
        uint256[8] memory geneArray;
        uint8 random = uint8(now % 255); //binary between 00000000 11111111
        uint256 i = 1;
        uint256 index = 7;

        for(i=1 ; i<=128 ; i=i*2){
            if(random & i != 0){
                geneArray[index] = uint8(mumGenes % 100);
            }else{
                geneArray[index] = uint8(dadGenes % 100);    
            }
            mumGenes = mumGenes / 100;
            dadGenes = dadGenes / 100;

            index = index - 1;

        }

        uint256 newGene;
        for(i=0;i<8;i++){
            newGene = newGene +geneArray[i];
            if(i != 7){
                newGene = newGene * 100;
            }
        }
        return newGene;

    }
}
