module.exports = function ifElse (ifBegin, controlBlock, ifElse) {
    var conditionEnd = '}())';
    var ifEnd = '}());}';
    this.termType = "If";
    if (controlBlock === void 0) {
        return this.loadTemplate('ifElse_noElse', {
        	ifBegin: ifBegin
        });
    }
    return this.loadTemplate('ifElse', {
    	ifBegin: ifBegin,
    	controlBlock: controlBlock,
    	ifElse: ifElse
    });
}
