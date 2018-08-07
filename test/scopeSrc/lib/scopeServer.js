let http = require('http');

module.exports = (args) => {
	let server;
	if (args[0] && typeof args[0] === "function") {
		server = args[0];
	} else {
		throw new Error("scopeServer expects first argument to be a scope");
	}
};