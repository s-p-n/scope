#!/usr/bin/env node
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
    return function $$$array(arr) {
        var n, i;
        if (arr instanceof Array) {
            return arr;
        }
        n = assocArray();
        for (i in arr) {
            n[i] = arr[i];
            n.length += 1;
        }
        return n;
    }
}());
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
        "\033[1m on line: \033[31m" + line + '\033[0m'
    );
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
};; /* Begin ControlCode: 0 */
$root.$self("var", "array", $array({
    "a": 1,
    "b": 2,
    "c": 3
}));
(function() {
    this.$self("var", "name", "");
    this.$self("var", "val", null);
    var name, $$$list = this.$self("array");
    for (name in $$$list) {
        this.$self("name", name);
        if ($$$list.hasOwnProperty(name)) {
            this.$self("val", $$$list[name]);
            (function() {
                return (Console.write(this.$self("name"), "is", this.$self("val")));

            }.bind(this)());
        }
    }
}.bind(this)());
(Console.write((function() {
    var ret;
    ret = this.$self("array")['b'];
    return ret;
}.bind(this)())));
(Console.write("Say something and press enter.."));
$root.$self("var", "data", (Console.read( /* Starting Scope:1 */ function() {
    this.$arg("data", "", arguments[0]);
    /* Begin ControlCode: 1 */
    (function() {
        if ($compare(this.$self("data"), "")) {
            return (function() {
                return (Console.write("You didn't say nothin :("));
            }.bind(this)());
        } else {
            return (function() {
                return (Console.write("data:", this.$self("data")));
            }.bind(this)());
        }
    }.bind(this)());
    return this;
}.bind($newParent($root)))));