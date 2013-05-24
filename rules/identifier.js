module.exports = function identifier (id, name, isArr) {
    if (name !== void 0) {
        if (name === "__proto__" ||
            name === "prototype") {
                name  = '$' + name;
        }
        if (isArr !== void 0) {
            return id + '[' + name + ']';
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

    if (id in this.ext) {
        return this.ext[id]();
    }
    return '((typeof '+id+' === "undefined" || root.'+id+' === '+id+') ? self("'+id+'", '+this.line+') : '+id+')';
}
