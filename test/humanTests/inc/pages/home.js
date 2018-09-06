#!/usr/bin/env node
				"use strict";
				global.__scopedir = __dirname;
				require('source-map-support').install();
				const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
				const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);return scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.declarationExpression({
				type: "public",
				name: "page",
				value: scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.declarationExpression({
				type: "let",
				name: "template",
				value: args[0] === undefined ? scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.setForeignThis(__oldthis__);}) : args[0]
			});
return scope.invokeExpression(scope.identifier("template"),[scope.mapExpression(["title","Home"],["url","/home"],["description","Example site built using the Scope Programming Language."],["body",scope.xmlExpression("article",{},scope.xmlExpression("h1",{},"Da Homepage"),scope.xmlExpression("div",{},"This is an article.. kinda."))])]);scope.setForeignThis(__oldthis__);})
			});scope.setForeignThis(__oldthis__);});scope.setForeignThis(__oldthis__);}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvaW5jL3BhZ2VzL2hvbWUuc2MiXSwibmFtZXMiOlsiPGFub255bW91c2U+IiwiPHNjb3BlPiJdLCJtYXBwaW5ncyI6IkFBWWtDQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSx5R0FBQUMsdUJBQUFEO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLCtFQUFBQyxJQUFBRCIsInNvdXJjZXNDb250ZW50IjpbInJldHVybiB7XG5cdHB1YmxpYyBwYWdlID0gKHRlbXBsYXRlOiB7fSkge1xuXHRcdHJldHVybiB0ZW1wbGF0ZShbXG5cdFx0XHR0aXRsZTogXCJIb21lXCIsXG5cdFx0XHR1cmw6IFwiL2hvbWVcIixcblx0XHRcdGRlc2NyaXB0aW9uOiBcIkV4YW1wbGUgc2l0ZSBidWlsdCB1c2luZyB0aGUgU2NvcGUgUHJvZ3JhbW1pbmcgTGFuZ3VhZ2UuXCIsXG5cdFx0XHRib2R5OiBcblx0XHRcdDxhcnRpY2xlPlxuXHRcdFx0XHQ8aDE+XG5cdFx0XHRcdFx0XCJEYSBIb21lcGFnZVwiO1xuXHRcdFx0XHQ8L2gxPjtcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcIlRoaXMgaXMgYW4gYXJ0aWNsZS4uIGtpbmRhLlwiO1xuXHRcdFx0XHQ8L2Rpdj47XG5cdFx0XHQ8L2FydGljbGU+XG5cdFx0XSk7XG5cdH07XG59OyJdfQ==