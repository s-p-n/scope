module.exports = (assert, test) => {
	describe('lexicalScope1.sc', () => {
		it('should return "outer scope,inner scope"', () => {
			assert.equal(test, "outer scope,inner scope");
		});
	});
};