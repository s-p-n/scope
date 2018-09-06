let m = new Map([
	['a', 1],
	['b', 2],
	['c', 3]
]);
m.type = "associative";
module.exports = (assert, test) => {
	describe('array2.sc', () => {
		it('should return {a=>1, b=>2, c=>3}', () => {
			assert.deepEqual(test, m);
		});
	});
};