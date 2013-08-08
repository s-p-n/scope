/*
	We have two monkeys, a and b, and the parameters aSmile and bSmile indicate
	if each is smiling. We are in trouble if they are both smiling or if neither
	of them is smiling. Return true if we are in trouble. 
*/

var monkeyTrouble = (aSmile: false, bSmile: false) {
	return aSmile is bSmile;
};

print(monkeyTrouble(true, true)); 	// true
print(monkeyTrouble(false, false)); // true
print(monkeyTrouble(true, false));  // false
print(monkeyTrouble(false, true));  // false