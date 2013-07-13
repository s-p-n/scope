module.exports = function declareProperty (a, b, c) {
    if (c === void 0) {
        //return '((typeof ' + a + ' === "undefined")?self("' + a + '",' + b + '):' + a + '=' + b + ')';
        return this.loadTemplate('redeclareProperty', {
        	name: a,
        	value: b
        });
    } else {
        return this.loadTemplate('declareProperty', {
        	id: this.parentId,
        	access: a,
        	name: b,
        	value: c
        });
    }
}
