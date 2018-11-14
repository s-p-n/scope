module.exports = (assert, test) => {
	describe('mixed.sc', () => {
		it('should be a map', () => {
			assert.equal(test instanceof Map, true);
		});
		it('should provide access to all of the properties', () => {
			assert.equal(test.has('someXml'), true);
			assert.equal(test.has('someNumber'), true);
			assert.equal(test.has('someSwitch'), true);
			assert.equal(test.has('someArray'), true);
			assert.equal(test.has('someString'), true);
			assert.equal(test.has('someMethod'), true);
		});
		it('should have the property someXml be a node instance', () => {
			assert.equal(test.get('someXml').tagName, "someXml");
		});
		it('should have the value `true` for someSwitch', () => {
			assert.equal(test.get('someSwitch'), true);
		});
		it('should have the value `42` for someNumber', () => {
			assert.equal(test.get('someNumber'), 42);
		});
		it('should have a Map with values 0-5 for someArray', () => {
			assert.deepEqual(test.get('someArray').array, [0,1,2,3,4,5]);
		});
		it('should have the value `"hello, world"` for someString', () => {
			assert.equal(test.get('someString'), "hello, world");
		});
		it('should have a function type for someMethod', () => {
			assert.equal(typeof test.get('someMethod'), "function");
		});
	});
};