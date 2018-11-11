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
		toString (prefix="") {
			let result = `${prefix}<${this.tagName}`;

			for (let name in this.attributes) {
				let value = this.attributes[name];
				result += ` ${name}=${value}`;
			}

			if (this.children.length === 0) {
				return result + "/>";
			}
			result += ">";
			for (let i = 0; i < this.children.length; i += 1) {
				let child = this.children[i];
				if (child instanceof Tag) {
					result += `${child.toString(prefix + "  ")}`;
				} else {
					result += `${child}`;
				}
			}
			result += `</${this.tagName}>`;
			return result;
		}
	}

	parser.yy.xml = {
		Tag: Tag,
		//state: null
	};

	parser.yy.parseError = function parseError (str="", hash={
		text: "",
		line: 0,
		token: "",
		loc: [],
		expected: [],
		recoverable: false
	}) {
		let solution = "unknown";
		if (hash.solution) {
			solution = hash.solution;
		}
		console.log(`
Parse Error: ${str}
Line: ${hash.line + 1}
Text: ${hash.text}
Token: ${hash.token}
Suggested Fix: ${solution}`);
		if (hash.recoverable) {
			console.log("Error is recoverable.");
		} else {
			process.exit();
		}
	}

	parser.yy.expressions = [];
	parser.yy.expressions.parent = null;
};