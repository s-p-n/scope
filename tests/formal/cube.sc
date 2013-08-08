/** Coffee:
square = (x) -> x * x
cube   = (x) -> square(x) * x

console.log cube 5
**/
// Scope:
var square = (x:0) {
	return x * x;
};
var cube = (x:0) {
	return square(x) * x;
};
Console.write("Expect:", 125);
Console.write(cube(5));