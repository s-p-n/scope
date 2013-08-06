var Animal = (name: "") {
	protected move = (meters: 0) {
		Console.write(parent.name & " moved " & Text(meters) & "m.");
	};
};
var Snake = Scope.extend(Animal, {
	public move = {
		Console.write("Slithering...");
		parent.extended.move(5);
	};
});
/*
var Horse = Scope.extend(Animal, {
	public move = {
		Console.write("Galloping...");
		parent.extended.move(45);
	};
});
*/
var sam = Snake('Sammy the Python');
sam.move();
/*
var tom = Horse('Tommy the Palomino');
tom.move();
*/
/* @Expect:
Slithering...
Sammy the Python moved 5m.
Galloping...
Tommy the Palomino moved 45m.
*/