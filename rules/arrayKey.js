module.exports = function arrayKey (a, b, c) {
    // [a:c]
    if (c !== void 0) {
        return '.substr(' + a + ', ' + c + ')';
    }

    // [a]
    if (b === void 0) {
        return a;
    }

    // [b:]
    if (b === ':') {
        return '.substr(' + a + ')';
    }

    // [:b]
    return '.substr(0,' + b + ')';
}
