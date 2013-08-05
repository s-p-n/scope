module.exports = function tagStart (tagName) {
	console.log("tagStart:", tagName);
    return this.loadTemplate('tagStart', {
    	name: tagName
    });
}
