var Text = {
	$types: "Scope",
	$values: {
		"Scope": function () {
			return function Text (primitive) {
				var result = null, res = "";
				if (primitive.$values.hasOwnProperty("Text")) {
					result = primitive.$values["Text"];
				} else if(primitive.$types.length === 1) {
					res = primitive.$values[primitive.$types[0]]().toString();
					result = function () { return res; };
				}
				if (result === null) {
					throw "Error in Text()";
				}
				return $primitive("Text", result);
			}
		}
	}
};
