#scope#
Scope is a programming language designed to revolutionize web application development for both the back-end and front-end developer.

####Pre-installation:####
Note: You do not need to install node-gyp, only Python2.7 and a C++ compiler than works with node-gyp. NPM includes node-gyp so we don't have to. ;)

(From node-gyp: https://github.com/TooTallNate/node-gyp)
> You will also need to install:
>
>  * On Unix:
>    * `python` (`v2.7` recommended, `v3.x.x` is __*not*__ supported)
>    * `make`
>    * A proper C/C++ compiler toolchain, like GCC
>  * On Windows:
>    * [Python][windows-python] ([`v2.7.3`][windows-python-v2.7.3] recommended, `v3.x.x` is __*not*__ supported)
>    * Windows XP/Vista/7:
>      * Microsoft Visual Studio C++ 2010 ([Express][msvc2010] version works well)
>      * For 64-bit builds of node and native modules you will _**also**_ need the [Windows 7 64-bit SDK][win7sdk]
>        * If the install fails, try uninstalling any C++ 2010 x64&x86 Redistributable that you have installed first.
>      * If you get errors that the 64-bit compilers are not installed you may also need the [compiler update for the Windows SDK 7.1]
>    * Windows 7/8:
>      * Microsoft Visual Studio C++ 2012 for Windows Desktop ([Express][msvc2012] version works well)
>
> Note that OS X is just a flavour of Unix and so needs `python`, `make`, and C/C++.
> An easy way to obtain these is to install XCode from Apple,
> and then use it to install the command line tools (under Preferences -> Downloads).


------
####Installation:####

    npm install scope-lang -g

------
####Creating Your first Scope Program (example.sc)####

    var foo = "Hello, ";

    // Ask the user a question:
    Console.write("What is your name?");

    // Get a line of input:
    var bar = Console.read();
    
    // concatenate (combine) foo and bar:
    var baz = foo & bar;
    
    // print to the console:
    Console.write(baz);

------
####Compile and run:####

    $ scope example.sc
    $ ./example.js

------
####Possible Result:####

    What is your name?
    
     > Tim
     
    Hello, Tim

------
## Scope 0.0.1 Specifications ##

------
####Comments####
The program is to ignore everything from where the comment begins until it is terminated. Comments are intended to help the programmer maintain code.

#####Comment Rules#####
Line Comment:
- `//` terminated by a line-break

Block Comment:
- `/*` terminated by `*/`

#####Examples:#####
The result of `a` is `"jam"` because `var a = "foo";` is ignored due to the line-comments `//`.

    var a = "jam";
    // var a = "foo";
    Console.write(a);

Result:
    
    "jam"


`b()` is not defined or printed because of the `block-comment:` `/* */`

    /*
    var b = {
        return "this scope is ignored!";
    };
    Console.write( b() );
    */
    
Result: (nothing)

------
####Boolean####
Booleans are either true or false. They are frequently used by conditional-statements in computer-programs, in turn giving humans a way to tell machines how to think/react based on data.
These are the possible values for boolean (case-sensitive):
- true
- false

#####Example:#####

    var a = true;
    
    var b = if (a):
        "red";
    else:
        "blue";
    end;
    
    Console.write(b, "pill");

Result:

    "red pill"

------
####Number####
This much is true about scope from this painful-for-JavaScript-coders-to-hear yet informative article on numbers in JavaScript:
http://www.hunlock.com/blogs/The_Complete_Javascript_Number_Reference

Essentially, the good parts we saw are these:
> Numbers can be either integer or decimal, negative or positive, or 0.
> Javascript is not a typed language so it should come as no surprise that there are no specific integer or floating-point types, no short, long, byte, double, or any other type other languages use to define numbers. All numbers in Javascript are 64bit (8 bytes) floating point numbers which yields an effective range of 5e-324 (negative) to 1.7976931348623157e+308 (positive).
> 
> This reference will cover Javascript numeric literals and objects as well as the default Javascript Operators which manipulate those numbers.
>
> #####Precision#####
> All numbers in Javascript are 64bit (8 bytes) floating point numbers which yields an effective range of 5e-324 (negative) to 1.7976931348623157e+308 (positive) at the time this article was written (this may eventually change to 128 bits in the future as 64 bit processors become commonplace and the ECMA standards evolve).
>
> Integers are considered reliable (numbers without a period or exponent notation) to 15 digits (9e15) [1]. Floating point numbers are considered only as reliable as possible and no more! This is an especially important concept to understand for currency manipulation as 0.06 + 0.01 resolves to 0.06999999999999999 instead of 0.07.

You can make a number in scope just like this. When JavaScript returns infinity or NaN, or tries to implicitly concatenate them as strings-- Scope results in a runtime-error displaying "what happened" instead- so that tracking bugs is easier to do.

#####Example:#####

    var n = 8 + 120 * 2 / !(5);
    Console.write(n);

Result:
    
    10

------
####Text####
some text
- a
- e
- i

#####Example:#####

    a
    e
    i
    o
    u

------
####Array####
some text
- a
- e
- i

#####Example:#####

    a
    e
    i
    o
    u

------
####Scope####
some text
- a
- e
- i

#####Example:#####

    a
    e
    i
    o
    u

------
####Instance####
some text
- a
- e
- i

#####Example:#####

    a
    e
    i
    o
    u
