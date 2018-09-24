let expected = "<ul><li>a</li><li>b</li><li>c</li><li>d</li><li>e</li><li>f</li><li>g</li></ul>";
module.exports = (assert, test) => {
	describe('xml2.sc', () => {
		it(`should return the HTML "${expected}"`, () => {
			assert.equal(test.outerHTML, expected);
		});
	});
};