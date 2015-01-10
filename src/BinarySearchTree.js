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

    if (node === this._root) {
        this._root = this._removeNode(node);
    }
    else {
        this._removeNode(node);
    }
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
 * Wrapper around ._traverse() method.
 *
 * @param callback Function that is executed once per each element of binary search tree.
 *                 Function has three arguments:
 *                    * value The value of current element being processed in tree.
 *                    * key   The key of current element being processed in tree.
 *                    * three The binary search tree forEach was called upon.
 */
BinarySearchTree.prototype.forEach = function(callback) {
    var tree = this;

    return this._traverse(function(node) {
        callback(node.v, node.k, tree);
    });
};

/**
 * Array-like .every() method.
 * Wrapper around ._traverse() method.
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

    this._traverse(function(node) {
        if (!callback(node.v, node.k, tree)) {
            res  = false;
            return 'break';
        }
    });

    return res;
};


/**
 * Array-like .some() method.
 * Wrapper around ._traverse() method.
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

    this._traverse(function(node) {
        if (callback(node.v, node.k, tree)) {
            res  = true;
            return 'break';
        }
    });

    return res;
};

/**
 * Array-like .reduce() method.
 * Wrapper around ._traverse() method.
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

    this._traverse(function(node) {
        res = callback(res, node.v, node.k, tree);
    });

    return res;
};

/**
 * Array-like .reduceRight() method.
 * Wrapper around ._traverse() method.
 *
 * @param callback Function that will be executed once per each element of binary search tree.
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

    this._traverse(function(node) {
        res = callback(res, node.v, node.k, tree);
    }, true);

    return res;
};

/**
 * Array-like .map() method.
 * Wrapper around ._traverse() method.
 *
 * @param callback Function that will be executed once per each element of binary search tree.
 *                 Function has three arguments:
 *                    * value   The value of current element being processed in tree.
 *                    * key     he key of current element being processed in tree.
 *                    * three   The binary search tree forEach was called upon.
 *
 * @returns {BinarySearchTree} New tree with results of provided function on every element of original tree.
 */
BinarySearchTree.prototype.map = function(callback) {
    var tree = this;

    return this._produce(function(node) {
        return { k: node.k, v: callback(node.v, node.k, tree), p: null, l: null, r: null, m: null };
    });
};

/**
 * Array-like .filter() method.
 * Wrapper around ._traverse() method.
 *
 * @param callback Function that will be executed once per each element of binary search tree.
 *                 Function has three arguments:
 *                    * value   The value of current element being processed in tree.
 *                    * key     he key of current element being processed in tree.
 *                    * three   The binary search tree forEach was called upon.
 *
 * @returns {BinarySearchTree} New tree with elements filtered by provided function.
 */
BinarySearchTree.prototype.filter = function(callback) {
    var tree    = this;
    var removed = [];

    var newTree = this._produce(function(node) {
        var key  = node.k;
        var val  = node.v;
        var newn = { k: key, v: val, p: null, l: null, r: null, m: null };

        if (!callback(val, key, tree)) {
            removed.push(newn);
        }

        return newn;
    });

    var len = newTree._length;

    for (var i = 0, ii = removed.length; i < ii; ++i) {
        var rem = removed[i];

        if (newTree._root === rem) {
            newTree._root = newTree._removeNode(rem);
        }
        else {
            newTree._removeNode(rem);
        }
        --len;
    }
    newTree._length = len;

    return newTree;
};

/**
 * @TODO: Refactor logic with dirs
 *
 * @param callback
 * @returns {BinarySearchTree}
 * @private
 */
