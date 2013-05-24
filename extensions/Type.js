var Type = function Type (primitive) {
    if (primitive instanceof Array) {
        return "array";
    }
    switch(typeof primitive) {
        case "string": return "text";
        case "function": return "scope";
        case "object": return "instance";
    }
    return typeof primitive;
}
