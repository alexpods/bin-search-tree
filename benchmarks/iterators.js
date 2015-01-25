"use strict";

var Benchmark = require('benchmark');
var BinSearchTree    = require('../dist/Tree');

var hash = Object.create(null);
var binSearchTree1 = new BinSearchTree(function(k1, k2) { return k1 < k2 });
var binSearchTree2 = new BinSearchTree(function(k1, k2) { return k1 < k2 });
var binSearchTree3 = new BinSearchTree(function(k1, k2) { return k1 < k2 });
var binSearchTree4 = new BinSearchTree(function(k1, k2) { return k1 < k2 });


for (var i = 0; i < 10000; ++i) {
    var key = Math.floor(Math.random()* 10000);
    var val = Math.random();

    if (hash[val]) {
        continue;
    }

    binSearchTree1.set(key, val);
    binSearchTree2.set(key, val);
    binSearchTree3.set(key, val);
    binSearchTree4.set(key, val);
}

var count1, count2, count3;

binSearchTree2._traverse = traverse;


new Benchmark.Suite()
    .add('binary-search-tree new iterator', function() {
        count1 = 0;
        var entries = binSearchTree1.entries();

        for (var entry of entries) {
            count1 += 1;
        }
    })
    .add('binary-search-tree old iterator', function() {
        count2 = 0;
        var entries = binSearchTree2.entries();
        entries.next = next;

        for (var entry of entries) {
            count2 += 1;
        }
    })
    .add('binary-search-tree forEach', function() {
        count3 = 0;

        binSearchTree3.forEach(function() {
            count3 += 1;
        });
    })
    .add('binary-search-tree iterator do/while', function() {
        count3 = 0;
        var entries = binSearchTree4.entries();

        do {
            var result = entries.next();
            count3 += 1;
        } while (!result.done);
    })
    .on('complete', function() {
        console.log(this[0].toString(), count1);
        console.log(this[1].toString(), count2);
        console.log(this[2].toString(), count2);
        console.log(this[3].toString(), count2);

        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    .on('error', function() {
        console.log(arguments);
    })
    .run();

function traverse(params, callback) {
    var p;

    if (typeof params === 'function') {
        callback = params;
        params   = {};
    }

    var ro   = params.reverse || false; // Reverse Order of traversing
    var node = params.from    || this._root;
    var stps = params.steps   || Infinity;

    var dirs = '';

    var up = params._up || false; // traversing is in UP state
    var im = params._im || false; // traversing is In the Middle state
    var ff = params._ff || false; // returns full form if callback does not exists


    while (stps && node) {

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
            if (node !== params.from) {
                --stps;
                if (callback) {
                    if ('break' === callback(node, dirs)) {
                        return;
                    }
                    dirs = '';
                }
                else if (0 === stps) {
                    return ff ? [node, dirs, up, im] : null;
                }
            }

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

    if (!callback) {
        return null;
    }
}

function next() {
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
}

function BinarySearchTreeIteratorResult(value, done) {
    this.value = value;
    this.done  = done;
}