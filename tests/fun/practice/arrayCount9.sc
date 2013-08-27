/*
	Given an array of ints, return the number of 9's in the array. 
*/

var arrayCount9 = (nums: []) {
	var result = 0;
	for index:value in nums:
		if value is 9:
			result += 1;
		end;
	end;
	return result;
};

print(arrayCount9([1, 2, 9])); // 1
print(arrayCount9([1, 9, 9])); // 2
print(arrayCount9([1, 9, 9, 3, 9])); // 3