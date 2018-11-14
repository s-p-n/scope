let expected = [
	[
		-42, 
		scope.arrayExpression(1,2,3,4,5),
		scope.arrayExpression(1,8,27,64,125)
	]
];
module.exports = (assert, test) => {
	describe('basics.sc', () => {
		expected.forEach(function (r, i) {
			it(`${i} should return '${JSON.stringify(r)}'`, () => {
				assert.deepEqual(test[i].array, expected[i]);
			});
		});
	});
};