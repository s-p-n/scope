use "number.sc" as foo;

Console.write(
    "Is foo 10?",
    if (foo is 10): 
    	"Yes"; 
    else: 
    	"No, foo is " & Text(foo) & ".";
    end
);

Console.write("Type of foo:", Type(foo));

/**
 * Expect:
 *
 * foo is 10? yes
 **/
