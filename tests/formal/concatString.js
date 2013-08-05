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

function $primitive(types, val) {
    var obj = {};
    if (typeof val === "object" && val.$types !== void 0) {
        return val;
    }
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
var Type = function Type(primitive) {
    //console.log("Primitive:", primitive);
    //console.log("Types:", primitive.$types);
    //console.log("Value:", primitive.valueOf());
    return primitive.$types;
}
var Console = (function Console() {
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
        write: {
            $types: ["Scope"],
            value: function() {
                return function write() {
                    var i = 0;
                    while (arguments[i] !== void 0) {
                        arguments[i] = arguments[i].value();
                        i += 1;
                    }
                    console.log.apply(null, Array.prototype.slice.call(arguments));
                }
            }
        },
        read: {
            $types: ["Scope"],
            value: function() {
                return function read(fn) {
                    rl.resume();
                    rl.on('line', callback(fn));
                }
            }
        }
    };
}());
var $concat = function $concat(a, b, line) {
    var result, shortest, i;
    if ((
        Type(a).indexOf("Text") === -1 ||
        Type(b).indexOf("Text") === -1) && (
        Type(a).indexOf("Array") === -1 ||
        Type(b).indexOf("Array") === -1)) {
        $runtimeError(line, "Both types must be the same (either string or array), got: %what%", Type(a) + " and " + Type(b));
    }
    if (Type(a).indexOf("Text") !== -1) {
        result = $primitive("Text", function(value) {
            return function() {
                return value;
            }
        }("" + a.value() + b.value()));
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
};
var $$$0 = $primitive('Text', function() {
    return "Expect:"
}.bind($root));
var $$$1 = $primitive('Text', function() {
    return "foobar"
}.bind($root));
var $$$2 = function() {
    return (Console.write.value()($$$0, $$$1))
}.bind($root);
var $$$3 = $primitive('Text', function() {
    return "Test:"
}.bind($root));
var $$$4 = $primitive('Text', function() {
    return "foo"
}.bind($root));
var $$$5 = $primitive('Text', function() {
    return "bar"
}.bind($root));
var $$$6 = function() {
    return (Console.write.value()($$$3, $concat($$$4, $$$5, 2)))
}.bind($root);; /* Begin ControlCode: 0 */
$$$2();
$$$6();