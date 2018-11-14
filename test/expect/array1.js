let arr = [1, 2, 3];
module.exports = (assert, test) => {
	describe('array1.sc', () => {
		it('should return {0 => 1, 1 => 2, 2 => 3}', () => {
			assert.equal(arr.length, test.size);
			assert.equal(arr[0], test.get(0));
			assert.equal(arr[1], test.get(1));
			assert.equal(arr[2], test.get(2));
		});
	});
};