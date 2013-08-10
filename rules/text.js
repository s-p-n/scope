module.exports = function text (txt, arrayKey) {
	this.termType = "Text";
	if (arrayKey !== void 0) {
		if(arrayKey.substr(0,8) === 'replace:') {
            return arrayKey.substr(8);
        }
		return '$primitive("Text", function () { return ' + txt + '})' + arrayKey + '.$values["Text"]()'
	}
    return txt;
}
