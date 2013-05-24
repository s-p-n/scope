var msg = "What is your name?";
Console.write(msg);
var name = Console.read();
Console.write("Well hello there,", name);
/**
 * Expect:
 *
 * What is your name?
 *
 *  > (input becomes name)
 *
 * Well hello there, <name>
 **/
