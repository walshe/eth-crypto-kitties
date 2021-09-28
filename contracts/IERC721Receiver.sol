pragma solidity ^0.5.0;
/**
 * @dev Required interface of an ERC721 compliant contract.
 */
interface IERC721Receiver {

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4);
}