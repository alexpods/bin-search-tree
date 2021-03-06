var Benchmark = require('benchmark');

function Node(k, v, p, l, r) {
    this.key    = k;
    this.value  = v;
    this.parent = p;
    this.left   = l;
    this.right  = r;
}

new Benchmark.Suite()
    .add('Object node creation', function() {
        var parent = {
            key:    'some_key',
            value:  1234123412,
            parent: null,
            left:   null,
            right:  null
        };

        var left = {
            key: 'left child',
            value: 'asdfoasjdfpasdjf',
            parent: null,
            left:   null,
            right:  null
        };

        var right = {
            key:   'right child',
            value: 'qwerqwerqwerqwwq',
            parent: null,
            left:   null,
            right:  null
        };

        parent.left  = left;
        parent.right = right;
        left.parent  = parent;
        right.parent = parent;
    })
    .add('Array node creation', function() {
        var parent = ['some_key',    1234123412,         null, null, null];
        var left   = ['left_child',  'asdfoasjdfpasdjf', null, null, null];
        var right  = ['right_child', 'qwerqwerqwerqwwq', null, null, null];

        parent[3] = left;
        parent[4] = right;
        left[2]   = parent;
        right[2]  = parent;
    })
    .add('Class node creation', function() {
        var parent = new Node('some_key',    1234123412,         null, null, null);
        var left   = new Node('left_child',  'asdfoasjdfpasdjf', null, null, null);
        var right  = new Node('right_child', 'qwerqwerqwerqwwq', null, null, null);

        parent[3] = left;
        parent[4] = right;
        left[2]   = parent;
        right[2]  = parent;
    })
    .on('complete', function() {
        console.log(this[0].toString());
        console.log(this[1].toString());
        console.log(this[2].toString());

        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    .run();