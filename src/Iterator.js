module.exports = BinarySearchTreeIterator;

/**
 * Binary search tree iterator
 *
 * @param tree Binary Search tree
 * @constructor
 */
function BinarySearchTreeIterator(tree, type) {
    type = type || 'v';

    if (type !== 'k' && type !== 'v' && type !== 'e') {
        throw new Error('Incorrect binary search tree iterator type "' + type + '"!');
    }

    this._tree = tree;
    this._type = type;
    this._last = null;
    this._up   = false;
    this._im   = false;
    this._done = false;
}

/**
 * Iterates to the next node and returns its value.
 *
 * @returns Object of { value: , done } where:
 *              * value: value of the next node
 *              * done:  true if the next node is last, false otherwise
 */
BinarySearchTreeIterator.prototype.next = function() {
    if (this._done) {
        return new BinarySearchTreeIteratorResult(undefined, true);
    }

    var tree = this._tree;
    var node = this._last;

    var res = tree._traverse({ from: node, steps: 1, _ff: true, _up: this._up, _im: this._im });

    if (!res) {
        this._done = true;
        return new BinarySearchTreeIteratorResult(undefined, true);
    }

    this._last = node = res[0];
    this._up   = res[2];
    this._im   = res[3];

    var t = this._type;

    return new BinarySearchTreeIteratorResult(
        (t === 'v' && node.v) || (t === 'k' && node.k) || (t === 'e' && [node.k, node.v]),
        false
    );
};

/**
* Iterator must return itself as its iterator
*
* @returns this iterator
*/
BinarySearchTreeIterator.prototype[Symbol.iterator] = function() {
    return this;
};


/**
 * Result of binary search tree iteration
 *
 * @param value
 * @param done
 * @constructor
 */
function BinarySearchTreeIteratorResult(value, done) {
    this.value = value;
    this.done  = done;
}