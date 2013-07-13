module.exports = function termList (term, more) {
    if (more === void 0) {
        return term;
    } else {
        return this.loadTemplate('termList', {
        	term: term,
        	more: more
        })
    }
}
