#!/usr/bin/env node
			"use strict";
			require('source-map-support').install();
			const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
			const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args=[])=>{return scope.createScope((args=[])=>{scope.declarationExpression({
				type: "public",
				name: "stylesheet",
				value: scope.arrayExpression({key: "html,body", value: scope.arrayExpression({key: "font-family", value: "sans-serif"},{key: "margin", value: 0},{key: "padding", value: 0})},{key: "h1", value: scope.arrayExpression({key: "margin", value: "10px"})},{key: "nav", value: scope.arrayExpression({key: "color", value: "#FFFFFF"},{key: "width", value: "100%"},{key: "padding", value: 0},{key: ">ul", value: scope.arrayExpression({key: "background-color", value: "#0090D2"},{key: "list-style", value: "none"},{key: "padding", value: "0 10px"},{key: "margin", value: 0},{key: ">li", value: scope.arrayExpression({key: "font-size", value: "24px"},{key: "font-weight", value: "bold"},{key: "display", value: "inline-block"},{key: "margin", value: "0 10px"},{key: ">a", value: scope.arrayExpression({key: "padding", value: "10px"},{key: "display", value: "inline-block"},{key: "color", value: "#FFFFFF"},{key: "text-decoration", value: "none"})},{key: ":hover", value: scope.arrayExpression({key: "background-color", value: "#0d6892"})})})})})
			});scope.declarationExpression({
				type: "public",
				name: "nav",
				value: scope.arrayExpression()
			});scope.declarationExpression({
				type: "public",
				name: "template",
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
			});});}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvaW5jL3RlbXBsYXRlLnNjIl0sIm5hbWVzIjpbIjxhbm9ueW1vdXNlPiIsIjxzY29wZT4iXSwibWFwcGluZ3MiOiJBQThEUUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsd0dBQUFDLHVCQUFBRCxtRUE5QkhBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BTVVBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1Bd0JQQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxXQUFBQyxJQUFBRCIsInNvdXJjZXNDb250ZW50IjpbInJldHVybiB7XG5cdHB1YmxpYyBzdHlsZXNoZWV0ID0gW1xuXHRcdFwiaHRtbCxib2R5XCI6IFtcblx0XHRcdGZvbnQtZmFtaWx5OiBcInNhbnMtc2VyaWZcIixcblx0XHRcdG1hcmdpbjogMCxcblx0XHRcdHBhZGRpbmc6IDBcblx0XHRdLFxuXHRcdGgxOiBbXG5cdFx0XHRtYXJnaW46IFwiMTBweFwiXG5cdFx0XSxcblx0XHRuYXY6IFtcblx0XHRcdGNvbG9yOiBcIiNGRkZGRkZcIixcblx0XHRcdHdpZHRoOiBcIjEwMCVcIixcblx0XHRcdHBhZGRpbmc6IDAsXG5cdFx0XHRcIj51bFwiOiBbXG5cdFx0XHRcdGJhY2tncm91bmQtY29sb3I6IFwiIzAwOTBEMlwiLFxuXHRcdFx0XHRsaXN0LXN0eWxlOiBcIm5vbmVcIixcblx0XHRcdFx0cGFkZGluZzogXCIwIDEwcHhcIixcblx0XHRcdFx0bWFyZ2luOiAwLFxuXHRcdFx0XHRcIj5saVwiOiBbXG5cdFx0XHRcdFx0Zm9udC1zaXplOiBcIjI0cHhcIixcblx0XHRcdFx0XHRmb250LXdlaWdodDogXCJib2xkXCIsXG5cdFx0XHRcdFx0ZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcblx0XHRcdFx0XHRtYXJnaW46IFwiMCAxMHB4XCIsXG5cdFx0XHRcdFx0XCI+YVwiOiBbXG5cdFx0XHRcdFx0XHRwYWRkaW5nOiBcIjEwcHhcIixcblx0XHRcdFx0XHRcdGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsXG5cdFx0XHRcdFx0XHRjb2xvcjogXCIjRkZGRkZGXCIsXG5cdFx0XHRcdFx0XHR0ZXh0LWRlY29yYXRpb246IFwibm9uZVwiXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcIjpob3ZlclwiOiBbXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiBcIiMwZDY4OTJcIlxuXHRcdFx0XHRcdF1cblx0XHRcdFx0XVxuXHRcdFx0XVxuXG5cdFx0XVxuXHRdO1xuXHRwdWJsaWMgbmF2ID0gW107XG5cdHB1YmxpYyB0ZW1wbGF0ZSA9IChkYXRhOiBbXG5cdFx0dGl0bGU6IFwiTm8gdGl0bGVcIixcblx0XHRib2R5OiA8aDE+XCJObyBCb2R5LlwiOzwvaDE+XG5cdF0pIHtcblx0XHRsZXQgbmF2QmFyID0gPHVsPjwvdWw+O1xuXHRcdGVhY2gobmF2LCAodXJsOiBcIlwiLCB0aXRsZTogXCJcIikge1xuXHRcdFx0bmF2QmFyLmFwcGVuZENoaWxkKDxsaT5cblx0XHRcdFx0PGEgaHJlZj11cmw+dGl0bGU7PC9hPjtcblx0XHRcdDwvbGk+KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gXG5cdFx0PGh0bWw+XG5cdFx0XHQ8aGVhZD5cblx0XHRcdFx0PHRpdGxlPmRhdGEudGl0bGU7PC90aXRsZT47XG5cdFx0XHRcdDxzdHlsZT5cblx0XHRcdFx0XHRzdHlsZXNoZWV0O1xuXHRcdFx0XHQ8L3N0eWxlPjtcblx0XHRcdDwvaGVhZD47XG5cdFx0XHQ8Ym9keT5cblx0XHRcdFx0PGgxPmRhdGEudGl0bGU7PC9oMT47XG5cdFx0XHRcdDxuYXY+XG5cdFx0XHRcdFx0bmF2QmFyO1xuXHRcdFx0XHQ8L25hdj47XG5cdFx0XHRcdGRhdGEuYm9keTtcblx0XHRcdDwvYm9keT47XG5cdFx0PC9odG1sPjtcblx0fTtcbn07Il19