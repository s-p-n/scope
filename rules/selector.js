module.exports = function selector (selectorStatement) {
    return this.loadTemplate('selector', {
    	selectorStatement: selectorStatement
    });
}
