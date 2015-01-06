var Benchmark = require('benchmark');
var object    = { key1: 12345, key2: 2345, 1234: 56 };

new Benchmark.Suite()
  .add('in operator', function() {
    if ('key1' in object) {} else {}
    if (1234 in object)   {} else {}
    if ('key3' in object) {} else {}
    if (5678 in object)   {} else {}
  })
  .add('brackets operator', function() {
    if (object['key1'])  {} else {}
    if (object[1234])    {} else {}
    if (object['key3'])  {} else {}
    if (object[5678])    {} else {}
  })
  .add('dot operator', function() {
    if (object.key1)  {} else {}
    if (object[1234]) {} else {} // imposable to use dot, so use brackets
    if (object.key3)  {} else {}
    if (object[5678]) {} else {}
  })
  .add('typeof operator', function() {
    if (typeof object['key1'] !== 'undefined') {} else {}
    if (typeof object[1234]   !== 'undefined') {} else {}
    if (typeof object['key3'] !== 'undefined') {} else {}
    if (typeof object[5678]   !== 'undefined') {} else {}
  })
  .add('undefined check', function() {
    if (object['key1'] !== undefined) {} else {}
    if (object[1234]   !== undefined) {} else {}
    if (object['key3'] !== undefined) {} else {}
    if (object[5678]   !== undefined) {} else {}
  })
  .add('.hasOwnProperty method', function() {
    if (object.hasOwnProperty('key1')) {} else {}
    if (object.hasOwnProperty(1234))   {} else {}
    if (object.hasOwnProperty('key3')) {} else {}
    if (object.hasOwnProperty(5678))   {} else {}
  })
  .on('complete', function() {
    console.log(this[0].toString());
    console.log(this[1].toString());
    console.log(this[2].toString());
    console.log(this[3].toString());
    console.log(this[4].toString());
    console.log(this[5].toString());

    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  })
  .run();