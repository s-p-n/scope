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
        prefix += "var $$$" + j + "=" + this.primitives[j] + ';';
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
    var cachedValRegex = /(\${3}[0-9]+)/;
    var cachedValRegexG = /(\${3}[0-9]+)/g;
    args = args.replace(cachedValRegexG, "'$1'");
    console.log(args);
    args = eval('(function () { return ' + args + ';}())');
    console.log(args);
    for (arg in args) {
        if (arg === "length") {
            continue;
        }
        console.log("arg:" + args[arg]);
        if (typeof args[arg] === "string" && !cachedValRegex.test(args[arg])) {
            args[arg] = '"' + args[arg] + '"';
        } else if (args[arg] instanceof Array) {
            args[arg] = "$array([" + args[arg].toString() + "])";
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
