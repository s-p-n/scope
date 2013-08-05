module.exports = function node (a, b, c, d) {
	this.termType = "Node";
	var tagStart, attrList, tagEnd, nodeEnd, ret;
	this.ext['$tag']();
	if (typeof d === "undefined") {
		d = "";
	}
	if (typeof c === "undefined") {
		c = "";
	}
	return a + b + c + d;
};