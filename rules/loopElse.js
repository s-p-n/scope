module.exports = function loopElse (controlBlock) {
    if (controlBlock === void 0) {
        return "";
    }
    return '}());}else{return (function () {' + controlBlock;
}
