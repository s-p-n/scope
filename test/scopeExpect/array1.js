let m = new Map([[0, 1], [1, 2], [2, 3]]);
module.exports = (assert, test) => {
	describe('array1.sc', () => {
		it('should return {0 => 1, 1 => 2, 2 => 3}', () => {
			assert.deepEqual(test, m);
		});
	});
};