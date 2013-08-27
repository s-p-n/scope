var len = $primitive("Scope", function () {
	return function len (thing) {
		var result;
		if (typeof thing.$values["Array"] !== "undefined") {
			result = thing.$values["Array"]().length;
		} else if (typeof thing.$values["Text"] !== "undefined") {
			result = thing.$values["Text"]().length;
		} else {
			result = 0;
		}
		return $primitive("Number", function () {
			return result;
		});
	}
});