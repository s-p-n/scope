var Console = (function Console () {
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

    function printValues (Arr) {
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
                "Scope": function () {
                    return function write() {
                        var i = 0, result = [], subResult, key, val;
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
            value: function () {
                return function read (fn) {
                    rl.resume();
                    rl.on('line', callback(fn));
                }
            }
        }
    };
}());
