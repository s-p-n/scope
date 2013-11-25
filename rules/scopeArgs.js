module.exports = function scopeArgs (assocList) {
	this.termType = "scopeArgs";
    return this.loadTemplate('scopeArgs', {
    	args: assocList.substr(6,assocList.length)
    });
}
