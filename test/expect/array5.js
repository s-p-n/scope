let result = [
	['a', 'b', 'c', 'd', 'e', 'f', 'g'],
	['b', 'c', 'd'],
	['b', 'c', 'd', 'e', 'f', 'g'],
	['a', 'b', 'c', 'd', 'e', 'f'],
	['a', 'b', 'c', 'd', 'e', 'f', 'g'],
	['b', 'boo', 'boo']
];
module.exports = (assert, test) => {
	describe('array5.sc', () => {
		it('first should return a-g', () => {
			assert.deepEqual(test.get(0).array, result[0]);
		});
		it('second should return b-d', () => {
			assert.deepEqual(test.get(1).array, result[1]);
		});
		it('third should return b-g', () => {
			assert.deepEqual(test.get(2).array, result[2]);
		});
		it('fourth should return a-f', () => {
			assert.deepEqual(test.get(3).array, result[3]);
		});
		it('fifth should return a-g', () => {
			assert.deepEqual(test.get(4).array, result[4]);
		});
		it('sixth should return [b, boo, boo]', () => {
			assert.deepEqual(test.get(5).array, result[5]);
		});
		it('fifth should not be a reference to first', () => {
			assert.equal(test.get(4).array === test.get(0).array, false);
		});
	});
};