#!/usr/bin/env node

const inputFile = process.argv[2];

if (typeof inputFile === "undefined") {
	require('./interactive.js');
} else {
	const path = require('path');
	const fs = require('fs');
	const cwd = process.cwd();
	const file = path.join(cwd, inputFile);
	const runtime = require('../runtime/runtime.js');
	const Grammar = require('../grammar/grammar.js');

	async function setupParser() {
		console.log("setting up parser.");
		let p = await new Grammar(runtime);
		console.log("parser setup.");
		return p;
	}

	async function getFile() {
		console.log(`Looking up ${file}..`);
		if (!(await fs.existsSync(file))) {
			console.log(`Error: Cannot find ${file}`);
			process.exit(1);
		}
		console.log(`Found ${file}`);
		let contents = await fs.readFileSync(file, "utf8");
		console.log("Got file contents.");
		return contents; 
	}

	console.log("Reading file and setting up parser..");
	Promise.all([setupParser(), getFile()]).then(setup => {
		let [parser, code] = setup;
		console.log("Setup complete.");
		console.log("Executing file.");
		parser.parse(code);
		parser.eval();
		process.exit(0);
	});
}