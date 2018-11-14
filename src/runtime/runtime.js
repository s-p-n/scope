const path = require('path');
module.exports = {
	scope: `new <include file="${path.join(__dirname, '../runtime/Scope.js')}"/>()`,
	XRegExp: 'require("xregexp")'
};