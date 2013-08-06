var Compatible = {
	$types: ["Scope"],
	$values: {
		"Scope": function () {
			return function (a, b) {
				var i, result = true;
				for (i = 0; i < b.$types.length; i += 1) {
					if (a.$types.indexOf(b.$types[i]) === -1) {
						result = false;
						break;
					}
				}
				return $primitive("Boolean", function () {
					return result;
				});
			}
		}
	}
}