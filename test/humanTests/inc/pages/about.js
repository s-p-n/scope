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
return scope.invokeExpression(scope.identifier("template"),[scope.mapExpression(["title","About"],["url","/about"],["description","Information about who we are. (Hint: we make the Scope Programming Language!)"],["body",scope.xmlExpression("article",{},scope.xmlExpression("h1",{},"About Us"),scope.xmlExpression("div",{},"This is an article about us.. kinda."))])]);scope.setForeignThis(__oldthis__);})
			});scope.setForeignThis(__oldthis__);});scope.setForeignThis(__oldthis__);}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvaW5jL3BhZ2VzL2Fib3V0LnNjIl0sIm5hbWVzIjpbIjxhbm9ueW1vdXNlPiIsIjxzY29wZT4iXSwibWFwcGluZ3MiOiJBQVkyQ0E7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEseUdBQUFDLHVCQUFBRDtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSwrRUFBQUMsSUFBQUQiLCJzb3VyY2VzQ29udGVudCI6WyJyZXR1cm4ge1xuXHRwdWJsaWMgcGFnZSA9ICh0ZW1wbGF0ZToge30pIHtcblx0XHRyZXR1cm4gdGVtcGxhdGUoW1xuXHRcdFx0dGl0bGU6IFwiQWJvdXRcIixcblx0XHRcdHVybDogXCIvYWJvdXRcIixcblx0XHRcdGRlc2NyaXB0aW9uOiBcIkluZm9ybWF0aW9uIGFib3V0IHdobyB3ZSBhcmUuIChIaW50OiB3ZSBtYWtlIHRoZSBTY29wZSBQcm9ncmFtbWluZyBMYW5ndWFnZSEpXCIsXG5cdFx0XHRib2R5OiBcblx0XHRcdDxhcnRpY2xlPlxuXHRcdFx0XHQ8aDE+XG5cdFx0XHRcdFx0XCJBYm91dCBVc1wiO1xuXHRcdFx0XHQ8L2gxPjtcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcIlRoaXMgaXMgYW4gYXJ0aWNsZSBhYm91dCB1cy4uIGtpbmRhLlwiO1xuXHRcdFx0XHQ8L2Rpdj47XG5cdFx0XHQ8L2FydGljbGU+XG5cdFx0XSk7XG5cdH07XG59OyJdfQ==