// Setting a var is just like JS:
var foo = "Hello, ";

// Ask the user a question:
Console.write("What is your name?");

// Get a line of input:
Console.read((bar: ""){
	// waiting for the user to press <return>
	Console.write(foo & bar);
});

// The result of the program should read: "Hello, <user-input>"
// where <user-input> is the user's answer to: "What is your name?"

