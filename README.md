#Overview#

This package is base high-performance realization of **binary search tree**. Saying "base" I mean it not contains any balancing logic. There are different balancing algorithms such as ***AVL tree***, ***Red-Black tree***, ***Splay tree*** and so on... You can implement your own realization of balanced binary search tree based on this package or use one of the next ready modules:

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

/* Creation of binary search tree */

// Using default key comparison logic (key1 < key2):
var tree1 = new BinarySearchTree(); 

// Some custom comparison logic with boolean value as result:
var tree2 = new BinarySearchTree(function(key1, key2) { return key1 < key2 });

// Some custom comparison logic with number value as resul:
var tree3 = new BinarySearchTree(function(key1, key2) { 
    return ((key1 < key2) && -1) || ((key1 > key2) && 1) || 0;
});

/* Setting data to tree */

// Keys can be enithing
tree.set('key1', 'value1').set('key2', 'value2'); // string keys
tree.set(1234,   'value1').set(2345,   'value2'); // number keys
tree.set({a:10}, 'value1').set({b:20}, 'value2'); // object keys
tree.set([1,2],  'value1').set({c:40}, 'value2'); // mixing keys with different types

/* Getting data from tree */

// Returns value if such exists for specified key, or `undefined` otherwise
var value1 = tree.get('key1');
var value2 = tree.get('key2');
var value3 = tree.get({a:10});
var value4 = tree.get(123);

/* Checkint data existance by key */

