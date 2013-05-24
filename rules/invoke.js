module.exports = function invoke (func, args, id) {
    if (args === void 0) {
        return '(' + func + '())';
    }
    if (args === '.') {
        return func + '.' + id;
    }
    return '(' + func + '(' + args + '))';
}
