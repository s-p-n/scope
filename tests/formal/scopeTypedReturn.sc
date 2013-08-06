/** Purpose:
 * Explore overloading in Scope using 'return'.
 * The idea is that a Scope may return a value for every type.
 * The idea is similar to that of 'toString' in other languages, but
    more complete as all primitive and user-defined types are
    supported.
**/


/// Let's explore a syntax proposal, shall we?

var Five = {
    return "Text": 'Five';
    return "Number": 5;
};

/// When you check the type of any value,
/// the result is an array of types.
//Console.write(Type(Five)); // ['Scope']
//Console.write(Type(Five())); // ['Text', 'Number', 'Object']

/// Scope types are strict in the sense that you may not use
/// addition on strings, and you may not concat a number.
/// Similarly, you may not compare numbers with strings to produce
/// a true result. The following, perhaps unexpectedly, results in false:
if ('5' isnt 5): // false; cannot reliably compare Text and Number.
    Console.write("A.) Good");
else:
	Console.write("A.) Bad");
end;

var Five = {
	return "Text": "Five";
	return 5;
};

var Four = {
	return "Text": "Four";
	return 4;
};

//Console.write(Type(Four()), Type(Five()));

if (Four() is Five()):
    Console.write("B.) Bad");
else:
	Console.write("B.) Good");
end;

if (4 is Four()):
    Console.write("C.) Good");
else:
	Console.write("C.) Bad");
end;

if (Type(Four()) has "Number"):
    Console.write("D.) Good");
else:
	Console.write("D.) Bad");
end;

if (3 + Four() is 7):
	Console.write("E.) Good");
else:
	Console.write("E.) Bad");
end;

if (Type(Four()) is Type(Five())):
	Console.write("F.) Good");
else:
	Console.write("F.) Bad");
end;


if (Compatible(Five(), 123)):
	Console.write("G.) Good");
else:
	Console.write("G.) Bad");
end;

if (Compatible(123, Four())):
	Console.write("H.) Bad");
else:
	Console.write("H.) Good");
end;