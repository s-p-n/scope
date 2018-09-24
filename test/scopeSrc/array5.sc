let foo = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
let bar = foo[1:4]; // b,c,d
let baz = foo[1:]; // b-g
let qux = foo[:-1]; // a-f
let fin = foo[:]; // a-g
let gut = bar[:]; // b,c,d
gut[1:3] = 'boo'; // b,boo,boo
return [foo, bar, baz, qux, fin, gut];