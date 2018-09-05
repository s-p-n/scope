let m = new Map([
	[0, [1, 2, 3]],
	[1, [1, 2, 3, 4]]
]);
module.exports = (assert, test) => {
	describe('array4.sc', () => {
		it('first should return {0 => 1, 1 => 2, 2 => 3}, and should not change when `+` is used', () => {
			assert.deepEqual(test.get(0).array, m.get(0));
		});
		it('second should return {0 => 1, 1 => 2, 2 => 3, 3 => 4} when `+` is used', () => {
			assert.deepEqual(test.get(1).array, m.get(1));
		});
	});
};