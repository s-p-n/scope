var $$$factorial = function $$$factorial (n){
	var i, result;
	if (n < 0) {
		for (i = -1; i > n; i -= 1) {
			result *= i;
		}
	} else if (n > 0) {
		for (i = 1; i < n; i += 1) {
			result *= i;
		}
	}
	return result;
}