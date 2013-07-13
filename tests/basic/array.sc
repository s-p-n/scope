var array = [a:1, b:2, c:3];
for (name : val in array):
    Console.write(name, "is", val);
end;

Console.write(array[`'b'`]);

//Console.write(name, val); // Runtime-Error! (undefined name/val)
Console.write("Say something and press enter..");
// Wait for user input, 
var data = Console.read((data:'') {
	// When user is finished with input, data is the result:
	if (data is ""):
		Console.write("You didn't say nothin :(");
    else:
    	Console.write("data:", data);
    end;
});

/**
 * Expect:
 *
a is 1
b is 2
c is 3
Say something and press enter..

You didn't say nothin :(


-- Or --

a is 1
b is 2
c is 3
Say something and press enter..
yo
data: yo
 **/
