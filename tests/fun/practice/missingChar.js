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
        "\033[1m on line: \033[31m" + line + '\033[0m');
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
(function() {
    var origSubstr = String.prototype.substr;
    var cycleBackward = function(n, last) {
        if (n < 0) {
            if (last <= 0) {
                return n;
            }
            n = last + n;
        }
        return n;
    }
    String.prototype.substr = function substr(start, end) {
        start = cycleBackward(start, this.length - 1);
        end = cycleBackward(end, this.length - 1);
        return origSubstr.call(this, start, end);
    }
}());
Object.prototype.$substr = function $substr(start, end) {
    var result = {
        $types: [],
        $values: {}
    };
    var what = this;
    var f = function(val) {
        return function() {
            return val;
        }
    };
    if (what.$values.hasOwnProperty("Array")) {
        result.$types.push("Array");
        result.$values["Array"] = f(what.$values["Array"]().substr(start, end));
    }
    if (what.$values.hasOwnProperty("Text")) {
        result.$types.push("Text");
        result.$values["Text"] = f(what.$values["Text"]().substr(start, end));
    }
    return result;
}
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
var Compatible = {
    $types: ["Scope"],
    $values: {
        "Scope": function() {
            return function(a, b) {
                var i, result = true;
                for (i = 0; i < b.$types.length; i += 1) {
                    if (a.$types.indexOf(b.$types[i]) === -1) {
                        result = false;
                        break;
                    }
                }
                return $primitive("Boolean", function() {
                    return result;
                });
            }
        }
    }
}
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
                equals(a.$values[a.$types[i]](), b.$values[a.$types[i]]())) {
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
var $concat = function $concat(a, b, line) {
    var type = Type.$values["Scope"](),
        compatible = Compatible.$values["Scope"](),
        concatTestBoth = $primitive(["Text", "Array"], {
            "Text": function() {
                return "";
            },
            "Array": function() {
                return [];
            }
        }),
        compatTestText = $primitive("Text", function() {
            return "";
        }),
        compatTestArray = $primitive("Array", function() {
            return [];
        }),
        concatFunc = function(value) {
            return function() {
                return value;
            }
        },
        txtConcat = function(a, b) {
            return a.$values["Text"]() + b.$values["Text"]();
        },
        arrConcat = function(a, b) {
            var result,
                subResult,
                shortest,
                i,
                type,
                len,
                f = function(val) {
                    return function() {
                        return val;
                    }
                };
            //console.log("a:");
            //Console.write.$values["Scope"]()(a);
            //console.log("b:");
            //Console.write.$values["Scope"]()(b);
            a = a.$values["Array"]();
            b = b.$values["Array"]();
            if (a.length > b.length) {
                result = a;
                shortest = b;
            } else {
                result = b;
                shortest = a;
            }
            if (a instanceof Array) {
                for (i = 0; i < b.length; i += 1) {
                    len = a.push({
                        $types: Object.create(b[i].$types),
                        $values: {}
                    }) - 1;
                    for (type in b[i].$values) {
                        a[len].$values[type] = f(b[i].$values[type]());
                    }
                }
                result = a;
            } else {
                for (i in shortest) {
                    if (i !== "length" && shortest.hasOwnProperty(i)) {
                        result[i] = shortest[i];
                        result.length += 1;
                    }
                }
            }
            return result;
        };

    if (compatible(a, b).$values["Boolean"]() ||
        compatible(b, a).$values["Boolean"]()) {
        if (compatible(a, concatTestBoth).$values["Boolean"]()) {
            return $primitive(["Text", "Array"], {
                "Text": concatFunc(txtConcat(a, b)),
                "Array": concatFunc(arrConcat(a, b))
            });
        }
        if (compatible(compatTestText, a).$values["Boolean"]()) {
            return $primitive("Text",
                concatFunc(txtConcat(a, b)));
        } else if (compatible(compatTestArray, a).$values["Boolean"]()) {
            return $primitive("Array",
                concatFunc(arrConcat(a, b)));
        }
    }
    $runtimeError(line,
        "Type Error:  Compatible Text, Array or Both expected, got: %what%",
        a.$types + " and " + b.types);
};
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
    return "kitten"
}.bind($root));
var $$$1 = $primitive('Number', function() {
    return 1
}.bind($root));
var $$$2 = function() {
    return (this.$self("missingChar").$values["Scope"]()($$$0, $$$1))
}.bind($root);
var $$$3 = function() {
    return (print.$values["Scope"]()($$$2()))
}.bind($root);
var $$$4 = $primitive('Text', function() {
    return "kitten"
}.bind($root));
var $$$5 = $primitive('Number', function() {
    return 0
}.bind($root));
var $$$6 = function() {
    return (this.$self("missingChar").$values["Scope"]()($$$4, $$$5))
}.bind($root);
var $$$7 = function() {
    return (print.$values["Scope"]()($$$6()))
}.bind($root);
var $$$8 = $primitive('Text', function() {
    return "kitten"
}.bind($root));
var $$$9 = $primitive('Number', function() {
    return 4
}.bind($root));
var $$$10 = function() {
    return (this.$self("missingChar").$values["Scope"]()($$$8, $$$9))
}.bind($root);
var $$$11 = function() {
    return (print.$values["Scope"]()($$$10()))
}.bind($root);; /* Begin ControlCode: 0 */
$root.$self("public", "missingChar", /* Starting Scope:1 */ $primitive("Scope", function() {
    return function() {
        var $returnMulti = [],
            $temp;
        var $$$0 = $primitive('Number', function() {
            return 1
        }.bind(this));
        var $$$1 = $primitive('Text', function() {
            return ''
        }.bind(this));
        var $$$2 = $primitive('Number', function() {
            return 0
        }.bind(this));
        this.$arg("str", "$$$1", arguments[0]);
        this.$arg("n", "$$$2", arguments[1]);
        /* Begin ControlCode: 1 */
        if (typeof $returnMulti === "undefined") {
            var $returnMulti = [];
        }
        $returnMulti.push($concat(this.$self("str").$substr(0, this.$self("n").$values["Number"]()), this.$self("str").$substr($Math.add(this.$self("n"), $$$0).$values["Number"]()), 8));
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