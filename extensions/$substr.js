(function () {
	var $substrFunc = function (start, end, returnIndex) {
		var i,
			newEnd,
			len = this.length,
			result = "";

		if (this instanceof Array) {
			result = [];
		}

		if (end === "complete") {
			end = len;
		}
		newEnd = end;
		if (end < 0 && len > 0) {
			newEnd = end + len;
		}
		//console.log("substr:", start, end, newEnd, returnIndex);
		if (returnIndex) {
			//console.log("arraySubstr returnIndex is true:", newEnd, this[newEnd]);
			return this[newEnd];
		}
		for (i = start; newEnd > start && i < newEnd && i < len; i += 1) {
			if (typeof result === "string") {
				result += this[i];
			} else {
				result.push(this[i]);
			}
			
		}
		return result;
	};
	Object.defineProperty(Array.prototype, "$substr_arr", {
		enumerable: false,
		configurable: false,
		writable: false,
		value: $substrFunc
	});
	Object.defineProperty(String.prototype, "$substr_txt", {
		enumerable: false,
		configurable: false,
		writable: false,
		value: $substrFunc
	});
	Object.defineProperty(Object.prototype, "$substr_arr", {
		enumerable: false,
		configurable: false,
		writable: false,
		value: $substrFunc
	});
}());


Object.defineProperty(Object.prototype, "$substr", {
	enumerable: false,
	configurable: false,
	writable: false,
	value: function $substr(start, end) {
		var result = {
			$types: [],
			$values: {}
		};
		var returnIndex = false;
		var what = this;
		var f = function (val) {
			return function () {
				return val;
			}
		};
		if (what.$types.indexOf("Array") !== -1 && !(what.$values["Array"]() instanceof Array)) {
			return what.$values["Array"]()[start];
		}

		start = parseInt(start);
		if (end === void 0) {
			end = start;
			returnIndex = true;
		} else if (end !== "complete") {
			end = parseInt(end);
		}
		
		//console.log("what:", what);
		//console.log("what values:", what.$values);
		//console.log("returnIndex:", returnIndex);
		if (what.$values.hasOwnProperty("Array")) {
			//console.log("has Array", what.$values["Array"]());
			result = what.$values["Array"]().$substr_arr(start, end, returnIndex);
			//console.log("result:", result);
			if (result instanceof Array) {
				result = $array(result);
			}
		} else if (what.$values.hasOwnProperty("Text")) {
			//console.log("has Text", what.$values["Text"]());
			result.$types.push("Text");
			result.$values["Text"] = f(what.$values["Text"]().$substr_txt(start, end, returnIndex));
		}
		//console.log("$substr result:", result);
		return result;
	}
});