module.exports = (assert, test) => {
	describe('import2.sc', () => {
		it('should return a map of the public properties from the imported scope', () => {
			assert.deepEqual(test.get(0), new Map([
				["foo", "im foo"],
				["bar", "im bar"]
			]));
		});

		it('should return a map of the public properties from the other imported scope', () => {
			assert.deepEqual(test.get(1), new Map([
				["foo", "im foo mod"],
				["bar", "im bar mod"]
			]));
		});
	});
};