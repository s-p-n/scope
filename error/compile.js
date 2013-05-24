module.exports = function compileError(line, msg, what) {
    throw "\n\033[1m\033[31m" + "Compile Error " + '\033[0m\033[1m' + msg.replace('%what%', '\033[1m\033[31m' + what + '\033[0m\033[1m') + "\033[1m on line: \033[31m" + line + '\033[0m';
}
