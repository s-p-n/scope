var fs = require('fs');
var error = require('./error.js');
var quit = false;
module.exports = function (program_data) {
    program_data.error = error;
    return function compile (ast) {
        if (quit) {
            return "";
        }
        try {
            var name = ast.name;
            var args = [];
            var i;
            var arg;
            var result;
            for (i = 0; i < ast.x.length; i += 1) {
                if (typeof ast.x[i] === "string") {
                    arg = ast.x[i];
                } else {
                    arg = compile(ast.x[i]);
                }
                args.push(arg);
            }
            program_data.line = ast.line;
            program_data.partial = ast.partial
            if (fs.existsSync(__dirname + '/../rules/' + name + '.js')) {
                result = require(__dirname + '/../rules/' + name).apply(program_data, args);
                return result;
            } else {
                error(program_data.line, 'compile', 'not implemented', name);
            }
        } catch (e) {
            quit = true;
            //console.log("Data:", ast.data, "\ndone.");
            console.log(e);
            //throw (e);

        }
    };
};
