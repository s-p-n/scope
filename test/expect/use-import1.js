module.exports = (assert, test) => {
	describe('use-import1.sc', () => {
		it('should return the value of protected property `baz` from the scope in file `inc/scope.sc`:', () => {
			assert.equal(test, "im baz");
		});
	});
};