module.exports = function associativeTerm (name, val) {
    if (name[0] === "'" || name[0] === '"') {
        name = name.substr(1,name.length - 1);
    }

    return this.loadTemplate('associativeTerm', {
    	name: name,
    	value: val
    });
}
