#!/usr/bin/env node
				"use strict";
				global.__scopedir = __dirname;
				require('source-map-support').install();
				const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
				const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);return scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.declarationExpression({
				type: "let",
				name: "directory",
				value: args[0] === undefined ? "" : args[0]
			});
scope.invokeExpression(ScopeApi.print,["Will load: ",scope.identifier("directory")]);scope.declarationExpression({
				type: "public",
				name: "promises",
				value: scope.mapExpression(["home",scope.invokeExpression(ScopeApi.compile,["./pages/home.sc"])],["docs",scope.invokeExpression(ScopeApi.compile,["./pages/docs.sc"])],["about",scope.invokeExpression(ScopeApi.compile,["./pages/about.sc"])])
			});scope.setForeignThis(__oldthis__);});scope.setForeignThis(__oldthis__);}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvaW5jL2xvYWRQYWdlcy5zYyJdLCJuYW1lcyI6WyI8YW5vbnltb3VzZT4iLCI8c2NvcGU+IiwicHJpbnQiLCJkaXJlY3RvcnkiXSwibWFwcGluZ3MiOiJBQUttQ0E7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEseUdBQUFDLHVCQUFBRDtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUpKQyx1QkFBekJDLGNBQXlCRCxFQUFYRCxhQUFXQSxDQUFBRyw2QkFBQUYsRUFBQUQsQ0FJSUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsK0VBQUFDLElBQUFEIiwic291cmNlc0NvbnRlbnQiOlsicmV0dXJuIChkaXJlY3Rvcnk6IFwiXCIpIHtcblx0cHJpbnQoXCJXaWxsIGxvYWQ6IFwiLCBkaXJlY3RvcnkpO1xuXHRwdWJsaWMgcHJvbWlzZXMgPSBbXG5cdFx0aG9tZTogY29tcGlsZShcIi4vcGFnZXMvaG9tZS5zY1wiKSxcblx0XHRkb2NzOiBjb21waWxlKFwiLi9wYWdlcy9kb2NzLnNjXCIpLFxuXHRcdGFib3V0OiBjb21waWxlKFwiLi9wYWdlcy9hYm91dC5zY1wiKVxuXHRdO1xufTsiXX0=