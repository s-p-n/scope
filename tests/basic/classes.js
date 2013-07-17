#!/usr/bin/env node
var root = (typeof(window) !== "undefined") ?
    window :
    (
    (typeof(root) !== "undefined") ?
    root : {}
);
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
var $$$concat = function(a, b, line) {
    var result, shortest, i;
    if (!(Type(a) === "text" && Type(b) === "text") && !(Type(a) === "array" && Type(b) === "array")) {
        $$$runtimeError(line, "Both types must be the same (either string or array), got: %what%", Type(a) + " and " + Type(b));
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
    var extendCache = {
        extendedRef: [],
        extendedStor: [],
        extendeeRef: [],
        extendeeStor: []
    };
    var findProtected = function findProtected(id) {
        return new RegExp("\\$\\$\\$self" + id + '\\(\\"protected\\"', "g");
    }
    var findId = /\$\$\$self([0-9]+)\(/;
    var findArgs = function findArgs(id) {
        return new RegExp("\\/\\*\\@argumentStart" + id + "\\@\\*\\/");
    }
    return {
        extend: function extend(extended, extendee) {
            var extendee_id = extendee.toString().match(findId)[1];
            var extended_id = extended.toString().match(findId)[1];
            var cache_index = extendCache.extendedRef.indexOf(extended);
            var extended_code;
            var extendee_code;
            var gotCache = false;
            if (cache_index > -1) {
                //console.log("Loaded extended from cache.");
                gotCache = true;
                extended_code = extendCache.extendedStor[cache_index];
            } else {
                extended_code = '(' +
                    extended.
                toString().
                replace(
                    findProtected(extended_id),
                    "$$$$$$self" + extended_id + "(\"public\""
                ).
                replace(/\$/g, "$$$$") +
                    ')';
                extendCache.extendedRef.push(extended);
                extendCache.extendedStor.push(extended_code);
            }
            cache_index = extendCache.extendeeRef.indexOf(extendee);
            if (gotCache && cache_index > -1) {
                //console.loog("Loaded extendee from cache.");
                extendee_code = extendCache.extendeeStor[cache_index];
            } else {
                extendee_code = eval('(' +
                    extendee.toString().replace(
                        findArgs(extendee_id),
                        "/*@argumentStart" +
                        extendee_id +
                        "@*/\n$$$$$$self" +
                        extendee_id +
                        '("protected", "extended", ' +
                        extended_code +
                        '.apply($$$$$$self' +
                        extendee_id +
                        ', Array.prototype.slice.call(arguments, arguments)));'
                    ) +
                    ')');
                extendCache.extendeeRef.push(extendee);
                extendCache.extendeeStor.push(extendee_code);
            }

            return extendee_code;
        }
    }
}());;

function $$$self0(access, name, value) {
    return void 0 === value ?
        ($$$parent0[access] || ($$$runtimeError(name, '%default%Reference to undefined property or variable %red%%what%%default%', access))) : (
        $$$parent0.access[name] = access,
        $$$parent0[name] = value,
        value
    )
};
var $$$parent0 = {
    access: {
        parent: "private"
    },
    parent: null
};
/*@argumentStart0@*/
/*@argumentEnd0@*/
var Animal = /* Starting Scope:1 */ (function() {
    function $$$self1(access, name, value) {
        return void 0 === value ?
            ($$$parent1[access] || ($$$runtimeError(name, '%default%Reference to undefined property or variable %red%%what%%default%', access))) : (
            $$$parent1.access[name] = access,
            $$$parent1[name] = value,
            value
        )
    };
    var $$$parent1 = {
        access: {
            parent: "private"
        },
        parent: $$$parent0
    };
    /*@argumentStart1@*/
    $$$self1("protected", "name", ((arguments[0] === void 0) ? ("") : arguments[0]));
    /*@argumentEnd1@*/
    $$$self1("protected", "move", /* Starting Scope:2 */ (function() {
        function $$$self2(access, name, value) {
            return void 0 === value ?
                ($$$parent2[access] || ($$$runtimeError(name, '%default%Reference to undefined property or variable %red%%what%%default%', access))) : (
                $$$parent2.access[name] = access,
                $$$parent2[name] = value,
                value
            )
        };
        var $$$parent2 = {
            access: {
                parent: "private"
            },
            parent: $$$parent1
        };
        /*@argumentStart2@*/
        $$$self2("protected", "meters", ((arguments[0] === void 0) ? (0) : arguments[0]));
        /*@argumentEnd2@*/
        ((
            (
                Type(Console) !== 'instance'
            ) ?
            ($$$runtimeError(3, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Console) + '%default% given', Console)) :
            Console
        ).write($$$concat($$$concat($$$concat((
            (
                Type($$$parent1) !== 'instance'
            ) ?
            ($$$runtimeError(3, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type($$$parent1) + '%default% given', $$$parent1)) :
            $$$parent1
        ).name, " moved ", 3), (Text((
            (
                typeof meters === "undefined" || root.meters === meters
            ) ?
            $$$self2("meters", 3) :
            meters
        ))), 3), "m.", 3)));
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
var Snake = ((
    (
        Type(Scope) !== 'instance'
    ) ?
    ($$$runtimeError(6, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Scope) + '%default% given', Scope)) :
    Scope
).extend((
    (
        typeof Animal === "undefined" || root.Animal === Animal
    ) ?
    $$$self2("Animal", 6) :
    Animal
), /* Starting Scope:1 */ (function() {
    function $$$self1(access, name, value) {
        return void 0 === value ?
            ($$$parent1[access] || ($$$runtimeError(name, '%default%Reference to undefined property or variable %red%%what%%default%', access))) : (
            $$$parent1.access[name] = access,
            $$$parent1[name] = value,
            value
        )
    };
    var $$$parent1 = {
        access: {
            parent: "private"
        },
        parent: $$$parent0
    };
    /*@argumentStart1@*/
    /*@argumentEnd1@*/
    $$$self1("public", "move", /* Starting Scope:2 */ (function() {
        function $$$self2(access, name, value) {
            return void 0 === value ?
                ($$$parent2[access] || ($$$runtimeError(name, '%default%Reference to undefined property or variable %red%%what%%default%', access))) : (
                $$$parent2.access[name] = access,
                $$$parent2[name] = value,
                value
            )
        };
        var $$$parent2 = {
            access: {
                parent: "private"
            },
            parent: $$$parent1
        };
        /*@argumentStart2@*/
        /*@argumentEnd2@*/
        ((
            (
                Type(Console) !== 'instance'
            ) ?
            ($$$runtimeError(8, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Console) + '%default% given', Console)) :
            Console
        ).write("Slithering..."));
        ((
            (
                Type((
                    (
                        Type($$$parent1) !== 'instance'
                    ) ?
                    ($$$runtimeError(9, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type($$$parent1) + '%default% given', $$$parent1)) :
                    $$$parent1
                ).extended) !== 'instance'
            ) ?
            ($$$runtimeError(9, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type((
                (
                    Type($$$parent1) !== 'instance'
                ) ?
                ($$$runtimeError(9, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type($$$parent1) + '%default% given', $$$parent1)) :
                $$$parent1
            ).extended) + '%default% given', (
                (
                    Type($$$parent1) !== 'instance'
                ) ?
                ($$$runtimeError(9, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type($$$parent1) + '%default% given', $$$parent1)) :
                $$$parent1
            ).extended)) :
            (
                (
                    Type($$$parent1) !== 'instance'
                ) ?
                ($$$runtimeError(9, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type($$$parent1) + '%default% given', $$$parent1)) :
                $$$parent1
            ).extended
        ).move(5));
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
})));
var Horse = ((
    (
        Type(Scope) !== 'instance'
    ) ?
    ($$$runtimeError(12, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Scope) + '%default% given', Scope)) :
    Scope
).extend((
    (
        typeof Animal === "undefined" || root.Animal === Animal
    ) ?
    $$$self4("Animal", 12) :
    Animal
), /* Starting Scope:1 */ (function() {
    function $$$self1(access, name, value) {
        return void 0 === value ?
            ($$$parent1[access] || ($$$runtimeError(name, '%default%Reference to undefined property or variable %red%%what%%default%', access))) : (
            $$$parent1.access[name] = access,
            $$$parent1[name] = value,
            value
        )
    };
    var $$$parent1 = {
        access: {
            parent: "private"
        },
        parent: $$$parent0
    };
    /*@argumentStart1@*/
    /*@argumentEnd1@*/
    $$$self1("public", "move", /* Starting Scope:2 */ (function() {
        function $$$self2(access, name, value) {
            return void 0 === value ?
                ($$$parent2[access] || ($$$runtimeError(name, '%default%Reference to undefined property or variable %red%%what%%default%', access))) : (
                $$$parent2.access[name] = access,
                $$$parent2[name] = value,
                value
            )
        };
        var $$$parent2 = {
            access: {
                parent: "private"
            },
            parent: $$$parent1
        };
        /*@argumentStart2@*/
        /*@argumentEnd2@*/
        ((
            (
                Type(Console) !== 'instance'
            ) ?
            ($$$runtimeError(14, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Console) + '%default% given', Console)) :
            Console
        ).write("Galloping..."));
        ((
            (
                Type((
                    (
                        Type($$$parent1) !== 'instance'
                    ) ?
                    ($$$runtimeError(15, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type($$$parent1) + '%default% given', $$$parent1)) :
                    $$$parent1
                ).extended) !== 'instance'
            ) ?
            ($$$runtimeError(15, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type((
                (
                    Type($$$parent1) !== 'instance'
                ) ?
                ($$$runtimeError(15, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type($$$parent1) + '%default% given', $$$parent1)) :
                $$$parent1
            ).extended) + '%default% given', (
                (
                    Type($$$parent1) !== 'instance'
                ) ?
                ($$$runtimeError(15, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type($$$parent1) + '%default% given', $$$parent1)) :
                $$$parent1
            ).extended)) :
            (
                (
                    Type($$$parent1) !== 'instance'
                ) ?
                ($$$runtimeError(15, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type($$$parent1) + '%default% given', $$$parent1)) :
                $$$parent1
            ).extended
        ).move(45));
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
})));
var sam = ((
    (
        typeof Snake === "undefined" || root.Snake === Snake
    ) ?
    $$$self6("Snake", 18) :
    Snake
)('Sammy the Python'));
var tom = ((
    (
        typeof Horse === "undefined" || root.Horse === Horse
    ) ?
    $$$self6("Horse", 19) :
    Horse
)('Tommy the Palomino'));
((
    (
        Type((
            (
                typeof sam === "undefined" || root.sam === sam
            ) ?
            $$$self6("sam", 20) :
            sam
        )) !== 'instance'
    ) ?
    ($$$runtimeError(20, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type((
        (
            typeof sam === "undefined" || root.sam === sam
        ) ?
        $$$self6("sam", 20) :
        sam
    )) + '%default% given', (
        (
            typeof sam === "undefined" || root.sam === sam
        ) ?
        $$$self6("sam", 20) :
        sam
    ))) :
    (
        (
            typeof sam === "undefined" || root.sam === sam
        ) ?
        $$$self6("sam", 20) :
        sam
    )
).move());
((
    (
        Type((
            (
                typeof tom === "undefined" || root.tom === tom
            ) ?
            $$$self6("tom", 21) :
            tom
        )) !== 'instance'
    ) ?
    ($$$runtimeError(21, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type((
        (
            typeof tom === "undefined" || root.tom === tom
        ) ?
        $$$self6("tom", 21) :
        tom
    )) + '%default% given', (
        (
            typeof tom === "undefined" || root.tom === tom
        ) ?
        $$$self6("tom", 21) :
        tom
    ))) :
    (
        (
            typeof tom === "undefined" || root.tom === tom
        ) ?
        $$$self6("tom", 21) :
        tom
    )
).move());