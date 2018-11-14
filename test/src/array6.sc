// Pass-By-Reference Operators: '<&', '&>', and '[]='
let examples = [
	{


		// `id [ ] = expr` sequence: push 'expr' into id:numeric map. 
		let foo = [];
		foo[] = 'a';
		foo[] = 'b';
		foo[] = 'c';
		return foo; // [a,b,c]
	}, {


		// `<&` Operator: put (b) into (a)
		let foo = examples[0]();
		let bar = foo <& 'd';
		return [foo is bar, bar]; // [true, [a,b,c,d]]
	}, {


		// left-associative:
		let foo = [];
		foo <& 1 <& 2 <& 3;
		return foo; // [1,2,3]
	}, {


		// Maybe not what you'd expect.. 
		// `numeric:map[] + expr`:
		//    * shallow-clone numeric:map[], 
		//    * put expr into that copy, 
		//    * return the copy.
		let foo = examples[0]() + examples[2]();
		return foo; // [a,b,c,[1,2,3]]
	}
];
let results = examples.call();
print(results);
return results;
