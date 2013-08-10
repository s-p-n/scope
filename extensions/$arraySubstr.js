/*
Array.prototype.substr = function substr (start, end) {
    var i, result = [];
    if (end === void 0) {
        end = this.length;
    }
    if (start === void 0) {
        start = 0;
    }
    if (end > start) {
        for (i = start; this[i] && i < end; i += 1) {
            result.push(this[i]);
        }
    } else if (end < start) {
        for (i = start; this[i] && i > end; i -= 1) {
            result.push(this[i]);
        }
    } else {
        result.push(this[start]);
    }
    return result;
}
*/