module.exports = function ifBegin (condition) {
    return "(function () {;if (" + condition + "){return (function () {";
}
