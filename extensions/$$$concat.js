var $$$concat = function (a, b, line) {
    var result, shortest, i;
    if (
        !(Type(a) === "text" && Type(b) === "text") &&
        !(Type(a) === "array" && Type(b) === "array")
    ) {
        $$$runtimeError(line, "Both types must be the same (either string or array), got: %what%", Type(a) + " and " + Type(b));
    }
    if (Type(a) === "text") {
        result = a + b;
    } else {
        if(a instanceof Array) {
            for (i = 0; i < b.length; i += 1) {
                a.push(b[i]);
            }
            result = a;
        } else {
            if (a.length > b.length) {
                result = a;
                shortest = b;
            } else {
                result = b;
                shortest = a;
            }
            for (i in shortest) {
                if(i !== "length" && shortest.hasOwnProperty(i)) {
                    result[i] = shortest[i];
                    result.length += 1;
                }
            }
        }
    }
    return result;
};