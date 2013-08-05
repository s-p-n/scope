var $concat = function $concat (a, b, line) {
    var result, shortest, i;
    if ((
            Type(a).indexOf("Text") === -1 || 
            Type(b).indexOf("Text") === -1
        ) && (
            Type(a).indexOf("Array") === -1 ||
            Type(b).indexOf("Array") === -1
    )) {
        $runtimeError(line, "Both types must be the same (either string or array), got: %what%", Type(a) + " and " + Type(b));
    }
    if (Type(a).indexOf("Text") !== -1) {
        result = $primitive("Text", function (value) {
            return function () {
                return value;
            }
        } ("" + a.value() + b.value()));
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
    }}}}
    return result;
};
