let scope = require('../../lib/scopeRuntime');
let NumericMap = scope.arrayExpression().__proto__.constructor;
function mapEqual (a, b) {
	if ((typeof a) === (typeof b)) {
		if (typeof a !== "object") {
			return a === b;
		}
	} else {
		return false;
	}
	if (a instanceof Map || a instanceof NumericMap) {
		let cont = false;
		if (b instanceof Map && a instanceof Map) {
			cont = true;
		}
		if (b instanceof NumericMap && a instanceof NumericMap) {
			cont = true;
		}
		if (cont) {
			if (a.size !== b.size) {
				return false;
			}
			for (let [key, val] of a) {
				if(key in b) {
					if(mapEqual(val, b[key])) {
						continue;
					}
				}
				return false;
			}
			return true;
		}
		return false;
	}
}
module.exports = (assert, test) => {
	describe('import2.sc', () => {
		it('should return a map of the public properties from the imported scope', () => {
			
			assert.equal(mapEqual(test[0], scope.mapExpression(
				["foo", "im foo"],
				["bar", "im bar"]
			)), true);
		});

		it('should return a map of the public properties from the other imported scope', () => {
			assert.equal(mapEqual(test[1], scope.mapExpression(
				["foo", "im foo mod"],
				["bar", "im bar mod"]
			)), true);
		});
	});
};