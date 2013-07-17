#!/usr/bin/env node
var root = (typeof(window) !== "undefined") ?
    window :
    (
(typeof(root) !== "undefined") ?
    root : {});
var Console = function() {
    var readline = require('readline');

    function callback(fn) {
        return function cb(data) {
            fn(data.replace(/\n/g, ""));
        }
    }
    return {
        write: function write() {
            console.log.apply(null, Array.prototype.slice.call(arguments, arguments));
        },
        read: function read(fn) {
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.on('line', callback(fn));
            rl.resume();
        }
    };
}();
var $$$runtimeError = function(line, msg, what) {
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
if (typeof Object.create === 'undefined') {
    Object.create = function(o) {
        function F() {};
        F.prototype = 0;
        return new F();
    }
}

var $$$array = (function() {
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
}());;
(function() {
    function $$$self0(access, name, value) {
        return void 0 === value ?
            ($$$parent0[access] || ($$$runtimeError(name, '%default%Reference to undefined property or variable %red%%what%%default%', access))) : (
            $$$parent0.access[name] = access,
            $$$parent0[name] = value,
            value)
    };
    var $$$parent0 = {
        access: {
            parent: "private"
        },
        parent: null
    };
    ( /* Starting Scope:1 */ (function() {
        var some = ((arguments[0] === void 0) ? (void 0) : arguments[0]),
            args = ((arguments[1] === void 0) ? (void 0) : arguments[1]),
            here = ((arguments[2] === void 0) ? (void 0) : arguments[2]);

        function $$$self1(access, name, value) {
            return void 0 === value ?
                ($$$parent1[access] || ($$$runtimeError(name, '%default%Reference to undefined property or variable %red%%what%%default%', access))) : (
                $$$parent1.access[name] = access,
                $$$parent1[name] = value,
                value)
        };
        var $$$parent1 = {
            access: {
                parent: "private"
            },
            parent: $$$parent0
        };
        ((
        (
            Type(Console) !== 'instance') ?
            ($$$runtimeError(3, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Console) + '%default% given', Console)) :
            Console).write((
        (
            typeof some === "undefined" || root.some === some) ?
            $$$self1("some", 3) :
            some), (
        (
            typeof args === "undefined" || root.args === args) ?
            $$$self1("args", 3) :
            args), (
        (
            typeof here === "undefined" || root.here === here) ?
            $$$self1("here", 3) :
            here)));
        return (function() {
            var i, ret = {};
            for (i in $$$parent1.access) {
                if ($$$parent1.access[i] === 'public') {
                    ret[i] = $$$parent1[i];
                }
            }
            return ret;
        }());
    })("foo", "bar", "baz"));
    var Foo = /* Starting Scope:1 */ (function() {
        function $$$self1(access, name, value) {
            return void 0 === value ?
                ($$$parent1[access] || ($$$runtimeError(name, '%default%Reference to undefined property or variable %red%%what%%default%', access))) : (
                $$$parent1.access[name] = access,
                $$$parent1[name] = value,
                value)
        };
        var $$$parent1 = {
            access: {
                parent: "private"
            },
            parent: $$$parent0
        };
        $$$self1("private", "baz", "woohoo!");
        $$$self1("public", "bar", "testing properties..");
        $$$self1("public", "getBaz", /* Starting Scope:2 */ (function() {
            function $$$self2(access, name, value) {
                return void 0 === value ?
                    ($$$parent2[access] || ($$$runtimeError(name, '%default%Reference to undefined property or variable %red%%what%%default%', access))) : (
                    $$$parent2.access[name] = access,
                    $$$parent2[name] = value,
                    value)
            };
            var $$$parent2 = {
                access: {
                    parent: "private"
                },
                parent: $$$parent1
            };
            return (
            (
                Type($$$parent1) !== 'instance') ?
                ($$$runtimeError(11, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type($$parent1) + '%default% given', $$$parent1)) :
                $$$parent1).baz;
            return (function() {
                var i, ret = {};
                for (i in $$$parent2.access) {
                    if ($$$parent2.access[i] === 'public') {
                        ret[i] = $$$parent2[i];
                    }
                }
                return ret;
            }());
        }));
        return (function() {
            var i, ret = {};
            for (i in $$$parent1.access) {
                if ($$$parent1.access[i] === 'public') {
                    ret[i] = $$$parent1[i];
                }
            }
            return ret;
        }());
    });
    var bar = /* Starting Scope:1 */ (function() {
        function $$$self1(access, name, value) {
            return void 0 === value ?
                ($$$parent1[access] || ($$$runtimeError(name, '%default%Reference to undefined property or variable %red%%what%%default%', access))) : (
                $$$parent1.access[name] = access,
                $$$parent1[name] = value,
                value)
        };
        var $$$parent1 = {
            access: {
                parent: "private"
            },
            parent: $$$parent0
        };
        ((
        (
            Type(Console) !== 'instance') ?
            ($$$runtimeError(17, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Console) + '%default% given', Console)) :
            Console).write("What is your name?"));
        return "Name is " + ((
        (
            Type(Console) !== 'instance') ?
            ($$$runtimeError(18, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Console) + '%default% given', Console)) :
            Console).read());
        return (function() {
            var i, ret = {};
            for (i in $$$parent1.access) {
                if ($$$parent1.access[i] === 'public') {
                    ret[i] = $$$parent1[i];
                }
            }
            return ret;
        }());
    });
    var foo = ((
    (
        typeof Foo === "undefined" || root.Foo === Foo) ?
        $$$self4("Foo", 22) :
        Foo)());
    ((
    (
        Type(Console) !== 'instance') ?
        ($$$runtimeError(23, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Console) + '%default% given', Console)) :
        Console).write("foo is an", (Type((
    (
        typeof foo === "undefined" || root.foo === foo) ?
        $$$self4("foo", 23) :
        foo))), "of Foo."));
    ((
    (
        Type(Console) !== 'instance') ?
        ($$$runtimeError(25, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Console) + '%default% given', Console)) :
        Console).write("foo.baz is:", ((
    (
        Type((
    (
        typeof foo === "undefined" || root.foo === foo) ?
        $$$self4("foo", 25) :
        foo)) !== 'instance') ?
        ($$$runtimeError(25, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type((
    (
        typeof foo === "undefined" || root.foo === foo) ?
        $$self4("foo", 25) :
        foo)) + '%default% given', (
    (
        typeof foo === "undefined" || root.foo === foo) ?
        $$$self4("foo", 25) :
        foo))) :
        (
    (
        typeof foo === "undefined" || root.foo === foo) ?
        $$$self4("foo", 25) :
        foo)).getBaz())));
    var baz = $$$array([1, 2, 3]);
    (
    (
        Type((
    (
        typeof foo === "undefined" || root.foo === foo) ?
        $$$self4("foo", 28) :
        foo)) !== 'instance') ?
        ($$$runtimeError(28, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type((
    (
        typeof foo === "undefined" || root.foo === foo) ?
        $$self4("foo", 28) :
        foo)) + '%default% given', (
    (
        typeof foo === "undefined" || root.foo === foo) ?
        $$$self4("foo", 28) :
        foo))) :
        (
    (
        typeof foo === "undefined" || root.foo === foo) ?
        $$$self4("foo", 28) :
        foo)).hack = /* Starting Scope:1 */ (function() {
        function $$$self1(access, name, value) {
            return void 0 === value ?
                ($$$parent1[access] || ($$$runtimeError(name, '%default%Reference to undefined property or variable %red%%what%%default%', access))) : (
                $$$parent1.access[name] = access,
                $$$parent1[name] = value,
                value)
        };
        var $$$parent1 = {
            access: {
                parent: "private"
            },
            parent: $$$parent0
        };
        return (
        (
            typeof this === "undefined" || root.this === this) ?
            $$$self5("this", 29) :
            this);
        return (function() {
            var i, ret = {};
            for (i in $$$parent1.access) {
                if ($$$parent1.access[i] === 'public') {
                    ret[i] = $$$parent1[i];
                }
            }
            return ret;
        }());
    });
    ((
    (
        Type(Console) !== 'instance') ?
        ($$$runtimeError(32, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Console) + '%default% given', Console)) :
        Console).write(((
    (
        Type((
    (
        typeof foo === "undefined" || root.foo === foo) ?
        $$$self5("foo", 32) :
        foo)) !== 'instance') ?
        ($$$runtimeError(32, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type((
    (
        typeof foo === "undefined" || root.foo === foo) ?
        $$self5("foo", 32) :
        foo)) + '%default% given', (
    (
        typeof foo === "undefined" || root.foo === foo) ?
        $$$self5("foo", 32) :
        foo))) :
        (
    (
        typeof foo === "undefined" || root.foo === foo) ?
        $$$self5("foo", 32) :
        foo)).hack())));
}());