/*
	The parameter weekday is true if it is a weekday, and the parameter vacation 
	is true if we are on vacation. We sleep in if it is not a weekday or we're 
	on vacation. Return true if we sleep in. 
*/

var SleepIn = (weekday: true, vacation: false) {
	return not weekday or vacation;
};

print(SleepIn(false, false)); // true
print(SleepIn(true, false));  // false
print(SleepIn(false, true));  // true
print(SleepIn(true, true));   // true