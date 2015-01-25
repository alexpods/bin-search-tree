module.exports = BinarySearchTreeIteratorResult;

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