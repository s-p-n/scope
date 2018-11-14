let something = "outer";
{
	something = "inner";
}();
return something;