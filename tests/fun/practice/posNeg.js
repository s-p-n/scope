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
var $$$0 = $primitive('Number', function() {
    return 1
}.bind($root));
var $$$1 = $primitive('Number', function() {
    return 1
}.bind($root));
var $$$2 = $primitive('Boolean', function() {
    return false
}.bind($root));
var $$$3 = function() {
    return (this.$self("posNeg").$values["Scope"]()($$$0, $primitive("Number", function(value) {
        return function() {
            return value;
        }
    }(-$$$1.$values["Number"]())), $$$2))
}.bind($root);
var $$$4 = function() {
    return (print.$values["Scope"]()($$$3()))
}.bind($root);
var $$$5 = $primitive('Number', function() {
    return 1
}.bind($root));
var $$$6 = $primitive('Number', function() {
    return 1
}.bind($root));
var $$$7 = $primitive('Boolean', function() {
    return false
}.bind($root));
var $$$8 = function() {
    return (this.$self("posNeg").$values["Scope"]()($primitive("Number", function(value) {
        return function() {
            return value;
        }
    }(-$$$5.$values["Number"]())), $$$6, $$$7))
}.bind($root);
var $$$9 = function() {
    return (print.$values["Scope"]()($$$8()))
}.bind($root);
var $$$10 = $primitive('Number', function() {
    return 4
}.bind($root));
var $$$11 = $primitive('Number', function() {
    return 5
}.bind($root));
var $$$12 = $primitive('Boolean', function() {
    return true
}.bind($root));
var $$$13 = function() {
    return (this.$self("posNeg").$values["Scope"]()($primitive("Number", function(value) {
        return function() {
            return value;
        }
    }(-$$$10.$values["Number"]())), $primitive("Number", function(value) {
        return function() {
            return value;
        }
    }(-$$$11.$values["Number"]())), $$$12))
}.bind($root);
var $$$14 = function() {
    return (print.$values["Scope"]()($$$13()))
}.bind($root);
var $$$15 = $primitive('Number', function() {
    return 4
}.bind($root));
var $$$16 = $primitive('Number', function() {
    return 5
}.bind($root));
var $$$17 = $primitive('Boolean', function() {
    return false
}.bind($root));
var $$$18 = function() {
    return (this.$self("posNeg").$values["Scope"]()($primitive("Number", function(value) {
        return function() {
            return value;
        }
    }(-$$$15.$values["Number"]())), $primitive("Number", function(value) {
        return function() {
            return value;
        }
    }(-$$$16.$values["Number"]())), $$$17))
}.bind($root);
var $$$19 = function() {
    return (print.$values["Scope"]()($$$18()))
}.bind($root);
var $$$20 = $primitive('Number', function() {
    return 4
}.bind($root));
var $$$21 = $primitive('Number', function() {
    return 5
}.bind($root));
var $$$22 = $primitive('Boolean', function() {
    return false
}.bind($root));
var $$$23 = function() {
    return (this.$self("posNeg").$values["Scope"]()($$$20, $primitive("Number", function(value) {
        return function() {
            return value;
        }
    }(-$$$21.$values["Number"]())), $$$22))
}.bind($root);
var $$$24 = function() {
    return (print.$values["Scope"]()($$$23()))
}.bind($root);
var $$$25 = $primitive('Number', function() {
    return 4
}.bind($root));
var $$$26 = $primitive('Number', function() {
    return 5
}.bind($root));
var $$$27 = $primitive('Boolean', function() {
    return false
}.bind($root));
var $$$28 = function() {
    return (this.$self("posNeg").$values["Scope"]()($$$25, $$$26, $$$27))
}.bind($root);
var $$$29 = function() {
    return (print.$values["Scope"]()($$$28()))
}.bind($root);; /* Begin ControlCode: 0 */
$root.$self("var", "posNeg", /* Starting Scope:1 */ $primitive("Scope", function() {
    return function() {
        var $returnMulti = [],
            $temp;
        var $$$0 = $primitive('Number', function() {
            return 0
        }.bind(this));
        var $$$1 = $primitive('Number', function() {
            return 0
        }.bind(this));
        var $$$2 = $primitive('Number', function() {
            return 0
        }.bind(this));
        var $$$3 = $primitive('Number', function() {
            return 0
        }.bind(this));
        var $$$4 = $primitive('Number', function() {
            return 0
        }.bind(this));
        var $$$5 = $primitive('Number', function() {
            return 0
        }.bind(this));
        var $$$6 = $primitive('Number', function() {
            return 0
        }.bind(this));
        var $$$7 = $primitive('Number', function() {
            return 0
        }.bind(this));
        var $$$8 = $primitive('Boolean', function() {
            return false
        }.bind(this));
        this.$arg("a", "$$$6", arguments[0]);
        this.$arg("b", "$$$7", arguments[1]);
        this.$arg("negative", "$$$8", arguments[2]);
        /* Begin ControlCode: 1 */
        if (typeof $returnMulti === "undefined") {
            var $returnMulti = [];
        }
        $returnMulti.push((function() {
            if (this.$self("negative").$values["Boolean"]()) {
                return (function() {
                    return $primitive("Boolean", function(val) {
                        return function() {
                            return val;
                        }
                    }($primitive("Boolean", function(val) {
                        return function() {
                            return val;
                        }
                    }(this.$self("a").$values["Number"]() < $$$0.$values["Number"]())).$values["Boolean"]() && $primitive("Boolean", function(val) {
                        return function() {
                            return val;
                        }
                    }(this.$self("b").$values["Number"]() < $$$1.$values["Number"]())).$values["Boolean"]()));;
                }.bind(this)());
            } else {
                return (function() {
                    return $primitive("Boolean", function(val) {
                        return function() {
                            return val;
                        }
                    }(($primitive("Boolean", function(val) {
                        return function() {
                            return val;
                        }
                    }($primitive("Boolean", function(val) {
                        return function() {
                            return val;
                        }
                    }(this.$self("a").$values["Number"]() < $$$2.$values["Number"]())).$values["Boolean"]() && $primitive("Boolean", function(val) {
                        return function() {
                            return val;
                        }
                    }(this.$self("b").$values["Number"]() >= $$$3.$values["Number"]())).$values["Boolean"]()))).$values["Boolean"]() || ($primitive("Boolean", function(val) {
                        return function() {
                            return val;
                        }
                    }($primitive("Boolean", function(val) {
                        return function() {
                            return val;
                        }
                    }(this.$self("b").$values["Number"]() < $$$4.$values["Number"]())).$values["Boolean"]() && $primitive("Boolean", function(val) {
                        return function() {
                            return val;
                        }
                    }(this.$self("a").$values["Number"]() >= $$$5.$values["Number"]())).$values["Boolean"]()))).$values["Boolean"]()));;
                }.bind(this)());
            }
        }.bind(this)()));
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
$$$4();
$$$9();
$$$14();
$$$19();
$$$24();
$$$29();