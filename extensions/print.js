var print = {
	$types: ["Scope"],
	$values: {
		"Scope": function () {
			return function print (val) {
				console.log(Text.$values["Scope"]()(val).$values["Text"]());
			}
		}
	}
};