module.exports = function declareProperty (a, b, c) {
    if (c === void 0) {
        //return '((typeof ' + a + ' === "undefined")?self("' + a + '",' + b + '):' + a + '=' + b + ')';
        return a + '=' + b;
    } else {
        return 'self("' + a + '","' + b + '",' + c + ')';
    }
}
