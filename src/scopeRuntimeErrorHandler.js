process.on("uncaughtException", err => {
	//let sourceMap = require(scope.sourceMapFilename);
	console.log("uncaught exception at runtime");
	console.error(err);
	process.exit(1);
});
