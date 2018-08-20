#!/usr/bin/env node
			"use strict";
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
return scope.invokeExpression(scope.identifier("template"),[scope.arrayExpression({key: "title", value: "Home"},{key: "body", value: scope.xmlExpression("div",{"id":"page"},scope.xmlExpression("h2",{},"Da Homepage"),scope.xmlExpression("div",{},"This is an article.. kinda."))})]);})
			});});}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvaW5jL2hvbWUuc2MiXSwibmFtZXMiOlsiPGFub255bW91c2U+IiwiPHNjb3BlPiJdLCJtYXBwaW5ncyI6IkFBVWtDQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSx3R0FBQUMsdUJBQUFEO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLFdBQUFDLElBQUFEIiwic291cmNlc0NvbnRlbnQiOlsicmV0dXJuIHtcblx0cHVibGljIHBhZ2UgPSAodGVtcGxhdGU6IHt9KSB7XG5cdFx0cmV0dXJuIHRlbXBsYXRlKFtcblx0XHRcdHRpdGxlOiBcIkhvbWVcIixcblx0XHRcdGJvZHk6IFxuXHRcdFx0PGRpdiBpZD1cInBhZ2VcIj5cblx0XHRcdFx0PGgyPlxuXHRcdFx0XHRcdFwiRGEgSG9tZXBhZ2VcIjtcblx0XHRcdFx0PC9oMj47XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XCJUaGlzIGlzIGFuIGFydGljbGUuLiBraW5kYS5cIjtcblx0XHRcdFx0PC9kaXY+O1xuXHRcdFx0PC9kaXY+XG5cdFx0XSk7XG5cdH07XG59OyJdfQ==