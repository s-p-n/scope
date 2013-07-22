module.exports = function scope (start, controlCode, args) {
    var new_args = '', arg, i = 0, first = true, thisArg = "this";
    var id = this.scopeId;

    this.curParent = this.lastParent.pop();
    this.scopeId = this.scopeList.pop();
    if (this.curParent === -1) {
        thisArg = "$root";
    }
    //console.log("Scope End:", this.scopeId, this.scopeList);
    if (args === void 0) {
        return this.loadTemplate('scope_noArgs', {
            scopeStart: start,
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
        //console.log("arg:", args[arg], typeof args[arg]);
        new_args += 'this.$arg("' + arg + '", ' + args[arg] + ', arguments[' + i + ']);';
        i += 1;
    }
    //new_args = "/*@argumentStart" + id + "@*/\n" + new_args;
    //controlCode = controlCode.replace("/*@argumentStart" + id + "@*/", new_args);
    return this.loadTemplate('scope_args', {
        scopeStart: start,
        args: new_args,
        controlCode: controlCode,
        id: id,
        "this": thisArg
    });
}