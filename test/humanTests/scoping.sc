let examples = [{
	let Foo = {
		protected b = "foo's";
		public getB = {
			return b;
		};
	};

	let Bar = {
		use Foo;
		b = "bar's";
	};

	let f = Foo();
	let b = Bar();
	//b.getB = f.getB;

	print(f.getB(), b.getB()); // foo's foo's
}, {
	let Foo = {
		print(a); // undefined
		public a = "Lexical Foo.a";
		print(a); // "Lexical Foo.a"
	};
	Foo.bind(global); // does nothing useful- binds a dummy function to global.
	Foo.a = "new a"; // sets property 'a' of a dummy function to 'new a'
	Foo.prototype.a = "new a";
	print(Foo.a); // "new a"
	let f = Foo();
	print(f); // [ a => "Lexical Foo.a" ];
	print(Foo.a); // "new a"
}, {
	let map1 = [
		a: "apple",
		b: [1,2,3]
	];
	let map2 = [
		c: "banana"
	];
	let Foo = {
		return [
			"public": map1,
			"protected": map2
		];
	};
	let Bar = {
		use Foo;
		public c = c;
	};
	let bar = Bar();
	map1.a = "antelope"; // does not affect bar- but does affect future instances of Bar.
	map1.b[1] = ""; // Maps are passed by reference, so this affects bar and future instances of Bar.
	map1.b += 4; // Same as map1.b = map1.b + 4; - which is pass-by-value, 
	             // so does not affect bar, but does affect future instances of Bar. 
	             // However, one level deeper would affect previous instances.
	             // For example, `departments.shipping.managers += "John Doe";`
	             // would not affect the reference to departments.shipping, and
	             // overwrite the reference to departments.shipping.managers- which
	             // would now refer to a Numeric Map with the same indices as before 
	             // but with "John Doe" added to the end.
	let baz = Bar();
	print(bar.a, bar.b, bar.c); // apple [1,"",3] banana
	print(baz.a, baz.b, baz.c); // antelope [1,"",3, 4] banana
}];

examples.call();
