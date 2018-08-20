#!/usr/bin/env node
			"use strict";
			require('source-map-support').install();
			const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
			const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args=[])=>{scope.declarationExpression({
				type: "public",
				name: "stylesheet",
				value: scope.arrayExpression({key: "html,body", value: scope.arrayExpression({key: "font-family", value: "sans-serif"},{key: "margin", value: 0},{key: "padding", value: 0})},{key: "h1", value: scope.arrayExpression({key: "margin", value: "10px"})},{key: "nav", value: scope.arrayExpression({key: "color", value: "#FFFFFF"},{key: "width", value: "100%"},{key: "padding", value: 0},{key: ">ul", value: scope.arrayExpression({key: "background-color", value: "#0090D2"},{key: "list-style", value: "none"},{key: "padding", value: "0 10px"},{key: "margin", value: 0},{key: ">li", value: scope.arrayExpression({key: "font-size", value: "24px"},{key: "font-weight", value: "bold"},{key: "display", value: "inline-block"},{key: "margin", value: "0 10px"},{key: ">a", value: scope.arrayExpression({key: "padding", value: "10px"},{key: "display", value: "inline-block"},{key: "color", value: "#FFFFFF"},{key: "text-decoration", value: "none"})},{key: ":hover", value: scope.arrayExpression({key: "background-color", value: "#0d6892"})})})})})
			});scope.declarationExpression({
				type: "public",
				name: "nav",
				value: scope.arrayExpression()
			});scope.declarationExpression({
				type: "public",
				name: "generate",
				value: scope.createScope((args=[{key: "data", value: scope.arrayExpression({key: "title", value: "No title"},{key: "body", value: scope.xmlExpression("h1",{},"No Body.")})}])=>{scope.declarationExpression({
				type: "let",
				name: "data",
				value: args[0] === undefined ? scope.arrayExpression({key: "title", value: "No title"},{key: "body", value: scope.xmlExpression("h1",{},"No Body.")}) : args[0]
			});
scope.declarationExpression({
				type: "let",
				name: "navBar",
				value: scope.xmlExpression("ul",{},)
			});scope.invokeExpression(ScopeApi['each'],[scope.identifier("nav"),scope.createScope((args=[{key: "url", value: ""},{key: "title", value: ""}])=>{scope.declarationExpression({
				type: "let",
				name: "url",
				value: args[0] === undefined ? "" : args[0]
			});
scope.declarationExpression({
				type: "let",
				name: "title",
				value: args[1] === undefined ? "" : args[1]
			});
scope.invokeExpression(scope.identifier("navBar").get("appendChild"),[scope.xmlExpression("li",{},scope.xmlExpression("a",{"href":scope.identifier("url")},scope.identifier("title")))]);})]);return scope.xmlExpression("html",{},scope.xmlExpression("head",{},scope.xmlExpression("title",{},scope.identifier("data").get("title")),scope.xmlExpression("style",{},scope.identifier("stylesheet"))),scope.xmlExpression("body",{},scope.xmlExpression("h1",{},scope.identifier("data").get("title")),scope.xmlExpression("nav",{},scope.identifier("navBar")),scope.identifier("data").get("body")));})
			});}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvaW5jL3RlbXBsYXRlLnNjIl0sIm5hbWVzIjpbIjxhbm9ueW1vdXNlPiIsIjxzY29wZT4iXSwibWFwcGluZ3MiOiJBQTZET0E7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsd0dBQUFDLHVCQUFBRCw4QkE5QkhBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BTVVBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1Bd0JQQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxRQUFBQyxJQUFBRCIsInNvdXJjZXNDb250ZW50IjpbInB1YmxpYyBzdHlsZXNoZWV0ID0gW1xuXHRcImh0bWwsYm9keVwiOiBbXG5cdFx0Zm9udC1mYW1pbHk6IFwic2Fucy1zZXJpZlwiLFxuXHRcdG1hcmdpbjogMCxcblx0XHRwYWRkaW5nOiAwXG5cdF0sXG5cdGgxOiBbXG5cdFx0bWFyZ2luOiBcIjEwcHhcIlxuXHRdLFxuXHRuYXY6IFtcblx0XHRjb2xvcjogXCIjRkZGRkZGXCIsXG5cdFx0d2lkdGg6IFwiMTAwJVwiLFxuXHRcdHBhZGRpbmc6IDAsXG5cdFx0XCI+dWxcIjogW1xuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogXCIjMDA5MEQyXCIsXG5cdFx0XHRsaXN0LXN0eWxlOiBcIm5vbmVcIixcblx0XHRcdHBhZGRpbmc6IFwiMCAxMHB4XCIsXG5cdFx0XHRtYXJnaW46IDAsXG5cdFx0XHRcIj5saVwiOiBbXG5cdFx0XHRcdGZvbnQtc2l6ZTogXCIyNHB4XCIsXG5cdFx0XHRcdGZvbnQtd2VpZ2h0OiBcImJvbGRcIixcblx0XHRcdFx0ZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcblx0XHRcdFx0bWFyZ2luOiBcIjAgMTBweFwiLFxuXHRcdFx0XHRcIj5hXCI6IFtcblx0XHRcdFx0XHRwYWRkaW5nOiBcIjEwcHhcIixcblx0XHRcdFx0XHRkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiLFxuXHRcdFx0XHRcdGNvbG9yOiBcIiNGRkZGRkZcIixcblx0XHRcdFx0XHR0ZXh0LWRlY29yYXRpb246IFwibm9uZVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFwiOmhvdmVyXCI6IFtcblx0XHRcdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiBcIiMwZDY4OTJcIlxuXHRcdFx0XHRdXG5cdFx0XHRdXG5cdFx0XVxuXG5cdF1cbl07XG5wdWJsaWMgbmF2ID0gW107XG5wdWJsaWMgZ2VuZXJhdGUgPSAoZGF0YTogW1xuXHR0aXRsZTogXCJObyB0aXRsZVwiLFxuXHRib2R5OiA8aDE+XCJObyBCb2R5LlwiOzwvaDE+XG5dKSB7XG5cdGxldCBuYXZCYXIgPSA8dWw+PC91bD47XG5cdGVhY2gobmF2LCAodXJsOiBcIlwiLCB0aXRsZTogXCJcIikge1xuXHRcdG5hdkJhci5hcHBlbmRDaGlsZCg8bGk+XG5cdFx0XHQ8YSBocmVmPXVybD50aXRsZTs8L2E+O1xuXHRcdDwvbGk+KTtcblx0fSk7XG5cdHJldHVybiBcblx0PGh0bWw+XG5cdFx0PGhlYWQ+XG5cdFx0XHQ8dGl0bGU+ZGF0YS50aXRsZTs8L3RpdGxlPjtcblx0XHRcdDxzdHlsZT5cblx0XHRcdFx0c3R5bGVzaGVldDtcblx0XHRcdDwvc3R5bGU+O1xuXHRcdDwvaGVhZD47XG5cdFx0PGJvZHk+XG5cdFx0XHQ8aDE+ZGF0YS50aXRsZTs8L2gxPjtcblx0XHRcdDxuYXY+XG5cdFx0XHRcdG5hdkJhcjtcblx0XHRcdDwvbmF2Pjtcblx0XHRcdGRhdGEuYm9keTtcblx0XHQ8L2JvZHk+O1xuXHQ8L2h0bWw+O1xufTsiXX0=