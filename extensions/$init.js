/// < Shims
	Function.prototype.bind = (function(origBind) {
		return function bind () {
			var fn = origBind.apply(this.unbind(), arguments);
			fn.__origFn__ = this.__origFn__ || this;
			return fn;
	}}(Function.prototype.bind));
	Function.prototype.unbind = function unbind () {
		return this.__origFn__ || this;
	};
	if (typeof Object.create === 'undefined') {
		Object.create = function (o) {
			function F() {};
			F.prototype = o;
			return new F();
	}};
/// > Shims
function $self (access, name, value) {
	if (name === void 0) {
		name = access;
		if (typeof this[name] !== "undefined") {
			return this[name];
		} else if (typeof this.$property[name] !== "undefined") {
			return this.$property[name];
		}
		var parent = this;
		while (parent !== null) {
			if (typeof parent[name] !== "undefined") {
				return parent[name];
			}
			parent = parent.$parent;
		}
		throw "Undefined variable/property: " + name;
	}
	if (value === void 0) {
		value = name;
		name = access;
		if (typeof this[name] !== "undefined") {
			return this[name] = value;
		} else if (typeof this.$property[name] !== "undefined") {
			return this.$property[name] = value;
		}
	}
	if (access === "var") {
		return this[name] = value;
	}
	this.$access[name] = access;
	return this.$property[name] = value;
};
function $arg (name, $default, value) {
	if (value === void 0) {
		value = $default;
	}
	return this.$self("protected", name, value);
};
function $primitive (types, val) {
	var obj = {};
	if (typeof val === "object" && val.$types !== void 0) {
		return val;
	}
	if (types instanceof Array) {
		obj.$types = types;
	} else {
		obj.$types = [types];
	}
	obj.value = val;
	try {
		//console.info("$primitive:", obj, obj.toString(), obj.valueOf());
	} catch (e) {
		//do nothing
	}
	return obj;
}
function $newParent (parent) {
	var newParent = $primitive("Instance", function () {
		return parent;
	});
	var result = {
		$access: {},
		$property: {
			$public: {},
			$protected: {},
			$private: {}
		},
		$parent: newParent
	};
	result.$self = $self.bind(result);
	result.$arg = $arg.bind(result);
	return result;
};
function $enforceType (type, term, line) {
	if (Type(term).indexOf(type) !== -1) {
		return term;
	}
	$runtimeError(line, "Expected " + type + " and got %what%.");
};
var $root = $newParent(null);
var $i;
for ($i in $root) {
	this[$i] = $root[$i];
}