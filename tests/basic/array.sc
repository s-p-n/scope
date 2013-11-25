var array = [a:1, b:2, c:3];
for (name : val in array):
    print(name, "is", val);
end;

print(array['b']);

//Console.write(name, val); // Runtime-Error! (undefined name/val)
print("Say something and press enter..");

// Wait for user input,
var data = Console.read((data:'') {
    // When user is finished with input, data is the result:
    if (data is ""):
        print("You didn't say nothin :(");
    else:
        print("data:", data);
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
