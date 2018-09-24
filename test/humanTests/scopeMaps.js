#!/usr/bin/env node
				"use strict";
				global.__scopedir = __dirname;
				require('source-map-support').install();
				const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
				const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args)=>{scope.declarationExpression({
				type: "let",
				name: "foo",
				value: scope.createScope((args)=>{scope.declarationExpression({
				type: "let",
				name: "result",
				value: scope.mapExpression(["public",scope.mapExpression(["a",1],["b",2],["c",3])])
			});return scope.identifier("result");})
			});scope.declarationExpression({
				type: "let",
				name: "a",
				value: "root a"
			});scope.declarationExpression({
				type: "let",
				name: "bar",
				value: scope.createScope((args)=>{scope.use([scope.identifier("foo")]);})
			});scope.declarationExpression({
				type: "let",
				name: "baz",
				value: scope.arrayExpression("a","b","c")
			});scope.declarationExpression({
				type: "let",
				name: "f",
				value: scope.invokeExpression(scope.identifier("foo"),[])
			});scope.declarationExpression({
				type: "let",
				name: "b",
				value: scope.invokeExpression(scope.identifier("bar"),[])
			});scope.invokeExpression(ScopeApi.dereference,[scope.identifier("baz"),0]);scope.invokeExpression(ScopeApi.print,[scope.identifier("f")]);scope.invokeExpression(ScopeApi.print,[scope.identifier("b")]);scope.invokeExpression(ScopeApi.print,[scope.identifier("baz")]);}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvc2NvcGVNYXBzLnNjIl0sIm5hbWVzIjpbIjxhbm9ueW1vdXNlPiIsIjxzY29wZT4iLCJkZXJlZmVyZW5jZSIsImJheiIsInByaW50IiwiZiIsImIiXSwibWFwcGluZ3MiOiJBQWtCU0E7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEseUdBQUFDLHVCQUFBRCwyQkFoQktBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BRUVBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BRVJBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BR2dCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxNQUVaQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxNQUNBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxNQUVNQyx1QkFBUEMsb0JBQU9ELEVBQUhFLHVCQUFHSCxFQUFBQyxFQUFBRCxDQUVYQyx1QkFBRkcsY0FBRUgsRUFBQUkscUJBQUFKLEVBQUFELENBQ0FDLHVCQUFGRyxjQUFFSCxFQUFBSyxxQkFBQUwsRUFBQUQsQ0FDRUMsdUJBQUpHLGNBQUlILEVBQUFFLHVCQUFBRixFQUFBRCxHQUFBQyxJQUFBRCIsInNvdXJjZXNDb250ZW50IjpbImxldCBmb28gPSB7XG5cdGxldCByZXN1bHQgPSBbXCJwdWJsaWNcIjogW2E6IDEsIGI6IDIsIGM6IDNdXTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG5sZXQgYSA9IFwicm9vdCBhXCI7XG5sZXQgYmFyID0ge1xuXHR1c2UgZm9vO1xufTtcblxubGV0IGJheiA9IFsnYScsICdiJywgJ2MnXTtcblxubGV0IGYgPSBmb28oKTtcbmxldCBiID0gYmFyKCk7XG5cbmRlcmVmZXJlbmNlKGJheiwgMCk7XG5cbnByaW50KGYpO1xucHJpbnQoYik7XG5wcmludChiYXopOyJdfQ==