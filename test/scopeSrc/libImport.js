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
scope.invokeExpression(ScopeApi.print,["Client says:",scope.identifier("data")]);scope.invokeExpression(scope.identifier("client").get("emit"),["echo",scope.identifier("data")]);})]);scope.invokeExpression(scope.identifier("server").get("listen"),[scope.arrayExpression({key: "port", value: 8080}),scope.createScope((args=[])=>{scope.invokeExpression(ScopeApi.print,["Server running on port 8080"]);})]);scope.declarationExpression({
				type: "let",
				name: "stylesheet",
				value: scope.arrayExpression({key: "h1", value: scope.arrayExpression({key: "font-family", value: "sans-serif"},{key: "color", value: "#AAA"},{key: "margin", value: 0},{key: "padding", value: 0})},{key: "input", value: scope.arrayExpression({key: "padding", value: "5px"},{key: "border", value: "none"},{key: "outline", value: "none"},{key: "box-shadow", value: "0px 0px 5px #DDDDDD"},{key: ":focus", value: scope.arrayExpression({key: "border", value: "none"},{key: "outline", value: "none"},{key: "box-shadow", value: "0px 0px 5px #00DDDD"})},{key: "border-radius", value: "2px"},{key: "transition", value: ".3s ease-in-out"})})
			});scope.declarationExpression({
				type: "let",
				name: "siteIo",
				value: scope.xmlExpression("div",{"id":"io"},scope.xmlExpression("input",{"type":"text", "bind-in":"keyup:say"}),scope.xmlExpression("div",{"bind-out":"echo"}))
			});scope.declarationExpression({
				type: "let",
				name: "site",
				value: scope.xmlExpression("html",{},scope.xmlExpression("head",{},scope.xmlExpression("title",{},"Scope Server Test"),scope.xmlExpression("style",{},scope.identifier("stylesheet"))),scope.xmlExpression("body",{},scope.xmlExpression("h1",{},"Hello Scope Server"),scope.identifier("siteIo")))
			});}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L3Njb3BlU3JjL2xpYkltcG9ydC5zYyJdLCJuYW1lcyI6WyI8YW5vbnltb3VzZT4iLCI8c2NvcGU+Iiwic2VydmVyIiwic2NvcGUuaWRlbnRpZmllcihcInNlcnZlclwiKS5nZXQiLCJjbGllbnQiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLnJlc3BvbnNlIiwic2NvcGUuaWRlbnRpZmllcihcImNsaWVudFwiKS5nZXQoXCJyZXNwb25zZVwiKS5zZW5kIiwic2l0ZSIsInNjb3BlLmlkZW50aWZpZXIoXCJzZXJ2ZXJcIikub24iLCJwcmludCIsImRhdGEiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLmVtaXQiLCJzY29wZS5pZGVudGlmaWVyKFwic2VydmVyXCIpLmxpc3RlbiJdLCJtYXBwaW5ncyI6IkFBMERRQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSx3R0FBQUMsdUJBQUFELDhCQTFEeUJBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BRWRBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BR09DLHVCQURwQkMsMEJBQUFDLFdBQ29CRixFQURaRCxHQUNZQSx5QkFEQUEsaURBQ0FBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFDLHVCQUFuQkcsMEJBQUFDLGdCQUFBQyxZQUFtQkwsRUFBQU0sd0JBQUFOLEVBQUFELEdBQUFDLEVBQUFELENBS0RDLHVCQUZuQkMsMEJBQUFNLFVBRW1CUCxFQUZWRCxLQUVVQSx5QkFGYUEsMEVBRWJBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBREVDLHVCQUFyQlEsY0FBcUJSLEVBQU5ELGNBQU1BLENBQUFVLHdCQUFBVCxFQUFBRCxDQUNGQyx1QkFBbEJHLDBCQUFBTyxZQUFrQlYsRUFBTkQsTUFBTUEsQ0FBQVUsd0JBQUFULEVBQUFELEdBQUFDLEVBQUFELENBSVdDLHVCQUQ5QkMsMEJBQUFVLGNBQzhCWCxFQURYRCxpREFDV0EsK0JBQUFDLHVCQUE5QlEsY0FBOEJSLEVBQUFELDZCQUFBQyxFQUFBRCxHQUFBQyxFQUFBRCxDQXNCbkNBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BS3FCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxNQWlCZEE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsUUFBQUMsSUFBQUQiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgU2VydmUgPSBpbXBvcnQgXCJsaWIvU2VydmUuanNcIjtcblxubGV0IHNlcnZlciA9IFNlcnZlKCk7XG5cbnNlcnZlci5nZXQoXCIvXCIsIChjbGllbnQ6IFtdKSB7XG5cdGNsaWVudC5yZXNwb25zZS5zZW5kKHNpdGUpO1xufSk7XG5cbnNlcnZlci5vbihcInNheVwiLCAoY2xpZW50OiBbXSwgZGF0YTogXCJcIikge1xuXHRwcmludChcIkNsaWVudCBzYXlzOlwiLCBkYXRhKTtcblx0Y2xpZW50LmVtaXQoXCJlY2hvXCIsIGRhdGEpO1xufSk7XG5cbnNlcnZlci5saXN0ZW4oW3BvcnQ6IDgwODBdLCB7XG5cdHByaW50KFwiU2VydmVyIHJ1bm5pbmcgb24gcG9ydCA4MDgwXCIpO1xufSk7XG5cbmxldCBzdHlsZXNoZWV0ID0gW1xuXHRcImgxXCI6IFtcblx0XHRmb250LWZhbWlseTogXCJzYW5zLXNlcmlmXCIsXG5cdFx0Y29sb3I6IFwiI0FBQVwiLFxuXHRcdG1hcmdpbjogMCxcblx0XHRwYWRkaW5nOiAwIFxuXHRdLFxuXHRcImlucHV0XCI6IFtcblx0XHRwYWRkaW5nOiBcIjVweFwiLFxuXHRcdGJvcmRlcjogXCJub25lXCIsXG5cdFx0b3V0bGluZTogXCJub25lXCIsXG5cdFx0Ym94LXNoYWRvdzogXCIwcHggMHB4IDVweCAjREREREREXCIsXG5cdFx0XCI6Zm9jdXNcIjogW1xuXHRcdFx0Ym9yZGVyOiBcIm5vbmVcIixcblx0XHRcdG91dGxpbmU6IFwibm9uZVwiLFxuXHRcdFx0Ym94LXNoYWRvdzogXCIwcHggMHB4IDVweCAjMDBEREREXCJcblx0XHRdLFxuXHRcdGJvcmRlci1yYWRpdXM6IFwiMnB4XCIsXG5cdFx0dHJhbnNpdGlvbjogXCIuM3MgZWFzZS1pbi1vdXRcIlxuXHRdXG5dO1xuXG5sZXQgc2l0ZUlvID0gPGRpdiBpZD1cImlvXCI+XG5cdDxpbnB1dCB0eXBlPVwidGV4dFwiIGJpbmQtaW49XCJrZXl1cDpzYXlcIiAvPjtcblx0PGRpdiBiaW5kLW91dD1cImVjaG9cIiAvPjtcbjwvZGl2PjtcblxubGV0IHNpdGUgPSBcbjxodG1sPlxuXHQ8aGVhZD5cblx0XHQ8dGl0bGU+XG5cdFx0XHRcIlNjb3BlIFNlcnZlciBUZXN0XCI7XG5cdFx0PC90aXRsZT47XG5cdFx0PHN0eWxlPlxuXHRcdFx0c3R5bGVzaGVldDtcblx0XHQ8L3N0eWxlPjtcblx0PC9oZWFkPjtcblx0PGJvZHk+XG5cdFx0PGgxPlxuXHRcdFx0XCJIZWxsbyBTY29wZSBTZXJ2ZXJcIjtcblx0XHQ8L2gxPjtcblx0XHRzaXRlSW87XG5cdDwvYm9keT47XG48L2h0bWw+OyJdfQ==