/*
	Given an array of ints, return True if one of the first 4 elements in the 
	array is a 9. The array length may be less than 4. 
*/

var arrayFront9 = (nums: []) {
	var result = false;
	for index: value in nums:
		if result is false and
			index < 4 and 
			value is 9:
				result = true;
		end;
	end;
	return result;
};

print(arrayFront9([1,2,9,3,4])); // true
print(arrayFront9([1,2,3,4,9])); // false
print(arrayFront9([1,2,3,4,5])); // false