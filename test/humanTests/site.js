#!/usr/bin/env node
				"use strict";
				global.__scopedir = __dirname;
				require('source-map-support').install();
				const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
				const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.declarationExpression({
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
			});scope.invokeExpression(scope.identifier("server")["manifest"],[scope.identifier("template")["manifest"]]);scope.invokeExpression(scope.identifier("server")["get"],["/",scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.mapExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("client")["response"]["redirect"],[301,"/home"]);scope.setForeignThis(__oldthis__);})]);scope.invokeExpression(scope.identifier("server")["get"],["/404",scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.mapExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("client")["response"]["status"],[404]);scope.invokeExpression(scope.identifier("client")["response"]["render"],[scope.invokeExpression(scope.identifier("template")["generate"],[scope.identifier("notFound")])]);scope.setForeignThis(__oldthis__);})]);scope.invokeExpression(scope.identifier("server")["get"],[scope.identifier("template")["styleLink"],scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.mapExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("client")["response"]["sendStyle"],[scope.identifier("template")["stylesheet"]]);scope.setForeignThis(__oldthis__);})]);scope.invokeExpression(scope.invokeExpression(ScopeApi.promise["all"],[scope.identifier("loader")["promises"]])["then"],[scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.declarationExpression({
				type: "let",
				name: "pages",
				value: args[0] === undefined ? scope.mapExpression() : args[0]
			});
scope.invokeExpression(scope.identifier("server")["get"],["/:page",scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.declarationExpression({
				type: "let",
				name: "client",
				value: args[0] === undefined ? scope.mapExpression() : args[0]
			});
scope.declarationExpression({
				type: "let",
				name: "renderred",
				value: false
			});scope.invokeExpression(ScopeApi['each'],[scope.identifier("pages"),scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.declarationExpression({
				type: "let",
				name: "sc",
				value: args[0] === undefined ? scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.setForeignThis(__oldthis__);}) : args[0]
			});
scope.declarationExpression({
				type: "let",
				name: "name",
				value: args[1] === undefined ? "" : args[1]
			});
scope.invokeExpression(ScopeApi['if'],[scope.binaryExpression('===', scope.identifier("name"), scope.identifier("client")["request"]["params"]["page"]),scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.use([scope.identifier("sc")]);scope.invokeExpression(scope.identifier("client")["response"]["render"],[scope.invokeExpression(scope.identifier("page"),[scope.identifier("template")["generate"]]),false]);scope.assignmentExpression(["renderred"],["=", true]);scope.setForeignThis(__oldthis__);})]);scope.setForeignThis(__oldthis__);})]);scope.invokeExpression(ScopeApi['if'],[!scope.identifier("renderred"),scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.invokeExpression(scope.identifier("client")["response"]["status"],[404]);scope.invokeExpression(scope.identifier("client")["response"]["render"],[scope.invokeExpression(scope.identifier("template")["generate"],[scope.identifier("notFound")])]);scope.setForeignThis(__oldthis__);})]);scope.setForeignThis(__oldthis__);})]);scope.setForeignThis(__oldthis__);})]);scope.invokeExpression(scope.identifier("server")["listen"],[scope.mapExpression(["port",8080],["clientScope",true]),scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.invokeExpression(ScopeApi.print,["Server running on 8080"]);scope.setForeignThis(__oldthis__);})]);scope.setForeignThis(__oldthis__);}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvc2l0ZS5zYyJdLCJuYW1lcyI6WyI8YW5vbnltb3VzZT4iLCI8c2NvcGU+IiwidGVtcGxhdGUiLCJzY29wZS5pZGVudGlmaWVyKFwidGVtcGxhdGVcIikubWFuaWZlc3QiLCJzY29wZS5pZGVudGlmaWVyKFwidGVtcGxhdGVcIikuc3R5bGVMaW5rIiwic2NvcGUuaWRlbnRpZmllcihcInRlbXBsYXRlXCIpLm5hdiIsInNlcnZlciIsInNjb3BlLmlkZW50aWZpZXIoXCJzZXJ2ZXJcIikubWFuaWZlc3QiLCJzY29wZS5pZGVudGlmaWVyKFwic2VydmVyXCIpLmdldCIsImNsaWVudCIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikucmVzcG9uc2UiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpW1wicmVzcG9uc2VcIl0ucmVkaXJlY3QiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpW1wicmVzcG9uc2VcIl0uc3RhdHVzIiwic2NvcGUuaWRlbnRpZmllcihcImNsaWVudFwiKVtcInJlc3BvbnNlXCJdLnJlbmRlciIsInNjb3BlLmlkZW50aWZpZXIoXCJ0ZW1wbGF0ZVwiKS5nZW5lcmF0ZSIsIm5vdEZvdW5kIiwic2NvcGUuaWRlbnRpZmllcihcImNsaWVudFwiKVtcInJlc3BvbnNlXCJdLnNlbmRTdHlsZSIsInNjb3BlLmlkZW50aWZpZXIoXCJ0ZW1wbGF0ZVwiKS5zdHlsZXNoZWV0IiwicHJvbWlzZSIsIlNjb3BlQXBpLnByb21pc2UuYWxsIiwibG9hZGVyIiwic2NvcGUuaWRlbnRpZmllcihcImxvYWRlclwiKS5wcm9taXNlcyIsIjxtYXA+LnRoZW4iLCJ0aGVuIiwiZWFjaCIsInBhZ2VzIiwiaWYiLCJwYWdlIiwicmVuZGVycmVkIiwic2NvcGUuaWRlbnRpZmllcihcInNlcnZlclwiKS5saXN0ZW4iLCJwcmludCJdLCJtYXBwaW5ncyI6IkFBMkUrQkE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEseUdBQUFDLHVCQUFBRCx3RkF4RTVCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQSxNQUNvQ0E7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFDRUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFFUEE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFVbENBLDRCQVJRRSw0QkFBQUMsV0FRUkgsNk5BRXVDQSw0QkFBL0JFLDRCQUFBRSxZQUErQkosNkJBT3ZDQSw0QkFMUUUsNEJBQUFHLE1BS1JMLG9IQVl1Q0E7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFLZkMsdUJBQWxCSywwQkFBQUMsWUFBa0JOLEVBQUFDLDRCQUFBQyxZQUFBRixFQUFBRCxDQUdjQyx1QkFEaENLLDBCQUFBRSxPQUNnQ1AsRUFEeEJELEdBQ3dCQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQyx1QkFBL0JRLDBCQUFBQyxZQUFBQyxZQUErQlYsRUFBVEQsR0FBU0EsUUFBQUMsRUFBQUQscUNBQUFDLEVBQUFELENBS1lDLHVCQUY1Q0ssMEJBQUFFLE9BRTRDUCxFQUZqQ0QsTUFFaUNBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBRHZCQyx1QkFBcEJRLDBCQUFBQyxZQUFBRSxVQUFvQlgsRUFBQUQsR0FBQUMsRUFBQUQsQ0FDdUJDLHVCQUEzQ1EsMEJBQUFDLFlBQUFHLFVBQTJDWix5QkFBbEJDLDRCQUFBWSxZQUFrQmIsRUFBQWMsNEJBQUFkLElBQUFELHFDQUFBQyxFQUFBRCxDQUlmQyx1QkFEN0JLLDBCQUFBRSxPQUM2QlAsRUFEaEJDLDRCQUFBRSxhQUNnQko7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUMsdUJBQTVCUSwwQkFBQUMsWUFBQU0sYUFBNEJmLEVBQUFDLDRCQUFBZSxjQUFBaEIsRUFBQUQscUNBQUFDLEVBQUFELENBY2lCQyx1QkFabENBLHVCQUFYaUIsZ0JBQUFDLE9BQVdsQixFQUFBbUIsMEJBQUFDLFlBQUFwQixFQUFlcUIsRUFBQUMsSUFBQUQsRUFZbUJyQixFQUFBRDtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQyx1QkFYN0NLLDBCQUFBRSxPQVc2Q1AsRUFYaENELFFBV2dDQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQVY3QkE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFLSEMsdUJBSmR1QixnQkFJY3ZCLEVBSlJ3Qix5QkFJUXpCO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFDLHVCQUhkeUIsY0FHY3pCLEVBSENELGdIQUdEQSx5RkFGVkEsb0NBQytDQyx1QkFBL0NRLDBCQUFBQyxZQUFBRyxVQUErQ1osRUFBakJBLHVCQUFUMEIsd0JBQVMxQixFQUFBQyw0QkFBQVksWUFBQWIsRUFBaUJELE1BQUFDLEVBQUFELENBQ3JDQSw0QkFBTjRCLFdBQU01QixtREFBQUMsRUFBQUQscUNBQUFDLEVBQUFELENBS2dDQyx1QkFGL0N5QixjQUUrQ3pCLEVBRnBDRCxDQUFBNEIsNkJBRW9DNUIseUZBRHZCQyx1QkFBcEJRLDBCQUFBQyxZQUFBRSxVQUFvQlgsRUFBQUQsR0FBQUMsRUFBQUQsQ0FDdUJDLHVCQUEzQ1EsMEJBQUFDLFlBQUFHLFVBQTJDWix5QkFBbEJDLDRCQUFBWSxZQUFrQmIsRUFBQWMsNEJBQUFkLElBQUFELHFDQUFBQyxFQUFBRCxxQ0FBQUMsRUFBQUQscUNBQUFDLEVBQUFELENBTXJCQyx1QkFEekJLLDBCQUFBdUIsVUFDeUI1QixFQURhRCx1REFDYkEseUZBQUFDLHVCQUF6QjZCLGNBQXlCN0IsRUFBQUQsd0JBQUFDLEVBQUFELHFDQUFBQyxFQUFBRCxxQ0FBQUMsSUFBQUQiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc2VydmVyID0gaW1wb3J0IFwic2VydmVcIigvKltcblx0a2V5OiBcImxpYi9zZXJ2ZXIua2V5XCIsXG5cdGNlcnQ6IFwibGliL3NlcnZlci5jZXJ0XCJcbl0qLyk7XG5sZXQgdGVtcGxhdGUgPSBpbXBvcnQgXCJpbmMvdGVtcGxhdGUuc2NcIjtcbmxldCBsb2FkUGFnZXMgPSBpbXBvcnQgXCJpbmMvbG9hZFBhZ2VzLnNjXCI7XG5cbmxldCBsb2FkZXIgPSBsb2FkUGFnZXMoXCJpbmMvcGFnZXNcIik7XG5cbnRlbXBsYXRlLm1hbmlmZXN0ID0gW1xuXHRzaG9ydF9uYW1lOiBcIlNjb3BlIFRlc3RcIixcblx0bmFtZTogXCJTY29wZSBQcm9ncmFtbWluZyBMYW5ndWFnZSBUZXN0IFNpdGVcIixcblx0c3RhcnRfdXJsOiBcIi9cIixcblx0YmFja2dyb3VuZF9jb2xvcjogXCIjRkZGRkZGXCIsXG5cdGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuXHRzY29wZTogXCIvXCIsXG5cdHRoZW1lX2NvbG9yOiBcIiMwMDkwRDJcIlxuXTtcblxudGVtcGxhdGUuc3R5bGVMaW5rID0gXCIvc3R5bGVzL21haW4uY3NzXCI7XG5cbnRlbXBsYXRlLm5hdiA9IFtcblx0SG9tZTogXCIvaG9tZVwiLFxuXHREb2N1bWVudGF0aW9uOiBcIi9kb2NzXCIsXG5cdEFib3V0OiBcIi9hYm91dFwiLFxuXHRDb250YWN0OiBcIi9jb250YWN0XCJcbl07XG5cbmxldCBub3RGb3VuZCA9IFtcblx0dGl0bGU6IFwiNDA0OiBOb3QgRm91bmRcIixcblx0dXJsOiBcIjQwNFwiLFxuXHRib2R5OiBcblx0PGFydGljbGU+XG5cdFx0PGgyPlxuXHRcdFx0XCJXZSBoYXZlIGEgcHJvYmxlbS4uXCI7XG5cdFx0PC9oMj47XG5cdFx0PGRpdj5cblx0XHRcdDxzdHJvbmc+XCI0MDQgTm90IEZvdW5kOlwiOzwvc3Ryb25nPjtcblx0XHRcdFwiIFRoZSByZXF1ZXN0ZWQgcGFnZSB3YXMgbm90IGZvdW5kLlwiO1xuXHRcdDwvZGl2Pjtcblx0PC9hcnRpY2xlPlxuXTtcblxuc2VydmVyLm1hbmlmZXN0KHRlbXBsYXRlLm1hbmlmZXN0KTtcblxuc2VydmVyLmdldChcIi9cIiwgKGNsaWVudDogW10pIHtcblx0Y2xpZW50LnJlc3BvbnNlLnJlZGlyZWN0KDMwMSwgXCIvaG9tZVwiKTtcbn0pO1xuXG5zZXJ2ZXIuZ2V0KFwiLzQwNFwiLCAoY2xpZW50OiBbXSkge1xuXHRjbGllbnQucmVzcG9uc2Uuc3RhdHVzKDQwNCk7XG5cdGNsaWVudC5yZXNwb25zZS5yZW5kZXIodGVtcGxhdGUuZ2VuZXJhdGUobm90Rm91bmQpKTtcbn0pO1xuXG5zZXJ2ZXIuZ2V0KHRlbXBsYXRlLnN0eWxlTGluaywgKGNsaWVudDogW10pIHtcblx0Y2xpZW50LnJlc3BvbnNlLnNlbmRTdHlsZSh0ZW1wbGF0ZS5zdHlsZXNoZWV0KTtcbn0pO1xucHJvbWlzZS5hbGwobG9hZGVyLnByb21pc2VzKS50aGVuKChwYWdlczogW10pIHtcblx0c2VydmVyLmdldChcIi86cGFnZVwiLCAoY2xpZW50OiBbXSkge1xuXHRcdGxldCByZW5kZXJyZWQgPSBmYWxzZTtcblx0XHRlYWNoKHBhZ2VzLCAoc2M6IHt9LCBuYW1lOiBcIlwiKSB7XG5cdFx0XHRpZiAobmFtZSBpcyBjbGllbnQucmVxdWVzdC5wYXJhbXMucGFnZSwge1xuXHRcdFx0XHR1c2Ugc2M7XG5cdFx0XHRcdGNsaWVudC5yZXNwb25zZS5yZW5kZXIocGFnZSh0ZW1wbGF0ZS5nZW5lcmF0ZSksIGZhbHNlKTtcblx0XHRcdFx0cmVuZGVycmVkID0gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGlmICghcmVuZGVycmVkLCB7XG5cdFx0XHRjbGllbnQucmVzcG9uc2Uuc3RhdHVzKDQwNCk7XG5cdFx0XHRjbGllbnQucmVzcG9uc2UucmVuZGVyKHRlbXBsYXRlLmdlbmVyYXRlKG5vdEZvdW5kKSk7XG5cdFx0fSk7XG5cdH0pO1xufSk7XG5cbnNlcnZlci5saXN0ZW4oW3BvcnQ6IDgwODAsIGNsaWVudFNjb3BlOiB0cnVlXSwge1xuXHRwcmludChcIlNlcnZlciBydW5uaW5nIG9uIDgwODBcIik7XG59KTsiXX0=