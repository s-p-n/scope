var Text = {
	$types: ["Scope"],
	$values: {
		"Scope": function () {
			return function Text (primitive, fromType) {
				var result = null, res = "";
				if (fromType !== void 0) {
					fromType = fromType.$values["Text"]();
					if (primitive.$values.hasOwnProperty(fromType)) {
						res = primitive.$values[fromType]().toString();
						result = function () { return res; }; 
					}
				} else if (primitive.$values.hasOwnProperty("Text")) {
					result = primitive.$values["Text"];
				} else if(primitive.$types.length === 1) {
					res = primitive.$values[primitive.$types[0]]().toString();
					result = function () { return res; };
				}
				if (result === null) {
					throw "Error! Multi-Type Primitive (without a text-type and no specified type for" +
						"Text(Any:Primitive [, Text:fromType])), cannot be converted to Text.";
				}
				return $primitive("Text", result);
			}
		}
	}
};
