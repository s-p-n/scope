module.exports = function loopElse (controlBlock) {
    if (controlBlock === void 0) {
        return "";
    }
    return this.loadTemplate('loopElse', {
    	controlBlock: controlBlock
    });
}
