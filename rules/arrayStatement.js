module.exports = function arrayStatement(arr) {
    var ret;
    this.ext['$$$array']();
    if (arr.substr(0,3) === 'obj') {
        ret = '$$$array({'+arr.substr(3,arr.length)+'})'//'{' + arr.substr(3,arr.length) + '}';
    } else {
        ret = '$$$array([' + arr + '])';
    }
    return ret;
}
