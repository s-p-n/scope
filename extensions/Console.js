var Console = function Console () {
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
        write: function write () {
            console.log.apply(null, Array.prototype.slice.call(arguments));
        },
        read: function read (fn) {
            rl.resume();
            rl.on('line', callback(fn));
        }
    };
}();
