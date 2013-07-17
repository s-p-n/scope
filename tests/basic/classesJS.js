/**
	Scope version 0.2.x style is planned to look like this:
**/

function $self (access, name, value) {
	if (name === void 0) {
		if (typeof this[access] !== "undefined") {
			return this[access];
		} else if (typeof this.$property[access] !== "undefined") {
			return this.$property[access];
		}
		throw "Undefined variable/property: " + access;
	}
	if (this === "var") {
		return this[name] = value;
	}
	this.$access[name] = access;
	return this.$property[name] = value;
}

function $arg (name, $default, value) {
	if (value === void 0) {
		value = $default;
	}
	return this.$self("protected", name, value);
}

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
}

Function.prototype.bind = (function(origBind) {
  return function bind () {
    var fn = origBind.apply(this.unbind(), arguments);
    fn.__origFn__ = this.__origFn__ || this;
    return fn;
  };
}(Function.prototype.bind));
 
Function.prototype.unbind = function unbind () {
  return this.__origFn__ || this;
};

var Scope = (function () {
	return {
		extend: function extend (extended, extendee, parent) {
			var result;
			extendee = extendee.unbind();
			extended = extended.bind($newParent(parent));
			result = function () {
				var i, access;
				var extension = extended.apply(this, arguments);
				this.$self("protected", "extended", extension);
				for (i in extension.$access) {
					access = extension.$access[i]
					if (access === "private") {
						continue;
					}
					this.$self(access, i, extension.$property[i]);
				}
				return extendee.apply(this, arguments);
			}.bind($newParent(parent));
			result.name = extendee.name;
			return result;

}}}());

var $root = $newParent(this);

$root.$self("var", "Animal", function Animal (name) {
	this.$arg("name", "", name);
	this.$self("protected", "move", function move (meters) {
		this.$arg("meters", 0, meters);
		console.log(this.$parent.$self("name") + " moved " + this.$self("meters") + "m.");
		return this;
	}.bind($newParent(this)));
	return this;
}.bind($newParent($root)));
$root.$self("var", "Snake", Scope.extend($root.$self("Animal"), function Snake () {
	this.$self("public", "move", function move () {
		console.log("Slithering...");
		this.$parent.$self("extended").$self("move")(5);
		return this;
	}.bind($newParent(this)));
	return this;
}.bind($newParent($root)), $root));
$root.$self("var", "Horse", Scope.extend($root.$self("Animal"), function Horse () {
	this.$self("public", "move", function move () {
		console.log("Galloping...");
		this.$parent.$self("extended").$self("move")(45);
		return this;
	}.bind($newParent(this)));
	return this;
}.bind($newParent($root)), $root));
$root.$self("var", "sam", $root.$self("Snake")("Sammy the Python"));
$root.$self("var", "tom", $root.$self("Horse")("Tommy the Palomino"));
$root.$self("sam").$self("move")();
$root.$self("tom").$self("move")();