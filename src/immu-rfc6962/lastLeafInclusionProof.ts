import { createGenerator } from '../immu-hash/hash.js'





/**
 * Computes MHT shortest path from last leaf and returns last element of path
 * (root).
 */
export function rootFromLastLeafInclusionProof(proofData: {
    /**
     * List of nodes which to join from left
     */
    lastLeafInclusionProofNodes: Buffer[],
    /**
     * Last leaf (= sha256(0 || lastLeafValue))
     */
    lastLeaf: Buffer,
    /**
     * 
     */
    lastLeafId: Long
}): Buffer {

    const computeHash = createGenerator()
    let currentNodeIndex = proofData.lastLeafId.sub(1)

    // start from leaf
    let currentNode = proofData.lastLeaf

    for (const lastLeafInclusionProofNode of proofData.lastLeafInclusionProofNodes) {

        // this will return parent of current node
        currentNode = computeHash(Buffer.from([
            0x01,
            ...lastLeafInclusionProofNode,  // left node is from proof
            ...currentNode,                 // current node is always right node
        ]))

        
        
        // we are on edge, go to true parent
        while (
            currentNodeIndex.mod(2).equals(0)
            && currentNodeIndex.notEquals(0)
        ) {
            // go to parent
            currentNodeIndex = currentNodeIndex.shiftRight(1)
        }

        // go to parent
        currentNodeIndex = currentNodeIndex.shiftRight(1)
    }

    // assert currentNodeIndex is root (currentNodeIndex === 0)
    if (currentNodeIndex.notEquals(0)) {
        console.log(
            'Last Inclusion proof: computed node is not root node for tree of provided size',
            currentNodeIndex
        )
    }

    // end at root
    return currentNode
}


