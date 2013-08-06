module.exports = function _return (a, b) {
    if (b === void 0) {
        return this.loadTemplate('return', {
        	value: a
        });
    } else if (a.indexOf('"') === 0 || a.indexOf("'") === 0) {
        return this.loadTemplate('returnMultiText', {
            type: a,
            value: b
        });
    } else {
        return this.loadTemplate('returnMultiTerm', {
        	type: a,
        	value: b
        });
    }
}
