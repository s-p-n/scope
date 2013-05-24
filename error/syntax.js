module.exports = function syntaxError (str, hash) {
    console.log(hash);
    str = "Unexpected \033[31m\033[1m" + hash.text + "\033[0m\033[1m, expecting one of: [ \033[0m\033[32m";
    for (var i in hash.expected) {
        str += hash.expected[i].substr(1, hash.expected[i].length - 2) + ' ';
    }
    str = "\033[31m\033[1m Syntax Error:\033[0m\033[1m " +
        str +
        '\033[0m\033[1m] on line \033[31m' +
        hash.loc.first_line +
        '\033[0m';
    throw new Error(str);
}
