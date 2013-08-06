var Type = {
	$types: ["Scope"],
	$values: {
		"Scope": function () {
			return function Type (primitive) {
				var types = [];
				var i;
				for (i = 0; i < primitive.$types.length; i += 1) {
					types.push($primitive("Text", function (val) {
						return function () {
							return val;
						}
					}(primitive.$types[i])));
				}
			    return $primitive("Array", function () {
			    	return types;
	})}}}};