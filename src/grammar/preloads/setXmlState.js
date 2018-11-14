module.exports = function setXmlState (parser) {
	class Tag {
		constructor (tagName, attributes, children = [], parent = null) {
			this.tagName = tagName;
			this.attributes = attributes;
			this.children = children;
			this.parent = parent;
		}
		nest (child) {
			this.children.push(child);
		}
		toScope () {
			let result = `scope.xml("${this.tagName}",{${this.attributes}}`;
			if (this.children.length === 0) {
				return result + ")";
			}
			result += ",[";
			for (let i = 0; i < this.children.length; i += 1) {
				let child = this.children[i];
				if (i !== 0) {
					result += ",";
				}
				if (child instanceof Tag) {
					result += child.toScope();
				} else {
					result += child;
				}
			}
			result += '])';
			return result;
		}
	}

	parser.yy.xml = {
		Tag: Tag
	};
};