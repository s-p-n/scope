#!/usr/bin/env node
			"use strict";
			require('source-map-support').install();
			const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
			const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args=[])=>{scope.declarationExpression({
				type: "let",
				name: "Serve",
				value: scope.import("/home/spence/Projects/scope/test/humanTests/lib/Serve.js")
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
scope.invokeExpression(ScopeApi.print,["Client says:",scope.identifier("data")]);scope.invokeExpression(scope.identifier("client").get("emit"),["echo",scope.identifier("data")]);})]);scope.invokeExpression(scope.identifier("server").get("on"),["clicked",scope.createScope((args=[{key: "client", value: scope.arrayExpression()},{key: "data", value: ""}])=>{scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.arrayExpression() : args[0]
			});
scope.declarationExpression({
				type: "let",
				name: "data",
				value: args[1] === undefined ? "" : args[1]
			});
scope.invokeExpression(ScopeApi.print,["clicked"]);})]);scope.invokeExpression(scope.identifier("server").get("listen"),[scope.arrayExpression({key: "port", value: 8080}),scope.createScope((args=[])=>{scope.invokeExpression(ScopeApi.print,["Server running on port 8080"]);})]);scope.declarationExpression({
				type: "let",
				name: "stylesheet",
				value: scope.arrayExpression({key: "h1", value: scope.arrayExpression({key: "font-family", value: "sans-serif"},{key: "color", value: "#AAA"},{key: "margin", value: 0},{key: "padding", value: 0})},{key: "input", value: scope.arrayExpression({key: "padding", value: "5px"},{key: "border", value: "none"},{key: "outline", value: "none"},{key: "box-shadow", value: "0px 0px 5px #DDDDDD"},{key: ":focus", value: scope.arrayExpression({key: "border", value: "none"},{key: "outline", value: "none"},{key: "box-shadow", value: "0px 0px 5px #00DDDD"})},{key: "border-radius", value: "2px"},{key: "transition", value: ".3s ease-in-out"})})
			});scope.declarationExpression({
				type: "let",
				name: "siteIo",
				value: scope.xmlExpression("div",{"id":"io"},scope.xmlExpression("input",{"type":"text", "bind-in":"keyup:say"}),scope.xmlExpression("div",{"bind-out":"echo"}),scope.xmlExpression("button",{"onclick":scope.createScope((args=[{key: "e", value: scope.arrayExpression()}])=>{scope.declarationExpression({
				type: "let",
				name: "e",
				value: args[0] === undefined ? scope.arrayExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("socket").get("emit"),["clicked"]);})},"Send to 'clicked' channel"))
			});scope.declarationExpression({
				type: "let",
				name: "site",
				value: scope.xmlExpression("html",{},scope.xmlExpression("head",{},scope.xmlExpression("title",{},"Scope Server Test"),scope.xmlExpression("style",{},scope.identifier("stylesheet"))),scope.xmlExpression("body",{},scope.xmlExpression("h1",{},"Hello Scope Server"),scope.identifier("siteIo")))
			});}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvbGliSW1wb3J0LnNjIl0sIm5hbWVzIjpbIjxhbm9ueW1vdXNlPiIsIjxzY29wZT4iLCJzZXJ2ZXIiLCJzY29wZS5pZGVudGlmaWVyKFwic2VydmVyXCIpLmdldCIsImNsaWVudCIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikucmVzcG9uc2UiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLmdldChcInJlc3BvbnNlXCIpLnNlbmQiLCJzaXRlIiwic2NvcGUuaWRlbnRpZmllcihcInNlcnZlclwiKS5vbiIsInByaW50IiwiZGF0YSIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikuZW1pdCIsInNjb3BlLmlkZW50aWZpZXIoXCJzZXJ2ZXJcIikubGlzdGVuIl0sIm1hcHBpbmdzIjoiQUFtRVFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLHdHQUFBQyx1QkFBQUQsOEJBbkV5QkE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFFZEE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFHT0MsdUJBRHBCQywwQkFBQUMsV0FDb0JGLEVBRFpELEdBQ1lBLHlCQURBQSxpREFDQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUMsdUJBQW5CRywwQkFBQUMsZ0JBQUFDLFlBQW1CTCxFQUFBTSx3QkFBQU4sRUFBQUQsR0FBQUMsRUFBQUQsQ0FLREMsdUJBRm5CQywwQkFBQU0sVUFFbUJQLEVBRlZELEtBRVVBLHlCQUZhQSwwRUFFYkE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFERUMsdUJBQXJCUSxjQUFxQlIsRUFBTkQsY0FBTUEsQ0FBQVUsd0JBQUFULEVBQUFELENBQ0ZDLHVCQUFsQkcsMEJBQUFPLFlBQWtCVixFQUFORCxNQUFNQSxDQUFBVSx3QkFBQVQsRUFBQUQsR0FBQUMsRUFBQUQsQ0FJVEMsdUJBRFZDLDBCQUFBTSxVQUNVUCxFQURHRCxTQUNIQSx5QkFEMEJBLDBFQUMxQkE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUMsdUJBQVZRLGNBQVVSLEVBQUFELFNBQUFDLEVBQUFELEdBQUFDLEVBQUFELENBSW9CQyx1QkFEOUJDLDBCQUFBVSxjQUM4QlgsRUFEWEQsaURBQ1dBLCtCQUFBQyx1QkFBOUJRLGNBQThCUixFQUFBRCw2QkFBQUMsRUFBQUQsR0FBQUMsRUFBQUQsQ0FzQm5DQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxNQVM0QkE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFrQnJCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxRQUFBQyxJQUFBRCIsInNvdXJjZXNDb250ZW50IjpbImxldCBTZXJ2ZSA9IGltcG9ydCBcImxpYi9TZXJ2ZS5qc1wiO1xuXG5sZXQgc2VydmVyID0gU2VydmUoKTtcblxuc2VydmVyLmdldChcIi9cIiwgKGNsaWVudDogW10pIHtcblx0Y2xpZW50LnJlc3BvbnNlLnNlbmQoc2l0ZSk7XG59KTtcblxuc2VydmVyLm9uKFwic2F5XCIsIChjbGllbnQ6IFtdLCBkYXRhOiBcIlwiKSB7XG5cdHByaW50KFwiQ2xpZW50IHNheXM6XCIsIGRhdGEpO1xuXHRjbGllbnQuZW1pdChcImVjaG9cIiwgZGF0YSk7XG59KTtcblxuc2VydmVyLm9uKFwiY2xpY2tlZFwiLCAoY2xpZW50OiBbXSwgZGF0YTogXCJcIikge1xuXHRwcmludChcImNsaWNrZWRcIik7XG59KTtcblxuc2VydmVyLmxpc3RlbihbcG9ydDogODA4MF0sIHtcblx0cHJpbnQoXCJTZXJ2ZXIgcnVubmluZyBvbiBwb3J0IDgwODBcIik7XG59KTtcblxubGV0IHN0eWxlc2hlZXQgPSBbXG5cdFwiaDFcIjogW1xuXHRcdGZvbnQtZmFtaWx5OiBcInNhbnMtc2VyaWZcIixcblx0XHRjb2xvcjogXCIjQUFBXCIsXG5cdFx0bWFyZ2luOiAwLFxuXHRcdHBhZGRpbmc6IDAgXG5cdF0sXG5cdFwiaW5wdXRcIjogW1xuXHRcdHBhZGRpbmc6IFwiNXB4XCIsXG5cdFx0Ym9yZGVyOiBcIm5vbmVcIixcblx0XHRvdXRsaW5lOiBcIm5vbmVcIixcblx0XHRib3gtc2hhZG93OiBcIjBweCAwcHggNXB4ICNERERERERcIixcblx0XHRcIjpmb2N1c1wiOiBbXG5cdFx0XHRib3JkZXI6IFwibm9uZVwiLFxuXHRcdFx0b3V0bGluZTogXCJub25lXCIsXG5cdFx0XHRib3gtc2hhZG93OiBcIjBweCAwcHggNXB4ICMwMERERERcIlxuXHRcdF0sXG5cdFx0Ym9yZGVyLXJhZGl1czogXCIycHhcIixcblx0XHR0cmFuc2l0aW9uOiBcIi4zcyBlYXNlLWluLW91dFwiXG5cdF1cbl07XG5cbmxldCBzaXRlSW8gPSA8ZGl2IGlkPVwiaW9cIj5cblx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgYmluZC1pbj1cImtleXVwOnNheVwiIC8+O1xuXHQ8ZGl2IGJpbmQtb3V0PVwiZWNob1wiIC8+O1xuXHQ8YnV0dG9uIG9uY2xpY2s9KGU6IFtdKSB7XG5cdFx0c29ja2V0LmVtaXQoXCJjbGlja2VkXCIpO1xuXHR9PlxuXHRcdFwiU2VuZCB0byAnY2xpY2tlZCcgY2hhbm5lbFwiO1xuXHQ8L2J1dHRvbj47XG48L2Rpdj47XG5cbmxldCBzaXRlID0gXG48aHRtbD5cblx0PGhlYWQ+XG5cdFx0PHRpdGxlPlxuXHRcdFx0XCJTY29wZSBTZXJ2ZXIgVGVzdFwiO1xuXHRcdDwvdGl0bGU+O1xuXHRcdDxzdHlsZT5cblx0XHRcdHN0eWxlc2hlZXQ7XG5cdFx0PC9zdHlsZT47XG5cdDwvaGVhZD47XG5cdDxib2R5PlxuXHRcdDxoMT5cblx0XHRcdFwiSGVsbG8gU2NvcGUgU2VydmVyXCI7XG5cdFx0PC9oMT47XG5cdFx0c2l0ZUlvO1xuXHQ8L2JvZHk+O1xuPC9odG1sPjsiXX0=