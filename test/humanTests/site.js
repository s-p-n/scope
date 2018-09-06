#!/usr/bin/env node
				"use strict";
				global.__scopedir = __dirname;
				require('source-map-support').install();
				const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
				const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args)=>{scope.declarationExpression({
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
			});scope.assignmentExpression([scope.identifier("template"),"manifest"],["=", scope.mapExpression(["short_name","Scope Test"],["name","Scope Programming Language Test Site"],["start_url","/"],["background_color","#FFFFFF"],["display","standalone"],["scope","/"],["theme_color","#0090D2"])]);scope.assignmentExpression([scope.identifier("template"),"styleLink"],["=", "/styles/main.css"]);scope.assignmentExpression([scope.identifier("template"),"nav"],["=", scope.mapExpression(["Home","/home"],["Documentation","/docs"],["About","/about"],["Contact","/contact"])]);scope.declarationExpression({
				type: "let",
				name: "notFound",
				value: scope.mapExpression(["title","404: Not Found"],["url","404"],["body",scope.xmlExpression("article",{},scope.xmlExpression("h2",{},"We have a problem.."),scope.xmlExpression("div",{},scope.xmlExpression("strong",{},"404 Not Found:")," The requested page was not found."))])
			});scope.invokeExpression(scope.identifier("server").get("manifest"),[scope.identifier("template").get("manifest")]);scope.invokeExpression(scope.identifier("server").get("get"),["/",scope.createScope((args)=>{scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.mapExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("client").get("response").get("redirect"),[301,"/home"]);})]);scope.invokeExpression(scope.identifier("server").get("get"),["/404",scope.createScope((args)=>{scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.mapExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("client").get("response").get("status"),[404]);scope.invokeExpression(scope.identifier("client").get("response").get("render"),[scope.invokeExpression(scope.identifier("template").get("generate"),[scope.identifier("notFound")])]);})]);scope.invokeExpression(scope.identifier("server").get("get"),[scope.identifier("template").get("styleLink"),scope.createScope((args)=>{scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.mapExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("client").get("response").get("sendStyle"),[scope.identifier("template").get("stylesheet")]);})]);scope.invokeExpression(scope.invokeExpression(ScopeApi.promise.get("all"),[scope.identifier("loader").get("promises")]).get("then"),[scope.createScope((args)=>{scope.declarationExpression({
				type: "let",
				name: "pages",
				value: args[0] === undefined ? scope.mapExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("server").get("get"),["/:page",scope.createScope((args)=>{scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.mapExpression() : args[0]
			});
scope.declarationExpression({
				type: "let",
				name: "renderred",
				value: false
			});scope.invokeExpression(ScopeApi['each'],[scope.identifier("pages"),scope.createScope((args)=>{scope.declarationExpression({
				type: "let",
				name: "sc",
				value: args[0] === undefined ? scope.createScope((args)=>{}) : args[0]
			});
scope.declarationExpression({
				type: "let",
				name: "name",
				value: args[1] === undefined ? "" : args[1]
			});
scope.invokeExpression(ScopeApi['if'],[scope.binaryExpression('===', scope.identifier("name"), scope.identifier("client").get("request").get("params").get("page")),scope.createScope((args)=>{scope.use([scope.identifier("sc")]);scope.invokeExpression(scope.identifier("client").get("response").get("render"),[scope.invokeExpression(scope.identifier("page"),[scope.identifier("template").get("generate")])]);scope.assignmentExpression(["renderred"],["=", true]);})]);})]);scope.invokeExpression(ScopeApi['if'],[!scope.identifier("renderred"),scope.createScope((args)=>{scope.invokeExpression(scope.identifier("client").get("response").get("status"),[404]);scope.invokeExpression(scope.identifier("client").get("response").get("render"),[scope.invokeExpression(scope.identifier("template").get("generate"),[scope.identifier("notFound")])]);})]);})]);})]);scope.invokeExpression(scope.identifier("server").get("listen"),[scope.mapExpression(["port",8080],["clientScope",true]),scope.createScope((args)=>{scope.invokeExpression(ScopeApi.print,["Server running on 8080"]);})]);}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvc2l0ZS5zYyJdLCJuYW1lcyI6WyI8YW5vbnltb3VzZT4iLCI8c2NvcGU+IiwidGVtcGxhdGUiLCJzY29wZS5pZGVudGlmaWVyKFwidGVtcGxhdGVcIikubWFuaWZlc3QiLCJzY29wZS5pZGVudGlmaWVyKFwidGVtcGxhdGVcIikuc3R5bGVMaW5rIiwic2NvcGUuaWRlbnRpZmllcihcInRlbXBsYXRlXCIpLm5hdiIsInNlcnZlciIsInNjb3BlLmlkZW50aWZpZXIoXCJzZXJ2ZXJcIikubWFuaWZlc3QiLCJzY29wZS5pZGVudGlmaWVyKFwic2VydmVyXCIpLmdldCIsImNsaWVudCIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikucmVzcG9uc2UiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLmdldChcInJlc3BvbnNlXCIpLnJlZGlyZWN0Iiwic2NvcGUuaWRlbnRpZmllcihcImNsaWVudFwiKS5nZXQoXCJyZXNwb25zZVwiKS5zdGF0dXMiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLmdldChcInJlc3BvbnNlXCIpLnJlbmRlciIsInNjb3BlLmlkZW50aWZpZXIoXCJ0ZW1wbGF0ZVwiKS5nZW5lcmF0ZSIsIm5vdEZvdW5kIiwic2NvcGUuaWRlbnRpZmllcihcImNsaWVudFwiKS5nZXQoXCJyZXNwb25zZVwiKS5zZW5kU3R5bGUiLCJzY29wZS5pZGVudGlmaWVyKFwidGVtcGxhdGVcIikuc3R5bGVzaGVldCIsInByb21pc2UiLCJTY29wZUFwaS5wcm9taXNlLmFsbCIsImxvYWRlciIsInNjb3BlLmlkZW50aWZpZXIoXCJsb2FkZXJcIikucHJvbWlzZXMiLCI8bWFwPi50aGVuIiwidGhlbiIsImVhY2giLCJwYWdlcyIsImlmIiwicGFnZSIsInJlbmRlcnJlZCIsInNjb3BlLmlkZW50aWZpZXIoXCJzZXJ2ZXJcIikubGlzdGVuIiwicHJpbnQiXSwibWFwcGluZ3MiOiJBQTJFK0JBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLHlHQUFBQyx1QkFBQUQsMkJBeEU1QkE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFDb0NBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BQ0VBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BRVBBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BVWxDQSw0QkFSUUUsNEJBQUFDLFdBUVJILDZOQUV1Q0EsNEJBQS9CRSw0QkFBQUUsWUFBK0JKLDZCQU92Q0EsNEJBTFFFLDRCQUFBRyxNQUtSTCxvSEFZdUNBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BS2ZDLHVCQUFsQkssMEJBQUFDLGdCQUFrQk4sRUFBQUMsNEJBQUFDLGdCQUFBRixFQUFBRCxDQUdjQyx1QkFEaENLLDBCQUFBRSxXQUNnQ1AsRUFEeEJELEdBQ3dCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQyx1QkFBL0JRLDBCQUFBQyxnQkFBQUMsZ0JBQStCVixFQUFURCxHQUFTQSxRQUFBQyxFQUFBRCxHQUFBQyxFQUFBRCxDQUtZQyx1QkFGNUNLLDBCQUFBRSxXQUU0Q1AsRUFGakNELE1BRWlDQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUR2QkMsdUJBQXBCUSwwQkFBQUMsZ0JBQUFFLGNBQW9CWCxFQUFBRCxHQUFBQyxFQUFBRCxDQUN1QkMsdUJBQTNDUSwwQkFBQUMsZ0JBQUFHLGNBQTJDWix5QkFBbEJDLDRCQUFBWSxnQkFBa0JiLEVBQUFjLDRCQUFBZCxJQUFBRCxHQUFBQyxFQUFBRCxDQUlmQyx1QkFEN0JLLDBCQUFBRSxXQUM2QlAsRUFEaEJDLDRCQUFBRSxpQkFDZ0JKO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFDLHVCQUE1QlEsMEJBQUFDLGdCQUFBTSxpQkFBNEJmLEVBQUFDLDRCQUFBZSxrQkFBQWhCLEVBQUFELEdBQUFDLEVBQUFELENBY2lCQyx1QkFabENBLHVCQUFYaUIsZ0JBQUFDLFdBQVdsQixFQUFBbUIsMEJBQUFDLGdCQUFBcEIsRUFBZXFCLE1BQUFDLElBQUFELEVBWW1CckIsRUFBQUQ7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUMsdUJBWDdDSywwQkFBQUUsV0FXNkNQLEVBWGhDRCxRQVdnQ0E7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFWN0JBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BS0hDLHVCQUpkdUIsZ0JBSWN2QixFQUpSd0IseUJBSVF6QjtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQyx1QkFIZHlCLGNBR2N6QixFQUhDRCw0SEFHREEsNEJBRlZBLG9DQUM4QkMsdUJBQTlCUSwwQkFBQUMsZ0JBQUFHLGNBQThCWix5QkFBVDBCLHdCQUFTMUIsRUFBQUMsNEJBQUFZLGdCQUFBYixJQUFBRCxDQUNwQkEsNEJBQU40QixXQUFNNUIsaUJBQUFDLEVBQUFELEdBQUFDLEVBQUFELENBS2dDQyx1QkFGL0N5QixjQUUrQ3pCLEVBRnBDRCxDQUFBNEIsNkJBRW9DNUIsNEJBRHZCQyx1QkFBcEJRLDBCQUFBQyxnQkFBQUUsY0FBb0JYLEVBQUFELEdBQUFDLEVBQUFELENBQ3VCQyx1QkFBM0NRLDBCQUFBQyxnQkFBQUcsY0FBMkNaLHlCQUFsQkMsNEJBQUFZLGdCQUFrQmIsRUFBQWMsNEJBQUFkLElBQUFELEdBQUFDLEVBQUFELEdBQUFDLEVBQUFELEdBQUFDLEVBQUFELENBTXJCQyx1QkFEekJLLDBCQUFBdUIsY0FDeUI1QixFQURhRCx1REFDYkEsNEJBQUFDLHVCQUF6QjZCLGNBQXlCN0IsRUFBQUQsd0JBQUFDLEVBQUFELEdBQUFDLEVBQUFELEdBQUFDLElBQUFEIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHNlcnZlciA9IGltcG9ydCBcInNlcnZlXCIoLypbXG5cdGtleTogXCJsaWIvc2VydmVyLmtleVwiLFxuXHRjZXJ0OiBcImxpYi9zZXJ2ZXIuY2VydFwiXG5dKi8pO1xubGV0IHRlbXBsYXRlID0gaW1wb3J0IFwiaW5jL3RlbXBsYXRlLnNjXCI7XG5sZXQgbG9hZFBhZ2VzID0gaW1wb3J0IFwiaW5jL2xvYWRQYWdlcy5zY1wiO1xuXG5sZXQgbG9hZGVyID0gbG9hZFBhZ2VzKFwiaW5jL3BhZ2VzXCIpO1xuXG50ZW1wbGF0ZS5tYW5pZmVzdCA9IFtcblx0c2hvcnRfbmFtZTogXCJTY29wZSBUZXN0XCIsXG5cdG5hbWU6IFwiU2NvcGUgUHJvZ3JhbW1pbmcgTGFuZ3VhZ2UgVGVzdCBTaXRlXCIsXG5cdHN0YXJ0X3VybDogXCIvXCIsXG5cdGJhY2tncm91bmRfY29sb3I6IFwiI0ZGRkZGRlwiLFxuXHRkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcblx0c2NvcGU6IFwiL1wiLFxuXHR0aGVtZV9jb2xvcjogXCIjMDA5MEQyXCJcbl07XG5cbnRlbXBsYXRlLnN0eWxlTGluayA9IFwiL3N0eWxlcy9tYWluLmNzc1wiO1xuXG50ZW1wbGF0ZS5uYXYgPSBbXG5cdEhvbWU6IFwiL2hvbWVcIixcblx0RG9jdW1lbnRhdGlvbjogXCIvZG9jc1wiLFxuXHRBYm91dDogXCIvYWJvdXRcIixcblx0Q29udGFjdDogXCIvY29udGFjdFwiXG5dO1xuXG5sZXQgbm90Rm91bmQgPSBbXG5cdHRpdGxlOiBcIjQwNDogTm90IEZvdW5kXCIsXG5cdHVybDogXCI0MDRcIixcblx0Ym9keTogXG5cdDxhcnRpY2xlPlxuXHRcdDxoMj5cblx0XHRcdFwiV2UgaGF2ZSBhIHByb2JsZW0uLlwiO1xuXHRcdDwvaDI+O1xuXHRcdDxkaXY+XG5cdFx0XHQ8c3Ryb25nPlwiNDA0IE5vdCBGb3VuZDpcIjs8L3N0cm9uZz47XG5cdFx0XHRcIiBUaGUgcmVxdWVzdGVkIHBhZ2Ugd2FzIG5vdCBmb3VuZC5cIjtcblx0XHQ8L2Rpdj47XG5cdDwvYXJ0aWNsZT5cbl07XG5cbnNlcnZlci5tYW5pZmVzdCh0ZW1wbGF0ZS5tYW5pZmVzdCk7XG5cbnNlcnZlci5nZXQoXCIvXCIsIChjbGllbnQ6IFtdKSB7XG5cdGNsaWVudC5yZXNwb25zZS5yZWRpcmVjdCgzMDEsIFwiL2hvbWVcIik7XG59KTtcblxuc2VydmVyLmdldChcIi80MDRcIiwgKGNsaWVudDogW10pIHtcblx0Y2xpZW50LnJlc3BvbnNlLnN0YXR1cyg0MDQpO1xuXHRjbGllbnQucmVzcG9uc2UucmVuZGVyKHRlbXBsYXRlLmdlbmVyYXRlKG5vdEZvdW5kKSk7XG59KTtcblxuc2VydmVyLmdldCh0ZW1wbGF0ZS5zdHlsZUxpbmssIChjbGllbnQ6IFtdKSB7XG5cdGNsaWVudC5yZXNwb25zZS5zZW5kU3R5bGUodGVtcGxhdGUuc3R5bGVzaGVldCk7XG59KTtcbnByb21pc2UuYWxsKGxvYWRlci5wcm9taXNlcykudGhlbigocGFnZXM6IFtdKSB7XG5cdHNlcnZlci5nZXQoXCIvOnBhZ2VcIiwgKGNsaWVudDogW10pIHtcblx0XHRsZXQgcmVuZGVycmVkID0gZmFsc2U7XG5cdFx0ZWFjaChwYWdlcywgKHNjOiB7fSwgbmFtZTogXCJcIikge1xuXHRcdFx0aWYgKG5hbWUgaXMgY2xpZW50LnJlcXVlc3QucGFyYW1zLnBhZ2UsIHtcblx0XHRcdFx0dXNlIHNjO1xuXHRcdFx0XHRjbGllbnQucmVzcG9uc2UucmVuZGVyKHBhZ2UodGVtcGxhdGUuZ2VuZXJhdGUpKTtcblx0XHRcdFx0cmVuZGVycmVkID0gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGlmICghcmVuZGVycmVkLCB7XG5cdFx0XHRjbGllbnQucmVzcG9uc2Uuc3RhdHVzKDQwNCk7XG5cdFx0XHRjbGllbnQucmVzcG9uc2UucmVuZGVyKHRlbXBsYXRlLmdlbmVyYXRlKG5vdEZvdW5kKSk7XG5cdFx0fSk7XG5cdH0pO1xufSk7XG5cbnNlcnZlci5saXN0ZW4oW3BvcnQ6IDgwODAsIGNsaWVudFNjb3BlOiB0cnVlXSwge1xuXHRwcmludChcIlNlcnZlciBydW5uaW5nIG9uIDgwODBcIik7XG59KTsiXX0=