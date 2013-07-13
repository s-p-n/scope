module.exports = function scopeArgs (assocList) {
    return this.loadTemplate('scopeArgs', {
    	args: assocList.substr(6,assocList.length)
    });
}
