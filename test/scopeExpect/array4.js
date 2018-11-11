let m = new Map([
	[0, [1, 2, 3]],
	[1, [1, 2, 3, 4]],
	[2, [1, 2, 3, 4, 5]],
	[3, [1, 2, 3, 4, 5]]
]);
module.exports = (assert, test) => {
	describe('array4.sc', () => {
		it('first should return [1,2,3], and should not change when `+` is used', () => {
			assert.deepEqual(test.get(0).array, m.get(0));
		});
		it('second should return [1,2,3,4] when `+` is used', () => {
			assert.deepEqual(test.get(1).array, m.get(1));
		});
		it('third should return [1,2,3,4,5] when pass-by-reference operators are used', () => {
			assert.deepEqual(test.get(2).array, m.get(2));
		});
		it('forth should return [1,2,3,4,5] when pass-by-reference operators are used', () => {
			assert.deepEqual(test.get(3).array, m.get(3));
		});
		it('third and forth should be equal when pass-by-reference operators are used', () => {
			assert.equal(test.get(2), test.get(3));
		});
	});
};