module.exports = function scope (start, controlCode, args) {
    var arg, i = 0, first = true, ret = start + "(function () {var ";
    this.curParent = this.lastParent.pop();

    controlCode += "return (function () {" +
    "var i, ret = {};"+
    "for (i in selfProps.access) {"+
    "    if (selfProps.access[i] === 'public') {"+
    "        ret[i] = selfProps[i];"+
    "    }"+
    "}"+
    "return ret;"+
    "}())";

    if (args === void 0) {
        return start + '(function () {' + controlCode + '})';
    }
    args = eval('(function () { return ' + args + ';}())');
    for (arg in args) {
        if (arg === "length") {
            continue;
        }

        if (first) {
            first = !first
        } else {
            ret += ",";
        }

        ret += arg + "= ((arguments[" + i + "] === void 0) ? (" + (args[arg] || "void 0") + ") : arguments[" + i + "])";
        i += 1;
    }
    ret += ';' + controlCode + '})';
    //console.log("scope:", ret);
    return ret;
}
