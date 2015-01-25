module.exports = BinarySearchTreeIterator;

var IteratorResult = require('./IteratorResult');

/**
 * Binary search tree iterator
 *
 * @param tree Binary Search tree
 * @param type Type of iteration result
 * @constructor
 */
function BinarySearchTreeIterator(tree, type) {
    type = type || 'v';

    if (type !== 'k' && type !== 'v' && type !== 'e') {
        throw new Error('Incorrect binary search tree iterator type "' + type + '"!');
    }

    this._type = type;
    this._tree = tree;
    this._last = null;
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
        return new IteratorResult(undefined, true);
    }

    var node = this._last;
    var type = this._type;

    if (!node) {
        if (!this._tree.min) {
            this._done = true;
            return new IteratorResult(undefined, true);
        }

        this._last = node = this._tree._min;
        switch (type) {
            case 'k': return new IteratorResult(node['k'], false);
            case 'v': return new IteratorResult(node['v'], false);
            case 'e': return new IteratorResult([node['k'], node['v']], false);
        }
    }

    if (node['r']) {
        node = node['r'];

        while (node['l']) {
            node = node['l'];
        }

        this._last = node;
        switch (type) {
            case 'k': return new IteratorResult(node['k'], false);
            case 'v': return new IteratorResult(node['v'], false);
            case 'e': return new IteratorResult([node['k'], node['v']], false);
        }
    }

    if (!node['p']) {
        this._done = true;
        return new IteratorResult(undefined, true);
    }

    while (node['p']['l'] !== node) {
        node = node['p'];

        if (!node['p']) {
            this._done = true;
            return new IteratorResult(undefined, true);
        }
    }

    this._last = node = node['p'];
    switch (type) {
        case 'k': return new IteratorResult(node['k'], false);
        case 'v': return new IteratorResult(node['v'], false);
        case 'e': return new IteratorResult([node['k'], node['v']], false);
    }
};

if (Symbol) {
    /**
     * Iterator must return itself as its iterator
     *
     * @returns this iterator
     */
    BinarySearchTreeIterator.prototype[Symbol.iterator] = function() {
        return this;
    };
}