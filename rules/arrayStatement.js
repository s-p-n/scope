module.exports = function arrayStatement(arr) {
    var ret;
    this.ext['$array']();
    if (arr.substr(0,6) === '$$$obj') {
        ret = this.loadTemplate('arrayStatement_associative', {
        	array: arr.substr(6, arr.length)
        });
    } else {
        ret = this.loadTemplate('arrayStatement_linear', {
        	array: arr
        });
    }
    return ret;
}
