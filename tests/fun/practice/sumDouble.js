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
var $compare = function() {
    var equals = function(a, b) {
        var p;
        if (typeof a !== "object") {
            return a === b;
        }
        for (p in a) {
            if (typeof(b[p]) == 'undefined') {
                return false;
            }
            if (a[p]) {
                switch (typeof(a[p])) {
                    case 'object':
                        if (!equals(a[p], b[p])) {
                            return false;
                        }
                        break;
                    case 'function':
                        if (typeof(b[p]) == 'undefined' ||
                            (p != 'equals' && a[p].toString() != b[p].toString())) {
                            return false;
                        }
                        break;
                    default:
                        if (a[p] !== b[p]) {
                            return false;
                        }
                }
            } else if (b[p]) {
                return false;
            }
        }
        for (p in b) {
            if (typeof(a[p]) == 'undefined') {
                return false;
            }
        }
        return true;
    };
    return function $compare(a, b) {
        var i, j, c, result = true;
        if (a.$types.length > b.$types.length) {
            c = a;
            a = b;
            b = a;
        }
        for (i = 0; i < a.$types.length; i += 1) {
            if (b.$types.indexOf(a.$types[i]) > -1 &&
                equals(a.$values[a.$types[i]](), b.$values[a.$types[i]]())
            ) {
                continue;
            }
            result = false;
            break;
        }
        return $primitive("Boolean", function(val) {
            return function() {
                return val;
            }
        }(result))
    }
}();
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
var Text = {
    $types: ["Scope", "Instance"],
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
        },
        "Instance": function() {
            return {
                "split": {
                    $types: ["Scope"],
                    $values: {
                        "Scope": function() {
                            var findNext = function(unit, sep) {
                                var match = unit.match(sep);
                                return match !== null ? match.index : -1;
                            }
                            var f = function(val) {
                                return function() {
                                    return val;
                                }
                            }
                            return function split(txt, sep, maxSplit) {
                                var hasMax = false;
                                var result = [];
                                var i;
                                txt = txt.$values["Text"]();
                                return $primitive("Text", f(txt.split(sep, maxSplit)));
                                /*
                                if (typeof sep === "undefined") {
                                    sep = /\s+/;
                                } else {
                                    sep = sep.$values["Text"]();
                                }

                                if (typeof maxSplit === "undefined") {
                                    hasMax = true
                                }
                                for (i = findNext(txt, sep); i !== -1; i = findNext(txt, sep)) {
                                    result.push($primitive("Text", f(txt.substr(0, i))));
                                    txt = txt.substr(i + 1);
                                }
                                result.push($primitive("Text", f(txt)));
                                return {
                                    $types: ["Array"],
                                    $values: {
                                        "Array": function() {
                                            return result;
                                        }
                                    }
                                };
                                */

                            }
                        }
                    }
                },
                "rsplit": {
                    $types: ["Scope"],
                    $values: {
                        "Scope": function() {
                            var findNext = function(unit, sep) {
                                var match = unit.match(sep);
                                return match !== null ? match.index : -1;
                            }
                            var f = function(val) {
                                return function() {
                                    return val;
                                }
                            }
                            String.prototype.rsplit = function(sep, maxsplit) {
                                var split = this.split(sep);
                                return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split;
                            };
                            return function rsplit(txt, sep, maxSplit) {
                                var maxSplit = maxSplit || 0;
                                var result = [];
                                var i;
                                var txt = txt.$values["Text"]().rsplit(sep.$values["Text"](), maxSplit.$values["Number"]());
                                for (i = 0; i < txt.length; i += 1) {
                                    txt[i] = $primitive("Text", f(txt[i]));
                                }
                                return $array(txt);
                            }
                        }
                    }
                }
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
var $$$0 = $primitive('Number', function() {
    return 1
}.bind($root));
var $$$1 = $primitive('Number', function() {
    return 2
}.bind($root));
var $$$2 = function() {
    return (this.$self("sumDouble", 14).$values["Scope"]()($$$0, $$$1))
}.bind($root);
var $$$3 = function() {
    return (print.$values["Scope"]()($$$2()))
}.bind($root);
var $$$4 = $primitive('Number', function() {
    return 3
}.bind($root));
var $$$5 = $primitive('Number', function() {
    return 2
}.bind($root));
var $$$6 = function() {
    return (this.$self("sumDouble", 15).$values["Scope"]()($$$4, $$$5))
}.bind($root);
var $$$7 = function() {
    return (print.$values["Scope"]()($$$6()))
}.bind($root);
var $$$8 = $primitive('Number', function() {
    return 2
}.bind($root));
var $$$9 = $primitive('Number', function() {
    return 2
}.bind($root));
var $$$10 = function() {
    return (this.$self("sumDouble", 16).$values["Scope"]()($$$8, $$$9))
}.bind($root);
var $$$11 = function() {
    return (print.$values["Scope"]()($$$10()))
}.bind($root);; /* Begin ControlCode: 0 */
$root.$self("var", "sumDouble", /* Starting Scope:1 */ $primitive("Scope", function() {
    return function() {
        var $returnMulti = [],
            $temp, $val;
        var $$$0 = $primitive('Number', function() {
            return 4
        }.bind(this));
        var $$$1 = $primitive('Number', function() {
            return 0
        }.bind(this));
        var $$$2 = $primitive('Number', function() {
            return 0
        }.bind(this));
        this.$arg("a", "$$$1", arguments[0]);
        this.$arg("b", "$$$2", arguments[1]);
        /* Begin ControlCode: 1 */
        if (typeof $returnMulti === "undefined") {
            var $returnMulti = [];
        }
        $returnMulti.push((function() {
            if ($compare(this.$self("a", 7), this.$self("b", 7)).$values["Boolean"]()) {
                return (function() {
                    return $Math.multiply(this.$self("a", 8), $$$0);;
                }.bind(this)());
            } else {
                return (function() {
                    return $Math.add(this.$self("a", 10), this.$self("b", 10));;
                }.bind(this)());
            }
        }.bind(this)()));
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
$$$3();
$$$7();
$$$11();