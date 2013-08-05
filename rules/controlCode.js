module.exports = function controlCode (controlCode, stmt) {
    if (controlCode === void 0) {
        
        this.parentId += 1;
        
        return this.loadTemplate('controlCode_begin', {
            id: this.scopeId
        });;
    }

    return this.loadTemplate('controlCode', {
        controlCode: controlCode,
        statement: stmt
})};
