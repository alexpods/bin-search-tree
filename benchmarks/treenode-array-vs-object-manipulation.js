var Benchmark = require('benchmark');

function Node(k, v, p, l, r) {
    this.k = k;
    this.v = v;
    this.p = p;
    this.l = l;
    this.r = r;
}

var array = {
    parent: ['some_key',    1234123412,         null, null, null],
    left:   ['left_child',  'asdfoasjdfpasdjf', null, null, null],
    right:  ['right_child', 'qwerqwerqwerqwwq', null, null, null]
};

var object = {
    parent: {
        key:    'some_key',
        value:  1234123412,
        parent: null,
        left:   null,
        right:  null
    },
    left: {
        key: 'left child',
        value: 'asdfoasjdfpasdjf',
        parent: null,
        left:   null,
        right:  null
    },
    right: {
        key:   'right child',
        value: 'qwerqwerqwerqwwq',
        parent: null,
        left:   null,
        right:  null
    }
};

var objectS = {
    parent: { k:'som e_key',      v:  1234123412,         p: null, l:   null, r:  null },
    left:   { k: 'left child',    v: 'asdfoasjdfpasdjf',  p: null, l:   null, r:  null },
    right:  { k:   'right child', v: 'qwerqwerqwerqwwq',  p: null, l:   null, r:  null }
};

var objectC = {
    parent: new Node('some_key',    1234123412,         null, null, null),
    left:   new Node('left_child',  'asdfoasjdfpasdjf', null, null, null),
    right:  new Node('right_child', 'qwerqwerqwerqwwq', null, null, null)
};

new Benchmark.Suite()
    .add('Object node manipulation', function() {
        var temp      = object.parent;
        object.parent = object.left;
        object.left   = object.right;
        object.right  = temp;

        object.parent.parent = null;
        object.parent.left  = object.left;
        object.parent.right = object.right;


        object.left.parent  = object.parent;
        object.left.left    = null;
        object.left.right   = null;

        object.right.parent = object.parent;
        object.right.left   = null;
        object.right.right  = null;
    })
    .add('Object node manipulation - small key', function() {
        var temp       = objectS.parent;
        objectS.parent = objectS.left;
        objectS.left   = objectS.right;
        objectS.right  = temp;

        objectS.parent.p = null;
        objectS.parent.l = objectS.left;
        objectS.parent.r = objectS.right;


        objectS.left.p  = objectS.parent;
        objectS.left.l    = null;
        objectS.left.r   = null;

        objectS.right.p = objectS.parent;
        objectS.right.l   = null;
        objectS.right.r  = null;
    })
    .add('Class node manipulation', function() {
        var temp       = objectC.parent;
        objectC.parent = objectC.left;
        objectC.left   = objectC.right;
        objectC.right  = temp;

        objectC.parent.p = null;
        objectC.parent.l = objectC.left;
        objectC.parent.r = objectC.right;


        objectC.left.p   = objectC.parent;
        objectC.left.l   = null;
        objectC.left.r   = null;

        objectC.right.p  = objectC.parent;
        objectC.right.l  = null;
        objectC.right.r  = null;
    })
    .add('Array node manipulation', function() {
        var temp        = array.parent;
        array.parent    = array.left;
        array.left      = array.right;
        array.right     = temp;

        array.parent[2] = null;
        array.parent[3] = array.left;
        array.parent[4] = array.right;

        array.left[2]   = array.parent;
        array.left[3]   = null;
        array.left[4]   = null;

        array.right[2]  = array.parent;
        array.right[3]  = null;
        array.right[4]  = null;
    })
    .on('complete', function() {
        console.log(this[0].toString());
        console.log(this[1].toString());
        console.log(this[2].toString());
        console.log(this[3].toString());

        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    .run();