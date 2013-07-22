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
}();; /* Begin ControlCode: 0 */
( /* Starting Scope:1 */ function() {
    this.$arg("some", "", arguments[0]);
    this.$arg("args", "", arguments[1]);
    this.$arg("here", "", arguments[2]);
    /* Begin ControlCode: 1 */
    (Console.write(this.$self("some"), this.$self("args"), this.$self("here")));
    return this;
}.bind($newParent($root))("foo", "bar", "baz"));
$root.$self("var", "Foo", /* Starting Scope:1 */ function() {
    /* Begin ControlCode: 1 */
    this.$self("private", "baz", "woohoo!");
    this.$self("public", "bar", "testing properties..");
    this.$self("public", "getBaz", /* Starting Scope:2 */ function() {
        /* Begin ControlCode: 2 */
        return $enforceType("instance", this.$parent, 11).$self("baz");
        return this;
    }.bind($newParent(this)));
    return this;
}.bind($newParent($root)));
$root.$self("var", "bar", /* Starting Scope:1 */ function() {
    /* Begin ControlCode: 1 */
    (Console.write("What is your name?"));
    return "Name is " + (Console.read());
    return this;
}.bind($newParent($root)));
$root.$self("var", "foo", (this.$self("Foo")()));
(Console.write("foo is an", (Type(this.$self("foo"))), "of Foo."));
(Console.write("foo.baz is:", ($enforceType("instance", this.$self("foo"), 25).$self("getBaz")())));