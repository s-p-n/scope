module.exports = function identifier (id, name, isArr) {
    this.ext['$$$root']();
    if (name !== void 0) {
        if (name === "__proto__" ||
            name === "prototype") {
                name = this.loadTemplate('identifier_blacklist', {
                    name: name
                });
        }
        if (isArr !== void 0) {
            if (name.substr(0, 8) === 'replace:') {
                return name.substr(8);
            }
            return id + name;
        }
        this.ext['$$$runtimeError']();
        this.ext['Type']();
        return  this.loadTemplate('identifier_instance', {
            id: id,
            name: name,
            line: this.line,
            error: this.error(
                this.line,
                'runtime',
                'no properties',
                id
        )});
    }
    var ret;
    if (id in this.ext) {
        ret = this.ext[id]();
    } else {
        ret = this.loadTemplate('identifier_property', {
            id: id,
            line: this.line,
            parentId: this.parentId
        });
    }

    return ret;
}
