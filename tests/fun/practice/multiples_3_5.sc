var i = 1;
var max = 1000;
var a = 3;
var b = 5;
var result = 0;
var multiples = [];
while (i lt max):
	if ((i % a is 0) or
		(i % b is 0)
	):
		result += i;
	end;
	i += 1;
end;

Console.write("Result:", result); // 233168