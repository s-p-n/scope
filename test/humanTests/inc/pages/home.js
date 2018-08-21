#!/usr/bin/env node
			"use strict";
			global.__scopedir = __dirname;
			require('source-map-support').install();
			const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
			const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args=[])=>{return scope.createScope((args=[])=>{scope.declarationExpression({
				type: "public",
				name: "page",
				value: scope.createScope((args=[{key: "template", value: scope.createScope((args=[])=>{})}])=>{scope.declarationExpression({
				type: "let",
				name: "template",
				value: args[0] === undefined ? scope.createScope((args=[])=>{}) : args[0]
			});
return scope.invokeExpression(scope.identifier("template"),[scope.arrayExpression({key: "title", value: "Home"},{key: "description", value: "Example site built using the Scope Programming Language."},{key: "body", value: scope.xmlExpression("div",{"id":"page"},scope.xmlExpression("h2",{},"Da Homepage"),scope.xmlExpression("div",{},"This is an article.. kinda."))})]);})
			});});}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvaW5jL3BhZ2VzL2hvbWUuc2MiXSwibmFtZXMiOlsiPGFub255bW91c2U+IiwiPHNjb3BlPiJdLCJtYXBwaW5ncyI6IkFBV2tDQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSx3R0FBQUMsdUJBQUFEO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLFdBQUFDLElBQUFEIiwic291cmNlc0NvbnRlbnQiOlsicmV0dXJuIHtcblx0cHVibGljIHBhZ2UgPSAodGVtcGxhdGU6IHt9KSB7XG5cdFx0cmV0dXJuIHRlbXBsYXRlKFtcblx0XHRcdHRpdGxlOiBcIkhvbWVcIixcblx0XHRcdGRlc2NyaXB0aW9uOiBcIkV4YW1wbGUgc2l0ZSBidWlsdCB1c2luZyB0aGUgU2NvcGUgUHJvZ3JhbW1pbmcgTGFuZ3VhZ2UuXCIsXG5cdFx0XHRib2R5OiBcblx0XHRcdDxkaXYgaWQ9XCJwYWdlXCI+XG5cdFx0XHRcdDxoMj5cblx0XHRcdFx0XHRcIkRhIEhvbWVwYWdlXCI7XG5cdFx0XHRcdDwvaDI+O1xuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFwiVGhpcyBpcyBhbiBhcnRpY2xlLi4ga2luZGEuXCI7XG5cdFx0XHRcdDwvZGl2Pjtcblx0XHRcdDwvZGl2PlxuXHRcdF0pO1xuXHR9O1xufTsiXX0=