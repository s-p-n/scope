module.exports = function declareVariable(name, value) {
    return this.loadTemplate('declareVariable', {
		'name': name, 
		'value': value
	});
}