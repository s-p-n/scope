module.exports = function scopeArgs (assocList) {
    return '{' + assocList.substr(3,assocList.length) + '}';
}
