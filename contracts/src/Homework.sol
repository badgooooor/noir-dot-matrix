// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { UltraVerifier } from "./UltraVerifier.sol";

contract Homework is ERC721 {
  uint256 private _tokenIdCounter;
  UltraVerifier verifier;

  error StudentNotVerified();

  constructor() ERC721("Homework", "HW") {
    verifier = new UltraVerifier();
  }

  // `safeMint` accepts the proof and mints an NFT for the sender if the proof is valid
  function safeMint(
    bytes calldata _proof
  ) public {
    bytes32[] memory emptyBytes32Array;

    // verify function accepts a proof and an array of return parameters,
    // as our circuit does not have any public input, we'll pass an empty array
    try verifier.verify(_proof, emptyBytes32Array) returns (bool verified) {
      if (!verified) {
        revert StudentNotVerified();
      }
      uint256 tokenId = _tokenIdCounter;
      _safeMint(msg.sender, tokenId);
      _tokenIdCounter += 1;
    } catch {
      revert StudentNotVerified();
    }
  }
}
