#!/usr/bin/env node
var $primitive = function $primitive(types, val) {
    var obj = {};
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
var $factorial = function $factorial(n) {
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
    return result;
} /// < Shims
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
        F.prototype = 0;
        return new F();
    }
};
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

function $arg(name, $default, value) {
    if (value === void 0) {
        value = $default;
    }
    return this.$self("protected", name, value);
};

function $newParent(parent) {
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

function $enforceType(type, term, line) {
    if (Type(term) === type) {
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
var Type = function Type(primitive) {
    //console.log("Primitive:", primitive);
    //console.log("Types:", primitive.$types);
    //console.log("Value:", primitive.valueOf());
    return primitive.$types;
}
var Console = function Console() {
    var rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.pause();

    function callback(fn) {
        return function cb(data) {
            rl.pause();
            fn(data.replace(/\n/g, ""));
        }
    }
    return {
        write: function write() {
            var i = 0;
            while (arguments[i] !== void 0) {
                //arguments[i] = arguments[i].valueOf();
                i += 1;
            }
            console.log.apply(null, Array.prototype.slice.call(arguments));
        },
        read: function read(fn) {
            rl.resume();
            rl.on('line', callback(fn));
        }
    };
}();
var $compare = function $compare(a, b) {
    if ((typeof a) !== (typeof b)) {
        return false;
    }

    var equals = function(x) {
        var p;
        for (p in this) {
            if (typeof(x[p]) == 'undefined') {
                return false;
            }
            if (this[p]) {
                switch (typeof(this[p])) {
                    case 'object':
                        if (!equals.call(this[p], x[p])) {
                            return false;
                        }
                        break;
                    case 'function':
                        if (typeof(x[p]) == 'undefined' ||
                            (p != 'equals' && this[p].toString() != x[p].toString()))
                            return false;
                        break;
                    default:
                        if (this[p] !== x[p]) {
                            return false;
                        }
                }
            } else if (x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (typeof(this[p]) == 'undefined') {
                return false;
            }
        }

        return true;
    }

    return (typeof a === 'object') ? equals.call(a, b) : a === b;
};
var Text = function Text(primitive) {
    var newPrim = $primitive("Text", function() {
        console.log("Text.toString:", primitive);
        return primitive + "";
    });
    console.log("Text:", primitive, newPrim);
    return newPrim;
};
var $concat = function $concat(a, b, line) {
    var result, shortest, i;
    console.log("$concat:", Type(a), Type(b), a, b);
    if ((
        Type(a).indexOf("Text") === -1 ||
        Type(b).indexOf("Text") === -1) && (
        Type(a).indexOf("Array") === -1 ||
        Type(b).indexOf("Array") === -1)) {
        $runtimeError(line, "Both types must be the same (either string or array), got: %what%", Type(a) + " and " + Type(b));
    }
    if (Type(a).indexOf("Text") === -1) {
        //a = a.valueOf();
        //b = b.valueOf();
        result = a + b;
    } else {
        if (a instanceof Array) {
            for (i = 0; i < b.length; i += 1) {
                a.push(b[i]);
            }
            result = a;
        } else {
            if (a.length > b.length) {
                result = a;
                shortest = b;
            } else {
                result = b;
                shortest = a;
            }
            for (i in shortest) {
                if (i !== "length" && shortest.hasOwnProperty(i)) {
                    result[i] = shortest[i];
                    result.length += 1;
                }
            }
        }
    }
    console.log("result", result.valueOf(), result);
    return result;
};
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
}.bind($root));
var $$$4 = $primitive('Text', function() {
    return "Is foo 10?"
}.bind($root));
var $$$5 = $primitive('Text', function() {
    return this.$self("foo")
}.bind($root));
var $$$6 = $primitive('Number', function() {
    return 10
}.bind($root));
var $$$7 = $primitive('Text', function() {
    return "Yes"
}.bind($root));
var $$$8 = $primitive('Text', function() {
    return "No, foo is "
}.bind($root));
var $$$9 = $primitive('Text', function() {
    return this.$self("foo")
}.bind($root));
var $$$10 = function() {
    return (Text($$$9))
}.bind($root);
var $$$11 = $primitive('Text', function() {
    return "."
}.bind($root));
var $$$12 = $primitive('Text', function() {
    return (function() {
        if ($compare($$$5, $$$6)) {
            return (function() {
                return $$$7;
            }.bind(this)());
        } else {
            return (function() {
                return $concat($concat($$$8, $$$10(), 8), $$$11, 8);
            }.bind(this)());
        }
    }.bind(this)())
}.bind($root));
var $$$13 = function() {
    return (Console.write($$$4, $$$12))
}.bind($root);
var $$$14 = $primitive('Text', function() {
    return "Type of foo:"
}.bind($root));
var $$$15 = $primitive('Text', function() {
    return this.$self("foo")
}.bind($root));
var $$$16 = function() {
    return (Type($$$15))
}.bind($root);
var $$$17 = function() {
    return (Console.write($$$14, $$$16()))
}.bind($root);; /* Begin ControlCode: 0 */
this.$self("var", "foo", function foo() {
    /* Begin ControlCode: 0 */
    return $primitive("Number", function() {
        return $$$0 + $$$1 * $$$2 / $factorial(($$$3));
    });
}.bind($newParent(this))());
$$$13();
$$$17();