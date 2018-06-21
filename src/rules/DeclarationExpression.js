class DeclarationExpression {
	constructor (name, type, value) {

	}

	render () {
		return `declarationExpression("${this.name}")`;
	}
}

export default DeclarationExpression;