module.exports = function _return (a, b) {
    if (b === void 0) {
        return this.loadTemplate('return', {
        	type: this.termType,
        	value: a
        });
    } else {
        return this.loadTemplate('return', {
        	type: a,
        	value: b
        });
    }
}
