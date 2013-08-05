module.exports = function selector (selectorStatement) {
	this.termType = "Selector";
    return this.loadTemplate('selector', {
    	selectorStatement: selectorStatement
    });
}
