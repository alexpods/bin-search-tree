var Benchmark = require('benchmark');
var BinarySearchTree = require('../src/BinarySearchTree');

var hash = {};
var dict = Object.create(null);
var map  = new Map();
var tree = new BinarySearchTree();
var array = [];


for (var i = 0; i < 1000000; ++i) {
    var key = Math.floor(Math.random()*10000000);
    var val = Math.floor(Math.random()*10000000)

    if (typeof hash[key] !== 'undefined') {
        continue;
    }
    if (i > 500 && !tryToGet) {
        var tryToGet = key;
    }

    hash[key]   = val;
    dict[key]   = val;
    map.set(key,  val);
    tree.set(key, val);
    array.push(key);
}

new Benchmark.Suite()
    .add('Tree', function() {
        var someVal = tree.get(tryToGet);
        someVal += 2;
    })
    .add('Hash', function() {
        var someVal = hash[tryToGet];
        someVal += 2;
    })
    .add('Dict', function() {
        var someVal = dict[tryToGet];
        someVal += 2;
    })
    .add('Map', function() {
        var someVal = map.get(tryToGet);
        someVal += 2;
    })
    .add('Array', function() {
        var someVal = array[array.indexOf(tryToGet)];
        someVal += 2;
    })
    .on('complete', function() {
        console.log(this[0].toString());
        console.log(this[1].toString());
        console.log(this[2].toString());
        console.log(this[3].toString());
        console.log(this[4].toString());

        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    .run();