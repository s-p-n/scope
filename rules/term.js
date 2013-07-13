module.exports = function term (a, b, c) {
    switch (a) {
        case 'not':
            return this.loadTemplate('term_not', {
                term: b
            });
        case '!':
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
            return this.loadTemplate('term_mirror', {
                termA: a,
                operator: b,
                termB: c
            });
        case '-':
            return this.loadTemplate('term_mirror', {
                termA: a,
                operator: b,
                termB: c
            });
        case '*':
            return this.loadTemplate('term_mirror', {
                termA: a,
                operator: b,
                termB: c
            });
        case '/':
            return this.loadTemplate('term_mirror', {
                termA: a,
                operator: b,
                termB: c
            });
        case 'and':
            return loadTemplate('term_and', {
                termA: a,
                termB: c
            });
        case 'or':
            return loadTemplate('term_or', {
                termA: a,
                termB: c
            });
        case 'is':
            return this.loadTemplate('term_is', {
                termA: a,
                termB: c
            });
        case 'isnt':
            return this.loadTemplate('term_isnt', {
                termA: a,
                termB: c
            });
        case '&':
            this.ext['$$$concat']();
            this.ext['$$$runtimeError']();
            return this.loadTemplate('term_concat', {
                termA: a,
                termB: c,
                line: this.line
            });
    }
    return a;
}
