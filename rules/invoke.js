module.exports = function invoke (func, args) {
    if (args === void 0) {
        return '(' + func + '())';
    }

    return '(' + func + '(' + args + '))';
}
