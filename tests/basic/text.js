#!/usr/bin/env node
var Console = function() {
    return {
        write: function() {
            console.log.apply(null, Array.prototype.slice.call(arguments, arguments));
        },
        read: require('./Console').read,
    };
}();
var $$$runtimeError = function(line, msg, what) {
    throw new Error(
        "\033[31m\033[1m Runtime Error:\033[0m\033[1m " +
        msg.replace(/%what%/g, what).replace(/%red%/g, '\033[31m').replace(/%default%/g, '\033[0m\033[1m').replace(/%green%/g, '\033[32m') +
        "\033[1m on line: \033[31m" + line + '\033[0m');
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

    function self(o, e, f) {
        return void 0 === f ? selfProps[o] || (($$$runtimeError(e, '%default%Reference to undefined property or variable %red%%what%%default%', o))) : (selfProps.access[e] = o, selfProps[e] = f, f)
    };
var selfProps = {
    access: {
        parent: "private"
    },
    parent: null
};
var $$$parent0 = selfProps;
var msg = "What is your name?";
(((Type(Console) !== 'instance') ? ($$$runtimeError(2, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Console) + '%default% given', Console)) : Console).write(((typeof msg === "undefined" || root.msg === msg) ? self("msg", 2) : msg)));
var name = (((Type(Console) !== 'instance') ? ($$$runtimeError(3, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Console) + '%default% given', Console)) : Console).read());
(((Type(Console) !== 'instance') ? ($$$runtimeError(4, '%default%Only the %green%instance%default% type may contain properties, %red%' + Type(Console) + '%default% given', Console)) : Console).write("Well hello there,", ((typeof name === "undefined" || root.name === name) ? self("name", 4) : name)));