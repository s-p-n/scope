let intRegexp = /^-?\d+$/;

let handler = Object.freeze({
	get (target, prop, receiver) {
		if (intRegexp.test(prop)) {
			prop = parseInt(prop);
		}
		if (target.has(prop)) {
			return target.get(prop);
		}
	},

	has (target, prop) {
		if (intRegexp.test(prop)) {
			prop = parseInt(prop);
		}
		return target.has(prop);
	},

	set (target, prop, val) {
		if (intRegexp.test(prop)) {
			prop = parseInt(prop);
		}
		return target.set(prop, val);
	},

	deleteProperty (target, prop) {
		if (intRegexp.test(prop)) {
			prop = parseInt(prop);
		}
		return target.delete(prop);
	},

	ownKeys (target) {
		return [...target.keys()];
	},

	getOwnPropertyDescriptor (target, prop) {
		if (intRegexp.test(prop)) {
			prop = parseInt(prop);
		}
		if (target.has(prop)) {
			return {
				value: target.get(prop),
				writable: true,
				enumerable: true, 
				configurable: true
			};
		}
		return undefined;
	}
});

class NumericMap extends Array {
	constructor (items=[]) {
		super(...items);
	}

	delete (prop) {
		if (this.has(prop)) {
			if (typeof prop === "number") {
				this.splice(prop, 1);
				return true;
			}
			delete this[prop];
			return true;
		}
		return false;
	}

	get (prop) {
		if (typeof prop === "number") {
			if (this.length === 0) {
				return undefined;
			}
			// Allow reverse indexing like Python. foo[-1] === foo[foo.length - 1];
			if (index < 0) { // (-1 % 5) is -1
				index = (index % this.length) + this.length;
				if (index === this.length) {
					index = 0;
				}
			}
		}
		return this[index];
	}

	has (prop) {
		if (typeof prop === "number") {
			return prop >= 0 && prop < this.length;
		}

		return this.hasOwnProperty(prop);
	}

	keys () {
		
	}

	set (prop, value) {
		return this[prop] = value;
	}
}

return function (items) {
	return new Proxy(
		new NumericMap(items), 
		handler
	);
};