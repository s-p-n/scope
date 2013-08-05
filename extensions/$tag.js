var $tag = (function () {
	var built_ins = ['div', 'a', 'span'];
	return function $tag (id, attributes) {
		if (typeof attributes === "undefined") {
			return '<' + id + '/>';
		}
}});