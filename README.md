# arini
A programming language for web developers. Arini becomes Node.js.

## Philosophy
A scope is any code inside `{` and `}`, and the idea of arini is, that's all you need. A scope can be a simple block of code, a function/method, a class, an interface, or any encapsolation you need. If you write code like I do, you might start out by writing a simple bit of code, then refactor some of that code into a function, then maybe later even create a class or two with several methods. The arini programming language makes migrating and merging paradigms easy by utilizing a single scope type.

As a bonus, using a single first-class scope type makes arini easy to learn and remember.

## Getting Started
### Option 1: Global Install
>Arini can be installed with npm:
>
	npm i -g arini
>
>Arini uses the package `source-map-support` as an attempt to make runtime-errors debuggable.
>Scope also has a Tag type (as in XML tag), to make front-end web development easier. So `hyperscript` is also required to run your transpiled Scope programs.
>	
	npm i source-map-support hyperscript
>
>Once you have all that installed, you can *compile* your Scope code into JavaScript.
>	
	arini myProgram.ari

### Option 2: Dev Dependency
>Scope can be installed as a dev dependency:
>
	npm i --save-dev scope-lang
>
>The above will install the runtime requirements automatically. However, scope is not a global command with this setup. So to use the scope command, you must open up your `package.json` file and add scope to the list of scripts:
>
	"scripts": {
		"scope": "scope"
	}
>
>Once that is all setup, you can compile your scope programs using `npm run scope`:
>
	npm run scope myProgram.sc
>
>With the dev-dependency setup, you will not be able to use the `man-page` for scope (`man scope`), and you also won't be able to use any options like `--help`, `--version` or any other useful options. So it's recommended that Scope be installed globally if full functionality is desired.

## What does Scope look like?
In Scope, we have expressions, and lists of expressions. Control code (what you find in the root of a scope program or in every scope) is a list of expressions seperated by semi-colons. There are other parts of the language where there are lists of expressions- and those lists *technically aren't expressions.* So, what that really means, is everything in Scope is an expression or list of 0 or more expressions. Not every **list of expressions** looks the same. For example, arguments (from the scope type) and attributes (from the tag type) are lists of expressions, but are not seperated by semicolons. We'll get more into that later, but it makes sense when you see it, I promise :)


### Primitive Types in Scope:
* A **boolean** is the token `true` or `false`.
```
let foo = true or false; // true
let bar = true and false; // false
```

* A **string** can be text surrounded by `""`, or `''`, or ``.
```
"I am a string.";
'I am
a multiline
string';
```
* A **number** is simply a number like JavaScript's Number.
```
543;
1.25;
```
* An **array** is a map of items, in order. Arrays, if not named, use indices just like in most programming languages. Scope also supports named arrays, and retains their order. 
```
let foo = [
	question: "What is the answer to the universe and everything?",
	answer: 42
];
print(foo["question"]); // "What is the..."
print(foo.answer); // 42 

let bar = ["cow", "pig", "sheep"];
each(bar, (val:"") {
	print(val);
});
/*
cow
pig
sheep
*/
```
	
* A **tag** is basically an XML tag- kinda like HTML. A Tag has a name and may contain attributes or children. Unlike XML/HTML, Tag children in Scope can be of any type or expression. Because of the first-class nature of Tag children, **each child of a Tag must be followed by a semi-colon**- just like everywhere else in the language. 
```	
let someVariable = "I'm some variable";
let someSwitch = true;

let myComponent = <someTag with="attributes">
    "I am some inner text.";
    <nestedTag>
        "This is a nested string in a nested tag.";
        someVariable;
        if(someSwitch, {
            return <switch on=true />;
        }, {
            return <switch on=false />;
        });
    </nestedTag>;
</someTag>;
print(myComponent.childNodes[1].childNodes[2].on); 
//true
```
* A **scope** is kind of like a function from other languages, but has support for `public` and `protected` properties. If nothing is returned, a scope does not return `void` when invoked, it instead **returns the public properties available.** When extended, the public and protected properties are made available to the scope that extends it. `private` can be thought of as a synonym for `let`, but there are subtle differences. In essence, `private` and `let` are stored exactly the same way, just in slightly different places. They both work anywhere in the language exactly the same way- so I suggest to pick one and stick with it.
```
let someClass = {
	protected foo = "it's a foo!";
	public bar = (name: "no name") {
		return "Hello, " + name;
	};
};

let someObj = someClass();
debug(someObj);
/*
Map(
  bar => Scope([
    (string) name: "no name"]))
*/

let someExtender = extend(someClass, {
	public printFoo = {
		print(foo);
	};
});

someExtender().printFoo(); // "It's a foo!"
```
**Arguments** in a scope must always have a default value. Default values help with debugging. Defaults also naturally allow all arguments to be optional. Instead of the `=` operator, arguments are assigned like names in Arrays- with the `:` operator. 

### Statements?
If you notice, there is currently only one statements in Scope (that is, return). And even the only *statement* returns a value and can be used anywhere any other expression can be used (though may not work as expected), so is thus an expression. `for` is a scope, `if` is a scope, and even `extend` is a scope. Every scope returns a value. If nothing is returned and there are no public properties, an empty `Map` is returned. Arrays and scopes both return `Maps`, which are like Objects from other languages, but retain their order. 

*Certainty and simplicity are important virtues for this language.*

For further information on primitive types, visit the wiki.

## Scope is extensible.
A scope may return several things. One thing you might see we're missing is the `promise`. It is true that there is no special syntax for a `promise` type, but Scope is extensible, and `promises` and other features may be borrowed from our parent JavaScript through extensions.

For more information on extensions, visit the wiki.

### Base Library
Scope comes with a base library necessary for basic programming. Things you know and love from other languages, like `if`, `for`, `print` and other things are included in the base library without specific inclusion.





