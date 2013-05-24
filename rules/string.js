module.exports = function string (str) {
    if (str[0] === '`') {
        throw "`Backtick strings` not supported.";
    }
    return str;
}
