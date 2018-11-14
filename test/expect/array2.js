let m = new Map([
	['a', 1],
	['b', 2],
	['c', 3]
]);
module.exports = (assert, test) => {
	describe('array2.sc', () => {
		it('should have a size of 3', () => {
			assert.equal(test.size, m.size);
		});
		it('should property a => 1', () => {
			assert.equal(test.a, m.get('a'));
		});
		it('should have b => 2', () => {
			assert.equal(test.b, m.get('b'));
		});
		it('should have c => 3', () => {
			assert.equal(test.c, m.get('c'));
		});
	});
};