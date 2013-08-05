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
    return {
        write: {
            $types: ["Scope"],
            value: function () {
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
            value: function () {
                return function read (fn) {
                    rl.resume();
                    rl.on('line', callback(fn));
                }
            }
        }
    };
}());
