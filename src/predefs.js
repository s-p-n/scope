module.exports = SCOPE_DIR => '#!/usr/bin/env node\n"use strict";' + `
	global.__scopedir = __dirname;
	require("source-map-support").install();
	if (typeof global.scope === "undefined") {
		Object.defineProperty(global, "scope", {
			value: require("${SCOPE_DIR}/scopeRuntime.js")
		});
		Object.defineProperty(global, "ScopeApi", {
			value: require("${SCOPE_DIR}/scopeRuntimeApi.js")(scope)
		});
		Object.defineProperty(global, "XRegExp", {
			value: require("xregexp")
		});
	}
	module.exports=`.replace(/((?<!new|let|var|const|typeof)\s)+/g,"");