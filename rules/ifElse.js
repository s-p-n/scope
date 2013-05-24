module.exports = function ifElse (ifBegin, controlBlock, ifElse) {
    var conditionEnd = '}())';
    var ifEnd = '}());}';
    if (controlBlock === void 0) {
        return ifBegin + ifEnd + conditionEnd;
    }
    return ifEnd + ' else ' + ifBegin + controlBlock + ifElse;
}
