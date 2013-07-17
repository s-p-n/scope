#!/usr/bin/env node
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
var $root = $newParent(this);
this.$access = $root.access;
this.$self = $root.$self;
this.$property = $root.$property;
this.$parent = $root.$parent;
this.$self = $root.$self;
this.$arg = $root.$arg;
var $runtimeError = function $runtimeError(line, msg, what) {
    throw new Error(
        "\033[31m\033[1m Runtime Error:\033[0m\033[1m " +
        msg.replace(/%what%/g, what).replace(/%red%/g, '\033[31m').replace(/%default%/g, '\033[0m\033[1m').replace(/%green%/g, '\033[32m') +
        "\033[1m on line: \033[31m" + line + '\033[0m');
}
var Type = function Type(primitive) {
    if (primitive instanceof Array) {
        return "array";
    }
    switch (typeof primitive) {
        case "string":
            return "text";
        case "function":
            return "scope";
        case "object":
            return "instance";
    }
    return typeof primitive;
}
var Console = function() {
    var readline = require('readline');
    var rl = readline.createInterface({
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
            console.log.apply(null, Array.prototype.slice.call(arguments, arguments));
        },
        read: function read(fn) {
            rl.on('line', callback(fn));
            rl.resume();
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
    return primitive.toString();
}
var $concat = function $concat(a, b, line) {
    var result, shortest, i;
    if (!(Type(a) === "text" && Type(b) === "text") && !(Type(a) === "array" && Type(b) === "array")) {
        $runtimeError(line, "Both types must be the same (either string or array), got: %what%", Type(a) + " and " + Type(b));
    }
    if (Type(a) === "text") {
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
    return result;
};; /* Begin ControlCode: 0 */
this.$self("var", "foo", function foo() {
    /* Begin ControlCode: 0 */
    return 8 + 120 * 2 / $factorial((5));
}.bind($newParent(this))());
(Console.write("Is foo the number 10?", $compare(this.$self("foo"), 10)));
(Console.write($concat("foo is ", (Text(this.$self("foo"))), 4)));
this.$self("public", "bar", "hello, properties!");
this.$self("var", "foo", "test");
(Console.write($concat("bar is ", this.$self("bar"), 9)));
(Console.write("foo is now:", this.$self("foo")));