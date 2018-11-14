/* Determine map type on first `set` operation. */
let associativeMap = require('./associativeMap.js');
let numericMap = require('./numericMap.js');

let number = /^\d+$/;

let handler = Object.freeze({
	get () {
		return undefined;
	},

	has () {
		return false;
	},

	set (target, prop, val) {
		if (number.test(prop)) {
			console.log("make NumericMap");
			return;
		}
		console.log("make AssociativeMap");
	},

	deleteProperty () {
		return false;
	},

	ownKeys () {
		return [];
	},

	getOwnPropertyDescriptor () {
		return undefined;
	}
});

return function () {
	return new Proxy(
		Object.create(null), 
		handler
	);
};