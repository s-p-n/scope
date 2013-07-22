module.exports = function declareVariable(name, value) {
    if (this.curParent === -1) {
        return this.loadTemplate('declareVariable_root', {
			'name': name, 
			'value': value
		});
    }

    return this.loadTemplate('declareVariable', {
		'name': name, 
		'value': value
	});
}