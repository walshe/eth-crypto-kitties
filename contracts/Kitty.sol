pragma solidity ^0.5.12;

import "./IERC721.sol";
import "./Ownable.sol";

contract Kittycontract is IERC721, Ownable {
    string public constant _name = "Emmett-Kitties";
    string public constant _symbol = "EK";
    uint256 public constant CREATION_LIMIT_GEN0 = 10; //keep gen0 cats rare!

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
    mapping(uint256 => address) kittyIndexToOwner;
    mapping(address => uint256) ownershipTokenCount;

    uint256 gen0Counter;

    constructor() public Ownable() {
        owner = msg.sender;
    }

    function createKittyGen0(uint256 genes) public onlyOwner returns (uint256) {
        require(gen0Counter < CREATION_LIMIT_GEN0);

        gen0Counter++;

        //no owner, owned by contract
        return _createKitty(0, 0, 0, genes, msg.sender);
    }

    function getKitty(uint256 tokenId)
        external
        view
        returns (
            uint256 genes,
            uint256 birthTime,
            uint256 mumId,
            uint256 dadId,
            uint256 generation
        )
    {
        //use apointer to storage instead of making copy
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
        }

        emit Transfer(from, to, tokenId);
    }

    function _owns(address claimant, uint256 tokenId)
        internal
        view
        returns (bool)
    {
        require(kittyIndexToOwner[tokenId] == claimant);
    }
}
