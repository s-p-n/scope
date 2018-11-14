class TextNode {
	constructor (text = "") {
		this.value = text;
		this.parent = null;
	}

	toString () {
		return this.text;
	}
}

return TextNode;