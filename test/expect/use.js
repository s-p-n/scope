module.exports = (assert, test) => {
	describe('use.sc', () => {
		it('should return the value of `foo` from usee in user1:', () => {
			assert.equal(test.get(0), "Hello from usee");
		});

		it('should return the value of `foo` from usee as `bar` in user2:', () => {
			assert.equal(test.get(1).get('bar'), "Hello from usee");
		});

		it ('should not return the property `baz` from usee in user2 (use-only check):', () => {
			assert.equal(test.get(1).get('baz'), undefined);
		});
	});
};