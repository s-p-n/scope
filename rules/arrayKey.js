module.exports = function arrayKey (a, b, c) {
    // [a]
    if (b === void 0) {
        return '[' + a + ']';
    }

    this.ext['$$$ArraySubstr']();
    // [a:c]
    if (c !== void 0) {
        this.ext['$$$ArraySubstr']();
        return '.substr(' + a + ', ' + c + ' + 1)';
    }
    // [b:]
    if (b === ':') {
        return '.substr(' + a + ')';
    }

    // [:b]
    return '.substr(0,' + b + ' + 1)';
}
