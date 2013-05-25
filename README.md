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
