for (name:val in [a:1, b:2, c:3]):
    Console.write(name,"is",val);
end;

Console.write(name, val);

var data = Console.read((data:''){
    Console.write("data:", data);
});

/**
 * Expect:
 *
 * a is 1
 * b is 2
 * c is 3
 * Error! (undefined variable 'name') line 5
 **/
