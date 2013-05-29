module.exports = function selectorIdentifier (id, name, isArr) {
    if (name !== void 0) {
        if (name === "__proto__" ||
            name === "prototype") {
                name  = '$' + name;
        }
        if (isArr !== void 0) {
            if (name.substr(0, 8) === 'replace:') {
                return name.substr(8);
            }
            return id + name;
        }
        this.ext['$$$runtimeError']();
        this.ext['Type']();
        return  '('+
            "(Type(" + id + ") !== 'instance')" +
            "?" +
            this.error(
                this.line,
                'runtime',
                'no properties',
                id
            ) +
             ':' + id + ').' + name;
    }

    var key = /^\$([0-9a-z_]+)$/i;
    var lastResult = /^\$\$$/;
    if (key.test(id)) {
        id = '$$[i]' + id.replace(key, '["$1"]');
    } else if (lastResult.test(id)) {
        id = '$$[i]';
    }
    var ret;
    if (id in this.ext) {
        ret = this.ext[id]();
    } else {
        ret =id;//'((typeof '+id+' === "undefined" || root.'+id+' === '+id+') ? self("'+id+'", '+this.line+') : '+id+')';
    }

    return ret;
}
