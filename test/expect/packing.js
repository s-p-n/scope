module.exports = (assert, test) => {
	describe('packing.sc', () => {
		it('should return 1 for a and 2 for b', () => {
			assert.equal(test[0], 1);
			assert.equal(test[1], 2);
		});
	});
};