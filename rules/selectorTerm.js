module.exports = function selectorTerm (a, b, c) {
    switch (a) {
        case 'not':
            return '!' + b;
        case '!':
            return '(function (){' +
                'var i;' +
                'var r = ' + b + ';' +
                ((b[0] === '-') ?
                    'for(i=-1;i>' + b + ';i-=1){':
                    'for(i=1;i<' + b + ';i+=1){'
                ) +
                    'r*=i;' +
                '}' +
                'return r;' +
            '}())';
        case '-':
            return '-' + b;
        case '(':
            return '(' + b + ')';
    }
    switch (b) {
        case '+':
            return a + b + c;
        case '-':
            return a + b + c;
        case '*':
            return a + b + c;
        case '/':
            return a + b + c;
        case 'is':
            return a + '===' + c;
        case 'isnt':
            return a + '!==' + c;
        case '&':
            this.ext['$$$concat']();
            this.ext['$$$runtimeError']();
            return '$$$concat(' + a + ',' + c + ',' + this.line + ')';
    }
    return a;
}
