private Foo = {
	private bar = "Hello, World";
	public getBar = {
		return parent.bar;
	};
};
var foo = Foo();
Console.write("Expect:", "Hello, World");
Console.write("Test:", foo.getBar());