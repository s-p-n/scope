module.exports = (assert, test) => {
	describe('oop1.sc', () => {
		it('should return the private foo value', () => {
			assert.equal(test, "I am private");
		});
	});
};