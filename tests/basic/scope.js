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

    function printValues(Arr) {
        var result = {}, key, val, i;
        for (key in Arr.$values) {
            val = Arr.$values[key]();
            if (key === "Array" || key === "Instance") {
                result[key] = [];
                for (i in val) {
                    if (val.hasOwnProperty(i)) {
                        result[key].push(printValues(val[i]));
                    }
                }
                continue;
            }
            result[key] = val;
        }
        return result;
    }

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
        }
    };
}());
var $$$0 = $primitive('Text', function() {
    return "foo"
}.bind($root));
var $$$1 = $primitive('Text', function() {
    return "bar"
}.bind($root));
var $$$2 = $primitive('Text', function() {
    return "baz"
}.bind($root));
var $$$3 = function() {
    return ( /* Starting Scope:1 */ $primitive("Scope", function() {
        return function() {
            var $returnMulti = [],
                $temp;
            $$$0 = function() {
                return (Console.write.$values["Scope"]()(this.$self("some"), this.$self("args"), this.$self("here")))
            }.bind(this);
            $$$1 = $primitive('Text', function() {
                return ""
            }.bind(this));
            $$$2 = $primitive('Text', function() {
                return ''
            }.bind(this));
            $$$3 = $primitive('Text', function() {
                return ""
            }.bind(this));
            this.$arg("some", "$$$1", arguments[0]);
            this.$arg("args", "$$$2", arguments[1]);
            this.$arg("here", "$$$3", arguments[2]);
            /* Begin ControlCode: 1 */
            $$$0();
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
    }.bind($newParent($root))).$values["Scope"]()($$$0, $$$1, $$$2))
}.bind($root);
var $$$4 = function() {
    return (this.$self("Foo").$values["Scope"]()())
}.bind($root);
var $$$5 = $primitive('Text', function() {
    return "foo is an"
}.bind($root));
var $$$6 = function() {
    return (Type.$values["Scope"]()(this.$self("foo")))
}.bind($root);
var $$$7 = $primitive('Text', function() {
    return "of Foo."
}.bind($root));
var $$$8 = function() {
    return (Console.write.$values["Scope"]()($$$5, $$$6(), $$$7))
}.bind($root);
var $$$9 = $primitive('Text', function() {
    return "foo.baz is:"
}.bind($root));
var $$$10 = function() {
    return (this.$self("foo").$values["Instance"]().$self("getBaz").$values["Scope"]()())
}.bind($root);
var $$$11 = function() {
    return (Console.write.$values["Scope"]()($$$9, $$$10()))
}.bind($root);; /* Begin ControlCode: 0 */
$$$3();
$root.$self("var", "Foo", /* Starting Scope:1 */ $primitive("Scope", function() {
    return function() {
        var $returnMulti = [],
            $temp;
        $$$0 = $primitive('Text', function() {
            return "woohoo!"
        }.bind(this));
        $$$1 = $primitive('Text', function() {
            return "testing properties.."
        }.bind(this));
        /* Begin ControlCode: 1 */
        this.$self("private", "baz", $$$0);
        this.$self("public", "bar", $$$1);
        this.$self("public", "getBaz", /* Starting Scope:2 */ $primitive("Scope", function() {
            return function() {
                var $returnMulti = [],
                    $temp;

                /* Begin ControlCode: 2 */
                if (typeof $returnMulti === "undefined") {
                    var $returnMulti = [];
                }
                $returnMulti.push(this.$parent.$values["Instance"]().$self("baz"));
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
$root.$self("var", "foo", $$$4());
$$$8();
$$$11();