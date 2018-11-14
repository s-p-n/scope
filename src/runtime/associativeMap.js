let handler = Object.freeze({
	get (target, prop, receiver) {
		const self = this;
		if (target.has(prop)) {
			return target.get(prop);
		}
		if (prop in target) {
			if (typeof target[prop] === "function") {
				return target[prop].bind(target);
			}
			return target[prop];
		}
	},

	has (target, prop) {
		return target.has(prop);
	},

	set (target, prop, val) {
		return target.set(prop, val);
	},

	deleteProperty (target, prop) {
		return target.delete(prop);
	},

	ownKeys (target) {
		return [...target.keys()];
	},

	getOwnPropertyDescriptor (target, prop) {
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

class AssociativeMap extends Map {
	constructor (items) {
		super(items);
	}
}

return function (items) {
	return new Proxy(
		new AssociativeMap(items), 
		handler
	);
};