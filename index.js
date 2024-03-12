const crypto = require('crypto');
const MerkleTreeLib = require('merkletreejs');

class MerkleTree {
    constructor(data) {
        this.leaves = data.map(datum => crypto.createHash('sha256').update(datum).digest('hex'));
        this.tree = new MerkleTreeLib(this.leaves, crypto.createHash('sha256'), { sortPairs: true });
    }

    getRoot() {
        return this.tree.getRoot().toString('hex');
    }

    verify(leaf, proof) {
        return this.tree.verify(proof, leaf, this.getRoot());
    }
}

module.exports = MerkleTree;
