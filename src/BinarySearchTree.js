"use strict";

module.exports = BinarySearchTree;

function BinarySearchTree(options) {
    options = options || {};

    if (typeof options === 'function') {
        options['compare'] = options;
    }

    this._root   = null;
    this._min    = null;
    this._max    = null;
    this._length = 0;
    this._cc     = options['compare'];
}

Object.defineProperties(BinarySearchTree.prototype, {

    root: {
        get: function() {
            return this._root.v;
        }
    },

    rootKey: {
        get: function() {
            return this._root.k;
        }
    },

    min: {
        get: function() {
            return this._min.v;
        }
    },

    minKey: {
        get: function() {
            return this._min.k;
        }
    },

    max: {
        get: function() {
            return this._max.v;
        }
    },

    maxKey: {
        get: function() {
            return this._max.k;
        }
    },

    length: {
        get: function() {
            return this._length;
        }
    }
});

/**
 * Insert new value to binary search tree.
 * If key is already exists - than new node is not created, old value is replaced by new one
 *
 * @param key
 * @param value
 *
 * @return {BinarySearchTree} this
 */
BinarySearchTree.prototype.set = function(key, value) {
    if (!this._root) {
        this._root = this._min = this._max = { k: key, v: value, p: null, l: null, r: null, m: null };
        this._length++;
        return this;
    }

    var result = this._search(key);

    if (result[0]) {
        result[1].v = value;
        return this;
    }

    var node = { k: key, v: value, p: null, l: null, r: null, m: null };

    this._linkNodes(result[1], node);
    this._length++;

    if (this.compareKeys(key, this._min.k) < 0) {
        this._min = node;
    }
    else if (this.compareKeys(key, this._max.k) > 0) {
        this._max = node;
    }

    return this;
};

/**
 * Search for value by specified key.
 * If value for specified key does not exists - throw an error
 *
 * @param   key
 * @returns value
 *
 * @throws {Error} if value for specified key does not exists
 */
BinarySearchTree.prototype.get = function(key) {
    var result = this._search(key);

    if (!result[0]) {
        throw new Error('Could not get value. Value with key "' + key + '" does not exist in binary search tree!');
    }

    return result[1].v;
};

/**
 * Checks if value for specified key exists in the binary search tree
 *
 * @param key
 * @returns {Boolean} true if value for specified key exists
 */
BinarySearchTree.prototype.has = function(key) {
    return this._search(key)[0];
};

/**
 * Remove value for specified key.
 * If value for specified key does not exists - throw an error
 *
 * @param   key
 * @returns value Removed value
 *
 * @throws {Error} if value for specified key does not exists
 */
BinarySearchTree.prototype.remove = function(key) {
    var result = this._search(key);

    if (!result[0]) {
        throw new Error('Could not remove value. Value with key "' + key + '" does not exist in binary search tree');
    }
    var node = result[1];

    this._removeNode(node);
    this._length--;

    return node.v;
};

/**
 * Creates new tree base on current.
 * Nodes are not cloned.
 *
 * @returns {BinarySearchTree} New binary searched tree based on current
 */
BinarySearchTree.prototype.clone = function() {
    var nt = new this.constructor();
    nt._cc = this._cc;

    return nt;
};

/**
 * Array-like .forEach() method.
 * Wrapper around .traverse() method.
 *
 * @param callback Function that is executed once per each element of binary search tree.
 *                 Function has three arguments:
 *                    * value The value of current element being processed in tree.
 *                    * key   The key of current element being processed in tree.
 *                    * three The binary search tree forEach was called upon.
 */
BinarySearchTree.prototype.forEach = function(callback) {
    var tree = this;

    return this.traverse(function(node) {
        callback(node.v, node.k, tree);
    });
};

/**
 * Array-like .every() method.
 * Wrapper around .traverse() method.
 *
 * @param callback Function that is executed once per each element of binary search tree.
 *                 Function has three arguments:
 *                    * value The value of current element being processed in tree.
 *                    * key   The key of current element being processed in tree.
 *                    * three The binary search tree forEach was called upon.
 */
BinarySearchTree.prototype.every = function(callback) {
    var tree = this;
    var res  = true;

    this.traverse(function(node) {
        if (!callback(node.v, node.k, tree)) {
            res  = false;
            return 'break';
        }
    });

    return res;
};


/**
 * Array-like .some() method.
 * Wrapper around .traverse() method.
 *
 * @param callback Function that is executed once per each element of binary search tree.
 *                 Function has three arguments:
 *                    * value The value of current element being processed in tree.
 *                    * key   The key of current element being processed in tree.
 *                    * three The binary search tree forEach was called upon.
 */
BinarySearchTree.prototype.some = function(callback) {
    var tree = this;
    var res  = false;

    this.traverse(function(node) {
        if (callback(node.v, node.k, tree)) {
            res  = true;
            return 'break';
        }
    });

    return res;
};

