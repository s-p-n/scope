let Foo = {
	public someXml = <someXml></someXml>;
	public someNumber = 42;
	public someSwitch = false;
	public someArray = [0, 1, 2, 3, 4, 5];
	public someString = "hello, world";
	public someMethod = {
		if(someSwitch, {
			for(someArray, (val:-1) {
				print(val);
			});
		});
	};
};

let foo = Foo();
foo.someSwitch = true;

print(foo);
return foo;
