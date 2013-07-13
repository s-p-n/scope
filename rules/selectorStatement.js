module.exports = function selectorStatement(selectorStatement, combinator, selectorExpression) {
    if (combinator === void 0) {
        return selectorStatement;
    }
    switch (combinator) {
        case '>':
            return selectorExpression;
        case '^':
            return selectorExpression;
    }
    return '';
}
