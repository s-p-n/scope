let result = [
	['a', 'b', 'c'],
	[true, scope.arrayExpression('a', 'b', 'c', 'd')],
	[1, 2, 3],
	["a","b","c", scope.arrayExpression(1,2,3)]
];
module.exports = (assert, test) => {
	describe('array6.sc', () => {
		result.forEach(function (r, i) {
			it(`${i} should return '${JSON.stringify(r)}'`, () => {
				assert.deepEqual(test[i].array, result[i]);
			});
		});
	});
};