var $runtimeError = function $runtimeError (line, msg, what) {
    throw new Error(
        "\033[31m\033[1m Runtime Error:\033[0m\033[1m " +
        msg.replace(/%what%/g, what ).
            replace(/%red%/g,'\033[31m').
            replace(/%default%/g, '\033[0m\033[1m').
            replace(/%green%/g, '\033[32m') +
       "\033[1m on line: \033[31m" + line + '\033[0m'
    );
}
