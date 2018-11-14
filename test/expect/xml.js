module.exports = (assert, test) => {
	describe('xml.sc', () => {
		it('should return the HTML "<foo><bar>hello</bar></foo>"', () => {
			assert.equal(test.outerHTML, "<foo><bar>hello</bar></foo>");
		});
	});
};