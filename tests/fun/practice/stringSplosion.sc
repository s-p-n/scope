/*
	Given a non-empty string like "Code" return a string like "CCoCodCode". 
*/

var stringSplosion = (str: "") {
	var i = 0;
	var result = "";
	while i < len(str):
		result &= str[:i += 1];
	end;
	return result;
};

print(stringSplosion('Code')); // "CCoCodCode"
print(stringSplosion('abc')); // "aababc"
print(stringSplosion('ab')); // "aab"