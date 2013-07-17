var Console = function () {
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
        write: function write () {
            console.log.apply(null, Array.prototype.slice.call(arguments, arguments));
        },
        read: function read (fn) {
            rl.on('line', callback(fn));
            rl.resume();
        }
    };
}();
