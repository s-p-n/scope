module.exports = function string (str) {
	this.termType = "Text";
    if (str[0] === '`') {
        throw "`Backtick strings` not supported.";
    }
    return str;
}
