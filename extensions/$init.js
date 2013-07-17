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
			F.prototype = 0;
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
		throw "Undefined variable/property: " + access;
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
function $newParent (parent) {
	var result = {
		$access: {},
		$property: {
			$public: {},
			$protected: {},
			$private: {}
		},
		$parent: parent
	};
	result.$self = $self.bind(result);
	result.$arg = $arg.bind(result);
	return result;
};
function $enforceType (type, term, line) {
	if (Type(term) === type) {
		return term;
	}
	$runtimeError(line, "Expected " + type + " and got %what%.");
};
var $root = $newParent(this);
this.$access = $root.access;
this.$self = $root.$self;
this.$property = $root.$property;
this.$parent = $root.$parent;
this.$self = $root.$self;
this.$arg = $root.$arg;