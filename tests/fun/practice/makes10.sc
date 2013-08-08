/*
	Given 2 ints, a and b, return true if one of them is 10 or if their sum is 10. 
*/

var makes10 = (a: 0, b: 0) {
	return a is 10 or b is 10 or a + b is 10;
};

print(makes10(9, 10)); // true
print(makes10(9, 9));  // false
print(makes10(1, 9));  // true
print(makes10(11, -1));// true