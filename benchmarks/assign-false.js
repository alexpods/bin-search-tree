var Benchmark = require('benchmark');

var v = false;

new Benchmark.Suite()
    .add('direct assign', function() {
        v = false;

        v = true;

        v = false;
    })
    .add('check on true', function() {
        if (v) { v = false }

        v = true;

        if (v) { v = false }
    })
    .on('complete', function() {
        console.log(this[0].toString());
        console.log(this[1].toString());

        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    .run();