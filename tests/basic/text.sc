var msg = "What is your name?";
Console.write(msg);
Console.read((name: ""){
    Console.write("Well hello there,", name);
});
/**
 * Expect:
 *
 * What is your name?
 *
 *  > (input becomes name)
 *
 * Well hello there, <name>
 **/
