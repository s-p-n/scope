var Console = (function Console () {
    var rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.pause();
    function callback(fn) {
        return function cb(data) {
            rl.pause();
            data = data.replace(/\n/g, "");
            fn.$values["Scope"]()($primitive("Text", function () {
                return data;
            }));
        }
    }
    var t = 0;
    function printValues (Arr) {
        var result = {}, key, val, i;
        t += 1;
        //console.log("printing value:", t);
        if (t > 10) {
            //console.log("too big:", Arr);
            t -= 1;
            return "..";
        }
        for (key in Arr.$values) {
            val = Arr.$values[key]();
            if (key === "Array" || key === "Instance") {
                result[key] = [];
                for (i in val) {
                    if (val.hasOwnProperty(i)) {
                        result[key][i] = printValues(val[i]);
                    }
                }
                continue;
            }
            result[key] = val;
        }
        t -= 1;
        return result;
    }

    return {
        $types: ["Instance"],
        $values: {
            "Instance": function () {
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
                        $values: {
                            "Scope": function () {
                                return function read (fn) {
                                    rl.resume();
                                    rl.on('line', callback(fn));
                                }
                            }
                        }
                    },
                    printValues: {
                        $types: ["Scope"],
                        $values: {
                            "Scope": function () {
                                return printValues;
                            }
                        }
                    }
                }
            }
        }
    };
}());
