/*
	Given 2 int values, return true if one is negative and one is positive. 
	Except if the parameter "negative" is true, then return true only if 
	both are negative. 
*/

var posNeg = (a: 0, b: 0, negative: false) {
	return if negative:
		a < 0 and b < 0;
	else:
		(a < 0 and b >= 0) or
		(b < 0 and a >= 0);
	end;
};

print(posNeg(1, -1, false)); // true
print(posNeg(-1, 1, false)); // true
print(posNeg(-4, -5, true)); // true
print(posNeg(-4, -5, false));// false
print(posNeg(4, -5, false)); // true
print(posNeg(4, 5, false));  // false