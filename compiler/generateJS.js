var code;
var scopeAst = require('./ast.js');
var scope = require('../scope.js');
var compile = require('./compile.js');
var program_data = require('./program_data');
var pretty = function (code) {
    return require('js-beautify').js_beautify(code, {indent_size: 4});
};
var ugly = function (code) {
    return require('uglify-js').minify(code, {'fromString': true}).code;
};

module.exports = function (args,
    options,
    extensions,
    extData
) {
    var scope_file = require('fs').readFileSync(args[2], "utf8");
    program_data = program_data(extensions);
    compile = compile(program_data);
    program_data.compile = compile;
    scope.parser.yy.scopeAst = scopeAst;

    scope.parser.yy.parseError = require('../error/syntax.js');

    ast = scope.parse(scope_file);
    if (options['code'] === 'ast') {
        console.log(ast.get(0));
        return;
    }

    program_data.parse = scope.parse;
    code = ';' + compile(ast)
    code = extData.loaded +
        program_data.codePrefix +
        code +
        program_data.codeSuffix;
/*
    if (options['code'] === "pretty") {
        code = pretty(code);
    } else if (options['code'] === "bloated") {

    } else {
        code = ugly(code);
    }
    */
    return pretty(code);
}
