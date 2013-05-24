// anon-scope:
(some:"", args:'', here:"") {
    Console.write(some, args, here);
} ("foo", "bar", "baz");

// Scope with properties:
var Foo = {
    private baz = "woohoo!";
    public bar = "testing properties..";
    public getBaz = {
        return parent.baz;
    };
};

// Scope with return:
var bar = {
    Console.write("What is your name?");
    return "Name is " + Console.read();
};

// Create an instance of foo
var foo = Foo();
Console.write("foo is an", Type(foo), "of Foo.");

Console.write("foo.baz is:", foo.getBaz());

var baz = [1,2,3];
foo.hack = {
    return this; // public instance
};

Console.write(foo.hack());
/**
 * Expect:
 *
 * foo bar baz
 * foo is an instance of Foo.
 * foo.baz is: woohoo!
 * { bar: 'testing properties..',
 *  getBaz: [Function],
 *  hack: [Function]
 * }
 **/
