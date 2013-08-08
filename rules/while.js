module.exports = function _while (whileBegin, controlBlock, loopElse) {
	this.termType = "While";
    return this.loadTemplate('while', {
    	whileBegin: whileBegin,
    	controlBlock: controlBlock,
    	loopElse: loopElse
    });
}
