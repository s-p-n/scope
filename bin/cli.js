#!/usr/bin/env node

const meow = require('meow');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
let verbose = false;
let silent = false;
const debug = (verboseOnly, ...msg) => {
	// verboseOnly is for extra information.
	if (silent) {
		return;
	}
	if (verboseOnly) {
		if (verbose) {
			console.info(...msg);
		}
		return;
	}
	console.info(...msg);
}
const flags = {

	background: {
		type: 'boolean',
		default: false,
		description: 'For use with servers and other services. Runs them in the background.'
	},
	force: {
		type: 'boolean',
		alias: 'f',
		default: false,
		description: 'Try to force operation on conflict.'
	},
	help: {
		type: 'boolean',
		default: false,
		description: 'Display this help and exit.'
	},
	outfile: {
		type: 'string',
		alias: 'o',
		default: "",
		description: 'Specify outfile location and filename.'
	},
	run: {
		type: 'boolean',
		alias: 'r',
		default: false,
		description: 'Do not write to outfile, instead compile and run the program immediately.'
	},
	silent: {
		type: 'boolean',
		alias: 'quiet',
		default: false,
		description: 'Output nothing.'
	},
	verbose: {
		type: 'boolean',
		alias: 'v',
		default: false,
		description: 'Output additional information for debugging.'
	},
	version: {
		type: 'boolean',
		default: false,
		description: 'Output version information and exit.'
	}
};

const commands = {};

function breakLong(text, spaces=0, max=60) {
	let out = '';
	let spaceTxt = '';
	let needsBreak = true;
	for (let i = 0; i < spaces; i += 1) {
		spaceTxt += ' ';
	}
	for (let i = 0; i < text.length; i += 1) {
		if (i % (max - spaces) === 0) {
			needsBreak = true;
		}
		if (needsBreak && /\s/.test(text[i])) {
			out += `\n${spaceTxt}`;
			needsBreak = false;
			continue;
		}
		if (i === 0) {
			out += `\n${spaceTxt}`;
			needsBreak = false;
		}
		out += text[i];
	}
	return out;
} 

function listArgs(args, dashes=true) {
	let out = "";
	let keys = Object.keys(args).sort();
	let sd = '-';
	let dd = '--';
	if (!dashes) {
		sd = '';
		dd = '';
	}
	keys.forEach((arg, i) => {
		let opts = args[arg];
		out += `\n  ${dd + chalk.bold(arg)}`;
		if (opts.alias) {
			if (opts.alias.length === 1) {
				out += `, ${sd + chalk.bold(opts.alias)}`;
			} else {
				out += `, ${dd + chalk.bold(opts.alias)}`;
			}
		}
		out += ` [${opts.type}]`
		out += `\n${breakLong(opts.description, 2)}\n-------------------------------------------`;
		if (i !== keys.length - 1) {
			out += '\n';
		}
	});
	return out;
}

const cli = meow(`
${chalk.bold('Usage')}
  ${chalk.bold('$')} scope [options] infile [-o outfile] [arguments]

  The most basic use, compiling a file, would look like this:
  ${chalk.bold('$')} scope filename.sc

  That command will create the file "filename.js", which you
  can later run: (with bash)
  ${chalk.bold('$')} ./filename.js

  On windows, you would run with 'node.cmd':
  ${chalk.bold('$')} node.cmd .\\filename.js

  You may want to simply execute the scope file when testing.
  You may use the ${chalk.bold('-r')}|${chalk.bold('--run')} flag.
  ${chalk.bold('$')} scope -r filename.sc

${chalk.bold('Commands')}
  ${listArgs(commands, false)}

${chalk.bold('Flags')}
  ${listArgs(flags)}

You can see the man page 'man scope' for a full list of commands and arguments.
For more information, see https://github.com/s-p-n/scope
`, {
	flags: flags,
	description: `scope: A programming language for developing web applications.`
});

let output = "";
if (cli.flags.help) {
	cli.showHelp(2);
} else if (cli.flags.version) {
	cli.showVersion(2);
} else if (cli.flags.silent) {
	silent = true;
} else if (cli.flags.verbose) {
	verbose = true;
	debug(1, "verbose output activated.");
}

debug(1, cli.flags);
debug(1, cli.input);

if (cli.input.length === 0) {
	debug(0, "No input file specified.");
	process.exit(66);
} 

(function() {
	const ScopeParser = require("../lib/ScopeParser.js");
	const parser = new ScopeParser();
	let rawFilename = cli.input[0];
	let inputFile = path.join(process.cwd(), rawFilename);
	if (!fs.existsSync(inputFile)) {
		debug(0, `Cannot find file: '${inputFile}'`);
		debug(1, `Raw filename: '${rawFilename}'`);
		process.exit(66);
	}
	let outputFile = path.join(
		path.dirname(inputFile), 
		path.basename(rawFilename).replace(/.sc$/i, '') + '.js'
	);
	let mapFile = path.join(
		path.dirname(inputFile),
		path.basename(rawFilename).replace(/.sc$/i, '') + '.js.map'
	);
	debug(1, `Reading source file '${inputFile}'`);
	fs.readFile(inputFile, "utf8", (err, data) => {
		let code;
		if (err) {
			let code = 66;
			if (err.code === "EACCES") {
				code = 77;
			}
			debug(0, `Cannot read file '${inputFile}' {code: ${code}}`);
			debug(1, err);
			process.exit(code);
		}
		debug(1, 'Got file. Attempting to parse..');
		try {
			let translation = parser.translate(data, inputFile, mapFile);
			let map = translation.map;
			code = translation.code;
			debug(1, "Finished parsing & writing code. Writing to file..");
			fs.writeFile(outputFile, code, (err) => {
				if (err) {
					let code = 73;
					if (err.code === "EACCES") {
						code = 77;
					}
					debug(0, `Cannot write to file '${outputFile}' {code: ${code}}`);
					debug(1, err);
					process.exit(code);
				}
				debug(0, `Compiled to '${outputFile}'`);
				debug(1, `Attempting to mark as executable..`);
				fs.chmod(outputFile, 0o765, (err) => {
					if (err) {
						debug(0, "Created file, but couldn't mark as executable.");
						process.exit(77);
					}
					debug(1, "Successfully marked as executable.");
					process.exit(0);
				});
			});
			fs.writeFile(mapFile, map, (err) => {
				if (err) {
					debug(0, `WARN: Cannot write to map file '${mapFile}'`);
				}
			});
		} catch (e) {
			debug(0, e);
			process.exit(70);
		}
	});
}());