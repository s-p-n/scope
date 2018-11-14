// set global for browser/node env:
if (typeof window !== "undefined") {
  if (typeof global === "undefined") {
    window["global"] = window;
  }
}

const Node = <include file="./Node.js"/>;
const TextNode = <include file="./TextNode.js"/>;
const associativeMap = <include file="./associativeMap.js"/>;
class Scope {
	constructor () {
		const self = this;
		self._scoping = {
			let: this.map(),
			private: this.map(),
			protected: this.map(),
			public: this.map(),
			parent: null
		};

		self.id = new Proxy(self._scoping, {
			get: function get (target, prop, receiver) {
				let ctx = self._scoping;
				for (let slot in ctx) {
					if (ctx[slot] === null) {
						return global[prop];
					}
					if (ctx[slot].has(prop)) {
						return ctx[slot][prop];
					}
				}
			},
			set: function set (target, prop, val, receiver) {
				let ctx = self._scoping;
				for (let slot in ctx) {
					if (ctx[slot] === null) {
						return global[prop] = val;
					}
					if (ctx[slot].has(prop)) {
						return ctx[slot][prop] = val;
					}
				}
			}
		})
	}

	after (promisable) {
		return Promise.resolve(promisable);
	}

	array (arr=[]) {
		const self = this;
		/*Object.defineProperty(arr, "random", {
			value(n=1) {
				let result;
				let keys = Object.keys(this);
				n = parseInt(n);
				if (n === 1) {
					return this[keys[Math.floor(Math.random() * keys.length)]];
				}

				result = [];
				for (let i = 0; i < n && keys.length > 0; i += 1) {
					let key = keys.splice(Math.floor(Math.random() * keys.length),1)[0];
					result.push(this[key]);
				}
				return self.array(result);
			},
			configurable: false,
			writable: false,
			enumerable: false
		});
		*/
		return arr;
	}

	asObj (expr) {
		let result = {};
		if (expr instanceof Map) {
			for (let [name, val] of expr) {
				result[name] = val;
			}
			return result;
		}



		return expr;
	}

	declare (slot, ...sets) {
		const self = this;
		let ctx;
		let slots = ['let', 'private', 'protected', 'public'];
		let results = [];
		for (let [name, value] of sets) {
			if(name instanceof Array) {
				if (value !== null && typeof value[Symbol.iterator] === 'function') {
					let result = [];
					for (let i = 0; i < name.length; i += 1) {
						let val;
						if (value.length <= i) {
							val = undefined;
						} else {
							val = value[i];
						}
						result.push([name[i], val]);
					}
					self.declare(slot, ...result)
				} else {
					throw new Error("Attempt to iterate over non-iterable during declaration");
				}
				continue;
			}

			// make sure slot is an allowed slot
			if (slots.indexOf(slot) === -1) {
				console.log("WARNING: Use of unsupported property storage slot:", slot);
				console.log("failing silently- returning false.")
				// this shouldn't really happen.. but it can.
				return false;
			}
			/** Thought: Why error on duplicate (below), where we can more easily and 
				intuitively overwrite it?
			**
			if (self._scoping[slot].has(name)) {
				throw new Error(`'${slot} ${name}' already declared.`);
			}
			**/
			self._scoping[slot][name] = value;
			results.push(value);
		}
		// not necessary to return anything
		//return results[results.length - 1];
	}

	has (a, b) {
		return Object.values(a).some(val => Object.is(val, b));
	}

	in (a, b) {
		return a in b;
	}

	map (items) {
		const self = this;
		return associativeMap(items);
	}

	random (list=[], n=1) {
		const self = this;
		let result;
		let isStr = false;
		let keys = Object.keys(list);
		if (typeof list === "string") {
			isStr = true;
		}
		n = parseInt(n);
		if (n === 1) {
			return list[keys[Math.floor(Math.random() * keys.length)]];
		}

		result = [];
		for (let i = 0; i < n && keys.length > 0; i += 1) {
			let key = keys.splice(Math.floor(Math.random() * keys.length),1)[0];
			result.push(list[key]);
		}
		if (!isStr) {
			return self.array(result);
		}
		return result.join('');
	}

	range (start=0, end=0, inc=1) {
		let len, result, isStr = false;

		// inc must be a number.
		if (typeof inc !== "number") {
			return [];
		}

		// support numbers or chars.
		if (typeof start === "string" && 
			typeof end === "string" && 
			start.length === 1 && 
			end.length === 1
		) {
			start = start.charCodeAt(0);
			end = end.charCodeAt(0);
			isStr = true;
		} else if (!(typeof start === "number" && typeof end === "number")) {
			return [];
		}
		if (start === end) {
			return start;
		}

		if (start > end) {
			inc = -Math.abs(inc);
			len = Math.floor((start - end) / (-inc));
		} else {
			inc = Math.abs(inc);
			len = Math.floor((end - start) / inc);
		}
		result = new Array(len + 1);
		for (let i = 0, n = start; i <= len; i += 1, n += inc) {
	        result[i] = n;
	    }
	    if (isStr) {
	    	return String.fromCharCode(...result);
	    }
		return this.array(result);
	}

	set (obj, prop, val) {
		const self = this;
		//console.log(`set(${obj.toString()}, ${prop}, ${val})`);
		
		if (obj === global) {
			if (prop in global) {
				return obj[prop] = val;
			} else {
				throw `${prop} is not defined.`;
			}
		}
		if (obj === self._scoping) {
			//console.log(`looking up ${prop}..`)
			for (let slot in obj) {
				if (obj[slot] === null) {
					return self.set(global, prop, val);
				}
				if (obj[slot].has(prop)) {
					//console.log(`found [${slot}: ${prop}]`)
					return self.set(obj[slot], prop, val);
				}
			}
		}
		return obj[prop] = val;
	}

	wait (seconds) {
		return new Promise(resolve => setTimeout(resolve, seconds));
	}

	xml (name, ...rest) {
		const self = this;
		let children = [];
		let attributes = {};
		switch (rest.length) {
			case 0:
				break;
			case 1:
				if (rest[0] instanceof Array) {
					children = rest[0];
				} else {
					attributes = rest[0];
				}
				break;
			case 2:
				attributes = rest[0];
				children = rest[1];
				break;
		}
		return new Node(name, attributes, children);
	}
}

return Scope;