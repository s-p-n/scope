#!/usr/bin/env node
			"use strict";
			require('source-map-support').install();
			const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
			const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args=[])=>{return scope.createScope((args=[{key: "directory", value: ""}])=>{scope.declarationExpression({
				type: "let",
				name: "directory",
				value: args[0] === undefined ? "" : args[0]
			});
scope.invokeExpression(ScopeApi.print,["Will load: ",scope.identifier("directory")]);scope.declarationExpression({
				type: "public",
				name: "pages",
				value: scope.arrayExpression({key: "home", value: scope.import("/home/spence/Projects/scope/test/humanTests/inc/pages/home.js")},{key: "about", value: scope.import("/home/spence/Projects/scope/test/humanTests/inc/pages/about.js")})
			});});}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvaW5jL2xvYWRQYWdlcy5zYyJdLCJuYW1lcyI6WyI8YW5vbnltb3VzZT4iLCI8c2NvcGU+IiwicHJpbnQiLCJkaXJlY3RvcnkiXSwibWFwcGluZ3MiOiJBQUtDQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSx3R0FBQUMsdUJBQUFELDZEQUxvQkEsK0JBS3BCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUo4QkMsdUJBQXpCQyxjQUF5QkQsRUFBWEQsYUFBV0EsQ0FBQUcsNkJBQUFGLEVBQUFELENBSTlCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxXQUFBQyxJQUFBRCIsInNvdXJjZXNDb250ZW50IjpbInJldHVybiAoZGlyZWN0b3J5OiBcIlwiKSB7XG5cdHByaW50KFwiV2lsbCBsb2FkOiBcIiwgZGlyZWN0b3J5KTtcblx0cHVibGljIHBhZ2VzID0gW1xuXHRcdGhvbWU6IGltcG9ydCBcIi4vcGFnZXMvaG9tZS5zY1wiLFxuXHRcdGFib3V0OiBpbXBvcnQgXCIuL3BhZ2VzL2Fib3V0LnNjXCJcblx0XTtcbn07Il19