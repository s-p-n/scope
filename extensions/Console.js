var Console = function () {
    return {
        write: function () {
            console.log.apply(null, Array.prototype.slice.call(arguments, arguments));
        },
        read: require('./Console').read,
    };
}();
