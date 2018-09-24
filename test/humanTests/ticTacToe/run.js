#!/usr/bin/env node
"use strict";global.__scopedir=__dirname;require("source-map-support").install();const scope=require("/home/spence/Projects/scope/lib/scopeRuntime.js");const ScopeApi=require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.createScope(function(args){scope.declarationExpression({type:"let",name:"server",value:scope.import("/home/spence/Projects/scope/packages/serve/main.js")()});scope.declarationExpression({type:"let",name:"tags",value:scope.import("/home/spence/Projects/scope/test/humanTests/ticTacToe/tags.js")});scope.declarationExpression({type:"let",name:"css",value:scope.mapExpression(["body",scope.mapExpression(["font","14px \"Century Gothic\", Futura, sans-serif"],["margin","20px"])],["square",scope.mapExpression(["width","25px"],["height","25px"],["display","inline-block"],["border","1px solid black"])],['ol, ul',scope.mapExpression(["padding-left","30px"])],['.board-row:after',scope.mapExpression(["clear","both"],["content",""],["display","table"])],['.status',scope.mapExpression(["margin-bottom","10px"])],['.square',scope.mapExpression(["background","#fff"],["border","1px solid #999"],["float","left"],["font-size","24px"],["font-weight","bold"],["line-height","34px"],["height","34px"],["margin-right","-1px"],["margin-top","-1px"],["padding","0"],["text-align","center"],["width","34px"],['.winner',scope.mapExpression(["box-shadow","inset red 0px 0px 5px 0px"])])],['.square:focus',scope.mapExpression(["outline","none"])],['.kbd-navigation .square:focus',scope.mapExpression(["background","#ddd"])],['.game',scope.mapExpression(["display","flex"],["flex-direction","row"])],['.game-info',scope.mapExpression(["margin-left","20px"])])});scope.declarationExpression({type:"let",name:"doc",value:scope.xmlExpression("html",{},scope.xmlExpression("head",{},scope.xmlExpression("title",{},"Tic Tac Toe Game"),scope.xmlExpression("style",{},scope.identifier("css"))),scope.xmlExpression("body",{},scope.xmlExpression("Game",{"foo":"bar"})))});scope.identifier("server")["get"]("/",scope.createScope(function(args){scope.declarationExpression({type:"let",name:"client",value:args[0]===undefined?scope.mapExpression():args[0]});scope.identifier("client")["setUserTags"](scope.identifier("tags"));scope.identifier("client")["response"]["render"](scope.identifier("doc"));}));scope.identifier("server")["listen"](scope.mapExpression(["port",8080],["clientScope",true]));})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvdGljVGFjVG9lL3J1bi5zYyJdLCJuYW1lcyI6WyI8YW5vbnltb3VzZT4iLCJzZXJ2ZXIiLCJzY29wZS5pZGVudGlmaWVyKFwic2VydmVyXCIpLmdldCIsImludm9rZUV4cHJlc3Npb24iLCJjbGllbnQiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLnNldFVzZXJUYWdzIiwidGFncyIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikucmVzcG9uc2UiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpW1wicmVzcG9uc2VcIl0ucmVuZGVyIiwiZG9jIiwic2NvcGUuaWRlbnRpZmllcihcInNlcnZlclwiKS5saXN0ZW4iXSwibWFwcGluZ3MiOiJBQWdGNENBO0FBQUFBLDRSQWhGaEJBLG1JQUNEQSwwSUE0RDFCQSwybkNBVWdCQSw2U0FJWEMsMEJBQUFDLE9BRXFCQyxDQUZiSCxHQUVhQSxrSkFEcEJJLDBCQUFBQyxlQUFpQkYsQ0FBQUcsd0JBQUFILENBQUFILENBQ2pCSSwwQkFBQUcsWUFBQUMsVUFBb0JMLENBQUFNLHVCQUFBTixDQUFBSCxHQUFBRyxDQUFBSCxDQUdyQkMsMEJBQUFTLFVBQXNDUCxDQUFBSCx1REFBQUcsQ0FBQUgsR0FBQUcsRUFBQUgiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc2VydmVyID0gaW1wb3J0IFwic2VydmVcIigpO1xubGV0IHRhZ3MgPSBpbXBvcnQgXCJ0YWdzLnNjXCI7XG5cbmxldCBjc3MgPSBbXG5cdGJvZHk6IFtcblx0XHRmb250OiAnMTRweCBcIkNlbnR1cnkgR290aGljXCIsIEZ1dHVyYSwgc2Fucy1zZXJpZicsXG5cdFx0bWFyZ2luOiAnMjBweCdcblx0XSxcblx0c3F1YXJlOiBbXG5cdFx0d2lkdGg6IFwiMjVweFwiLFxuXHRcdGhlaWdodDogXCIyNXB4XCIsXG5cdFx0ZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcblx0XHRib3JkZXI6IFwiMXB4IHNvbGlkIGJsYWNrXCJcblx0XSxcblx0J29sLCB1bCc6IFtcblx0XHRwYWRkaW5nLWxlZnQ6ICczMHB4J1xuXHRdLFxuXG5cdCcuYm9hcmQtcm93OmFmdGVyJzogW1xuXHRcdGNsZWFyOiAnYm90aCcsXG5cdFx0Y29udGVudDogXCJcIixcblx0XHRkaXNwbGF5OiAndGFibGUnXG5cdF0sXG5cblx0Jy5zdGF0dXMnOiBbXG5cdFx0bWFyZ2luLWJvdHRvbTogJzEwcHgnXG5cdF0sXG5cblx0Jy5zcXVhcmUnOiBbXG5cdFx0YmFja2dyb3VuZDogJyNmZmYnLFxuXHRcdGJvcmRlcjogJzFweCBzb2xpZCAjOTk5Jyxcblx0XHRmbG9hdDogJ2xlZnQnLFxuXHRcdGZvbnQtc2l6ZTogJzI0cHgnLFxuXHRcdGZvbnQtd2VpZ2h0OiAnYm9sZCcsXG5cdFx0bGluZS1oZWlnaHQ6ICczNHB4Jyxcblx0XHRoZWlnaHQ6ICczNHB4Jyxcblx0XHRtYXJnaW4tcmlnaHQ6ICctMXB4Jyxcblx0XHRtYXJnaW4tdG9wOiAnLTFweCcsXG5cdFx0cGFkZGluZzogJzAnLFxuXHRcdHRleHQtYWxpZ246ICdjZW50ZXInLFxuXHRcdHdpZHRoOiAnMzRweCcsXG5cdFx0Jy53aW5uZXInOiBbXG5cdFx0XHRib3gtc2hhZG93OiBcImluc2V0IHJlZCAwcHggMHB4IDVweCAwcHhcIlxuXHRcdF1cblx0XSxcblxuXHQnLnNxdWFyZTpmb2N1cyc6IFtcblx0XHRvdXRsaW5lOiAnbm9uZSdcblx0XSxcblxuXHQnLmtiZC1uYXZpZ2F0aW9uIC5zcXVhcmU6Zm9jdXMnOiBbXG5cdFx0YmFja2dyb3VuZDogJyNkZGQnXG5cdF0sXG5cblx0Jy5nYW1lJzogW1xuXHRcdGRpc3BsYXk6ICdmbGV4Jyxcblx0XHRmbGV4LWRpcmVjdGlvbjogJ3Jvdydcblx0XSxcblxuXHQnLmdhbWUtaW5mbyc6IFtcblx0XHRtYXJnaW4tbGVmdDogJzIwcHgnXG5cdF1cbl07XG5cbmxldCBkb2MgPSBcbjxodG1sPlxuXHQ8aGVhZD5cblx0XHQ8dGl0bGU+XCJUaWMgVGFjIFRvZSBHYW1lXCI7PC90aXRsZT47XG5cdFx0PHN0eWxlPmNzczs8L3N0eWxlPjtcblx0PC9oZWFkPjtcblx0PGJvZHk+XG5cdFx0PEdhbWUgZm9vPVwiYmFyXCIvPjtcblx0PC9ib2R5PjtcbjwvaHRtbD47XG5cbnNlcnZlci5nZXQoXCIvXCIsIChjbGllbnQ6IFtdKSB7XG5cdGNsaWVudC5zZXRVc2VyVGFncyh0YWdzKTtcblx0Y2xpZW50LnJlc3BvbnNlLnJlbmRlcihkb2MpO1xufSk7XG5cbnNlcnZlci5saXN0ZW4oW3BvcnQ6IDgwODAsIGNsaWVudFNjb3BlOiB0cnVlXSk7Il19