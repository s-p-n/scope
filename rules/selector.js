module.exports = function selector (selectorStatement) {
    return 'selector:(function () {var ret; ret = ' + selectorStatement + '; return ret;}())';
}
