/*
	Given two int values, return their sum. Unless the two values are the same,
	then return double their sum. 
*/

var sumDouble = (a: 0, b: 0) {
	return if a is b:
		a * 4;
	else:
		a + b;
	end;
};

print(sumDouble(1, 2)); // 3
print(sumDouble(3, 2)); // 5
print(sumDouble(2, 2)); // 8