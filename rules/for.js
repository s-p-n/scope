module.exports = function _for (forBegin, controlBlock, loopElse) {
    return this.loadTemplate('for', {
    	forBegin: forBegin,
    	controlBlock: controlBlock,
    	loopElse: loopElse
    });
}
