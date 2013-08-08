/*
	Given an int n, return true if it is within 10 of 100 or 200. 
	Note: Math.abs(num) computes the absolute value of a number.
*/

var nearHundred = (n: 0) {
	return math.abs(n - 100) <= 10 or math.abs(n - 200) <= 10;
};
print(nearHundred(93)); // true
print(nearHundred(90)); // true
print(nearHundred(89)); // false
print(nearHundred(193));// true
print(nearHundred(213));// false
print(nearHundred(203));// true
