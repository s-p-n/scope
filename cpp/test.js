console.read = require('./build/Release/Console').read;

console.log("What's your name, bitch?");
var name = console.read();
console.log("Sup,", name + "?");
