module.exports = function controlBlock (controlBlock, stmt) {
    if (controlBlock === void 0) {
        return "";
    }
    if (stmt === "") {
        controlBlock = 'return ' + controlBlock;
    }
    return this.loadTemplate('controlBlock', {
    	controlBlock: controlBlock,
    	statement: stmt
    });
}
