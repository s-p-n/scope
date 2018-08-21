#!/usr/bin/env node
			"use strict";
			global.__scopedir = __dirname;
			require('source-map-support').install();
			const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
			const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args=[])=>{scope.declarationExpression({
				type: "let",
				name: "server",
				value: scope.invokeExpression(scope.import("/home/spence/Projects/scope/test/humanTests/lib/Serve.js"),[])
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
			});scope.invokeExpression(ScopeApi.print,["Request for page:"]);scope.invokeExpression(ScopeApi.debug,[scope.identifier("pages")]);scope.invokeExpression(ScopeApi['each'],[scope.identifier("pages"),scope.createScope((args=[{key: "sc", value: scope.createScope((args=[])=>{})},{key: "name", value: ""}])=>{scope.declarationExpression({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvc2l0ZS5zYyJdLCJuYW1lcyI6WyI8YW5vbnltb3VzZT4iLCI8c2NvcGU+IiwidGVtcGxhdGUiLCJzY29wZS5pZGVudGlmaWVyKFwidGVtcGxhdGVcIikubWFuaWZlc3QiLCJzY29wZS5pZGVudGlmaWVyKFwidGVtcGxhdGVcIikuc3R5bGVzaGVldCIsInNjb3BlLmlkZW50aWZpZXIoXCJ0ZW1wbGF0ZVwiKS5nZXQoXCJzdHlsZXNoZWV0XCIpW1wiI3BhZ2VcIl0iLCJzY29wZS5pZGVudGlmaWVyKFwidGVtcGxhdGVcIikuc3R5bGVMaW5rIiwic2NvcGUuaWRlbnRpZmllcihcInRlbXBsYXRlXCIpLm5hdiIsInNlcnZlciIsInNjb3BlLmlkZW50aWZpZXIoXCJzZXJ2ZXJcIikubWFuaWZlc3QiLCJzY29wZS5pZGVudGlmaWVyKFwic2VydmVyXCIpLmdldCIsImNsaWVudCIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikucmVzcG9uc2UiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLmdldChcInJlc3BvbnNlXCIpLnJlZGlyZWN0Iiwic2NvcGUuaWRlbnRpZmllcihcImNsaWVudFwiKS5nZXQoXCJyZXNwb25zZVwiKS5zZW5kU3R5bGUiLCJwcm9taXNlIiwiU2NvcGVBcGkucHJvbWlzZS5hbGwiLCJsb2FkZXIiLCJzY29wZS5pZGVudGlmaWVyKFwibG9hZGVyXCIpLnByb21pc2VzIiwiPG1hcD4udGhlbiIsInRoZW4iLCJwcmludCIsImRlYnVnIiwicGFnZXMiLCJlYWNoIiwiaWYiLCJuYW1lIiwic2NvcGUuaWRlbnRpZmllcihcImNsaWVudFwiKS5yZXF1ZXN0Iiwic2NvcGUuaWRlbnRpZmllcihcImNsaWVudFwiKS5nZXQoXCJyZXF1ZXN0XCIpLnBhcmFtcyIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikuZ2V0KFwicmVxdWVzdFwiKS5nZXQoXCJwYXJhbXNcIikucGFnZSIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikuZ2V0KFwicmVzcG9uc2VcIikucmVuZGVyIiwicGFnZSIsInNjb3BlLmlkZW50aWZpZXIoXCJ0ZW1wbGF0ZVwiKS5nZW5lcmF0ZSIsInJlbmRlcnJlZCIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikuZ2V0KFwicmVzcG9uc2VcIikuc3RhdHVzIiwibm90Rm91bmQiLCJzY29wZS5pZGVudGlmaWVyKFwic2VydmVyXCIpLmxpc3RlbiJdLCJtYXBwaW5ncyI6IkFBMEUrQkE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsd0dBQUFDLHVCQUFBRCw4QkExRUlBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BQ0lBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BQ0VBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BRVBBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BVWxDQSw0QkFSUUUsNEJBQUFDLFdBUVJILG1UQU9DQSw0QkFMT0UsNEJBQUFFLGtCQUFtQkMsQ0FBQUwsT0FLMUJBLDRLQUdzQ0EsNEJBQS9CRSw0QkFBQUksWUFBK0JOLHNCQU12Q0EsNEJBSlFFLDRCQUFBSyxNQUlSUCw0SEFVc0NBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BS2RDLHVCQUFsQk8sMEJBQUFDLGdCQUFrQlIsRUFBQUMsNEJBQUFDLGdCQUFBRixFQUFBRCxDQUdjQyx1QkFEaENPLDBCQUFBRSxXQUNnQ1QsRUFEeEJELEdBQ3dCQSx5QkFEWkEsaURBQ1lBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFDLHVCQUEvQlUsMEJBQUFDLGdCQUFBQyxnQkFBK0JaLEVBQVRELEdBQVNBLFFBQUFDLEVBQUFELEdBQUFDLEVBQUFELENBSUhDLHVCQUQ3Qk8sMEJBQUFFLFdBQzZCVCxFQURoQkMsNEJBQUFJLGlCQUNnQk4seUJBRE1BLGlEQUNOQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQyx1QkFBNUJVLDBCQUFBQyxnQkFBQUUsaUJBQTRCYixFQUFBQyw0QkFBQUUsa0JBQUFILEVBQUFELEdBQUFDLEVBQUFELENBZ0JpQkMsdUJBZGxDQSx1QkFBWGMsZ0JBQUFDLFdBQVdmLEVBQUFnQiwwQkFBQUMsZ0JBQUFqQixFQUFla0IsTUFBQUMsSUFBQUQsRUFjbUJsQixFQUFBRCx3QkFkVEEsZ0RBY1NBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFDLHVCQWI3Q08sMEJBQUFFLFdBYTZDVCxFQWJoQ0QsUUFhZ0NBLHlCQWJwQkEsaURBYW9CQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQVo3QkE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFDSUMsdUJBQXBCb0IsY0FBb0JwQixFQUFBRCxtQkFBQUMsRUFBQUQsQ0FDZEMsdUJBQU5xQixjQUFNckIsRUFBQXNCLHlCQUFBdEIsRUFBQUQsQ0FLT0MsdUJBSmR1QixnQkFJY3ZCLEVBSlJzQix5QkFJUXZCLHlCQUpXQSwrRUFJWEE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUMsdUJBSGR3QixjQUdjeEIsRUFIUnlCLHdCQUFTMUIsR0FBQVcsMEJBQUFnQixlQUFBQyxjQUFBQyxZQUdEN0IsK0JBRlZBLG9DQUM4QkMsdUJBQTlCVSwwQkFBQUMsZ0JBQUFrQixjQUE4QjdCLHlCQUFUOEIsd0JBQVM5QixFQUFBQyw0QkFBQThCLGdCQUFBL0IsSUFBQUQsQ0FDcEJBLDRCQUFOaUMsV0FBTWpDLFVBQUFDLEVBQUFELEdBQUFDLEVBQUFELENBS2dDQyx1QkFGL0N3QixjQUUrQ3hCLEVBRnBDRCxDQUFBaUMsNkJBRW9DakMsK0JBRHZCQyx1QkFBcEJVLDBCQUFBQyxnQkFBQXNCLGNBQW9CakMsRUFBQUQsR0FBQUMsRUFBQUQsQ0FDdUJDLHVCQUEzQ1UsMEJBQUFDLGdCQUFBa0IsY0FBMkM3Qix5QkFBbEJDLDRCQUFBOEIsZ0JBQWtCL0IsRUFBQWtDLDRCQUFBbEMsSUFBQUQsR0FBQUMsRUFBQUQsR0FBQUMsRUFBQUQsR0FBQUMsRUFBQUQsQ0FNckJDLHVCQUR6Qk8sMEJBQUE0QixjQUN5Qm5DLEVBRGFELG1GQUNiQSwrQkFBQUMsdUJBQXpCb0IsY0FBeUJwQixFQUFBRCx3QkFBQUMsRUFBQUQsR0FBQUMsRUFBQUQsR0FBQUMsSUFBQUQiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc2VydmVyID0gaW1wb3J0IFwibGliL1NlcnZlLmpzXCIoKTtcbmxldCB0ZW1wbGF0ZSA9IGltcG9ydCBcImluYy90ZW1wbGF0ZS5zY1wiO1xubGV0IGxvYWRQYWdlcyA9IGltcG9ydCBcImluYy9sb2FkUGFnZXMuc2NcIjtcblxubGV0IGxvYWRlciA9IGxvYWRQYWdlcyhcImluYy9wYWdlc1wiKTtcblxudGVtcGxhdGUubWFuaWZlc3QgPSBbXG5cdHNob3J0X25hbWU6IFwiU2NvcGUgVGVzdFwiLFxuXHRuYW1lOiBcIlNjb3BlIFByb2dyYW1taW5nIExhbmd1YWdlIFRlc3QgU2l0ZVwiLFxuXHRzdGFydF91cmw6IFwiL1wiLFxuXHRiYWNrZ3JvdW5kX2NvbG9yOiBcIiNGRkZGRkZcIixcblx0ZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXG5cdHNjb3BlOiBcIi9cIixcblx0dGhlbWVfY29sb3I6IFwiIzAwOTBEMlwiXG5dO1xuXG50ZW1wbGF0ZS5zdHlsZXNoZWV0W1wiI3BhZ2VcIl0gPSBbXG5cdG1hcmdpbjogXCIxMHB4XCIsXG5cdGZvbnQtZmFtaWx5OiBcInNlcmlmXCIsXG5cdFwiPmRpdlwiOiBbXG5cdFx0Y29sb3I6IFwiIzgwNDU0NVwiXG5cdF1cbl07XG5cbnRlbXBsYXRlLnN0eWxlTGluayA9IFwiL3N0eWxlcy9tYWluLmNzc1wiO1xuXG50ZW1wbGF0ZS5uYXYgPSBbXG5cdEhvbWU6IFwiL2hvbWVcIixcblx0QWJvdXQ6IFwiL2Fib3V0XCIsXG5cdENvbnRhY3Q6IFwiL2NvbnRhY3RcIlxuXTtcblxubGV0IG5vdEZvdW5kID0gW1xuXHR0aXRsZTogXCI0MDQ6IE5vdCBGb3VuZFwiLFxuXHRib2R5OiBcblx0PGRpdiBpZD1cInBhZ2VcIj5cblx0XHQ8aDI+XG5cdFx0XHRcIldlIGhhdmUgYSBwcm9ibGVtXCI7XG5cdFx0PC9oMj47XG5cdFx0PGRpdj5cblx0XHRcdFwiVGhlIHJlcXVlc3RlZCBwYWdlIHdhcyBub3QgZm91bmQuXCI7XG5cdFx0PC9kaXY+O1xuXHQ8L2Rpdj5cbl07XG5cbnNlcnZlci5tYW5pZmVzdCh0ZW1wbGF0ZS5tYW5pZmVzdCk7XG5cbnNlcnZlci5nZXQoXCIvXCIsIChjbGllbnQ6IFtdKSB7XG5cdGNsaWVudC5yZXNwb25zZS5yZWRpcmVjdCgzMDEsIFwiL2hvbWVcIik7XG59KTtcblxuc2VydmVyLmdldCh0ZW1wbGF0ZS5zdHlsZUxpbmssIChjbGllbnQ6IFtdKSB7XG5cdGNsaWVudC5yZXNwb25zZS5zZW5kU3R5bGUodGVtcGxhdGUuc3R5bGVzaGVldCk7XG59KTtcbnByb21pc2UuYWxsKGxvYWRlci5wcm9taXNlcykudGhlbigocGFnZXM6IFtdKSB7XG5cdHNlcnZlci5nZXQoXCIvOnBhZ2VcIiwgKGNsaWVudDogW10pIHtcblx0XHRsZXQgcmVuZGVycmVkID0gZmFsc2U7XG5cdFx0cHJpbnQoXCJSZXF1ZXN0IGZvciBwYWdlOlwiKTtcblx0XHRkZWJ1ZyhwYWdlcyk7XG5cdFx0ZWFjaChwYWdlcywgKHNjOiB7fSwgbmFtZTogXCJcIikge1xuXHRcdFx0aWYgKG5hbWUgaXMgY2xpZW50LnJlcXVlc3QucGFyYW1zLnBhZ2UsIHtcblx0XHRcdFx0dXNlIHNjO1xuXHRcdFx0XHRjbGllbnQucmVzcG9uc2UucmVuZGVyKHBhZ2UodGVtcGxhdGUuZ2VuZXJhdGUpKTtcblx0XHRcdFx0cmVuZGVycmVkID0gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGlmICghcmVuZGVycmVkLCB7XG5cdFx0XHRjbGllbnQucmVzcG9uc2Uuc3RhdHVzKDQwNCk7XG5cdFx0XHRjbGllbnQucmVzcG9uc2UucmVuZGVyKHRlbXBsYXRlLmdlbmVyYXRlKG5vdEZvdW5kKSk7XG5cdFx0fSk7XG5cdH0pO1xufSk7XG5cbnNlcnZlci5saXN0ZW4oW3BvcnQ6IDgwODAsIGNsaWVudFNjb3BlOiB0cnVlXSwge1xuXHRwcmludChcIlNlcnZlciBydW5uaW5nIG9uIDgwODBcIik7XG59KTsiXX0=