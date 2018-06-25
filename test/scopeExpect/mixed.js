let foo = new Map([
	[0, 1], 
	[1, 2], 
	[2, 3]
]);
module.exports = (assert, test) => {
	describe('mixed.sc', () => {
		it('should return Foo public map', () => {
			assert.deepEqual(test, m);
		});
	});
};