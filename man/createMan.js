const Man = require('man-api');
const fs = require('fs');
const path = require('path');
const dateformat = require('dateformat');
let out = fs.createWriteStream(path.join(__dirname, 'arini.1'));

let man = new Man();
man.on('data', (str) => {
	out.write(str);
});
let packageJson = require('../package.json');
let version = packageJson.version;
let date = dateformat('yyyy-mm-dd')
man.header('arini', 1, date, version, "User Commands")
	.name('arini', 'Transpile or run arini programs.').

section('Synopsis').
	paragraph().
		bold("arini").
		write(" [").
		italic("options").
		write("]").
		italic("infile").
		write(" [").
		italic("-o outfile").
		write("]").
		write(" [").
		italic("arguments").
		write("]").
	subSection("options").
		write("Command-line options seperated by spaces. See Options.").
	subSection("infile").
		write("The name of the file to transpile or run.").
	subSection("outfile").
		write("The name of the file to transpile to- optional, and only useful when not running.").
	subSection("arguments").
		write("Arguments passed to the arini program, seperated by spaces.").

section('Description').
	write("This transpiler is intended to convert arini source code into executable JavaScript programs." +
		" For more information, the section ").
	italic("SEE ALSO").
	write(" is located at the bottom of this document.").

section('Options').
	write("Options are sorted in alphabetical order so they are easy to find for reference.").
	subSection("--background [boolean]").
		write("For use with servers and other services. Runs them in the background.").
	subSection("--force, -f [boolean]").
		write("Try to force operation on conflict.").
	subSection("--help [boolean]").
		write("Display general help, a list of commands, and references to documentation and other resources.").
	subSection("--outfile, -o [string]").
		write("Specify outfile location and filename.").
	subSection("--run, -r [boolean]").
		write("Do not write to outfile, instead compile and run the program immediately.").
	subSection("--silent, --quiet [boolean]").
		write("Output nothing. (Exit status may still be informative, but not recommended for debugging purposes)").
	subSection("--verbose, -v [boolean]").
		write("Output additional information for debugging.").
	subSection("--version [boolean]").
		write("Output version information and exit.").

section('Exit Status').
	subSection("0").
		write("Indicates a successful operation.").
	subSection("64").
		write("Malformed command-line options, flags, or arguments.").
	subSection("66").
		write("Input file cannot be opened, but not due to permission. Perhaps it doesn't exist?").
	subSection("70").
		write("Parser, Grammar, (syntax error), or anything relating to the arini transpiler. " +
			"This code is generally a result of a syntax error, but could be a bug in the transpiler.").
	subSection("73").
		write("Can't create user output file- but not due to permission. " +
			"Perhaps the path to the destination file doesn't exist?").
	subSection("77").
		write("Permission denied.").
	
section('Versions').
	write(`This Version: ${version}`).

section('Conforming To').
	write("This software strives to deliver a valid interpretation of the arini programming language " +
		"version 1 specification. However, this software is still under active development and does have " +
		"known incompatibilities with the specification. Any incompatibilities are considerred bugs, and " +
		"there is no guarentee that any programs which compile currently will compile under later versions " +
		"of this software.").
	paragraph().
		write("Please follow the specification when writing your programs, and if it appears this compiler " +
			"deviates from the specification in any way, please submit a bug report on github. (See ").
		italic("BUGS").
		write(").").
	paragraph().
		write("").

section('Bugs').
	paragraph().
		write(`Report bugs to: ${packageJson.bugs.url}`).

section('See Also').
	subSection("Github").
		write(packageJson.repository.url).
	subSection("Homepage").
		write(packageJson.homepage).
	subSection("npm").
		write("https://www.npmjs.com/package/" + packageJson.name);