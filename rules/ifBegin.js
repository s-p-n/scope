module.exports = function ifBegin (condition) {
    return this.loadTemplate('ifBegin', {
    	condition: condition
    });
}
