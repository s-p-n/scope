module.exports = function associativeList (set, more) {
    if (more === void 0) {
        return this.loadTemplate('associativeList_first', {
        	list: set
        });
    } else {
        return this.loadTemplate('associativeList_remaining', {
        	list: set,
        	rest: more
        }); 
    }
}
