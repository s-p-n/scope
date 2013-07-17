module.exports = function controlCode (controlCode, stmt) {
    if (controlCode === void 0) {
        this.parentId += 1;
        var foo = this.loadTemplate('controlCode_begin', {
            error: this.error('name', 'runtime', 'reference', 'access'),
            id: this.scopeId,
            value: (this.curParent > -1 ? 
                "$$$parent" + this.curParent :
                "null"
            )
        });
        return foo;
    }

    return this.loadTemplate('controlCode', {
        controlCode: controlCode,
        statement: stmt
})};
