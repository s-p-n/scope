module.exports = function term (a, b, c) {
    var thisArg = 'this';
    if (this.curParent === -1) {
        thisArg = '$root';
    }
    switch (a) {
        case 'not':
            return this.loadTemplate('term_not', {
                term: b
            });
        case '!':
            this.ext['$factorial']();
            return this.loadTemplate('term_factorial', {
                'int': b
            });
        case '-':
            return this.loadTemplate('term_negate', {
                num: b
            });
        case '(':
            return this.loadTemplate('term_parens', {
                term: b
            });
    }
    switch (b) {
        case '+':
            this.ext['$Math']();
            return this.loadTemplate('term_mirror', {
                termA: a,
                operator: "add",
                termB: c
            });
        case '-':
            this.ext['$Math']();
            return this.loadTemplate('term_mirror', {
                termA: a,
                operator: "subtract",
                termB: c
            });
        case '*':
            this.ext['$Math']();
            return this.loadTemplate('term_mirror', {
                termA: a,
                operator: "multiply",
                termB: c
            });
        case '/':
            this.ext['$Math']();
            return this.loadTemplate('term_mirror', {
                termA: a,
                operator: "divide",
                termB: c
            });
        case '%':
            this.ext['$Math']();
            return this.loadTemplate('term_mirror', {
                termA: a,
                operator: "modulus",
                termB: c
            });
        case 'and':
            return this.loadTemplate('term_and', {
                termA: a,
                termB: c
            });
        case 'or':
            return this.loadTemplate('term_or', {
                termA: a,
                termB: c
            });
        case 'is':
            this.ext['$compare']();
            return this.loadTemplate('term_is', {
                termA: a,
                termB: c
            });
        case 'isnt':
            this.ext['$compare']();
            return this.loadTemplate('term_isnt', {
                termA: a,
                termB: c
            });
        case 'has':
            return this.loadTemplate('term_has', {
                termA: a,
                termB: c
            });
        case '&':
            this.ext['Compatible']();
            this.ext['$compare']();
            this.ext['$concat']();
            this.ext['$runtimeError']();
            return this.loadTemplate('term_concat', {
                termA: a,
                termB: c,
                line: this.line
            });
        case '&=':
            this.ext['Compatible']();
            this.ext['$compare']();
            this.ext['$concat']();
            this.ext['$runtimeError']();
            return this.loadTemplate ('redeclareProperty_concatEq', {
                id: a,
                value: c,
                line: this.line
            });
            break;
        case '+=':
            return this.loadTemplate ('redeclareProperty_plusEq', {
                id: a,
                value: c
            });
            break;
        case '/=':
            return this.loadTemplate ('redeclareProperty_divideEq', {
                id: a,
                value: c
            });
            break;
        case '<':
            return this.loadTemplate('term_lessThan', {
                termA: a,
                termB: c
            });
        case '>':
            return this.loadTemplate('term_greaterThan', {
                termA: a,
                termB: c
            });
        case '<=':
            return this.loadTemplate('term_lessOrEqual', {
                termA: a,
                termB: c
            });
        case '>=':
            return this.loadTemplate('term_greaterOrEqual', {
                termA: a,
                termB: c
            });
    }
    this.ext['$init']();
    this.ext['$array']();
    var i;
    if (this.termType === "scopeArgs") {
        console.log("Got a scopeArg", a);
        return a;
    } else if (this.termType === "Invoke") {
        i = this.primitives.push("function () {return " + a + "}.bind(" + thisArg + ")") - 1;
        return '$$$' + i + '()';
    } else if (this.termType === "Identifier") {
        return a;
    } else if (this.termType === "If") {
        return a;
    } else if (this.termType === "While") {
        return a;
    } else if (this.termType === "Scope") {
        return a;
    } else if (this.termType === "Declare") {
        return a;
    } else if (this.termType === "Array") {
        return "$array(" + a + ")";
    } else {
        i = this.primitives.push("$primitive('" + this.termType + "', function () {return " + a + "}.bind(" + thisArg + "))") - 1;
        return '$$$' + i;
    }
}
