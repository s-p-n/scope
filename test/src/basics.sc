// declare `examples` as a numeric map.
let examples = [];

// create new index and assign to this scope.
examples[] = {

	// Assignment:
	public number = 42;
	let opposite = true;

	// Conditions:
	number = if(opposite, -42);

	// Functions:
	let square = (x: 0) {return x * x;};

	// Arrays:
	public list = [1, 2, 3, 4, 5];
	print(list);

	// Maps:
	let math = [
		root: Math.sqrt,
		square: square,
		cube: (x: 0) {return x * square(x);}
	];

	// Rest Parameters:
	//let race = (winner, ...runners) {
	//	print(winner, runners);
	//};

	// Existence:
	if(elvis, {print("I knew it!");});

	// Array comprehension
	public cubes = each(list, math.cube);
	print(cubes);

	return [number, list, cubes];
};

examples[] = {
	let [gold, silver, rest] = ["unknown"] * 3;
	print(gold, silver, rest);
};

let result = examples.call();
print(result);
return result;