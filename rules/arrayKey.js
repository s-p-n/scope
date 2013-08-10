module.exports = function arrayKey (a, b, c) {
    // [a]
    this.ext['$arraySubstr']();
    this.ext['$substr']();
    if (b === void 0) {
        if (a.substr(0,9) === 'selector:') {
            return 'replace:' + a.substr(9);
        }
        return this.loadTemplate('arrayKey_index', {
            selector: a
        });
    }

    
    // [a:c]
    if (c !== void 0) {
        this.ext['$arraySubstr']();
        return this.loadTemplate('arrayKey_range', {
            start: a,
            end: c
        });
    }
    // [b:]
    if (b === ':') {
        return this.loadTemplate('arrayKey_range_startOnly', {
            start: a,
        });
    }

    // [:b]
    return this.loadTemplate('arrayKey_range_endOnly', {
        end: b,
    });
}
