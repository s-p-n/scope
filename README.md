scope
=====

Scope is a programming language designed to revolutionize web application development for both the back-end and front-end developer.

Installation:

    npm install scope-lang -g

Then procede to writing this test scope-file: (example.sc)

    // Setting a variable is just like JS:
    var foo = "Hello, ";

    // Ask the user a question:
    Console.write("What is your name?");

    // Get a line of input:
    var bar = Console.read();
    // waiting for the user to press <return>

    // The below line should read: "Hello, <user-input>"
    // where <user-input> is the user's answer to: "What is your name?"
    Console.write(foo & bar);

Usage:

    $ scope example.sc && ./example.js

Possible Expected Result:

    What is your name?

     > Tim

    Hello, Tim
