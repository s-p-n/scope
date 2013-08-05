var Greeter = (name: "") {
	public salute = {
		Console.write("Hello " & parent.name & "!");
	};
};
var g = Greeter("world");
Console.write("Expect:", "Hello world!");
Console.write("Test:");
g.salute();