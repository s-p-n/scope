module.exports = function scopeStart() {
    this.lastParent.push(this.curParent);
    this.curParent = this.scopeId;
    this.scopeList.push(this.scopeId);
    this.scopeId += 1;
    //console.log("Scope Start:", this.scopeId, this.scopeList);
    /*
    if (this.curParent === -1) {
        this.curParent = 0;
    } else {
        
    }
    */
    //this.curParent = this.parentId;
    return this.loadTemplate('scopeStart', {
    	id: this.scopeId
    });
}
