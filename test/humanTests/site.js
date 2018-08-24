#!/usr/bin/env node
				"use strict";
				global.__scopedir = __dirname;
				require('source-map-support').install();
				const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
				const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args=[])=>{scope.declarationExpression({
				type: "let",
				name: "server",
				value: scope.invokeExpression(scope.import("/home/spence/Projects/scope/packages/serve/main.js"),[])
			});scope.declarationExpression({
				type: "let",
				name: "template",
				value: scope.import("/home/spence/Projects/scope/test/humanTests/inc/template.js")
			});scope.declarationExpression({
				type: "let",
				name: "loadPages",
				value: scope.import("/home/spence/Projects/scope/test/humanTests/inc/loadPages.js")
			});scope.declarationExpression({
				type: "let",
				name: "loader",
				value: scope.invokeExpression(scope.identifier("loadPages"),["inc/pages"])
			});scope.assignmentExpression([scope.identifier("template"),"manifest"],scope.arrayExpression({key: "short_name", value: "Scope Test"},{key: "name", value: "Scope Programming Language Test Site"},{key: "start_url", value: "/"},{key: "background_color", value: "#FFFFFF"},{key: "display", value: "standalone"},{key: "scope", value: "/"},{key: "theme_color", value: "#0090D2"}));scope.assignmentExpression([scope.identifier("template").get("stylesheet"),"#page"],scope.arrayExpression({key: "margin", value: "10px"},{key: "font-family", value: "serif"},{key: ">div", value: scope.arrayExpression({key: "color", value: "#804545"})}));scope.assignmentExpression([scope.identifier("template"),"styleLink"],"/styles/main.css");scope.assignmentExpression([scope.identifier("template"),"nav"],scope.arrayExpression({key: "Home", value: "/home"},{key: "About", value: "/about"},{key: "Contact", value: "/contact"}));scope.declarationExpression({
				type: "let",
				name: "notFound",
				value: scope.arrayExpression({key: "title", value: "404: Not Found"},{key: "body", value: scope.xmlExpression("div",{"id":"page"},scope.xmlExpression("h2",{},"We have a problem"),scope.xmlExpression("div",{},"The requested page was not found."))})
			});scope.invokeExpression(scope.identifier("server").get("manifest"),[scope.identifier("template").get("manifest")]);scope.invokeExpression(scope.identifier("server").get("get"),["/",scope.createScope((args=[{key: "client", value: scope.arrayExpression()}])=>{scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.arrayExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("client").get("response").get("redirect"),[301,"/home"]);})]);scope.invokeExpression(scope.identifier("server").get("get"),[scope.identifier("template").get("styleLink"),scope.createScope((args=[{key: "client", value: scope.arrayExpression()}])=>{scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.arrayExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("client").get("response").get("sendStyle"),[scope.identifier("template").get("stylesheet")]);})]);scope.invokeExpression(scope.invokeExpression(ScopeApi.promise.get("all"),[scope.identifier("loader").get("promises")]).get("then"),[scope.createScope((args=[{key: "pages", value: scope.arrayExpression()}])=>{scope.declarationExpression({
				type: "let",
				name: "pages",
				value: args[0] === undefined ? scope.arrayExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("server").get("get"),["/:page",scope.createScope((args=[{key: "client", value: scope.arrayExpression()}])=>{scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.arrayExpression() : args[0]
			});
scope.declarationExpression({
				type: "let",
				name: "renderred",
				value: false
			});scope.invokeExpression(ScopeApi['each'],[scope.identifier("pages"),scope.createScope((args=[{key: "sc", value: scope.createScope((args=[])=>{})},{key: "name", value: ""}])=>{scope.declarationExpression({
				type: "let",
				name: "sc",
				value: args[0] === undefined ? scope.createScope((args=[])=>{}) : args[0]
			});
scope.declarationExpression({
				type: "let",
				name: "name",
				value: args[1] === undefined ? "" : args[1]
			});
scope.invokeExpression(ScopeApi['if'],[scope.identifier("name")===scope.identifier("client").get("request").get("params").get("page"),scope.createScope((args=[])=>{scope.use([scope.identifier("sc")]);scope.invokeExpression(scope.identifier("client").get("response").get("render"),[scope.invokeExpression(scope.identifier("page"),[scope.identifier("template").get("generate")])]);scope.assignmentExpression(["renderred"],true);})]);})]);scope.invokeExpression(ScopeApi['if'],[!scope.identifier("renderred"),scope.createScope((args=[])=>{scope.invokeExpression(scope.identifier("client").get("response").get("status"),[404]);scope.invokeExpression(scope.identifier("client").get("response").get("render"),[scope.invokeExpression(scope.identifier("template").get("generate"),[scope.identifier("notFound")])]);})]);})]);})]);scope.invokeExpression(scope.identifier("server").get("listen"),[scope.arrayExpression({key: "port", value: 8080},{key: "clientScope", value: true}),scope.createScope((args=[])=>{scope.invokeExpression(ScopeApi.print,["Server running on 8080"]);})]);}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvc2l0ZS5zYyJdLCJuYW1lcyI6WyI8YW5vbnltb3VzZT4iLCI8c2NvcGU+IiwidGVtcGxhdGUiLCJzY29wZS5pZGVudGlmaWVyKFwidGVtcGxhdGVcIikubWFuaWZlc3QiLCJzY29wZS5pZGVudGlmaWVyKFwidGVtcGxhdGVcIikuc3R5bGVzaGVldCIsInNjb3BlLmlkZW50aWZpZXIoXCJ0ZW1wbGF0ZVwiKS5nZXQoXCJzdHlsZXNoZWV0XCIpW1wiI3BhZ2VcIl0iLCJzY29wZS5pZGVudGlmaWVyKFwidGVtcGxhdGVcIikuc3R5bGVMaW5rIiwic2NvcGUuaWRlbnRpZmllcihcInRlbXBsYXRlXCIpLm5hdiIsInNlcnZlciIsInNjb3BlLmlkZW50aWZpZXIoXCJzZXJ2ZXJcIikubWFuaWZlc3QiLCJzY29wZS5pZGVudGlmaWVyKFwic2VydmVyXCIpLmdldCIsImNsaWVudCIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikucmVzcG9uc2UiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLmdldChcInJlc3BvbnNlXCIpLnJlZGlyZWN0Iiwic2NvcGUuaWRlbnRpZmllcihcImNsaWVudFwiKS5nZXQoXCJyZXNwb25zZVwiKS5zZW5kU3R5bGUiLCJwcm9taXNlIiwiU2NvcGVBcGkucHJvbWlzZS5hbGwiLCJsb2FkZXIiLCJzY29wZS5pZGVudGlmaWVyKFwibG9hZGVyXCIpLnByb21pc2VzIiwiPG1hcD4udGhlbiIsInRoZW4iLCJlYWNoIiwicGFnZXMiLCJpZiIsIm5hbWUiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLnJlcXVlc3QiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLmdldChcInJlcXVlc3RcIikucGFyYW1zIiwic2NvcGUuaWRlbnRpZmllcihcImNsaWVudFwiKS5nZXQoXCJyZXF1ZXN0XCIpLmdldChcInBhcmFtc1wiKS5wYWdlIiwic2NvcGUuaWRlbnRpZmllcihcImNsaWVudFwiKS5nZXQoXCJyZXNwb25zZVwiKS5yZW5kZXIiLCJwYWdlIiwic2NvcGUuaWRlbnRpZmllcihcInRlbXBsYXRlXCIpLmdlbmVyYXRlIiwicmVuZGVycmVkIiwic2NvcGUuaWRlbnRpZmllcihcImNsaWVudFwiKS5nZXQoXCJyZXNwb25zZVwiKS5zdGF0dXMiLCJub3RGb3VuZCIsInNjb3BlLmlkZW50aWZpZXIoXCJzZXJ2ZXJcIikubGlzdGVuIiwicHJpbnQiXSwibWFwcGluZ3MiOiJBQTJFK0JBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLHlHQUFBQyx1QkFBQUQsOEJBeEU1QkE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFDb0NBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BQ0VBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BRVBBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BVWxDQSw0QkFSUUUsNEJBQUFDLFdBUVJILG1UQU9DQSw0QkFMT0UsNEJBQUFFLGtCQUFtQkMsQ0FBQUwsT0FLMUJBLDRLQUdzQ0EsNEJBQS9CRSw0QkFBQUksWUFBK0JOLHNCQU12Q0EsNEJBSlFFLDRCQUFBSyxNQUlSUCw0SEFVc0NBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BS2RDLHVCQUFsQk8sMEJBQUFDLGdCQUFrQlIsRUFBQUMsNEJBQUFDLGdCQUFBRixFQUFBRCxDQUdjQyx1QkFEaENPLDBCQUFBRSxXQUNnQ1QsRUFEeEJELEdBQ3dCQSx5QkFEWkEsaURBQ1lBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFDLHVCQUEvQlUsMEJBQUFDLGdCQUFBQyxnQkFBK0JaLEVBQVRELEdBQVNBLFFBQUFDLEVBQUFELEdBQUFDLEVBQUFELENBSUhDLHVCQUQ3Qk8sMEJBQUFFLFdBQzZCVCxFQURoQkMsNEJBQUFJLGlCQUNnQk4seUJBRE1BLGlEQUNOQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQyx1QkFBNUJVLDBCQUFBQyxnQkFBQUUsaUJBQTRCYixFQUFBQyw0QkFBQUUsa0JBQUFILEVBQUFELEdBQUFDLEVBQUFELENBY2lCQyx1QkFabENBLHVCQUFYYyxnQkFBQUMsV0FBV2YsRUFBQWdCLDBCQUFBQyxnQkFBQWpCLEVBQWVrQixNQUFBQyxJQUFBRCxFQVltQmxCLEVBQUFELHdCQVpUQSxnREFZU0E7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUMsdUJBWDdDTywwQkFBQUUsV0FXNkNULEVBWGhDRCxRQVdnQ0EseUJBWHBCQSxpREFXb0JBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBVjdCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxNQUtIQyx1QkFKZG9CLGdCQUljcEIsRUFKUnFCLHlCQUlRdEIseUJBSldBLCtFQUlYQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQyx1QkFIZHNCLGNBR2N0QixFQUhSdUIsd0JBQVN4QixHQUFBVywwQkFBQWMsZUFBQUMsY0FBQUMsWUFHRDNCLCtCQUZWQSxvQ0FDOEJDLHVCQUE5QlUsMEJBQUFDLGdCQUFBZ0IsY0FBOEIzQix5QkFBVDRCLHdCQUFTNUIsRUFBQUMsNEJBQUE0QixnQkFBQTdCLElBQUFELENBQ3BCQSw0QkFBTitCLFdBQU0vQixVQUFBQyxFQUFBRCxHQUFBQyxFQUFBRCxDQUtnQ0MsdUJBRi9Dc0IsY0FFK0N0QixFQUZwQ0QsQ0FBQStCLDZCQUVvQy9CLCtCQUR2QkMsdUJBQXBCVSwwQkFBQUMsZ0JBQUFvQixjQUFvQi9CLEVBQUFELEdBQUFDLEVBQUFELENBQ3VCQyx1QkFBM0NVLDBCQUFBQyxnQkFBQWdCLGNBQTJDM0IseUJBQWxCQyw0QkFBQTRCLGdCQUFrQjdCLEVBQUFnQyw0QkFBQWhDLElBQUFELEdBQUFDLEVBQUFELEdBQUFDLEVBQUFELEdBQUFDLEVBQUFELENBTXJCQyx1QkFEekJPLDBCQUFBMEIsY0FDeUJqQyxFQURhRCxtRkFDYkEsK0JBQUFDLHVCQUF6QmtDLGNBQXlCbEMsRUFBQUQsd0JBQUFDLEVBQUFELEdBQUFDLEVBQUFELEdBQUFDLElBQUFEIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHNlcnZlciA9IGltcG9ydCBcInNlcnZlXCIoLypbXG5cdGtleTogXCJsaWIvc2VydmVyLmtleVwiLFxuXHRjZXJ0OiBcImxpYi9zZXJ2ZXIuY2VydFwiXG5dKi8pO1xubGV0IHRlbXBsYXRlID0gaW1wb3J0IFwiaW5jL3RlbXBsYXRlLnNjXCI7XG5sZXQgbG9hZFBhZ2VzID0gaW1wb3J0IFwiaW5jL2xvYWRQYWdlcy5zY1wiO1xuXG5sZXQgbG9hZGVyID0gbG9hZFBhZ2VzKFwiaW5jL3BhZ2VzXCIpO1xuXG50ZW1wbGF0ZS5tYW5pZmVzdCA9IFtcblx0c2hvcnRfbmFtZTogXCJTY29wZSBUZXN0XCIsXG5cdG5hbWU6IFwiU2NvcGUgUHJvZ3JhbW1pbmcgTGFuZ3VhZ2UgVGVzdCBTaXRlXCIsXG5cdHN0YXJ0X3VybDogXCIvXCIsXG5cdGJhY2tncm91bmRfY29sb3I6IFwiI0ZGRkZGRlwiLFxuXHRkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcblx0c2NvcGU6IFwiL1wiLFxuXHR0aGVtZV9jb2xvcjogXCIjMDA5MEQyXCJcbl07XG5cbnRlbXBsYXRlLnN0eWxlc2hlZXRbXCIjcGFnZVwiXSA9IFtcblx0bWFyZ2luOiBcIjEwcHhcIixcblx0Zm9udC1mYW1pbHk6IFwic2VyaWZcIixcblx0XCI+ZGl2XCI6IFtcblx0XHRjb2xvcjogXCIjODA0NTQ1XCJcblx0XVxuXTtcblxudGVtcGxhdGUuc3R5bGVMaW5rID0gXCIvc3R5bGVzL21haW4uY3NzXCI7XG5cbnRlbXBsYXRlLm5hdiA9IFtcblx0SG9tZTogXCIvaG9tZVwiLFxuXHRBYm91dDogXCIvYWJvdXRcIixcblx0Q29udGFjdDogXCIvY29udGFjdFwiXG5dO1xuXG5sZXQgbm90Rm91bmQgPSBbXG5cdHRpdGxlOiBcIjQwNDogTm90IEZvdW5kXCIsXG5cdGJvZHk6IFxuXHQ8ZGl2IGlkPVwicGFnZVwiPlxuXHRcdDxoMj5cblx0XHRcdFwiV2UgaGF2ZSBhIHByb2JsZW1cIjtcblx0XHQ8L2gyPjtcblx0XHQ8ZGl2PlxuXHRcdFx0XCJUaGUgcmVxdWVzdGVkIHBhZ2Ugd2FzIG5vdCBmb3VuZC5cIjtcblx0XHQ8L2Rpdj47XG5cdDwvZGl2PlxuXTtcblxuc2VydmVyLm1hbmlmZXN0KHRlbXBsYXRlLm1hbmlmZXN0KTtcblxuc2VydmVyLmdldChcIi9cIiwgKGNsaWVudDogW10pIHtcblx0Y2xpZW50LnJlc3BvbnNlLnJlZGlyZWN0KDMwMSwgXCIvaG9tZVwiKTtcbn0pO1xuXG5zZXJ2ZXIuZ2V0KHRlbXBsYXRlLnN0eWxlTGluaywgKGNsaWVudDogW10pIHtcblx0Y2xpZW50LnJlc3BvbnNlLnNlbmRTdHlsZSh0ZW1wbGF0ZS5zdHlsZXNoZWV0KTtcbn0pO1xucHJvbWlzZS5hbGwobG9hZGVyLnByb21pc2VzKS50aGVuKChwYWdlczogW10pIHtcblx0c2VydmVyLmdldChcIi86cGFnZVwiLCAoY2xpZW50OiBbXSkge1xuXHRcdGxldCByZW5kZXJyZWQgPSBmYWxzZTtcblx0XHRlYWNoKHBhZ2VzLCAoc2M6IHt9LCBuYW1lOiBcIlwiKSB7XG5cdFx0XHRpZiAobmFtZSBpcyBjbGllbnQucmVxdWVzdC5wYXJhbXMucGFnZSwge1xuXHRcdFx0XHR1c2Ugc2M7XG5cdFx0XHRcdGNsaWVudC5yZXNwb25zZS5yZW5kZXIocGFnZSh0ZW1wbGF0ZS5nZW5lcmF0ZSkpO1xuXHRcdFx0XHRyZW5kZXJyZWQgPSB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0aWYgKCFyZW5kZXJyZWQsIHtcblx0XHRcdGNsaWVudC5yZXNwb25zZS5zdGF0dXMoNDA0KTtcblx0XHRcdGNsaWVudC5yZXNwb25zZS5yZW5kZXIodGVtcGxhdGUuZ2VuZXJhdGUobm90Rm91bmQpKTtcblx0XHR9KTtcblx0fSk7XG59KTtcblxuc2VydmVyLmxpc3RlbihbcG9ydDogODA4MCwgY2xpZW50U2NvcGU6IHRydWVdLCB7XG5cdHByaW50KFwiU2VydmVyIHJ1bm5pbmcgb24gODA4MFwiKTtcbn0pOyJdfQ==