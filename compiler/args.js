module.exports = function (options, options_regex) {
    var args = process.argv;
    args.forEach(function (arg, i) {
        if (options_regex.test(arg)) {
            options[arg.substr(0, arg.indexOf('='))] =
                arg.substr(arg.indexOf('=')+1, arg.length);
                args.splice(i, 1);
        }
    });
    return args;
}
