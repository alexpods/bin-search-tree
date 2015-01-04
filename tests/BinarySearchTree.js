var BinarySearchTree = require('../src/BinarySearchTree');
var expect           = require('chai').expect;

describe('BinarySearchTree', function() {
    var tree;
    var dict = { key1: 'value 1', 1234: 5678, key2: 1234, 5678: 'value2', zz: 'hello', a: 'something else' };

    it('should create new binary search tree', function() {
        expect(new BinarySearchTree()).to.be.instanceof(BinarySearchTree);
    });

    it('should sets new value in tree', function() {
        var tree  = new BinarySearchTree();
        var key   = 'some key';
        var value = 'some value';

        expect(tree.set(key, value)).to.be.equal(tree);
        expect(tree.root).to.be.equal(value);
        expect(tree.rootKey).to.be.equal(key);
    });

    beforeEach(function() {
        tree = new BinarySearchTree();

        for (var prop in dict) {
            tree.set(prop, dict[prop]);
        }
    });

    it('should gets value from tree by key', function() {
        for (var prop in dict) {
            expect(tree.get(prop)).to.be.equal(dict[prop]);
        }
    });

    it('should throw an error if value does not exist for specified key', function() {
        expect(function() { tree.get('absent_key') }).to.throw(Error);
    });

    it('should check if specified value for specified key exists', function() {
        for (var prop in dict) {
            expect(tree.has(prop)).to.be.true;
        };

        expect(tree.has('absent_key')).to.be.false;
    });

    it('should remove value by its key', function() {
        expect(tree.has('key2')).to.be.true;
        expect(tree.remove('key2')).to.be.equal(dict['key2']);
        expect(tree.has('key2')).to.be.false;
    });

    it('should throw an error if value does not exist for specified key', function() {
        expect(function() { tree.remove('absent_key') }).to.throw(Error);
    });

    it('should gets value with minimal key of the tree', function() {
        expect(tree.min).to.be.equal(dict[1234]);
        expect(tree.minKey).to.be.equal('1234');
    });

    it('should gets value with maximal key of the tree', function() {
        expect(tree.max).to.be.equal(dict['zz']);
        expect(tree.maxKey).to.be.equal('zz');
    });

    it('should gets length of tree', function() {
        var tree2 = new BinarySearchTree();
        expect(tree2.length).to.be.equal(0);

        tree2.set('key', 'value');
        expect(tree2.length).to.be.equal(1);

        expect(tree.length).to.be.equal(6);
        tree.remove('key2');
        expect(tree.length).to.be.equal(5);
    })
});