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
return scope.invokeExpression(scope.identifier("template"),[scope.arrayExpression({key: "title", value: "About"},{key: "body", value: scope.xmlExpression("div",{"id":"page"},scope.xmlExpression("h2",{},"About Us"),scope.xmlExpression("div",{},"This is an article about us.. kinda."))})]);})
			});});}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvaW5jL3BhZ2VzL2Fib3V0LnNjIl0sIm5hbWVzIjpbIjxhbm9ueW1vdXNlPiIsIjxzY29wZT4iXSwibWFwcGluZ3MiOiJBQVUyQ0E7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsd0dBQUFDLHVCQUFBRDtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxXQUFBQyxJQUFBRCIsInNvdXJjZXNDb250ZW50IjpbInJldHVybiB7XG5cdHB1YmxpYyBwYWdlID0gKHRlbXBsYXRlOiB7fSkge1xuXHRcdHJldHVybiB0ZW1wbGF0ZShbXG5cdFx0XHR0aXRsZTogXCJBYm91dFwiLFxuXHRcdFx0Ym9keTogXG5cdFx0XHQ8ZGl2IGlkPVwicGFnZVwiPlxuXHRcdFx0XHQ8aDI+XG5cdFx0XHRcdFx0XCJBYm91dCBVc1wiO1xuXHRcdFx0XHQ8L2gyPjtcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcIlRoaXMgaXMgYW4gYXJ0aWNsZSBhYm91dCB1cy4uIGtpbmRhLlwiO1xuXHRcdFx0XHQ8L2Rpdj47XG5cdFx0XHQ8L2Rpdj5cblx0XHRdKTtcblx0fTtcbn07Il19