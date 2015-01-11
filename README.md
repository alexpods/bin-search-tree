Binary search tree (under development)
======================================

#Overview#

This package is base fast realization of **binary search tree**. Saying "base" I mean it not contains any balancing logic. There are different balancing algorithms such as ***AVL tree***, ***Red-Black tree***, ***Splay tree*** and so on... You can implement your own realization of balanced binary search tree based on this package or use one of the next ready modules:

* [Red-Black Tree](https://github.com/alexpods/node-red-black-tree) *(currently in development)*
* [AVL Tree](https://github.com/alexpods/node-avl-tree) *(currently in development)*
* [Splay Tree](https://github.com/alexpods/node-splay-tree) *(currently in development)*

If you don't know what is *binary search tree* look at the next resources. 

* [Wikipedia](https://en.wikipedia.org/wiki/Binary_tree)
* [Visualization of binary search tree](https://www.cs.usfca.edu/~galles/visualization/BST.html)
* [YouTube: Short, simple explanation](http://www.youtube.com/watch?v=pYT9F8_LFTM)
* [YouTube: MIT Lecture](http://www.youtube.com/watch?v=pYT9F8_LFTM)
* [YouTube: Berkeley Lecture](http://www.youtube.com/watch?v=V_3BM0ykITM)

#Installation#

As always: go to your package folder and run:

```sh
npm i ---save bin-search-tree
```

This will installl latest `bin-search-tree` package and add it to `dependencies` of your `package.json` file.

#Usage#

```js
var BinarySearchTree = require('bin-search-tree');

// Creation of binary search tree
var tree = new BinarySearchTree(function(key1, key2) {
    // Some key comparison logic
    return key1 < key2;
});

// Setting data
tree.set('key1', 'data1');
tree.set('key2', 'data2');

// Retrieving data
var value2 = tree.get('key1');

// Checking key on existance
if (tree.has('key2')) {
   // do something
}

// Removing data from binary search tree
var removedData = tree.remove('key1');

try {
  tree.remove('absent key');
}
catch (error) {
    // You cannot remove data with absent key
    console.log(error);
}
```

#API#

- [Functional methods](#functional-methods)
    - [.forEach()](#forEach)
    - [.every()](#every)
    - [.some()](#some)
    - [.reduce()](#reduce)
    - [.reduceRight()](#reduceRight)
    - [.map()](#map)
    - [.filter()](#filter)


##Functional methods##

###.forEach()###

Executes provieded function once per each node of the three.
Direction of tree traversion: from min key to max key.
You will be able to change direction in the future versions of the library.

```js
tree.forEach(callback);
```

- **callback**: Function executed once per each node of the tree. It has following arguments:
    - *value*: Value of the current node.
    - *key*:   Key of the current node.
    - *tree*:  Tree is being processed.

```js
tree.forEach(function(value, key, tree) {
    console.log(key, value);
});
```


###.every()###

Tests whether all nodes of the tree pass the test implemented by the provided function.
Tree traversing is stopped on first node that failes the test.
Direction of tree traversion: from min key to max key.
You will be able to change direction in the future versions of the library.

```js
var result = test.every(callback);
```

- **callback**: Function to test each node of the tree. Node passes the test if this function returns `true` value (or value that can be interpreted as `true`). Otherwise node failes, and traversing is interrupted. It has following arguments:
    - *value*: Value of the current node.
    - *key*:   Key of the current node.
    - *tree*:  Tree is being processed.

**Returns** `true` if all nodes pass the test. Otherwise - `false`

```js
var isAllPositiver = tree.every(function(value, key, tree) {
    return value >= 0;
});
```


###.some()###

Tests whether some nodes of the tree pass the test implemented by the provided function.
Tree traversing is stopped on first node that passes the test.
Direction of tree traversion: from min key to max key.
You will be able to change direction in the future versions of the library.

```js
var result = test.some(callback);
```

- **callback**: Function to test each node of the tree. Node passes the test if this function returns `true` value (or value that can be interpreted as `true`). Otherwise node failes, and traversing is interrupted. It has following arguments:
    - *value*: Value of the current node.
    - *key*:   Key of the current node.
    - *tree*:  Tree is being processed.

**Returns** `true` if at least one of nodes passes the test. Otherwise - `false`

```js
var hasZero = tree.some(function(value, key, tree) {
    return value = 0;
});
```

###.reduce()###

Applies provided function against accumulator and each node of the tree.
Direction of tree traversion: from min key to max key.
You will be able to change direction in the future versions of the library.

```js
var result = test.reduce(callback [, initialValue]);
```

- **callback**: Function executed on each node ot the tre. Returns new value of accumulator for the next node. It has following arguments:
    - *accumulator*: Value previously returned by last invokation of the `callback` or `initialValue` if this is first `calback` invokation. 
    - *value*: Value of the current node.
    - *key*:   Key of the current node.
    - *tree*:  Tree is being processed.
- **initialValue** (Optional): Value to use as first argument of the first `callback` invokation. 

**Returns** value returned by the last invokation of the `callback`.

```js
var sum = tree.reduce(function(accumulator, value, key, tree) {
    return accumulator + value;
});
```

###.reduceRight()###

Applies provided function against accumulator and each node of the tree.
Direction of tree traversion: from max key to max min.
You will be able to change direction in the future versions of the library.

```js
var result = test.reduce(callback [, initialValue]);
```

- **callback**: Function executed on each node ot the tre. Returns new value of accumulator for the next node. It has following arguments:
    - *accumulator*: Value previously returned by last invokation of the `callback` or `initialValue` if this is first `calback` invokation. 
    - *value*: Value of the current node.
    - *key*:   Key of the current node.
    - *tree*:  Tree is being processed.
- **initialValue** (Optional): Value to use as first argument of the first `callback` invokation. 

**Returns** value returned by the last invokation of the `callback`.

```js
var product = tree.reduceRight(function(accumulator, value, key, tree) {
    return accumulator*value;
});
```


###.map()###

Creates new tree based on values returned by invokation of provided function for each node.
Direction of tree traversion: from min key to max max.
You will be able to change direction in the future versions of the library.

```js
var newTree = test.map(callback);
```

- **callback**: Function executed on each node ot the tre. Returns value for node of the new tree. It has following arguments:
    - *value*: Value of the current node.
    - *key*:   Key of the current node.
    - *tree*:  Tree is being processed.

**Returns** new tree based on values returned by invokations of the `callback`

```js
var doubleValueTree = tree.map(function(value, key, tree) {
    return value*2;
});
```


###.filter()###

Creates new tree with all values passed the test implemented by provided function.
Direction of tree traversion: from min key to max max.
You will be able to change direction in the future versions of the library.

```js
var newTree = test.filter(callback);
```

- **callback**: Function to test each node of the tree. If it returns `true` (or value that can be interpreted as `true` than this node will be kept. It has following arguments:
    - *value*: Value of the current node.
    - *key*:   Key of the current node.
    - *tree*:  Tree is being processed.

**Returns** new tree with all values passed the test implemented by `callback`

```js
var negativeTree = tree.map(function(value, key, tree) {
    return value < 0;
});
```
