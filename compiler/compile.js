var fs = require('fs');
var error = require('./error.js');
var quit = false;
var contextDepth = 0;
var contextArr = [];
var prevContext = [];
var simpleArr = [];
module.exports = function (program_data) {
    program_data.error = error;
    return function compile (ast) {
        if (quit) {
            return "";
        }
        try {
            var name = ast.name;
            var args = [];
            var i, j;
            var arg;
            var result;
            for (i = 0; i < ast.x.length; i += 1) {

                if (typeof ast.x[i] === "string") {
                    program_data.simple.length = contextDepth;
                    program_data.simple[contextDepth] = ast.x[i];
                    //console.log("Got simple:", ast.x[i], "Level:", contextDepth);
                    arg = ast.x[i];
                } else {
                    contextArr[contextDepth] = [(ast.x[i].name || null), 'code'];
                    contextDepth += 1;
                    arg = compile(ast.x[i]);
                    contextDepth -= 1;
                    if (contextDepth < contextArr.length) {
                        contextArr.length = contextDepth;
                    }
                }

                args.push(arg);
            }

            //console.log("name,depth:", name + ',', contextDepth);
            program_data.line = ast.line;
            program_data.partial = ast.partial;
            program_data.contextDepth = contextDepth;
            program_data.context = contextArr;
            program_data.prevContext = prevContext;
            if (fs.existsSync(__dirname + '/../rules/' + name + '.js')) {
                result = require(__dirname + '/../rules/' + name).apply(program_data, args);

                prevContext.length = contextDepth;
                prevContext[contextDepth-1] = [name, result];
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
