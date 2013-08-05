module.exports = function array(arr, arrayKey) {
	this.termType = "Array";
    if (arrayKey !== void 0) {
        if(arrayKey.substr(0,8) === 'replace:') {
            return arrayKey.substr(8);
        }
        return arr + arrayKey;
    }
    return arr || this.loadTemplate('array_empty');
}
