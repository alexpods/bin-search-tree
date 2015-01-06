Binary search tree (under development)
======================================

##Overview##

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

##Installation##

As always: go to your package folder and run:

```sh
npm i ---save bin-search-tree
```

This will installl latest `bin-search-tree` package and add it to `dependencies` of your `package.json` file.

##Usage##

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


