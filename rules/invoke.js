module.exports = function invoke (func, args, id) {
    this.termType = "Invoke";
    if (args === void 0) {
        return this.loadTemplate('invoke_noArgs', {
        	func: func
        });
    }
    if (args === '.') {
        return this.loadTemplate('invoke_instance', {
        	func: func,
        	identifier: id
        });
    }
    return this.loadTemplate('invoke_args', {
    	func: func,
    	args: args
    });
}
