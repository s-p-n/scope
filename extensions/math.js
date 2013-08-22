var math = (function (JSMath) {
	var i;
	var newMath = {};
	var mathProps = Object.getOwnPropertyNames(JSMath);
	var key;
	var f = function (func) {
		return function () {
			return function () {
				var i = 0;
				var args = [];
				for (i = 0; i < arguments.length; i += 1) {
					args.push(arguments[i].$values["Number"]());
				}
				return $primitive("Number", function (val) {
					return function () {
						return val;
					}
				}(func.apply(newMath, args)));
			};
		};
	};
	var n = function (num) {
		return function () {
			return num;
		}
	};
	for (i = 0; i < mathProps.length; i += 1) {
		key = mathProps[i];
		newMath[key] = JSMath[key];
		if (typeof JSMath[key] === "function") {
			newMath[key] = {
				$types: ["Scope"],
				$values: {
					"Scope": f(JSMath[key])
				}
			};
		} else {
			newMath[key] = {
				$types: ["Number"],
				$values: {
					"Number": n(JSMath[key])
				}
			};
		}
	}
	return $primitive("Instance", n(newMath));
}(Math));