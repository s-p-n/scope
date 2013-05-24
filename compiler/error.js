var syntaxError = require('../error/syntax.js');
var compileError = require('../error/compile.js');
var runtimeError = require('../error/runtime.js');
var otherError = require('../error/other.js');
var errorData = require('../error/data.json');
module.exports = function error (line, type, error, what) {

    switch (type) {
        case "syntax":
            errMsg = syntaxError(line, errorData.syntax[error], what);
        case "compile":
            return compileError(line, errorData.compile[error], what);
        case "runtime":
            return runtimeError(line, errorData.runtime[error], what);
    }
    return otherError(line, type, errorData[type][error], what);
}
