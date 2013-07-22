module.exports = function (options) {
    var args = process.argv;
    var options_regex = /^[a-z]+\=.*$/;
    var flag = /^\-([a-z])|\-\-([a-z]+)$/i;
    options['flags'] = [];
    args.forEach(function (arg, i) {
    	var match;
        if (options_regex.test(arg)) {
            options[arg.substr(0, arg.indexOf('='))] =
                arg.substr(arg.indexOf('=')+1, arg.length);
                args.splice(i, 1);
        } else if (flag.test(arg)) {
        	match = arg.match(flag);
        	options['flags'].push(match[1] || match[2]);
        }
    });
    return args;
}
