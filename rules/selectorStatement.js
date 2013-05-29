module.exports = function selectorStatement(selectorStatement, combinator, selectorExpression) {
    if (combinator === void 0) {
        //this.lastContext.push(this.context);
        //this.context = selectorStatement;
        //console.log("prevContext in selectorStatement:", this.context);
        return selectorStatement;
    }
    switch (combinator) {
        case '>':
            //this.lastContext.push(this.context);
            //this.context = selectorStatement;
            return selectorExpression;
        case '^':
            return selectorExpression;
    }
    return '';
}
