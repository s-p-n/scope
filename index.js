const ScopeParser = require("./lib/ScopeParser.js");
const fs = require('fs');
const path = require('path');

let scope = new ScopeParser();
let srcDir = path.join(__dirname, "scopeSrc");
let libDir = path.join(__dirname, "scopeLib"); 

let srcFiles = fs.readdirSync(srcDir);

srcFiles.forEach((f) => {
	let srcFilename = path.join(srcDir, f);
	let libFilename = path.join(libDir, f.replace(".sc", ".js"));
	let astFilename = path.join(libDir, f.replace(".sc", ".json"));
	let srcCode = fs.readFileSync(srcFilename, "utf8");
	let translation = scope.translate(srcCode);
	let libAst = JSON.stringify(translation.ast, null, "  ");
	fs.writeFileSync(astFilename, libAst);
	fs.writeFileSync(libFilename, translation.js);
	console.log(`Translated file ${srcFilename} to ${libFilename}`);
});
