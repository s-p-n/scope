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

var $compare = function() {
    var equals = function(a, b) {
        var p;
        if (typeof a.$types !== "undefined") {
            //console.log("equals is a scope primitive:", a, b);
            return $compare(a, b).$values["Boolean"]();
        }
        //console.log("equals is a JS primitive:", a, b);
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
                            (p != 'equals' && (a[p].toString() != b[p].toString() ||
                                a[p].unbind().toString() != b[p].unbind().toString()
                            ))) {
                            return false;
                        }
                        //console.log("func:", a[p].unbind().toString() != b[p].unbind().toString())
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
        //console.log("$compare:")
        //Console.$values["Instance"]().write.$values["Scope"]()(a);
        //Console.$values["Instance"]().write.$values["Scope"]()(b);
        for (i = 0; i < a.$types.length; i += 1) {
            if (b.$types.indexOf(a.$types[i]) > -1 &&
                equals(a.$values[a.$types[i]](), b.$values[a.$types[i]]())
            ) {
                //console.log("Got true");
                continue;
            }
            //console.log("Got false");
            result = false;
            break;
        }
        //console.log("Returning", result);


        return $primitive("Boolean", function(val) {
            return function() {
                return val;
            }
        }(result))
    }
}();
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
                    res = Console.$values['Instance']().printValues.$values["Scope"]()(primitive);
                    if (res.Number !== void 0) {
                        res = "" + res.Number;
                    }
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
var Scope = {
    $types: ["Instance"],
    $values: {
        "Instance": function() {
            return {
                extend: {
                    $types: ["Scope"],
                    $values: {
                        "Scope": function() {
                            return function extend(extended, extendee) {
                                var result;
                                parent = null;
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
        }
    }
};
var Console = (function Console() {
    var rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.pause();

    function callback(fn) {
        return function cb(data) {
            rl.pause();
            data = data.replace(/\n/g, "");
            fn.$values["Scope"]()($primitive("Text", function() {
                return data;
            }));
        }
    }
    var t = 0;

    function printValues(Arr) {
        var result = {}, key, val, i;
        t += 1;
        //console.log("printing value:", t);
        if (t > 10) {
            //console.log("too big:", Arr);
            t -= 1;
            return "..";
        }
        for (key in Arr.$values) {
            val = Arr.$values[key]();
            if (key === "Array" || key === "Instance") {
                result[key] = [];
                for (i in val) {
                    if (val.hasOwnProperty(i)) {
                        result[key][i] = printValues(val[i]);
                    }
                }
                continue;
            }
            result[key] = val;
        }
        t -= 1;
        return result;
    }

    return {
        $types: ["Instance"],
        $values: {
            "Instance": function() {
                return {
                    write: {
                        $types: ["Scope"],
                        $values: {
                            "Scope": function() {
                                return function write() {
                                    var i = 0,
                                        result = [],
                                        subResult, key, val;
                                    while (arguments[i] !== void 0) {
                                        //console.log("Arg:", arguments[i]);
                                        result.push(printValues(arguments[i]));
                                        i += 1;
                                    }
                                    console.log.apply(console, result);
                                }
                            }
                        }
                    },
                    read: {
                        $types: ["Scope"],
                        $values: {
                            "Scope": function() {
                                return function read(fn) {
                                    rl.resume();
                                    rl.on('line', callback(fn));
                                }
                            }
                        }
                    },
                    printValues: {
                        $types: ["Scope"],
                        $values: {
                            "Scope": function() {
                                return printValues;
                            }
                        }
                    }
                }
            }
        }
    };
}());
var print = {
    $types: ["Scope"],
    $values: {
        "Scope": function() {
            return function print() {
                var result = "";
                var i = 0;
                do {
                    result += Text.$values["Scope"]()(arguments[i]).$values["Text"]();
                } while (((i += 1) in arguments) && (result += " "));
                console.log(result);
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
var List = {};
List.$types = ["Scope", "Instance"];
List.$values = {
    "Scope": function() {
        return function(num) {
            var arr = Array(num.$values["Number"]());
            var i = 0;
            for (i; i < arr.length; i += 1) {
                arr[i] = $primitive("Number", function(val) {
                    return function() {
                        return val;
                    };
                }(i));
            }
            return $array(arr);
        }
    },
    "Instance": function() {
        return {
            "random": {
                $types: ["Scope"],
                $values: {
                    "Scope": function() {
                        return function(arr) {
                            arr = arr.$values["Array"]();
                            return arr[Math.floor(Math.random() * arr.length)];
                        }
                    }
                }
            },
            "length": {
                $types: ["Scope"],
                $values: {
                    "Scope": function() {
                        return function(arr) {
                            return $primitive("Number", function() {
                                return arr.$values["Array"]().length;
                            });
                        }
                    }
                }
            }
        }
    }
};
var $Math = {
    add: function add(a, b) {
        return $primitive("Number", function(val) {
            return function() {
                return val;
            }
        }(Number(a.$values["Number"]()) + Number(b.$values["Number"]())));
    },
    subtract: function subtract(a, b) {
        return $primitive("Number", function(val) {
            return function() {
                return val;
            }
        }(Number(a.$values["Number"]()) - Number(b.$values["Number"]())));
    },
    multiply: function multiply(a, b) {
        return $primitive("Number", function(val) {
            return function() {
                return val;
            }
        }(Number(a.$values["Number"]()) * Number(b.$values["Number"]())));
    },
    divide: function divide(a, b) {
        return $primitive("Number", function(val) {
            return function() {
                return val;
            }
        }(Number(a.$values["Number"]()) / Number(b.$values["Number"]())));
    },
    modulus: function divide(a, b) {
        return $primitive("Number", function(val) {
            return function() {
                return val;
            }
        }(Number(a.$values["Number"]()) % Number(b.$values["Number"]())));
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
        if (typeof a.$types !== "undefined") {
            //console.log("equals is a scope primitive:", a, b);
            return $compare(a, b).$values["Boolean"]();
        }
        //console.log("equals is a JS primitive:", a, b);
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
                            (p != 'equals' && (a[p].toString() != b[p].toString() ||
                                a[p].unbind().toString() != b[p].unbind().toString()
                            ))) {
                            return false;
                        }
                        //console.log("func:", a[p].unbind().toString() != b[p].unbind().toString())
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
        //console.log("$compare:")
        //Console.$values["Instance"]().write.$values["Scope"]()(a);
        //Console.$values["Instance"]().write.$values["Scope"]()(b);
        for (i = 0; i < a.$types.length; i += 1) {
            if (b.$types.indexOf(a.$types[i]) > -1 &&
                equals(a.$values[a.$types[i]](), b.$values[a.$types[i]]())
            ) {
                //console.log("Got true");
                continue;
            }
            //console.log("Got false");
            result = false;
            break;
        }
        //console.log("Returning", result);


        return $primitive("Boolean", function(val) {
            return function() {
                return val;
            }
        }(result))
    }
}();
var $concat = function $concat(a, b, line) {
    //console.log("concat:", a, b, line);
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
        compatible(b, a).$values["Boolean"]()
    ) {
        if (compatible(a, concatTestBoth).$values["Boolean"]()) {
            return $primitive(["Text", "Array"], {
                "Text": concatFunc(txtConcat(a, b)),
                "Array": concatFunc(arrConcat(a, b))
            });
        }
        if (compatible(compatTestText, a).$values["Boolean"]()) {
            return $primitive("Text",
                concatFunc(txtConcat(a, b))
            );
        } else if (compatible(compatTestArray, a).$values["Boolean"]()) {
            return $primitive("Array",
                concatFunc(arrConcat(a, b))
            );
        }
    }
    $runtimeError(line,
        "Type Error:  Compatible Text, Array or Both expected, got: %what%",
        a.$types + " and " + b.types
    );
};
/*
Array.prototype.substr = function substr (start, end) {
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
*/
(function() {
    var $substrFunc = function(start, end, returnIndex) {
        var i,
            newEnd,
            len = this.length,
            result = "";

        if (this instanceof Array) {
            result = [];
        }

        if (end === "complete") {
            end = len;
        }
        newEnd = end;
        if (end < 0 && len > 0) {
            newEnd = end + len;
        }
        //console.log("substr:", start, end, newEnd, returnIndex);
        if (returnIndex) {
            //console.log("arraySubstr returnIndex is true:", newEnd, this[newEnd]);
            return this[newEnd];
        }
        for (i = start; newEnd > start && i < newEnd && i < len; i += 1) {
            if (typeof result === "string") {
                result += this[i];
            } else {
                result.push(this[i]);
            }

        }
        return result;
    };
    Object.defineProperty(Array.prototype, "$substr_arr", {
        enumerable: false,
        configurable: false,
        writable: false,
        value: $substrFunc
    });
    Object.defineProperty(String.prototype, "$substr_txt", {
        enumerable: false,
        configurable: false,
        writable: false,
        value: $substrFunc
    });
    Object.defineProperty(Object.prototype, "$substr_arr", {
        enumerable: false,
        configurable: false,
        writable: false,
        value: $substrFunc
    });
}());


Object.defineProperty(Object.prototype, "$substr", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function $substr(start, end) {
        var result = {
            $types: [],
            $values: {}
        };
        var returnIndex = false;
        var what = this;
        var f = function(val) {
            return function() {
                return val;
            }
        };
        if (what.$types.indexOf("Array") !== -1 && !(what.$values["Array"]() instanceof Array)) {
            return what.$values["Array"]()[start];
        }

        start = parseInt(start);
        if (end === void 0) {
            end = start;
            returnIndex = true;
        } else if (end !== "complete") {
            end = parseInt(end);
        }

        //console.log("what:", what);
        //console.log("what values:", what.$values);
        //console.log("returnIndex:", returnIndex);
        if (what.$values.hasOwnProperty("Array")) {
            //console.log("has Array", what.$values["Array"]());
            result = what.$values["Array"]().$substr_arr(start, end, returnIndex);
            //console.log("result:", result);
            if (result instanceof Array) {
                result = $array(result);
            }
        } else if (what.$values.hasOwnProperty("Text")) {
            //console.log("has Text", what.$values["Text"]());
            result.$types.push("Text");
            result.$values["Text"] = f(what.$values["Text"]().$substr_txt(start, end, returnIndex));
        }
        //console.log("$substr result:", result);
        return result;
    }
});
var $$$0 = function() {
    return ( /* Starting Scope:1 */ $primitive("Scope", function() {
        return function() {
            var $returnMulti = [],
                $temp, $val;

            /* Begin ControlCode: 1 */
            this.$self("public", "notify", /* Starting Scope:2 */ $primitive("Scope", function() {
                return function() {
                    var $returnMulti = [],
                        $temp, $val;
                    var $$$0 = $primitive('Text', function() {
                        return "Notification!"
                    }.bind(this));
                    var $$$1 = function() {
                        return (print.$values["Scope"]()($$$0))
                    }.bind(this);
                    var $$$2 = function() {
                        return (print.$values["Scope"]()(this.$self("what", 52)))
                    }.bind(this);
                    var $$$3 = $primitive('Text', function() {
                        return ""
                    }.bind(this));
                    this.$arg("what", $$$3, arguments[0]);
                    /* Begin ControlCode: 2 */
                    $$$1();
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
            }.bind($newParent(this))));
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
    }.bind($newParent($root))).$values["Scope"]()())
}.bind($root);
var $$$1 = function() {
    return (this.$self("Slit", 55).$values["Scope"]()(this.$self("observer", 55)))
}.bind($root);
var $$$2 = function() {
    return (this.$self("Slit", 55).$values["Scope"]()())
}.bind($root);
var $$$3 = $primitive('Array', function() {
    return [$$$1(), $$$2()]
}.bind($root));
var $$$4 = $primitive('Number', function() {
    return 10
}.bind($root));
var $$$5 = function() {
    return (List.$values["Scope"]()($$$4))
}.bind($root);
var $$$6 = $primitive('Text', function() {
    return "."
}.bind($root));
var $$$7 = $primitive('Text', function() {
    return "slit0  observed?"
}.bind($root));
var $$$8 = $primitive('Number', function() {
    return 0
}.bind($root));
var $$$9 = function() {
    return (Console.$values["Instance"]().write.$values["Scope"]()($$$7, this.$self("slits", 59).$substr(($$$8.$values["Number"] || $$$8.$values["Text"])()).$values["Instance"]().observed))
}.bind($root);
var $$$10 = function() {
    return (this.$self("Electron", 61).$values["Scope"]()())
}.bind($root);
var $$$11 = function() {
    return (this.$self("electron", 62).$values["Instance"]().$self("pass").$values["Scope"]()(this.$self("slits", 62)))
}.bind($root);
var $$$12 = function() {
    return (this.$self("electron", 63).$values["Instance"]().$self("getPosition").$values["Scope"]()())
}.bind($root);
var $$$13 = function() {
    return (Console.$values["Instance"]().write.$values["Scope"]()(this.$self("resultPositions", 66)))
}.bind($root);; /* Begin ControlCode: 0 */
$root.$self("var", "Slit", /* Starting Scope:1 */ $primitive("Scope", function() {
    return function() {
        var $returnMulti = [],
            $temp, $val;
        var $$$0 = $primitive('Text', function() {
            return "Creating Slit"
        }.bind(this));
        var $$$1 = function() {
            return (print.$values["Scope"]()($$$0))
        }.bind(this);
        var $$$2 = $primitive('Boolean', function() {
            return true
        }.bind(this));
        var $$$3 = $primitive('Boolean', function() {
            return false
        }.bind(this));
        var $$$4 = function() {
            return (Type.$values["Scope"]()(this.$self("Observer", 5)))
        }.bind(this);
        var $$$5 = $primitive('Text', function() {
            return "Instance"
        }.bind(this));
        var $$$6 = $primitive('Boolean', function() {
            return true
        }.bind(this));
        var $$$7 = $primitive('Text', function() {
            return ""
        }.bind(this));
        this.$arg("Observer", $$$7, arguments[0]);
        /* Begin ControlCode: 1 */
        $$$1();
        this.$self("public", "open", $$$2);
        this.$self("public", "observed", $$$3);
        (function() {
            if ($$$4().$values["Array"]().has($$$5).$values["Boolean"]()) {
                return (function() {
                    return (function() {
                        this.$self("observed", 6).$types = $$$6.$types;
                        this.$self("observed", 6).$values = $$$6.$values;
                        return this.$self("observed", 6);
                    }.call(this));;

                }.bind(this)());
            }
        }.bind(this)());
        this.$self("public", "objectPasses", /* Starting Scope:2 */ $primitive("Scope", function() {
            return function() {
                var $returnMulti = [],
                    $temp, $val;
                var $$$0 = function() {
                    return (this.$self("Observer", 10).$values["Instance"]().$self("notify").$values["Scope"]()(this.$self("object", 10)))
                }.bind(this);
                var $$$1 = $primitive('Text', function() {
                    return ""
                }.bind(this));
                this.$arg("object", $$$1, arguments[0]);
                /* Begin ControlCode: 2 */
                (function() {
                    if (this.$parent.$values["Instance"]().$self("observed").$values["Boolean"]()) {
                        return (function() {
                            return $$$0();;

                        }.bind(this)());
                    }
                }.bind(this)());
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
        }.bind($newParent(this))));
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
$root.$self("var", "Electron", /* Starting Scope:1 */ $primitive("Scope", function() {
    return function() {
        var $returnMulti = [],
            $temp, $val;
        var $$$0 = $primitive('Array', function() {
            return []
        }.bind(this));
        /* Begin ControlCode: 1 */
        this.$self("private", "positions", $$$0);
        this.$self("public", "pass", /* Starting Scope:2 */ $primitive("Scope", function() {
            return function() {
                var $returnMulti = [],
                    $temp, $val;
                var $$$0 = $primitive('Boolean', function() {
                    return false
                }.bind(this));
                var $$$1 = $primitive('Text', function() {
                    return "Observers:"
                }.bind(this));
                var $$$2 = function() {
                    return (Console.$values["Instance"]().write.$values["Scope"]()($$$1, this.$self("slit", 20).$values["Instance"]().$self("observed")))
                }.bind(this);
                var $$$3 = $primitive('Boolean', function() {
                    return true
                }.bind(this));
                var $$$4 = $primitive('Number', function() {
                    return 0
                }.bind(this));
                var $$$5 = function() {
                    return (List.$values["Instance"]().length.$values["Scope"]()(this.$self("slits", 26)))
                }.bind(this);
                var $$$6 = $primitive('Number', function() {
                    return 1
                }.bind(this));
                var $$$7 = function() {
                    return (this.$self("Math", 26).$values["Instance"]().$self("random").$values["Scope"]()($$$4, $Math.subtract($$$5(), $$$6)))
                }.bind(this);
                var $$$8 = $primitive('Array', function() {
                    return [this.$self("pickSlit", 27)]
                }.bind(this));
                var $$$9 = function() {
                    return (this.$self("slit", 29).$values["Instance"]().$self("objectPasses").$values["Scope"]()(this.$parent))
                }.bind(this);
                var $$$10 = $primitive('Number', function() {
                    return 0
                }.bind(this));
                var $$$11 = $primitive('Array', function() {
                    return [this.$self("i", 33)]
                }.bind(this));
                var $$$12 = $primitive('Number', function() {
                    return 0
                }.bind(this));
                var $$$13 = $primitive('Array', function() {
                    return [$Math.add(this.$self("prev", 35), this.$self("i", 35))]
                }.bind(this));
                var $$$14 = function() {
                    return (this.$self("slit", 38).$values["Instance"]().$self("objectPasses").$values["Scope"]()(this.$parent))
                }.bind(this);
                var $$$15 = function() {
                    return (function() {
                        this.$self("var", "i", "");
                        this.$self("var", "slit", null);
                        var name, $$$list = this.$self("slits", 32).$values["Array"]();
                        for (i in $$$list) {
                            this.$self("i", $primitive((typeof i === "String" ? "Text" : "Number"), function() {
                                return i;
                            }));
                            if ($$$list.hasOwnProperty(i)) {
                                this.$self("slit", $$$list[i]);
                                (function() {
                                    (function(val) {
                                        this.$parent.$values["Instance"]().$self("positions").$types = Object.create(val.$types);
                                        this.$parent.$values["Instance"]().$self("positions").$values = Object.create(val.$values);
                                        return this.$parent.$values["Instance"]().$self("positions");
                                    }.call(this, $concat(this.$parent.$values["Instance"]().$self("positions"), $$$11, 33)));
                                    (function() {
                                        if ($primitive("Boolean", function(val) {
                                            return function() {
                                                return val;
                                            }
                                        }(!$compare(this.$self("prev", 34), $$$12).$values["Boolean"]())).$values["Boolean"]()) {
                                            return (function() {
                                                return (function(val) {
                                                    this.$parent.$values["Instance"]().$self("positions").$types = Object.create(val.$types);
                                                    this.$parent.$values["Instance"]().$self("positions").$values = Object.create(val.$values);
                                                    return this.$parent.$values["Instance"]().$self("positions");
                                                }.call(this, $concat(this.$parent.$values["Instance"]().$self("positions"), $$$13, 35)));;

                                            }.bind(this)());
                                        }
                                    }.bind(this)());
                                    (function() {
                                        this.$self("prev", 37).$types = this.$self("i", 37).$types;
                                        this.$self("prev", 37).$values = this.$self("i", 37).$values;
                                        return this.$self("prev", 37);
                                    }.call(this));
                                    return $$$14();;;;;

                                }.bind(this)());
                            }
                        }
                    }.bind(this)())
                }.bind(this);
                var $$$16 = $primitive('Array', function() {
                    return []
                }.bind(this));
                this.$arg("slits", $$$16, arguments[0]);
                /* Begin ControlCode: 2 */
                this.$self("var", "observers", $$$0);
                (function() {
                    this.$self("var", "i", "");
                    this.$self("var", "slit", null);
                    var name, $$$list = this.$self("slits", 19).$values["Array"]();
                    for (i in $$$list) {
                        this.$self("i", $primitive((typeof i === "String" ? "Text" : "Number"), function() {
                            return i;
                        }));
                        if ($$$list.hasOwnProperty(i)) {
                            this.$self("slit", $$$list[i]);
                            (function() {
                                $$$2();
                                return (function() {
                                    if (this.$self("slit", 21).$values["Instance"]().$self("observed").$values["Boolean"]()) {
                                        return (function() {
                                            return (function() {
                                                this.$self("observers", 22).$types = $$$3.$types;
                                                this.$self("observers", 22).$values = $$$3.$values;
                                                return this.$self("observers", 22);
                                            }.call(this));;

                                        }.bind(this)());
                                    }
                                }.bind(this)());;;

                            }.bind(this)());
                        }
                    }
                }.bind(this)());
                (function() {
                    if (this.$self("observers", 25).$values["Boolean"]()) {
                        return (function() {
                            this.$self("var", "pickSlit", $$$7());
                            (function(val) {
                                this.$parent.$values["Instance"]().$self("positions").$types = Object.create(val.$types);
                                this.$parent.$values["Instance"]().$self("positions").$values = Object.create(val.$values);
                                return this.$parent.$values["Instance"]().$self("positions");
                            }.call(this, $concat(this.$parent.$values["Instance"]().$self("positions"), $$$8, 27)));
                            this.$self("var", "slit", this.$self("slits", 28).$substr((this.$self("pickSlit", 28).$values["Number"] || this.$self("pickSlit", 28).$values["Text"])()));
                            return $$$9();;;;;
                        }.bind(this)());
                    } else {
                        return (function() {
                            this.$self("var", "prev", $$$10);
                            return $$$15();;;
                        }.bind(this)());
                    }
                }.bind(this)());
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
        }.bind($newParent(this))));
        this.$self("public", "getPosition", /* Starting Scope:2 */ $primitive("Scope", function() {
            return function() {
                var $returnMulti = [],
                    $temp, $val;
                var $$$0 = function() {
                    return (List.$values["Instance"]().random.$values["Scope"]()(this.$parent.$values["Instance"]().$self("positions")))
                }.bind(this);
                var $$$1 = $primitive('Array', function() {
                    return [this.$self("position", 45)]
                }.bind(this));
                /* Begin ControlCode: 2 */
                this.$self("var", "position", $$$0());
                (function() {
                    this.$parent.$values["Instance"]().$self("positions").$types = $$$1.$types;
                    this.$parent.$values["Instance"]().$self("positions").$values = $$$1.$values;
                    return this.$parent.$values["Instance"]().$self("positions");
                }.call(this));
                if (typeof $returnMulti === "undefined") {
                    var $returnMulti = [];
                }
                $returnMulti.push(this.$self("position", 46));
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
        }.bind($newParent(this))));
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
$root.$self("var", "observer", $$$0());
$root.$self("var", "slits", $$$3);
$root.$self("var", "resultPositions", $$$5());
$root.$self("var", "electron", $$$6);
$$$9();
(function() {
    this.$self("var", "index", "");
    this.$self("var", "value", null);
    var name, $$$list = this.$self("resultPositions", 60).$values["Array"]();
    for (index in $$$list) {
        this.$self("index", $primitive((typeof index === "String" ? "Text" : "Number"), function() {
            return index;
        }));
        if ($$$list.hasOwnProperty(index)) {
            this.$self("value", $$$list[index]);
            (function() {
                (function() {
                    this.$self("electron", 61).$types = $$$10().$types;
                    this.$self("electron", 61).$values = $$$10().$values;
                    return this.$self("electron", 61);
                }.call(this));
                $$$11();
                return (function() {
                    this.$self("resultPositions", 63).$substr((this.$self("index", 63).$values["Number"] || this.$self("index", 63).$values["Text"])()).$types = $$$12().$types;
                    this.$self("resultPositions", 63).$substr((this.$self("index", 63).$values["Number"] || this.$self("index", 63).$values["Text"])()).$values = $$$12().$values;
                    return this.$self("resultPositions", 63).$substr((this.$self("index", 63).$values["Number"] || this.$self("index", 63).$values["Text"])());
                }.call(this));;;;

            }.bind(this)());
        }
    }
}.bind(this)());
$$$13();