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
    var line;
    if (typeof name === "number") {
        line = name;
        name = void 0;
    }
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
        throw "Undefined variable/property: " + name + " on line: " + line;
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
var $array = (function() {
    var assocArray = function() {
        var obj = {};
        Object.defineProperty(obj, 'length', {
            enumerable: false,
            value: 0,
            configurable: false,
            writable: true
        });
        return obj;
    };
    return function $array(arr) {
        var n, i;
        if (arr instanceof Array) {
            //console.log("$array:", arr);
            return $primitive("Array", function() {
                return arr;
            });
        }
        n = assocArray();
        for (i in arr) {
            n[i] = arr[i];
            n.length += 1;
        }
        return $primitive("Array", function() {
            return n;
        });
    }
}());
var $Math = {
    add: function add(a, b) {
        return $primitive("Number", function(val) {
            return function() {
                return val;
            }
        }(a.$values["Number"]() + b.$values["Number"]()));
    },
    subtract: function subtract(a, b) {
        return $primitive("Number", function(val) {
            return function() {
                return val;
            }
        }(a.$values["Number"]() - b.$values["Number"]()));
    },
    multiply: function multiply(a, b) {
        return $primitive("Number", function(val) {
            return function() {
                return val;
            }
        }(a.$values["Number"]() * b.$values["Number"]()));
    },
    divide: function divide(a, b) {
        return $primitive("Number", function(val) {
            return function() {
                return val;
            }
        }(a.$values["Number"]() / b.$values["Number"]()));
    },
    modulus: function divide(a, b) {
        return $primitive("Number", function(val) {
            return function() {
                return val;
            }
        }(a.$values["Number"]() % b.$values["Number"]()));
    }
};
var $factorial = function $factorial(n) {
    n = n.$values["Number"]();
    var i, result = n;
    if (n < 0) {
        for (i = -1; i > n; i -= 1) {
            result *= i;
        }
    } else if (n > 0) {
        for (i = 1; i < n; i += 1) {
            result *= i;
        }
    }
    return $primitive("Number", function() {
        return result
    });
}
var $$$0 = $primitive('Number', function() {
    return 8
}.bind($root));
var $$$1 = $primitive('Number', function() {
    return 120
}.bind($root));
var $$$2 = $primitive('Number', function() {
    return 2
}.bind($root));
var $$$3 = $primitive('Number', function() {
    return 5
}.bind($root));; /* Begin ControlCode: 0 */
if (typeof $returnMulti === "undefined") {
    var $returnMulti = [];
}
$returnMulti.push($Math.add($$$0, $Math.divide($Math.multiply($$$1, $$$2), $factorial(($$$3)))));
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
return $return;;