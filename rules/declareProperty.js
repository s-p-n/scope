module.exports = function declareProperty (a, b, c) {
    this.termType = "Declare";
    if (c === void 0) {
        //return '((typeof ' + a + ' === "undefined")?self("' + a + '",' + b + '):' + a + '=' + b + ')';

        return this.loadTemplate('redeclareProperty', {
        	name: a,
        	value: b
        });
    } else {
        //console.log(b, this.scopeId, this.scopeList);
        return this.loadTemplate('declareProperty', {
        	id: this.scopeId,
        	access: a,
        	name: b,
        	value: c,
            "this": this.curParent === -1 ? "$root" : "this"
        });
    }
}
