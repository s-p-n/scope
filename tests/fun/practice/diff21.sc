/*
	Given an int n, return the absolute difference between n and 21, 
	except return double the absolute difference if n is over 21. 
*/

var diff21 = (n: 0) {
	return if n > 21:
		(n - 21) * 2;
	else:
		21 - n;
	end;
};

print(diff21(19)); // 2
print(diff21(10)); // 11
print(diff21(21)); // 0
print(diff21(44)); // 46