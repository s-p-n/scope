module.exports = function identifier (id, name, isArr) {
    this.ext['$init']();
    this.ext['$runtimeError']();
    this.ext['Type']();

    if (name !== void 0) {
        if (name === "__proto__" ||
            name === "prototype") {
                name = this.loadTemplate('identifier_blacklist', {
                    name: name
        })}
        if (isArr !== void 0) {
            if (name.substr(0, 8) === 'replace:') {
                return name.substr(8);
            }
            return id + name;
        }
        if (id.substr(id.lastIndexOf('.') + 1).substr(0,1) !== '$') {
            return this.loadTemplate('identifier_extended', {
                id: id,
                name: name
        })}
        return  this.loadTemplate('identifier_instance', {
            id: id,
            name: name,
            line: this.line,
    })}
    var ret;
    if (id === "parent") {
        return this.loadTemplate('identifier_parent');
    }
    if (id in this.ext) {
        ret = this.ext[id]();
    } else {
        ret = this.loadTemplate('identifier_property', {
            id: id,
            line: this.line,
            parentId: this.parentId
    })}
    return ret;
}
