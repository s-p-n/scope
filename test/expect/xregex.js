let urlArr = [ 'http://google.com/path/to/file?q=1',
  'http',
  'google.com',
  '/path/to/file',
  'q=1'];
 let urlObj = {
  index: 0,
  input: 'http://google.com/path/to/file?q=1',
  groups: undefined,
  scheme: 'http',
  host: 'google.com',
  path: '/path/to/file',
  query: 'q=1'
 };
 for (let key in urlObj) {
 	if (urlObj.hasOwnProperty(key)) {
 		urlArr[key] = urlObj[key];
 	}
 }

let expected = scope.arrayExpression(true, "The test data", urlArr, true, true, true, 'a', 'aaa', true, 59)
module.exports = (assert, test) => {
	describe('xregex.sc', () => {
		it(`should return the array ${JSON.stringify(expected.array)}`, () => {
			assert.equal(expected[0], test[0]);
			assert.equal(expected[1], test[1]);
			assert.deepEqual(expected[2], test[2]);
			assert.equal(expected[3], test[3]);
			assert.equal(expected[4], test[4]);
			assert.equal(expected[5], test[5]);
		});
	});
};