BinarySearchTree.prototype._produce = function(callback) {
    var tree = this;
    var root = null;
    var last = null;
    var ldir = '';
    var stack = [];
    var ndirs = [];
    var length = 0;

    this._traverse(function(node, dirs) {
        ++length;

        var newn  = callback(node);

        if (!root && !node.p) {
            root = newn;
        }

        var ii = dirs.length - 1;

        if (!last) {
            last = newn;
            return;
        }

        for (var i = 0; i < ii; ++i) {
            var dir  = dirs[i];
            var ld   = ldir[ldir.length - 1];

            if (('L' === dir && 'l' === ld) || ('R' === dir && 'r' === ld)) {
                ldir = ldir.slice(0, -1);
            }

            if ('L' === dir || 'R' === dir) {
                if (!last.p) {
                    stack.push(last);
                    last = newn;
                    if (ldir) {
                        ndirs.push(ldir);
                    }
                    ldir = dirs.slice(i);
                    return;
                }
                last = last.p;
                continue;
            }

            if ('l' === dir || 'r' === dir) {
                if (!last[dir]) {
                    stack.push(last);
                    last = newn;
                    if (ldir) {
                        ndirs.push(ldir);
                    }
                    ldir = dirs.slice(i);
                    return;
                }
                last = last[dir];
                continue;
            }
        }

        switch (dirs[ii]) {

            case 'L':
                if ('l' === ldir[ldir.length - 1]) {
                    ldir = ldir.slice(0, -1);
                }
                if (1 === ldir.length) {
                    ('L' === ldir || 'R' === ldir)
                        ? tree._linkNodes(newn, stack.pop(), ldir)
                        : tree._linkNodes(stack.pop(), newn, ldir);

                    ldir = ndirs.length ? ndirs.pop() : '';
                }
                tree._linkNodes(newn, last, 'l');
                break;

            case 'R':
                if ('r' === ldir[ldir.length - 1]) {
                    ldir = ldir.slice(0, -1);
                }
                if (1 === ldir.length) {
                    ('L' === ldir || 'R' === ldir)
                        ? tree._linkNodes(newn, stack.pop(), ldir)
                        : tree._linkNodes(stack.pop(), newn, ldir);

                    ldir = ndirs.length ? ndirs.pop() : '';
                }
                tree._linkNodes(newn, last, 'r');
                break;

            case 'l':
                if (stack.length) {
                    ldir += 'l';
                }
                tree._linkNodes(last, newn, 'l');
                break;

            case 'r':
                if (stack.length) {
                    ldir += 'r';
                }
                tree._linkNodes(last, newn, 'r');
                break;
        }

        last = newn;
    });

    if (!root) {
        throw new Error('Could not map tree: root node was not found!');
    }

    tree = tree.clone();
    tree._root   = root;
    tree._length = length;

    return tree;
};

BinarySearchTree.prototype._traverse = function(callback, ro) {
    var p;

    ro = ro || false; // Reverse Order of traversing

    var node = this._root;
    var dirs = '';

    var up = false; // traversing is in UP state
    var im = false; // traversing is In the Middle state


    while (node) {

        if (!up) {
            // pre

            if (ro ? node.r : node.l) {
                if (ro) {
                    node = node.r;
                    if (dirs !== null) {
                        dirs += 'r';
                    }
                }
                else {
                    node = node.l;
                    if (dirs !== null) {
                        dirs += 'l';
                    }
                }
                up   = false;
                im   = false;
                continue;
            }
        }

        if (!up || im) {
            if ('break' === callback(node, dirs)) {
                return;
            }
            dirs = '';

            if (ro ? node.l : node.r) {
                if (ro) {
                    node = node.l;
                    dirs += 'l';
                }
                else {
                    node = node.r;
                    dirs += 'r';
                }
                up   = false;
                im   = false;
                continue;
            }
        }

        // post

        up   = true;
        p    = node.p;
        im   = p && (node === (ro ? p.r : p.l ));
        if (p) {
            dirs += node === p.r  ? 'R' : 'L';
        }
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
 * @param [type]
 *
 * @protected
 */
BinarySearchTree.prototype._linkNodes = function(parent, child, type) {
    child.p  = parent;

    var res = this.compareKeys(child.k, parent.k);

    if (res === 0) {
        throw new Error('Could not link parent and child nodes with equal keys!');
    }

    if (typeof type !== 'undefined') {
        switch (type.toLowerCase()) {
            case 'l':
            case 'left':  parent.l = child; break;
            case 'r':
            case 'right': parent.r = child; break;
            default:
                throw new Error('Incorrect link nodes type!');
        }
    }
    else {
        res < 0 ? parent.l = child : parent.r = child;
    }
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
    var right  = node.l;
    var left   = node.r;

    var plType = parent && (parent.l === node ? 'left' : 'right'); // parent link type

    if (!left && !right) {
        if (parent) {
            plType === 'left' ? parent.l = null : parent.r = null;
            node.p = null;
        }
        return parent;
    }


    if (!left) {
        if (parent) {
            this._linkNodes(parent, right, plType);
            node.p = null;
        }
        else {
            right.p = null;
        }
        node.r = null;

        return parent || right;
    }

    if (!right) {
        if (parent) {
            this._linkNodes(parent, left, plType);
            node.p = null;
        }
        else {
            left.p = null;
        }
        node.l = null;

        return parent || left;
    }

    this._linkNodes(this._getMaxNode(left), right, 'right');

    if (parent) {
        this._linkNodes(parent, left, plType);
        node.p = null;
    }
    else {
        left.p = null;
    }

    node.l = null;
    node.r = null;

    return parent || left;
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

    var o={};
    var children = ['b' /* some known properties of o */]

    children.forEach(function(child) {
        var childValue = {};
        Object.defineProperty(o, 'b', {
            get: function() { return childValue; },
            set: function(newValue) {
                func();

                Object.keys(newValue).forEach(function(key) {
                    var value = newValue[key];
                    Object.defineProperty(childValue, key, {
                        get: function() { return value },
                        set: function(newValue) {
                            func();
                            value = newValue;
                        }
                    })
                });
            }
        });
    });
    function func()
    {
        console.log(o)
    }