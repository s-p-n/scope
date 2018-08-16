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
				name: "button",
				value: scope.xmlExpression("button",{"onclick":scope.createScope((args=[{key: "e", value: scope.arrayExpression()}])=>{scope.declarationExpression({
				type: "let",
				name: "e",
				value: args[0] === undefined ? scope.arrayExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("socket").get("emit"),["buttonClick"]);})},"Click me")
			});scope.declarationExpression({
				type: "let",
				name: "site",
				value: scope.xmlExpression("html",{},scope.xmlExpression("head",{},scope.xmlExpression("title",{},"Example Site")),scope.xmlExpression("body",{},scope.xmlExpression("div",{"bind-out":"response"}),scope.identifier("button")))
			});}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L3Njb3BlU3JjL2J1dHRvbkNsaWNrLnNjIl0sIm5hbWVzIjpbIjxhbm9ueW1vdXNlPiIsIjxzY29wZT4iLCJzZXJ2ZXIiLCJzY29wZS5pZGVudGlmaWVyKFwic2VydmVyXCIpLmdldCIsImNsaWVudCIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikucmVzcG9uc2UiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLmdldChcInJlc3BvbnNlXCIpLnNlbmQiLCJzaXRlIiwic2NvcGUuaWRlbnRpZmllcihcInNlcnZlclwiKS5vbiIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikuZW1pdCIsInNjb3BlLmlkZW50aWZpZXIoXCJzZXJ2ZXJcIikubGlzdGVuIiwicHJpbnQiXSwibWFwcGluZ3MiOiJBQTZCUUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsd0dBQUFDLHVCQUFBRCw4QkE3QjJCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxNQUVoQkE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFHT0MsdUJBRHBCQywwQkFBQUMsV0FDb0JGLEVBRFpELEdBQ1lBLHlCQURBQSxpREFDQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUMsdUJBQW5CRywwQkFBQUMsZ0JBQUFDLFlBQW1CTCxFQUFBTSx3QkFBQU4sRUFBQUQsR0FBQUMsRUFBQUQsQ0FJeUJDLHVCQUQ3Q0MsMEJBQUFNLFVBQzZDUCxFQUQ1QkQsYUFDNEJBLHlCQURoQkEsaURBQ2dCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQyx1QkFBNUNHLDBCQUFBSyxZQUE0Q1IsRUFBNUJELFVBQTRCQSwyQkFBQUMsRUFBQUQsR0FBQUMsRUFBQUQsQ0FJZkMsdUJBRDlCQywwQkFBQVEsY0FDOEJULEVBRFhELGlEQUNXQSwrQkFBQUMsdUJBQTlCVSxjQUE4QlYsRUFBQUQsNkJBQUFDLEVBQUFELEdBQUFDLEVBQUFELENBTXpCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxNQVVIQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxRQUFBQyxJQUFBRCIsInNvdXJjZXNDb250ZW50IjpbImxldCBTZXJ2ZSA9IGltcG9ydCBcIi4vbGliL1NlcnZlLmpzXCI7XG5cbmxldCBzZXJ2ZXIgPSBTZXJ2ZSgpO1xuXG5zZXJ2ZXIuZ2V0KFwiL1wiLCAoY2xpZW50OiBbXSkge1xuXHRjbGllbnQucmVzcG9uc2Uuc2VuZChzaXRlKTtcbn0pO1xuXG5zZXJ2ZXIub24oXCJidXR0b25DbGlja1wiLCAoY2xpZW50OiBbXSkge1xuXHRjbGllbnQuZW1pdChcInJlc3BvbnNlXCIsIFwiTWVzc2FnZSBmcm9tIE91dGVyLXNwYWNlXCIpO1xufSk7XG5cbnNlcnZlci5saXN0ZW4oW3BvcnQ6IDgwODBdLCB7XG5cdHByaW50KFwiU2VydmVyIHJ1bm5pbmcgb24gcG9ydCA4MDgwXCIpO1xufSk7XG5cbmxldCBidXR0b24gPSA8YnV0dG9uIG9uY2xpY2s9KGU6IFtdKSB7XG5cdHNvY2tldC5lbWl0KFwiYnV0dG9uQ2xpY2tcIik7XG59PlxuXHRcIkNsaWNrIG1lXCI7XG48L2J1dHRvbj47XG5cbmxldCBzaXRlID0gXG48aHRtbD5cblx0PGhlYWQ+XG5cdFx0PHRpdGxlPlwiRXhhbXBsZSBTaXRlXCI7PC90aXRsZT47XG5cdDwvaGVhZD47XG5cdDxib2R5PlxuXHRcdDxkaXYgYmluZC1vdXQ9XCJyZXNwb25zZVwiIC8+O1xuXHRcdGJ1dHRvbjtcblx0PC9ib2R5PjtcbjwvaHRtbD47Il19