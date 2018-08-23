#!/usr/bin/env node
				"use strict";
				global.__scopedir = __dirname;
				require('source-map-support').install();
				const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
				const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args=[])=>{return scope.createScope((args=[{key: "directory", value: ""}])=>{scope.declarationExpression({
				type: "let",
				name: "directory",
				value: args[0] === undefined ? "" : args[0]
			});
scope.invokeExpression(ScopeApi.print,["Will load: ",scope.identifier("directory")]);scope.declarationExpression({
				type: "public",
				name: "promises",
				value: scope.arrayExpression({key: "home", value: scope.invokeExpression(ScopeApi.compile,["./pages/home.sc"])},{key: "about", value: scope.invokeExpression(ScopeApi.compile,["./pages/about.sc"])})
			});});}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvaW5jL2xvYWRQYWdlcy5zYyJdLCJuYW1lcyI6WyI8YW5vbnltb3VzZT4iLCI8c2NvcGU+IiwicHJpbnQiLCJkaXJlY3RvcnkiXSwibWFwcGluZ3MiOiJBQUltQ0E7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEseUdBQUFDLHVCQUFBRCw2REFKZEEsK0JBSWNBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBSEpDLHVCQUF6QkMsY0FBeUJELEVBQVhELGFBQVdBLENBQUFHLDZCQUFBRixFQUFBRCxDQUdJQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxXQUFBQyxJQUFBRCIsInNvdXJjZXNDb250ZW50IjpbInJldHVybiAoZGlyZWN0b3J5OiBcIlwiKSB7XG5cdHByaW50KFwiV2lsbCBsb2FkOiBcIiwgZGlyZWN0b3J5KTtcblx0cHVibGljIHByb21pc2VzID0gW1xuXHRcdGhvbWU6IGNvbXBpbGUoXCIuL3BhZ2VzL2hvbWUuc2NcIiksXG5cdFx0YWJvdXQ6IGNvbXBpbGUoXCIuL3BhZ2VzL2Fib3V0LnNjXCIpXG5cdF07XG59OyJdfQ==