#!/usr/bin/env node
				"use strict";
				global.__scopedir = __dirname;
				require('source-map-support').install();
				const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
				const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args)=>{return scope.createScope((args)=>{scope.declarationExpression({
				type: "let",
				name: "directory",
				value: args[0] === undefined ? "" : args[0]
			});
scope.invokeExpression(ScopeApi.print,["Will load: ",scope.identifier("directory")]);scope.declarationExpression({
				type: "public",
				name: "promises",
				value: scope.mapExpression(["home",scope.invokeExpression(ScopeApi.compile,["./pages/home.sc"])],["docs",scope.invokeExpression(ScopeApi.compile,["./pages/docs.sc"])],["about",scope.invokeExpression(ScopeApi.compile,["./pages/about.sc"])])
			});});}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvaW5jL2xvYWRQYWdlcy5zYyJdLCJuYW1lcyI6WyI8YW5vbnltb3VzZT4iLCI8c2NvcGU+IiwicHJpbnQiLCJkaXJlY3RvcnkiXSwibWFwcGluZ3MiOiJBQUttQ0E7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEseUdBQUFDLHVCQUFBRDtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUpKQyx1QkFBekJDLGNBQXlCRCxFQUFYRCxhQUFXQSxDQUFBRyw2QkFBQUYsRUFBQUQsQ0FJSUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsV0FBQUMsSUFBQUQiLCJzb3VyY2VzQ29udGVudCI6WyJyZXR1cm4gKGRpcmVjdG9yeTogXCJcIikge1xuXHRwcmludChcIldpbGwgbG9hZDogXCIsIGRpcmVjdG9yeSk7XG5cdHB1YmxpYyBwcm9taXNlcyA9IFtcblx0XHRob21lOiBjb21waWxlKFwiLi9wYWdlcy9ob21lLnNjXCIpLFxuXHRcdGRvY3M6IGNvbXBpbGUoXCIuL3BhZ2VzL2RvY3Muc2NcIiksXG5cdFx0YWJvdXQ6IGNvbXBpbGUoXCIuL3BhZ2VzL2Fib3V0LnNjXCIpXG5cdF07XG59OyJdfQ==