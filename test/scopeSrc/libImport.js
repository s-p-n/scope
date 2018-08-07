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
scope.invokeExpression(scope.identifier("client").get("response").get("send"),[scope.identifier("site")]);})]);scope.invokeExpression(scope.identifier("server").get("on"),["say",scope.createScope((args=[{key: "client", value: scope.arrayExpression()},{key: "data", value: ""}])=>{scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.arrayExpression() : args[0]
			});
scope.declarationExpression({
				type: "let",
				name: "data",
				value: args[1] === undefined ? "" : args[1]
			});
scope.invokeExpression(scope.identifier("client").get("emit"),["echo",scope.identifier("data")]);})]);scope.invokeExpression(scope.identifier("server").get("listen"),[scope.arrayExpression({key: "port", value: 8080}),scope.createScope((args=[])=>{scope.invokeExpression(ScopeApi.print,["Server running on port 8080"]);})]);scope.declarationExpression({
				type: "let",
				name: "siteIo",
				value: scope.xmlExpression("div",{id:"io"},scope.xmlExpression("input",{type:"text", bindIn:"keyup:say"}),scope.xmlExpression("div",{bindOut:"echo"}))
			});scope.declarationExpression({
				type: "let",
				name: "site",
				value: scope.xmlExpression("html",{},scope.xmlExpression("head",{},scope.xmlExpression("title",{},"Scope Server Test")),scope.xmlExpression("body",{},scope.xmlExpression("h1",{},"Hello Scope Server"),scope.identifier("siteIo")))
			});}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L3Njb3BlU3JjL2xpYkltcG9ydC5zYyJdLCJuYW1lcyI6WyI8YW5vbnltb3VzZT4iLCI8c2NvcGU+Iiwic2VydmVyIiwic2NvcGUuaWRlbnRpZmllcihcInNlcnZlclwiKS5nZXQiLCJjbGllbnQiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLnJlc3BvbnNlIiwic2NvcGUuaWRlbnRpZmllcihcImNsaWVudFwiKS5nZXQoXCJyZXNwb25zZVwiKS5zZW5kIiwic2l0ZSIsInNjb3BlLmlkZW50aWZpZXIoXCJzZXJ2ZXJcIikub24iLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLmVtaXQiLCJkYXRhIiwic2NvcGUuaWRlbnRpZmllcihcInNlcnZlclwiKS5saXN0ZW4iLCJwcmludCJdLCJtYXBwaW5ncyI6IkFBZ0NRQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSx3R0FBQUMsdUJBQUFELDhCQWhDeUJBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BRWRBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BR09DLHVCQURwQkMsMEJBQUFDLFdBQ29CRixFQURaRCxHQUNZQSx5QkFEQUEsaURBQ0FBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFDLHVCQUFuQkcsMEJBQUFDLGdCQUFBQyxZQUFtQkwsRUFBQU0sd0JBQUFOLEVBQUFELEdBQUFDLEVBQUFELENBSURDLHVCQURuQkMsMEJBQUFNLFVBQ21CUCxFQURWRCxLQUNVQSx5QkFEYUEsMEVBQ2JBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFDLHVCQUFsQkcsMEJBQUFLLFlBQWtCUixFQUFORCxNQUFNQSxDQUFBVSx3QkFBQVQsRUFBQUQsR0FBQUMsRUFBQUQsQ0FJV0MsdUJBRDlCQywwQkFBQVMsY0FDOEJWLEVBRFhELGlEQUNXQSwrQkFBQUMsdUJBQTlCVyxjQUE4QlgsRUFBQUQsNkJBQUFDLEVBQUFELEdBQUFDLEVBQUFELENBS2ZBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BY2JBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLFFBQUFDLElBQUFEIiwic291cmNlc0NvbnRlbnQiOlsibGV0IFNlcnZlID0gaW1wb3J0IFwibGliL1NlcnZlLmpzXCI7XG5cbmxldCBzZXJ2ZXIgPSBTZXJ2ZSgpO1xuXG5zZXJ2ZXIuZ2V0KFwiL1wiLCAoY2xpZW50OiBbXSkge1xuXHRjbGllbnQucmVzcG9uc2Uuc2VuZChzaXRlKTtcbn0pO1xuXG5zZXJ2ZXIub24oXCJzYXlcIiwgKGNsaWVudDogW10sIGRhdGE6IFwiXCIpIHtcblx0Y2xpZW50LmVtaXQoXCJlY2hvXCIsIGRhdGEpO1xufSk7XG5cbnNlcnZlci5saXN0ZW4oW3BvcnQ6IDgwODBdLCB7XG5cdHByaW50KFwiU2VydmVyIHJ1bm5pbmcgb24gcG9ydCA4MDgwXCIpO1xufSk7XG5cbmxldCBzaXRlSW8gPSA8ZGl2IGlkPVwiaW9cIj5cblx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgYmluZEluPVwia2V5dXA6c2F5XCIgLz47XG5cdDxkaXYgYmluZE91dD1cImVjaG9cIiAvPjtcbjwvZGl2PjtcblxubGV0IHNpdGUgPSBcbjxodG1sPlxuXHQ8aGVhZD5cblx0XHQ8dGl0bGU+XG5cdFx0XHRcIlNjb3BlIFNlcnZlciBUZXN0XCI7XG5cdFx0PC90aXRsZT47XG5cdDwvaGVhZD47XG5cdDxib2R5PlxuXHRcdDxoMT5cblx0XHRcdFwiSGVsbG8gU2NvcGUgU2VydmVyXCI7XG5cdFx0PC9oMT47XG5cdFx0c2l0ZUlvO1xuXHQ8L2JvZHk+O1xuPC9odG1sPjsiXX0=