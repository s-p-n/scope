module.exports = function scopeStart() {
    this.lastParent.push(this.curParent);
    this.curParent = this.scopeId;
    this.scopeList.push(this.scopeId);
    this.scopeId += 1;
    this.primStore.push(this.primitives);
    this.primitives = [];
    return this.loadTemplate('scopeStart', {
    	id: this.scopeId
    });
}
