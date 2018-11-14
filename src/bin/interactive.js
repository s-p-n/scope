let readline = require("readline");
let runtime = require('../runtime/runtime.js');
let Grammar = require('../grammar/grammar.js');
let program = "";
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: `Program:\n${program}\n> `
});
rl.prompt();

rl.on('line', line => {
	program += line;
	runProgram();
	rl.prompt();
}).on('close', () => {
	console.log("Have a great day!");
	process.exit(0);
});

let p = new Grammar(runtime);

function runProgram () {
	let jsList = p.parse(program);
	console.log(p.eval());
	program = "";
}