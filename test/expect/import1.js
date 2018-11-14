module.exports = (assert, test) => {
	describe('import1.sc', () => {
		it('should return "foobar"', () => {
			assert.equal(test, "foobar");
		});
	});
};