if (tree.has('key2')) { /* data exists */ } else { /* data does not exists */ }
if (tree.has(123))    { /* data exists */ } else { /* data does not exists */ }
if (tree.has([3,4])   { /* data exists */ } else { /* data does not exists */ }

/* Removing data from binary search tree */

// Returns `true` if value was successfully deleted, or `false` otherwise
var isDeleted = tree.delete('key1');
var isDeleted = tree.delete(123);
var isDeleted = tree.delete([1,2]);

/* Tree traversal: functional array methods */

// By default "in order" from left traversing type
tree.forEach(function(value, key, tree) { console.log(value, key) });

// "pre-order" from right traversing type
tree.forEach('pre:right', function(value, key, tree) { console.log(value, key) });

// "in-order" from left traversing type (default type)
tree.forEach('in:left', function(value, key, tree) { console.log(value, key) });

// "post-order" from right traversing type
tree.forEach('post:right', function(value, key, tree) { console.log(value, key) });

// "level-order" from left traversing type
tree.forEach('level', function(value, key, tree) { console.log(value, key) });

// array-like 'some()' method with "in-order" from right traversing type
var hasSomeValue = tree.some('in:right', function(value, key, tree)   { return value === 10 });

// array-like 'every()' method with "level-order" from left traversing type
var hasAllValues = tree.every('level:left', function(value, key, tree)  { return value === 'hello' });

// array-like 'reduce()' method with "pre-order" form left traversing type
var sumAllValues = tree.reduce('pre:left', function(prev, value, key, tree) { return prev + value }, 0);

/* Tree traversal: Iterators (ES6 support) */

for (let value of tree) { console.log(value) }
for (let value of tree.values()) { console.log(value) }
for (let key   of tree.keys())   { console.log(key)   }
for (let [key, value] of tree.entries()) { console.log(key, value) }
```

#API#

- [Common (Map methods)](#common-map-methods) 
    - [.get()](#get)
    - [.set()](#set)
    - [.has()](#has)
    - [.delete()](#delete)

- [Functional (Array methods)](#functional-array-methods)
    - [.forEach()](#foreach)
    - [.every()](#every)
    - [.some()](#some)
    - [.reduce()](#reduce)
    - [.reduceRight()](#reduceright)

- [Iterators (ES6 support)](#iterators-es6-support)
    - [Symbol.iterator](#symboliterator)
    - [.keys()](#keys)
    - [.values()](#values)
    - [.entries()](#entries)

##Common (Map methods)##

###.get()###

Gets the value by provided key

```js
var value = tree.get(key);
```

- `key`: The key of the value to get from tree.

**Returns** searched value, or `undefined` if value does not exists for specified key.

```js
var v1 = tree.get('some_key');
var v2 = tree.get(14123);
var v3 = tree.get(someobject);
```


###.set()###

Sets the value for the key into the tree.

```js
var tree = tree.set(key, value);
```

- `key`: The key of the node to add to the tree.
- `value`: The value of the node to add to the tree.

**Returns** the tree for chaining purpose.

```js
tree.set(325, 'hello').set(80.34, 'goodby').set('key3', 'here again');
```


###.has()###

Checks whether value exists for specified key.

```js
var isExists = tree.has(key);
```

- `key`: The key of the value to test for presence.

**Returns** `true` is value exists, `false` - otherwise.

```js
var isZeroExists = tree.has(0);
var isCatExists  = tree.has('cat');
var isBoobsExists = tree.has('boobs');
```


###.delete()###

Deletes value specified by key from the tree.

```js
var wasDeleted = tree.delete(key);
```

- `key`: The key of the value to delete from the tree.

**Returns** `true` - if value was successfully deleted from the tree, `false` - if value does not exists for specified key.

```js
var numberKeyWasDeleted = tree.delete(1234);
var stringKeyWasDeleted = tree.delete('some_string');
```



##Functional (Array methods)##

###.forEach()###

Executes provieded function once per each node of the tree.
Direction of tree traversion: from the min key to the max key.
You will be able to change direction in the future versions of the library.

```js
tree.forEach([travType,] callback);
```

- `travType`: Traversing type. Possible values:
    - *"In-order"* left traversing: `"in"`, `"in:l"`, `"in:left"`.
    - *"In-order"* right traversing: `"in:r"`, `"in:right"`.
    - *"Pre-order"* left traversing: `"pre"`, `"pre:l"`, `"pre:left"`.
    - *"Pre-order"* right traversing: `"pre:r"`, `"pre:right"`.
    - *"Post-order"* left traversing: `"post"`, `"post:l"`, `"post:left"`.
    - *"Post-order"* right traversing: `"post:r"`, `"post:right"`.
    - *"Level-order"* left traversing: `"level"`, `"level:l"`, `"level:left"`.
    - *"Level-order"* right traversing: `"level:r"`, `"level:right"`.
- `callback`: Function to execute once per each node of the tree. It has following arguments:
    - `value`: Value of the current node.
    - `key`:   Key of the current node.
    - `tree`:  Tree is being processed.

```js
tree.forEach(function(value, key, tree) {
    console.log(key, value);
});
```


###.every()###

Tests whether all nodes of the tree pass the test implemented by the provided function.
Tree traversion is stopped on the first node that failes the test.
Direction of tree traversion: from the min key to the max key.
You will be able to change direction in the future versions of the library.

```js
var result = test.every([travType,] callback);
```

- `travType`: Traversing type. Possible values:
    - *"In-order"* left traversing: `"in"`, `"in:l"`, `"in:left"`.
    - *"In-order"* right traversing: `"in:r"`, `"in:right"`.
    - *"Pre-order"* left traversing: `"pre"`, `"pre:l"`, `"pre:left"`.
    - *"Pre-order"* right traversing: `"pre:r"`, `"pre:right"`.
    - *"Post-order"* left traversing: `"post"`, `"post:l"`, `"post:left"`.
    - *"Post-order"* right traversing: `"post:r"`, `"post:right"`.
    - *"Level-order"* left traversing: `"level"`, `"level:l"`, `"level:left"`.
    - *"Level-order"* right traversing: `"level:r"`, `"level:right"`.
- `callback`: Function to test each node of the tree. Node passes the test if this function returns `true` value (or value that can be interpreted as `true`). Otherwise node failes, and traversing is interrupted. It has following arguments:
    - `value`: Value of the current node.
    - `key`:   Key of the current node.
    - `tree`:  Tree is being processed.

**Returns** `true` if all nodes pass the test. Otherwise - `false`

```js
var isAllPositiver = tree.every(function(value, key, tree) {
    return value >= 0;
});
```


###.some()###

Tests whether at least one of the tree nodes pass the test implemented by the provided function.
Tree traversion is stopped on the first node that passes the test.
Direction of tree traversion: from the min key to the max key.
You will be able to change direction in the future versions of the library.

```js
var result = test.some([travType,] callback);
```

- `travType`: Traversing type. Possible values:
    - *"In-order"* left traversing: `"in"`, `"in:l"`, `"in:left"`.
    - *"In-order"* right traversing: `"in:r"`, `"in:right"`.
    - *"Pre-order"* left traversing: `"pre"`, `"pre:l"`, `"pre:left"`.
    - *"Pre-order"* right traversing: `"pre:r"`, `"pre:right"`.
    - *"Post-order"* left traversing: `"post"`, `"post:l"`, `"post:left"`.
    - *"Post-order"* right traversing: `"post:r"`, `"post:right"`.
    - *"Level-order"* left traversing: `"level"`, `"level:l"`, `"level:left"`.
    - *"Level-order"* right traversing: `"level:r"`, `"level:right"`.
- `callback`: Function to test each node of the tree. Node passes the test if this function returns `true` value (or value that can be interpreted as `true`). Otherwise node failes, and traversing is interrupted. It has following arguments:
    - `value`: Value of the current node.
    - `key`:   Key of the current node.
    - `tree`:  Tree is being processed.

**Returns** `true` if at least one of nodes passes the test. Otherwise - `false`

```js
var hasZero = tree.some(function(value, key, tree) {
    return value = 0;
});
```

###.reduce()###

Applies provided function against accumulator and each node of the tree.
Direction of tree traversion: from the min key to the max key.
You will be able to change direction in the future versions of the library.

```js
var result = test.reduce([travType,] callback [, initialValue]);
```

- `travType`: Traversing type. Possible values:
    - *"In-order"* left traversing: `"in"`, `"in:l"`, `"in:left"`.
    - *"In-order"* right traversing: `"in:r"`, `"in:right"`.
    - *"Pre-order"* left traversing: `"pre"`, `"pre:l"`, `"pre:left"`.
    - *"Pre-order"* right traversing: `"pre:r"`, `"pre:right"`.
    - *"Post-order"* left traversing: `"post"`, `"post:l"`, `"post:left"`.
    - *"Post-order"* right traversing: `"post:r"`, `"post:right"`.
    - *"Level-order"* left traversing: `"level"`, `"level:l"`, `"level:left"`.
    - *"Level-order"* right traversing: `"level:r"`, `"level:right"`.
- `callback`: Function executed on each node ot the tree. Returns new accumulator value for the next invokation. It has following arguments:
    - `accumulator`: Value previously returned by last invokation of the `callback` or `initialValue` if this is first `calback` invokation. 
    - `value`: Value of the current node.
    - `key`:   Key of the current node.
    - `tree`:  Tree is being processed.
- `initialValue` (Optional): Value to use as first argument of the first `callback` invokation. 

**Returns** value returned by the last invokation of the `callback`.

```js
var sum = tree.reduce(function(accumulator, value, key, tree) {
    return accumulator + value;
});
```


##Iterators (ES6 support)##

All methods bellow returns iterators conforming to [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol#The_.22iterator.22_protocol)

###Symbol.iterator###

Realizes iterator interfaces for binary search tree.
Makes it possible to use the tree in `for of` loop.

```js
var valuesIterator = tree[Symbol.iterator]();
```

**Returns** Iterator for binary search tree values (see [.values()](#values) method bellow).

```js
for (let value of tree) {
    console.log(value);
}
```

###.keys()###

Creates iterator for binary search tree keys.

```js
var keysIterator = tree.keys();
```

**Returns** Iterator for binary search tree keys.

```js
for (let key of tree.keys()) {
    console.log(key);
}
```


###.values()###

Creates iterator for binary search tree keys.

```js
var valuesIterator = tree.values();
```

**Returns** Iterator for binary search tree values.

```js
for (let value of tree.values()) {
    console.log(value);
}
```


###.entries()###

Creates iterator for binary search tree key/value pairs.

```js
var entriesIterator = tree.entries();
```

**Returns** Iterator for binary search tree key/values paris.

```js
for (let [key, value] of tree.entries()) {
    console.log(key, value);
}
```
