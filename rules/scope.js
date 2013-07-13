module.exports = function scope (start, controlCode, args) {
    var new_args = '', arg, i = 0, first = true;
    this.curParent = this.lastParent.pop();

    if (args === void 0) {
        return this.loadTemplate('scope_noArgs', {
            scopeStart: start,
            controlCode: controlCode,
            id: this.parentId
        });
    }
    args = eval('(function () { return ' + args + ';}())');
    for (arg in args) {
        if (arg === "length") {
            continue;
        }

        if (first) {
            first = !first
        } else {
            new_args += ",";
        }

        new_args += arg + "= ((arguments[" + i + "] === void 0) ? (" + (args[arg] || "void 0") + ") : arguments[" + i + "])";
        i += 1;
    }
    return this.loadTemplate('scope_args', {
        scopeStart: start,
        args: new_args,
        controlCode: controlCode,
        id: this.parentId
    });
}