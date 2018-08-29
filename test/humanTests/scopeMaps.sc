let foo = {
	let result = ["public": [a: 1, b: 2, c: 3]];
	return result;
};
let a = "root a";
let bar = {
	use foo;
};

let baz = ['a', 'b', 'c'];

let f = foo();
let b = bar();

dereference(baz, 0);

print(f);
print(b);
print(baz);