const parser = require('./parser.js');
const setState = require('./setState.js');

class Grammar extends parser.Parser {
	constructor (runtime={}) {
		super();
		setState(this, runtime);
	}
}

module.exports = Grammar;