var $factorial = function $factorial (n){
	n = n.$values["Number"]();
	var i, result = n;
	if (n < 0) {
		for (i = -1; i > n; i -= 1) {
			result *= i;
		}
	} else if (n > 0) {
		for (i = 1; i < n; i += 1) {
			result *= i;
		}
	}
	return $primitive("Number", function () {return result});
}