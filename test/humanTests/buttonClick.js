#!/usr/bin/env node
			"use strict";
			require('source-map-support').install();
			const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
			const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args=[])=>{scope.declarationExpression({
				type: "let",
				name: "Serve",
				value: scope.import("/home/spence/Projects/scope/test/scopeSrc/lib/Serve.js")
			});scope.declarationExpression({
				type: "let",
				name: "server",
				value: scope.invokeExpression(scope.identifier("Serve"),[])
			});scope.invokeExpression(scope.identifier("server").get("get"),["/",scope.createScope((args=[{key: "client", value: scope.arrayExpression()}])=>{scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.arrayExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("client").get("response").get("send"),[scope.identifier("site")]);})]);scope.invokeExpression(scope.identifier("server").get("on"),["buttonClick",scope.createScope((args=[{key: "client", value: scope.arrayExpression()}])=>{scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.arrayExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("client").get("emit"),["response","Message from Outer-space"]);})]);scope.invokeExpression(scope.identifier("server").get("listen"),[scope.arrayExpression({key: "port", value: 8080}),scope.createScope((args=[])=>{scope.invokeExpression(ScopeApi.print,["Server running on port 8080"]);})]);scope.declarationExpression({
				type: "let",
				name: "tellServer",
				value: scope.createScope((args=[{key: "e", value: scope.arrayExpression()}])=>{scope.declarationExpression({
				type: "let",
				name: "e",
				value: args[0] === undefined ? scope.arrayExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("socket").get("emit"),["buttonClick"]);})
			});scope.declarationExpression({
				type: "let",
				name: "button",
				value: scope.xmlExpression("button",{"onclick":scope.identifier("tellServer")},"Click me")
			});scope.declarationExpression({
				type: "let",
				name: "site",
				value: scope.xmlExpression("html",{},scope.xmlExpression("head",{},scope.xmlExpression("title",{},"Example Site")),scope.xmlExpression("body",{},scope.xmlExpression("div",{"bind-out":"response"}),scope.identifier("button")))
			});}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L3Njb3BlU3JjL2J1dHRvbkNsaWNrLnNjIl0sIm5hbWVzIjpbIjxhbm9ueW1vdXNlPiIsIjxzY29wZT4iLCJzZXJ2ZXIiLCJzY29wZS5pZGVudGlmaWVyKFwic2VydmVyXCIpLmdldCIsImNsaWVudCIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikucmVzcG9uc2UiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLmdldChcInJlc3BvbnNlXCIpLnNlbmQiLCJzaXRlIiwic2NvcGUuaWRlbnRpZmllcihcInNlcnZlclwiKS5vbiIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikuZW1pdCIsInNjb3BlLmlkZW50aWZpZXIoXCJzZXJ2ZXJcIikubGlzdGVuIiwicHJpbnQiXSwibWFwcGluZ3MiOiJBQStCUUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsd0dBQUFDLHVCQUFBRCw4QkEvQjJCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxNQUVoQkE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFHT0MsdUJBRHBCQywwQkFBQUMsV0FDb0JGLEVBRFpELEdBQ1lBLHlCQURBQSxpREFDQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUMsdUJBQW5CRywwQkFBQUMsZ0JBQUFDLFlBQW1CTCxFQUFBTSx3QkFBQU4sRUFBQUQsR0FBQUMsRUFBQUQsQ0FJeUJDLHVCQUQ3Q0MsMEJBQUFNLFVBQzZDUCxFQUQ1QkQsYUFDNEJBLHlCQURoQkEsaURBQ2dCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQyx1QkFBNUNHLDBCQUFBSyxZQUE0Q1IsRUFBNUJELFVBQTRCQSwyQkFBQUMsRUFBQUQsR0FBQUMsRUFBQUQsQ0FJZkMsdUJBRDlCQywwQkFBQVEsY0FDOEJULEVBRFhELGlEQUNXQSwrQkFBQUMsdUJBQTlCVSxjQUE4QlYsRUFBQUQsNkJBQUFDLEVBQUFELEdBQUFDLEVBQUFELENBSVZBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BSWZBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BVUhBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLFFBQUFDLElBQUFEIiwic291cmNlc0NvbnRlbnQiOlsibGV0IFNlcnZlID0gaW1wb3J0IFwiLi9saWIvU2VydmUuanNcIjtcblxubGV0IHNlcnZlciA9IFNlcnZlKCk7XG5cbnNlcnZlci5nZXQoXCIvXCIsIChjbGllbnQ6IFtdKSB7XG5cdGNsaWVudC5yZXNwb25zZS5zZW5kKHNpdGUpO1xufSk7XG5cbnNlcnZlci5vbihcImJ1dHRvbkNsaWNrXCIsIChjbGllbnQ6IFtdKSB7XG5cdGNsaWVudC5lbWl0KFwicmVzcG9uc2VcIiwgXCJNZXNzYWdlIGZyb20gT3V0ZXItc3BhY2VcIik7XG59KTtcblxuc2VydmVyLmxpc3RlbihbcG9ydDogODA4MF0sIHtcblx0cHJpbnQoXCJTZXJ2ZXIgcnVubmluZyBvbiBwb3J0IDgwODBcIik7XG59KTtcblxubGV0IHRlbGxTZXJ2ZXIgPSAoZTogW10pIHtcblx0c29ja2V0LmVtaXQoXCJidXR0b25DbGlja1wiKTtcbn07XG5cbmxldCBidXR0b24gPSA8YnV0dG9uIG9uY2xpY2s9dGVsbFNlcnZlcj5cblx0XCJDbGljayBtZVwiO1xuPC9idXR0b24+O1xuXG5sZXQgc2l0ZSA9IFxuPGh0bWw+XG5cdDxoZWFkPlxuXHRcdDx0aXRsZT5cIkV4YW1wbGUgU2l0ZVwiOzwvdGl0bGU+O1xuXHQ8L2hlYWQ+O1xuXHQ8Ym9keT5cblx0XHQ8ZGl2IGJpbmQtb3V0PVwicmVzcG9uc2VcIiAvPjtcblx0XHRidXR0b247XG5cdDwvYm9keT47XG48L2h0bWw+OyJdfQ==