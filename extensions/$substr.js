String.prototype.substr = Array.prototype.substr = function substr (start, end) {
	var i,
		newEnd = end,
		len = this.length,
		result = "";
	if (end < 0 && len > 0) {
		newEnd = end + len;
	}
	if (start === end) {
		return this[newEnd];
	}
	for (i = start; newEnd < this.length && i < newEnd; i += 1) {
		result += this[i];
	}
	return result;
}

Object.prototype.$substr = function $substr(start, end) {
	var result = {
		$types: [],
		$values: {}
	};
	var what = this;
	var f = function (val) {
		return function () {
			return val;
		}
	};
	if (what.$values.hasOwnProperty("Array")) {
		result.$types.push("Array");
		result.$values["Array"] = f(what.$values["Array"]().substr(start, end));
	}
	if (what.$values.hasOwnProperty("Text")) {
		result.$types.push("Text");
		result.$values["Text"] = f(what.$values["Text"]().substr(start, end));
	}
	return result;
}