module.exports = function _if (ifBegin, controlBlock, ifElse) {
    return this.loadTemplate('if', {
    	ifBegin: ifBegin,
    	controlBlock: controlBlock,
    	ifElse: ifElse
    });
}
