var Console = function () {
    var readline = require('readline');
    
    function callback(fn) {
        return function cb(data) {
            fn(data.replace(/\n/g, ""));
        }
    }
    return {
        write: function write () {
            console.log.apply(null, Array.prototype.slice.call(arguments, arguments));
        },
        read: function read (fn) {
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.on('line', callback(fn));
            rl.resume();
        }
    };
}();
