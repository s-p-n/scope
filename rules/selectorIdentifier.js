module.exports = function selectorIdentifier (id, name, isArr) {
    var key = /^\$([0-9a-z_]+)$/i;
    var lastResult = /^\$\$$/;
    var ret;
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
    if (key.test(id)) {
        id = this.loadTemplate('selectorIdentifier_specialKey', {
            key: id.replace(key, '["$1"]')
        });
    } else if (lastResult.test(id)) {
        id = this.loadTemplate('selectorIdentifier_specialKey', {
            key: ''
        });
    }
    if (id in this.ext) {
        ret = this.ext[id]();
    } else {
        ret = id;
    }
    return ret;
}
