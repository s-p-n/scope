/*
	We have a loud talking parrot. The "hour" parameter is the current hour time in the range 0..23.
	We are in trouble if the parrot is talking and the hour is before 7 or after 20. 
	Return true if we are in trouble. 
*/

var parrotTrouble = (talking: false, hour: 0) {
	//print ("Is talking?");
	//print(talking);
	//print("k");
	return talking and (hour < 7 or hour > 20);
};

print(parrotTrouble(true, 6)); // true
print(parrotTrouble(true, 7)); // false
print(parrotTrouble(false, 6)); // false
print(parrotTrouble(true, 21)); // true
print(parrotTrouble(false, 21)); // false