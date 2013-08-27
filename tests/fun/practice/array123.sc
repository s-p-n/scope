/*
	Given an array of ints, return True if .. 1, 2, 3, .. appears in the array 
	somewhere. 
*/

var array123 = (nums: []) {
	var i = 0;
	var result = false;
	while not result and i < len(nums) - 2:
		if nums[i: i + 3] is [1, 2, 3]:
			result = true;
		:;
		i += 1;
	:;
	return result;
};

print(array123([1, 1, 2, 3, 1])); // true
print(array123([1, 1, 2, 4, 1])); // false
print(array123([1, 1, 2, 1, 2, 3])); // true