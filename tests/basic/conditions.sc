use "number.sc" as foo;

Console.write(
    "foo is 10?",
    if (foo is 10): "yes"; else:"no";end
);

/**
 * Expect:
 *
 * foo is 10? yes
 **/
