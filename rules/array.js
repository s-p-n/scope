module.exports = function array(arr, arrayKey) {
    if (arrayKey !== void 0) {
        return arr + arrayKey;
    }
    return arr || "[]";
}
