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
};
var Text = function Text(primitive) {
    return primitive.toString();
}
var Scope = (function() {
    return {
        extend: function extend(extended, extendee, parent) {
            var result;
            extendee = extendee.unbind();
            extended = extended.bind($newParent(parent));
            result = function() {
                var i, access;
                var extension = extended.apply(this, arguments);
                this.$self("protected", "extended", extension);
                for (i in extension.$access) {
                    access = extension.$access[i]
                    if (access === "private") {
                        continue;
                    }
                    this.$self(access, i, extension.$property[i]);
                }
                return extendee.apply(this, arguments);
            }.bind($newParent(parent));
            result.name = extendee.name;
            return result;
        }
    }
}());; /* Begin ControlCode: 0 */
this.$self("var", "Animal", /* Starting Scope:1 */ function() {
    this.$arg("name", "", arguments[0]);
    /* Begin ControlCode: 1 */
    this.$self("protected", "move", /* Starting Scope:2 */ function() {
        this.$arg("meters", 0, arguments[0]);
        /* Begin ControlCode: 2 */ (Console.write($concat($concat($concat($enforceType("instance", this.$parent, 3).$self("name"), " moved ", 3), (Text(this.$self("meters"))), 3), "m.", 3)));
        return this;
    }.bind($newParent(this)));
    return this;
}.bind($newParent(this)));
this.$self("var", "Snake", (Scope.extend(this.$self("Animal"), /* Starting Scope:1 */ function() {
    /* Begin ControlCode: 1 */
    this.$self("public", "move", /* Starting Scope:2 */ function() {
        /* Begin ControlCode: 2 */ (Console.write("Slithering..."));
        ($enforceType("instance", $enforceType("instance", this.$parent, 9).$self("extended"), 9).$self("move")(5));
        return this;
    }.bind($newParent(this)));
    return this;
}.bind($newParent(this)))));
this.$self("var", "Horse", (Scope.extend(this.$self("Animal"), /* Starting Scope:1 */ function() {
    /* Begin ControlCode: 1 */
    this.$self("public", "move", /* Starting Scope:2 */ function() {
        /* Begin ControlCode: 2 */ (Console.write("Galloping..."));
        ($enforceType("instance", $enforceType("instance", this.$parent, 15).$self("extended"), 15).$self("move")(45));
        return this;
    }.bind($newParent(this)));
    return this;
}.bind($newParent(this)))));
this.$self("var", "sam", (this.$self("Snake")('Sammy the Python')));
this.$self("var", "tom", (this.$self("Horse")('Tommy the Palomino')));
($enforceType("instance", this.$self("sam"), 20).$self("move")());
($enforceType("instance", this.$self("tom"), 21).$self("move")());