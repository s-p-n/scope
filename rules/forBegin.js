module.exports = function forBegin (name, list, val) {
    if (val !== void 0) {
        return this.loadTemplate('forBegin_val', {
        	list: list,
        	name: name,
        	val: val
        });
    }
    return this.loadTemplate('forBegin', {
    	list: list,
    	name: name
    });
}
