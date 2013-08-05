module.exports = function scope (start, controlCode, args) {
    var new_args = '', arg, i = 0, first = true, thisArg = "this";
    var id = this.scopeId;
    var prefix = "", j;
    this.termType = "Scope";
    this.curParent = this.lastParent.pop();
    this.scopeId = this.scopeList.pop();
    if (this.curParent === -1) {
        thisArg = "$root";
    }
    for (j = 0; j < this.primitives.length; j += 1) {
        prefix += "$$$" + j + "=" + this.primitives[j] + ';';
    }
    this.primitives = this.primStore.pop() || [];
    if (args === void 0) {
        return this.loadTemplate('scope_noArgs', {
            scopeStart: start,
            prefix: prefix,
            controlCode: controlCode,
            id: id,
            "this": thisArg
        });
    }
    args = eval('(function () { return ' + args + ';}())');
    for (arg in args) {
        if (arg === "length") {
            continue;
        }
        if (typeof args[arg] === "string") {
            args[arg] = '"' + args[arg] + '"';
        }
        new_args += 'this.$arg("' + arg + '", ' + args[arg] + ', arguments[' + i + ']);';
        i += 1;
    }
    return this.loadTemplate('scope_args', {
        scopeStart: start,
        prefix: prefix,
        args: new_args,
        controlCode: controlCode,
        id: id,
        "this": thisArg
    });
}