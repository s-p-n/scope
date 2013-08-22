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
    } else if (args === '[') {
        if (id.substr(0, 8) === 'replace:') {
            return id.substr(8);
        }
        return func + id;
    }
    return this.loadTemplate('invoke_args', {
    	func: func,
    	args: args
    });
}
