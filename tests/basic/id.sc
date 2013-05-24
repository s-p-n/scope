use "number.sc" as foo;

Console.write("Is foo the number 10?", foo is 10);
Console.write("foo is " & Text(foo));

public bar = "hello, properties!";
var foo = "test";

Console.write("bar is " & bar);
Console.write("foo is now:", foo);

/**
 * Expect:
 *
 * Is foo the number 10? true
 * foo is 10
 * bar is hello, properties!
 * foo is now: test
 **/
