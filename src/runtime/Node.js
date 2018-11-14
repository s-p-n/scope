class Node {
	constructor (name = "", attributes = {}, children = []) {
		this.name = name;
		this.attributes = attributes;
		this.children = children;
		this.parent = null;
		for (let i = 0; i < children.length; i += 1) {
			let child = children[i];
			if (child instanceof Node) {
				child.parent = this;
				continue;
			}
			if (child instanceof TextNode) {
				child.parent = this;
				continue;
			}
			this.children[i] = new TextNode(child);
			this.children[i].parent = this;
		}
	}

	toString() {
		let result = `<${this.name}`;
		for (let attr in this.attributes) {
			result += ` ${attr}=${this.attributes[attr]}`;
		}
		if (this.children.length > 0) {
			result += ">";
		} else {
			return result + "/>";
		}
		for (child of this.children) {
			result += child.toString();
		}
		return result + `</${this.name}>`;
	}
}

return Node;