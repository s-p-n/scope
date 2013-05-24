module.exports = function arrayStatement(arr) {
    this.ext['$$$array']();
    if (arr.substr(0,3) === 'obj') {
        return '$$$array({'+arr.substr(3,arr.length)+'})'//'{' + arr.substr(3,arr.length) + '}';
    }
    return '$$$array([' + arr + '])';
}
