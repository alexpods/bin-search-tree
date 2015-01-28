var BinarySearchTree = require('../src/Tree');
var Iterator = require('../src/Iterator');
var expect   = require('chai').expect;

describe('binary search tree iterator', function() {
    var tree;
    var dict = { key1: 'value 1', 1234: 5678, key2: 1234, 5678: 'value2', zz: 'hello', a: 'something else' };

    beforeEach(function() {
        tree = new BinarySearchTree();

        for (var prop in dict) {
            tree.set(prop, dict[prop]);
        }
    });

    it('should implement next() method', function() {
        var iterator = new Iterator(tree);
        var keys = Object.keys(dict);
        keys.sort();

        var i    = 0;

        do {
            var key  = keys[i++];
            var next = iterator.next();

            expect(next.value).to.be.equal(tree.get(key));

        } while (!next.done);

        expect(i-1).to.be.equal(tree.length);


        iterator = new Iterator(tree);

        if (global.Symbol) {
            i = 0;
            eval('for (var value of iterator) { \
                expect(value).to.be.equal(tree.get(keys[i++])); \
            }');

            expect(i).to.be.equal(tree.length);
        }
    });
});