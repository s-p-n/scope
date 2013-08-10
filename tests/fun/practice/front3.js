#!/usr/bin/env node
/// < Shims
Function.prototype.bind = (function(origBind) {
    return function bind() {
        var fn = origBind.apply(this.unbind(), arguments);
        fn.__origFn__ = this.__origFn__ || this;
        return fn;
    }
}(Function.prototype.bind));
Function.prototype.unbind = function unbind() {
    return this.__origFn__ || this;
};
if (typeof Object.create === 'undefined') {
    Object.create = function(o) {
        function F() {};
        F.prototype = o;
        return new F();
    }
};
Array.prototype.has = function(term) {
    var key, result = false;
    for (key in this) {
        if (!this.hasOwnProperty(key)) {
            continue;
        }
        if ($compare(this[key], term).$values["Boolean"]()) {
            result = true;
            break;
        }
    }
    return $primitive("Boolean", function() {
        return result;
    });
}
/// > Shims

function $self(access, name, value) {
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
            parent = parent.$parent.$values["Instance"]();
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

function $arg(name, $default, value) {
    if (value === void 0) {
        value = $default;
    }
    return this.$self("protected", name, value);
};

function $primitive(types, val) {
    var obj = {
        $values: {}
    };
    var i;
    if (typeof val === "object" && val.$types !== void 0) {
        return val;
    }
    if (types instanceof Array) {
        obj.$types = types;
    } else {
        obj.$types = [types];
    }

    if (typeof val === "object") {
        obj.$values = val;
    } else {
        obj.$values[obj.$types[0]] = val;
    }
    return obj;
}

function $newParent(parent) {
    var newParent = $primitive("Instance", function() {
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

function $enforceType(type, term, line) {
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
var $runtimeError = function $runtimeError(line, msg, what) {
    throw new Error(
        "\033[31m\033[1m Runtime Error:\033[0m\033[1m " +
        msg.replace(/%what%/g, what).replace(/%red%/g, '\033[31m').replace(/%default%/g, '\033[0m\033[1m').replace(/%green%/g, '\033[32m') +
        "\033[1m on line: \033[31m" + line + '\033[0m'
    );
}
var Type = {
    $types: ["Scope"],
    $values: {
        "Scope": function() {
            return function Type(primitive) {
                var types = [];
                var i;
                for (i = 0; i < primitive.$types.length; i += 1) {
                    types.push($primitive("Text", function(val) {
                        return function() {
                            return val;
                        }
                    }(primitive.$types[i])));
                }
                return $primitive("Array", function() {
                    return types;
                })
            }
        }
    }
};
Array.prototype.substr = function substr(start, end) {
    var i, result = [];
    if (end === void 0) {
        end = this.length;
    }
    if (start === void 0) {
        start = 0;
    }
    if (end > start) {
        for (i = start; this[i] && i < end; i += 1) {
            result.push(this[i]);
        }
    } else if (end < start) {
        for (i = start; this[i] && i > end; i -= 1) {
            result.push(this[i]);
        }
    } else {
        result.push(this[start]);
    }
    return result;
}
var Text = {
    $types: ["Scope"],
    $values: {
        "Scope": function() {
            return function Text(primitive, fromType) {
                var result = null,
                    res = "";
                if (fromType !== void 0) {
                    fromType = fromType.$values["Text"]();
                    if (primitive.$values.hasOwnProperty(fromType)) {
                        res = primitive.$values[fromType]().toString();
                        result = function() {
                            return res;
                        };
                    }
                } else if (primitive.$values.hasOwnProperty("Text")) {
                    result = primitive.$values["Text"];
                } else if (primitive.$types.length === 1) {
                    res = primitive.$values[primitive.$types[0]]().toString();
                    result = function() {
                        return res;
                    };
                }
                if (result === null) {
                    throw "Error! Multi-Type Primitive (without a text-type and no specified type for" +
                        "Text(Any:Primitive [, Text:fromType])), cannot be converted to Text.";
                }
                return $primitive("Text", result);
            }
        }
    }
};
var Scope = (function() {
    return {
        extend: {
            $types: ["Scope"],
            $values: {
                "Scope": function() {
                    return function extend(extended, extendee, parent) {
                        var result;
                        extendee = extendee.$values["Scope"]().unbind();
                        extended = extended.$values["Scope"]().bind($newParent(parent));
                        //console.log("Extend:", extendee, extended);
                        result = function() {
                            var i, access;
                            var extension = extended.apply(this, arguments);
                            //console.log("extension:", extension);
                            this.$self("protected", "extended", extension);
                            for (i in extension.$access) {
                                access = extension.$access[i]
                                if (access === "private") {
                                    continue;
                                }
                                this.$self(access, i, extension.$property[i]);
                            }
                            //console.log(this);
                            return extendee.apply(this, arguments);
                        }.bind($newParent(parent));
                        result.name = extendee.name;
                        //console.log("Result:", result);
                        return $primitive("Scope", function() {
                            return result
                        });
                    }
                }
            }
        }
    }
}());
var print = {
    $types: ["Scope"],
    $values: {
        "Scope": function() {
            return function print(val) {
                console.log(Text.$values["Scope"]()(val).$values["Text"]());
            }
        }
    }
};
var $$$0 = $primitive('Text', function() {
    return "Hello, World"
}.bind($root));
var $$$1 = function() {
    return (this.$self("front3").$values["Scope"]()($$$0))
}.bind($root);; /* Begin ControlCode: 0 */
$root.$self("var", "front3", /* Starting Scope:1 */ $primitive("Scope", function() {
    return function() {
        var $returnMulti = [],
            $temp;
        var $$$0 = $primitive('Number', function() {
            return 0
        }.bind(this));
        var $$$1 = $primitive('Number', function() {
            return 3
        }.bind(this));
        var $$$2 = function() {
            return (print.$values["Scope"]()(this.$self("front")))
        }.bind(this);
        var $$$3 = $primitive('Text', function() {
            return ""
        }.bind(this));
        this.$arg("str", "$$$3", arguments[0]);
        /* Begin ControlCode: 1 */
        this.$self("var", "front", this.$self("str").substr($$$0, $$$1 + 1));
        $$$2();
        $returnMulti.push($primitive("Instance", function(value) {
            return function() {
                return value;
            }
        }(this)));
        var $i = 0,
            $j = 0,
            $returnMultiType, $returnTypes, $returnValues;
        var $return = {
            $types: [],
            value: null,
            $values: {}
        };
        $returnTypes = $return.$types;
        for ($i = 0; $i < $returnMulti.length; $i += 1) {
            for ($j = 0; $j < $returnMulti[$i].$types.length; $j += 1) {
                $returnMultiType = $returnMulti[$i].$types[$j];
                if ($returnTypes.indexOf($returnMultiType) === -1) {
                    $returnTypes.push($returnMultiType);
                }
                $return.$values[$returnMultiType] = $returnMulti[$i].$values[$returnMultiType];
            }
        }
        return $return;
    }.bind(this);
}.bind($newParent($root))));
$$$1();