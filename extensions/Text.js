var Text = function Text (primitive) {
	var newPrim = $primitive("Text", function () {
		console.log("Text.toString:", primitive);
    	return primitive + "";
    });
	console.log("Text:", primitive, newPrim);
    return newPrim;
};
