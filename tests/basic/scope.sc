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

// Create an instance of foo
var foo = Foo();
Console.write("foo is an", Type(foo), "of Foo.");

Console.write("foo.baz is:", foo.getBaz());
/**
 * Expect:
 *
 * foo bar baz
 * foo is an instance of Foo.
 * foo.baz is: woohoo!
 **/