/**
 * Array-like .reduce() method.
 * Wrapper around .traverse() method.
 *
 * @param callback Function that is executed once per each element of binary search tree.
 *                 Function has three arguments:
 *                    * previousValue The value previously returned in the last invocation of the callback,
 *                                    or initialValue, if supplied
 *                    * currentValue  The value of current element being processed in tree.
 *                    * key           The key of current element being processed in tree.
 *                    * three          The binary search tree forEach was called upon.
 *
 * @param [initialValue] Object to use as the first argument to the first call of the callback.
 *
 * @returns Value return by last callback invocation.
 */
BinarySearchTree.prototype.reduce = function(callback, initialValue) {
    var tree = this;
    var res  = initialValue;

    this.traverse(function(node) {
        res = callback(res, node.v, node.k, tree);
    });

    return res;
};

/**
 * Array-like .reduceRight() method.
 * Wrapper around .traverse() method.
 *
 * @param callback Function that is executed once per each element of binary search tree.
 *                 Function has three arguments:
 *                    * previousValue The value previously returned in the last invocation of the callback,
 *                                    or initialValue, if supplied
 *                    * currentValue  The value of current element being processed in tree.
 *                    * key           The key of current element being processed in tree.
 *                    * three          The binary search tree forEach was called upon.
 *
 * @param [initialValue] Object to use as the first argument to the first call of the callback.
 *
 * @returns Value return by last callback invocation.
 */
BinarySearchTree.prototype.reduceRight = function(callback, initialValue) {
    var tree = this;
    var res  = initialValue;

    this.traverse(function(node) {
        res = callback(res, node.v, node.k, tree);
    }, true);

    return res;
};

BinarySearchTree.prototype.traverse = function(callback, ro) {
    var p;

    ro = ro || false; // Reverse Order of traversing

    var node  = this._root;

    var up    = false; // traversing is in UP state
    var im    = false; // traversing is In the Middle state


    while (node) {

        if (!up) {
            // pre

            if (ro ? node.r : node.l) {
                up   = false;
                im   = false;
                node = ro ? node.r : node.l;
                continue;
            }
        }

        if (!up || im) {
            if ('break' === callback(node)) {
                return;
            }

            if (ro ? node.l : node.r) {
                up   = false;
                im   = false;
                node = ro ? node.l : node.r;
                continue;
            }
        }

        // post


        up   = true;
        p    = node.p;
        im   = p && (node === (ro ? p.r : p.l ));
        node = p;
    }
};

/**
 * Comparison of two node keys
 *
 * @param k1
 * @param k2 Second node
 * @returns {Number} negative - if node1 "less then" node 2,
 *                   positive - if node1 "greater then" node2
 *                   0 - otherwise
 */
BinarySearchTree.prototype.compareKeys = function(k1, k2) {
    var cc  = this._cc;
    var res = cc && cc(k1, k2);
    var toString = Object.prototype.toString;

    if (typeof res !== 'undefined') {
        return toString.call(res) === '[object Number]' ? res : (res ? -1 : 1);
    }

    if (k1 === k2) {
        return 0;
    }
    return k1 > k2 ? 1 : -1;
};

/**
 * Search node in subtree specified by its root.
 * If root does not specified than current tree root is taken
 *
 * @param key   Key of searching node
 * @param root  Subtree root. By default current tree root is taken
 * @returns {Array} Array [searchResult, node] where
 *                      * searchResult - true if node was found
 *                      * node         - searched node if it was found, otherwise last checked node
 *
 * @protected
 */
BinarySearchTree.prototype._search = function(key, root) {
    var node = root || this._root, res;

    if (!node) {
        return [false, node];
    }

    while (res = this.compareKeys(key, node.k)) {
        if (res < 0) {
            if (!node.l) {
                return [false, node];
            }
            node = node.l;
        }
        else {
            if (!node.r) {
                return [false, node];
            }
            node = node.r;
        }
    }

    return [true, node];
};

/**
 * Links parent and child nodes
 *
 * @param parent
 * @param child
 *
 * @protected
 */
BinarySearchTree.prototype._linkNodes = function(parent, child) {
    child.p  = parent;

    var res = this.compareKeys(child.k, parent.k);

    if (res === 0) {
        throw new Error('Could not link parent and child nodes with equal keys!');
    }

    res < 0 ? parent.l = child : parent.r = child;
};

/**
 * Remove specified node
 *
 * @param node
 *
 * @protected
 */
BinarySearchTree.prototype._removeNode = function(node) {
    var parent = node.p;

    if (parent.l === node) {
        parent.l = null;
    }
    if (parent.r === node) {
        parent.r = null;
    }
};

/**
 * Gets min key node for specified subtree by its root
 * If root does not specified than current tree root is taken
 *
 * @param root Subtree root node
 * @returns Node with minimum key
 *
 * @protected
 */
BinarySearchTree.prototype._getMinNode = function(root) {
    var node = root || this._root;

    while (node.l) {
        node = node.l;
    }

    return node;
};

/**
 * Gets max key node for specified subtree by its root
 * If root does not specified than current tree root is taken
 *
 * @param   root Subtree root node
 * @returns Node with maximum key
 *
 * @protected
 */
BinarySearchTree.prototype._getMaxNode = function(root) {
    var node = root || this._root;

    while (node.r) {
        node = node.r;
    }

    return node;
};