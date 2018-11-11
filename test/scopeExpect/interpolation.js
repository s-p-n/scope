let result = `
	Hello, World!

	This is an inline-expression.

	Here's a depthy expression.
`;
module.exports = (assert, test) => {
	describe('interpolation.sc', () => {
		it('should return a multi-line, evaluated string.', () => {
			assert.equal(test, result);
		});
	});
};