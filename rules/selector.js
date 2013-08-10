module.exports = function selector (selectorStatement) {
	this.termType = "Selector";
	console.log("slct stmt:", selectorStatement);
    return this.loadTemplate('selector', {
    	selectorStatement: selectorStatement
    });
}
