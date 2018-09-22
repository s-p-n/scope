#!/usr/bin/env node
"use strict";global.__scopedir=__dirname;require("source-map-support").install();const scope=require("/home/spence/Projects/scope/lib/scopeRuntime.js");const ScopeApi=require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.createScope(function(args){scope.declarationExpression({type:"let",name:"server",value:scope.import("/home/spence/Projects/scope/packages/serve/main.js")()});ScopeApi.createTag("Square",scope.createScope(function(args){scope.declarationExpression({type:"let",name:"attr",value:args[0]===undefined?scope.mapExpression():args[0]});scope.declarationExpression({type:"let",name:"children",value:args[1]===undefined?scope.mapExpression():args[1]});scope.declarationExpression({type:"public",name:"listeners",value:scope.mapExpression(["click",scope.identifier("attr")["onClick"]])});scope.declarationExpression({type:"public",name:"render",value:scope.createScope(function(args){return scope.xmlExpression("button",{"class":"square"},scope.identifier("attr")["value"]);})});}));ScopeApi.createTag("Board",scope.createScope(function(args){scope.declarationExpression({type:"let",name:"attr",value:args[0]===undefined?scope.mapExpression():args[0]});scope.declarationExpression({type:"public",name:"renderSquare",value:scope.createScope(function(args){scope.declarationExpression({type:"let",name:"i",value:args[0]===undefined?0:args[0]});scope.declarationExpression({type:"let",name:"square",value:scope.xmlExpression("Square",{"value":scope.identifier("attr")["squares"][scope.identifier("i")], "index":scope.identifier("i"), "onClick":scope.identifier("attr")["onClick"](scope.identifier("i"))})});return scope.identifier("square");})});scope.declarationExpression({type:"public",name:"render",value:scope.createScope(function(args){return scope.xmlExpression("div",{},scope.xmlExpression("div",{"class":"status"},scope.identifier("status")),scope.xmlExpression("div",{"class":"board-row"},scope.identifier("renderSquare")(0),scope.identifier("renderSquare")(1),scope.identifier("renderSquare")(2)),scope.xmlExpression("div",{"class":"board-row"},scope.identifier("renderSquare")(3),scope.identifier("renderSquare")(4),scope.identifier("renderSquare")(5)),scope.xmlExpression("div",{"class":"board-row"},scope.identifier("renderSquare")(6),scope.identifier("renderSquare")(7),scope.identifier("renderSquare")(8)));})});}));ScopeApi.createTag("jumpTo",scope.createScope(function(args){scope.declarationExpression({type:"let",name:"attr",value:args[0]===undefined?scope.mapExpression():args[0]});scope.declarationExpression({type:"let",name:"children",value:args[1]===undefined?scope.mapExpression():args[1]});scope.declarationExpression({type:"public",name:"listeners",value:scope.mapExpression(["click",scope.identifier("attr")["onClick"]])});scope.declarationExpression({type:"public",name:"render",value:scope.createScope(function(args){return scope.xmlExpression("button",{},scope.identifier("children")[0]);})});}));ScopeApi.createTag("Game",scope.createScope(function(args){scope.declarationExpression({type:"public",name:"state",value:scope.mapExpression(["history",scope.arrayExpression(scope.mapExpression(["squares",scope.binaryExpression('*', scope.arrayExpression(""), 9)]))],["activePlayer","X"],["stepNumber",0])});scope.declarationExpression({type:"let",name:"getWinner",value:scope.createScope(function(args){scope.declarationExpression({type:"let",name:"squares",value:args[0]===undefined?scope.mapExpression():args[0]});scope.declarationExpression({type:"let",name:"lines",value:scope.arrayExpression(scope.arrayExpression(0,1,2),scope.arrayExpression(3,4,5),scope.arrayExpression(6,7,8),scope.arrayExpression(0,3,6),scope.arrayExpression(1,4,7),scope.arrayExpression(2,5,8),scope.arrayExpression(0,4,8),scope.arrayExpression(2,4,6))});scope.declarationExpression({type:"let",name:"result",value:""});ScopeApi['each'](scope.identifier("lines"),scope.createScope(function(args){scope.declarationExpression({type:"let",name:"val",value:args[0]===undefined?scope.mapExpression():args[0]});scope.declarationExpression({type:"let",name:"index",value:args[1]===undefined?0:args[1]});scope.declarationExpression({type:"let",name:"break",value:args[2]===undefined?scope.createScope(function(args){}):args[2]});scope.declarationExpression({type:"let",name:"a",value:scope.identifier("val")[0]});scope.declarationExpression({type:"let",name:"b",value:scope.identifier("val")[1]});scope.declarationExpression({type:"let",name:"c",value:scope.identifier("val")[2]});ScopeApi['if'](scope.binaryExpression('&&', scope.binaryExpression('&&', scope.binaryExpression('!==', scope.identifier("squares")[scope.identifier("a")], ""), scope.binaryExpression('===', scope.identifier("squares")[scope.identifier("a")], scope.identifier("squares")[scope.identifier("b")])), scope.binaryExpression('===', scope.identifier("squares")[scope.identifier("a")], scope.identifier("squares")[scope.identifier("c")])),scope.createScope(function(args){scope.assignmentExpression(["result"],["=", scope.identifier("squares")[scope.identifier("a")]]);scope.identifier("break")();}));}));return scope.identifier("result");})});scope.declarationExpression({type:"let",name:"jumpTo",value:scope.createScope(function(args){scope.declarationExpression({type:"let",name:"step",value:args[0]===undefined?0:args[0]});ScopeApi.print("jumpTo:",scope.identifier("step"));scope.assignmentExpression([scope.identifier("state"),"stepNumber"],["=", scope.identifier("step")]);scope.assignmentExpression([scope.identifier("state"),"activePlayer"],["=", ScopeApi['if'](scope.binaryExpression('===', scope.binaryExpression('%', scope.identifier("step"), 2), 0),scope.createScope(function(args){return "X";}),scope.createScope(function(args){return "O";}))]);})});scope.declarationExpression({type:"public",name:"handleClick",value:scope.createScope(function(args){scope.declarationExpression({type:"let",name:"i",value:args[0]===undefined?0:args[0]});scope.declarationExpression({type:"let",name:"history",value:ScopeApi['each'](scope.identifier("state")["history"],scope.createScope(function(args){scope.declarationExpression({type:"let",name:"val",value:args[0]===undefined?scope.mapExpression():args[0]});scope.declarationExpression({type:"let",name:"index",value:args[1]===undefined?0:args[1]});scope.declarationExpression({type:"let",name:"break",value:args[2]===undefined?scope.createScope(function(args){}):args[2]});ScopeApi['if'](scope.binaryExpression('===', scope.identifier("index"), scope.identifier("state")["stepNumber"]),scope.createScope(function(args){scope.identifier("break")();}));return scope.identifier("val");}))});scope.declarationExpression({type:"let",name:"current",value:scope.identifier("history")[scope.binaryExpression('-', scope.identifier("history")["size"], 1)]});scope.declarationExpression({type:"let",name:"squares",value:ScopeApi['each'](scope.identifier("current")["squares"],scope.createScope(function(args){scope.declarationExpression({type:"let",name:"square",value:args[0]===undefined?"":args[0]});return scope.identifier("square");}))});return scope.createScope(function(args){scope.declarationExpression({type:"let",name:"e",value:args[0]===undefined?scope.mapExpression():args[0]});ScopeApi['if'](scope.binaryExpression('&&', scope.binaryExpression('===', scope.identifier("squares")[scope.identifier("i")], ""), scope.binaryExpression('===', scope.identifier("getWinner")(scope.identifier("squares")), "")),scope.createScope(function(args){scope.assignmentExpression([scope.identifier("squares"),scope.identifier("i")],["=", scope.identifier("state")["activePlayer"]]);scope.assignmentExpression(["history"],["+=", scope.mapExpression(["squares",scope.identifier("squares")])]);scope.identifier("setState")(scope.mapExpression(["history",scope.identifier("history")],["activePlayer",ScopeApi['if'](scope.binaryExpression('===', scope.identifier("state")["activePlayer"], "X"),scope.createScope(function(args){return "O";}),scope.createScope(function(args){return "X";}))],["stepNumber",scope.binaryExpression('-', scope.identifier("history")["size"], 1)]));}));});})});scope.declarationExpression({type:"public",name:"render",value:scope.createScope(function(args){scope.declarationExpression({type:"let",name:"history",value:scope.identifier("state")["history"]});scope.declarationExpression({type:"let",name:"current",value:scope.identifier("history")[scope.identifier("state")["stepNumber"]]});scope.declarationExpression({type:"let",name:"winner",value:scope.identifier("getWinner")(scope.identifier("current")["squares"])});scope.declarationExpression({type:"let",name:"moves",value:scope.xmlExpression("ol",{},)});ScopeApi['each'](scope.identifier("history"),scope.createScope(function(args){scope.declarationExpression({type:"let",name:"val",value:args[0]===undefined?scope.mapExpression():args[0]});scope.declarationExpression({type:"let",name:"move",value:args[1]===undefined?0:args[1]});scope.declarationExpression({type:"let",name:"desc",value:ScopeApi['if'](scope.identifier("move"),scope.createScope(function(args){return scope.binaryExpression('+', "Go to move #", scope.identifier("move"));}),scope.createScope(function(args){return "Go to game start";}))});scope.identifier("moves")["appendChild"](scope.xmlExpression("li",{},scope.xmlExpression("jumpTo",{"onClick":scope.createScope(function(args){scope.identifier("jumpTo")(scope.identifier("move"));})},scope.identifier("desc"))));}));scope.declarationExpression({type:"let",name:"status",value:ScopeApi['if'](scope.binaryExpression('!==', scope.identifier("winner"), ""),scope.createScope(function(args){return scope.binaryExpression('+', "Winner: ", scope.identifier("winner"));}),scope.createScope(function(args){return scope.binaryExpression('+', "Next Player: ", scope.identifier("state")["activePlayer"]);}))});return scope.xmlExpression("div",{"class":"game"},scope.xmlExpression("div",{"class":"game-board"},scope.xmlExpression("Board",{"squares":scope.identifier("current")["squares"], "onClick":scope.identifier("handleClick")})),scope.xmlExpression("div",{"class":"game-info"},scope.xmlExpression("div",{},scope.identifier("status")),scope.identifier("moves")));})});}));scope.declarationExpression({type:"let",name:"css",value:scope.mapExpression(["body",scope.mapExpression(["font","14px \"Century Gothic\", Futura, sans-serif"],["margin","20px"])],["square",scope.mapExpression(["width","25px"],["height","25px"],["display","inline-block"],["border","1px solid black"])],['ol, ul',scope.mapExpression(["padding-left","30px"])],['.board-row:after',scope.mapExpression(["clear","both"],["content",""],["display","table"])],['.status',scope.mapExpression(["margin-bottom","10px"])],['.square',scope.mapExpression(["background","#fff"],["border","1px solid #999"],["float","left"],["font-size","24px"],["font-weight","bold"],["line-height","34px"],["height","34px"],["margin-right","-1px"],["margin-top","-1px"],["padding","0"],["text-align","center"],["width","34px"],['.winner',scope.mapExpression(["box-shadow","inset red 0px 0px 5px 0px"])])],['.square:focus',scope.mapExpression(["outline","none"])],['.kbd-navigation .square:focus',scope.mapExpression(["background","#ddd"])],['.game',scope.mapExpression(["display","flex"],["flex-direction","row"])],['.game-info',scope.mapExpression(["margin-left","20px"])])});scope.declarationExpression({type:"let",name:"doc",value:scope.xmlExpression("html",{},scope.xmlExpression("head",{},scope.xmlExpression("title",{},"Tic Tac Toe Game"),scope.xmlExpression("style",{},scope.identifier("css"))),scope.xmlExpression("body",{},scope.xmlExpression("Game",{"foo":"bar"})))});scope.identifier("server")["get"]("/",scope.createScope(function(args){scope.declarationExpression({type:"let",name:"client",value:args[0]===undefined?scope.mapExpression():args[0]});scope.identifier("client")["setUserTags"](ScopeApi.getAllTags());scope.identifier("client")["response"]["render"](scope.identifier("doc"));}));scope.identifier("server")["listen"](scope.mapExpression(["port",8080],["clientScope",true]));})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvdGljVGFjVG9lR2FtZS5zYyJdLCJuYW1lcyI6WyI8YW5vbnltb3VzZT4iLCJjcmVhdGVUYWciLCJpbnZva2VFeHByZXNzaW9uIiwic2VydmVyIiwic2NvcGUuaWRlbnRpZmllcihcInNlcnZlclwiKS5nZXQiLCJjbGllbnQiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpLnNldFVzZXJUYWdzIiwiZ2V0QWxsVGFncyIsInNjb3BlLmlkZW50aWZpZXIoXCJjbGllbnRcIikucmVzcG9uc2UiLCJzY29wZS5pZGVudGlmaWVyKFwiY2xpZW50XCIpW1wicmVzcG9uc2VcIl0ucmVuZGVyIiwiZG9jIiwic2NvcGUuaWRlbnRpZmllcihcInNlcnZlclwiKS5saXN0ZW4iXSwibWFwcGluZ3MiOiJBQW1PNENBO0FBQUFBLDRSQW5PaEJBLG1JQUVuQkMsa0JBT0ZDLENBUFdGLFFBT1hBLGtRQUxNQSx1SUFLTkEsaU1BQUFFLENBQUFGLENBS0VDLGtCQXVCVUMsQ0F2QkZGLE9BdUJFQSxnSkFwQkpBLDBlQW9CSUEsNHFCQUFBRSxDQUFBRixDQU1WQyxrQkFLa0JDLENBTFRGLFFBS1NBLGtRQUhkQSx1SUFHY0EsK0tBQUFFLENBQUFGLENBSWxCQyxrQkE0RkNDLENBNUZNRixNQTRGTkEsa0NBckZUQSx5UEFzQmNBLHUxREFTRkEsMm1CQXFCVEEsa3pFQWlDTUEsZ2lFQUFBRSxDQUFBRixDQWdFVEEsMm5DQVVnQkEsNlNBSVhHLDBCQUFBQyxPQUVxQkYsQ0FGYkYsR0FFYUEsa0pBRHBCSywwQkFBQUMsZUFBd0JKLENBQURLLG1CQUFDTCxHQUFBRixDQUN4QkssMEJBQUFHLFlBQUFDLFVBQW9CUCxDQUFBUSx1QkFBQVIsQ0FBQUYsR0FBQUUsQ0FBQUYsQ0FHckJHLDBCQUFBUSxVQUFzQ1QsQ0FBQUYsdURBQUFFLENBQUFGLEdBQUFFLEVBQUFGIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHNlcnZlciA9IGltcG9ydCBcInNlcnZlXCIoKTtcblxuY3JlYXRlVGFnKFwiU3F1YXJlXCIsIChhdHRyOiBbXSwgY2hpbGRyZW46IFtdKSB7XG5cdHB1YmxpYyBsaXN0ZW5lcnMgPSBbXG5cdFx0Y2xpY2s6IGF0dHIub25DbGlja1xuXHRdO1xuXHRwdWJsaWMgcmVuZGVyID0ge1xuXHRcdHJldHVybiBcblx0XHQ8YnV0dG9uIGNsYXNzPVwic3F1YXJlXCI+XG5cdFx0XHRhdHRyLnZhbHVlO1xuXHRcdDwvYnV0dG9uPjtcblx0fTtcbn0pO1xuXG5jcmVhdGVUYWcoXCJCb2FyZFwiLCAoYXR0cjogW10pIHtcblx0cHVibGljIHJlbmRlclNxdWFyZSA9IChpOiAwKSB7XG5cdFx0bGV0IHNxdWFyZSA9IDxTcXVhcmUgdmFsdWU9YXR0ci5zcXVhcmVzW2ldIGluZGV4PWkgb25DbGljaz1hdHRyLm9uQ2xpY2soaSkgLz47XG5cdFx0cmV0dXJuIHNxdWFyZTtcblx0fTtcblxuXHRwdWJsaWMgcmVuZGVyID0ge1xuXHRcdHJldHVybiBcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJzdGF0dXNcIj5zdGF0dXM7PC9kaXY+O1xuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm9hcmQtcm93XCI+XG5cdFx0XHRcdFx0cmVuZGVyU3F1YXJlKDApO1xuXHRcdFx0XHRcdHJlbmRlclNxdWFyZSgxKTtcblx0XHRcdFx0XHRyZW5kZXJTcXVhcmUoMik7XG5cdFx0XHRcdDwvZGl2Pjtcblx0XHRcdFx0PGRpdiBjbGFzcz1cImJvYXJkLXJvd1wiPlxuXHRcdFx0XHRcdHJlbmRlclNxdWFyZSgzKTtcblx0XHRcdFx0XHRyZW5kZXJTcXVhcmUoNCk7XG5cdFx0XHRcdFx0cmVuZGVyU3F1YXJlKDUpO1xuXHRcdFx0XHQ8L2Rpdj47XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJib2FyZC1yb3dcIj5cblx0XHRcdFx0XHRyZW5kZXJTcXVhcmUoNik7XG5cdFx0XHRcdFx0cmVuZGVyU3F1YXJlKDcpO1xuXHRcdFx0XHRcdHJlbmRlclNxdWFyZSg4KTtcblx0XHRcdFx0PC9kaXY+O1xuXHRcdFx0PC9kaXY+O1xuXHR9O1xufSk7XG5cbmNyZWF0ZVRhZyhcImp1bXBUb1wiLCAoYXR0cjogW10sIGNoaWxkcmVuOiBbXSkge1xuXHRwdWJsaWMgbGlzdGVuZXJzID0gW1xuXHRcdGNsaWNrOiBhdHRyLm9uQ2xpY2tcblx0XTtcblx0cHVibGljIHJlbmRlciA9IHtcblx0XHRyZXR1cm4gPGJ1dHRvbj5jaGlsZHJlblswXTs8L2J1dHRvbj47XG5cdH07XG59KTtcblxuY3JlYXRlVGFnKFwiR2FtZVwiLCB7XG5cdHB1YmxpYyBzdGF0ZSA9IFtcblx0XHRoaXN0b3J5OiBbXG5cdFx0XHRbc3F1YXJlczogWycnXSAqIDldXG5cdFx0XSxcblx0XHRhY3RpdmVQbGF5ZXI6IFwiWFwiLFxuXHRcdHN0ZXBOdW1iZXI6IDBcblx0XTtcblx0bGV0IGdldFdpbm5lciA9IChzcXVhcmVzOiBbXSkge1xuXHRcdGxldCBsaW5lcyA9IFtcblx0XHRcdFswLCAxLCAyXSxcblx0XHRcdFszLCA0LCA1XSxcblx0XHRcdFs2LCA3LCA4XSxcblx0XHRcdFswLCAzLCA2XSxcblx0XHRcdFsxLCA0LCA3XSxcblx0XHRcdFsyLCA1LCA4XSxcblx0XHRcdFswLCA0LCA4XSxcblx0XHRcdFsyLCA0LCA2XVxuXHRcdF07XG5cdFx0bGV0IHJlc3VsdCA9IFwiXCI7XG5cdFx0ZWFjaChsaW5lcywgKHZhbDogW10sIGluZGV4OiAwLCBicmVhazoge30pIHtcblx0XHRcdGxldCBhID0gdmFsWzBdO1xuXHRcdFx0bGV0IGIgPSB2YWxbMV07XG5cdFx0XHRsZXQgYyA9IHZhbFsyXTtcblx0XHRcdGlmIChzcXVhcmVzW2FdIGlzbnQgXCJcIiBhbmQgc3F1YXJlc1thXSBpcyBzcXVhcmVzW2JdIGFuZCBzcXVhcmVzW2FdIGlzIHNxdWFyZXNbY10sIHtcblx0XHRcdFx0cmVzdWx0ID0gc3F1YXJlc1thXTtcblx0XHRcdFx0YnJlYWsoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0bGV0IGp1bXBUbyA9IChzdGVwOiAwKSB7XG5cdFx0cHJpbnQoXCJqdW1wVG86XCIsIHN0ZXApO1xuXHRcdHN0YXRlLnN0ZXBOdW1iZXIgPSBzdGVwO1xuXHRcdHN0YXRlLmFjdGl2ZVBsYXllciA9IGlmKHN0ZXAgJSAyIGlzIDAsIHtcblx0XHRcdHJldHVybiBcIlhcIjtcblx0XHR9LCB7XG5cdFx0XHRyZXR1cm4gXCJPXCI7XG5cdFx0fSk7XG5cdH07XG5cblx0cHVibGljIGhhbmRsZUNsaWNrID0gKGk6IDApIHtcblx0XHRsZXQgaGlzdG9yeSA9IGVhY2goc3RhdGUuaGlzdG9yeSwgKHZhbDogW10sIGluZGV4OiAwLCBicmVhazoge30pIHtcblx0XHRcdGlmIChpbmRleCBpcyBzdGF0ZS5zdGVwTnVtYmVyLCB7XG5cdFx0XHRcdGJyZWFrKCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiB2YWw7XG5cdFx0fSk7XG5cdFx0bGV0IGN1cnJlbnQgPSBoaXN0b3J5W2hpc3Rvcnkuc2l6ZSAtIDFdO1xuXHRcdGxldCBzcXVhcmVzID0gZWFjaChjdXJyZW50LnNxdWFyZXMsIChzcXVhcmU6IFwiXCIpIHtyZXR1cm4gc3F1YXJlO30pO1xuXHRcdHJldHVybiAoZTogW10pIHtcblx0XHRcdGlmKHNxdWFyZXNbaV0gaXMgXCJcIiBhbmQgZ2V0V2lubmVyKHNxdWFyZXMpIGlzIFwiXCIsIHtcblx0XHRcdFx0c3F1YXJlc1tpXSA9IHN0YXRlLmFjdGl2ZVBsYXllcjtcblx0XHRcdFx0aGlzdG9yeSArPSBbc3F1YXJlczogc3F1YXJlc107XG5cdFx0XHRcdHNldFN0YXRlKFtcblx0XHRcdFx0XHRoaXN0b3J5OiBoaXN0b3J5LFxuXHRcdFx0XHRcdGFjdGl2ZVBsYXllcjogaWYgKHN0YXRlLmFjdGl2ZVBsYXllciBpcyBcIlhcIiwge3JldHVybiBcIk9cIjt9LCB7cmV0dXJuIFwiWFwiO30pLFxuXHRcdFx0XHRcdHN0ZXBOdW1iZXI6IGhpc3Rvcnkuc2l6ZSAtIDFcblx0XHRcdFx0XSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXHR9O1xuXG5cdHB1YmxpYyByZW5kZXIgPSB7XG5cdFx0bGV0IGhpc3RvcnkgPSBzdGF0ZS5oaXN0b3J5O1xuXHRcdGxldCBjdXJyZW50ID0gaGlzdG9yeVtzdGF0ZS5zdGVwTnVtYmVyXTtcblx0XHRsZXQgd2lubmVyID0gZ2V0V2lubmVyKGN1cnJlbnQuc3F1YXJlcyk7XG5cdFx0bGV0IG1vdmVzID0gPG9sPjwvb2w+O1xuXHRcdGVhY2goaGlzdG9yeSwgKHZhbDogW10sIG1vdmU6IDApIHtcblx0XHRcdGxldCBkZXNjID0gaWYobW92ZSwge1xuXHRcdFx0XHRyZXR1cm4gXCJHbyB0byBtb3ZlICNcIiArIG1vdmU7XG5cdFx0XHR9LCB7XG5cdFx0XHRcdHJldHVybiBcIkdvIHRvIGdhbWUgc3RhcnRcIjtcblx0XHRcdH0pO1xuXHRcdFx0bW92ZXMuYXBwZW5kQ2hpbGQoPGxpPlxuXHRcdFx0XHQ8anVtcFRvIG9uQ2xpY2s9e2p1bXBUbyhtb3ZlKTt9PmRlc2M7PC9qdW1wVG8+O1xuXHRcdFx0PC9saT4pO1xuXHRcdH0pO1xuXHRcdGxldCBzdGF0dXMgPSBpZiAod2lubmVyIGlzbnQgXCJcIiwge1xuXHRcdFx0cmV0dXJuIFwiV2lubmVyOiBcIiArIHdpbm5lcjtcblx0XHR9LCB7XG5cdFx0XHRyZXR1cm4gXCJOZXh0IFBsYXllcjogXCIgKyBzdGF0ZS5hY3RpdmVQbGF5ZXI7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm5cblx0XHRcdDxkaXYgY2xhc3M9XCJnYW1lXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJnYW1lLWJvYXJkXCI+XG5cdFx0XHRcdFx0PEJvYXJkIHNxdWFyZXM9Y3VycmVudC5zcXVhcmVzIG9uQ2xpY2s9aGFuZGxlQ2xpY2sgLz47XG5cdFx0XHRcdDwvZGl2Pjtcblx0XHRcdFx0PGRpdiBjbGFzcz1cImdhbWUtaW5mb1wiPlxuXHRcdFx0XHRcdDxkaXY+c3RhdHVzOzwvZGl2Pjtcblx0XHRcdFx0XHRtb3Zlcztcblx0XHRcdFx0PC9kaXY+O1xuXHRcdFx0PC9kaXY+O1xuXHR9O1xufSk7XG5cbmxldCBjc3MgPSBbXG5cdGJvZHk6IFtcblx0XHRmb250OiAnMTRweCBcIkNlbnR1cnkgR290aGljXCIsIEZ1dHVyYSwgc2Fucy1zZXJpZicsXG5cdFx0bWFyZ2luOiAnMjBweCdcblx0XSxcblx0c3F1YXJlOiBbXG5cdFx0d2lkdGg6IFwiMjVweFwiLFxuXHRcdGhlaWdodDogXCIyNXB4XCIsXG5cdFx0ZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcblx0XHRib3JkZXI6IFwiMXB4IHNvbGlkIGJsYWNrXCJcblx0XSxcblx0J29sLCB1bCc6IFtcblx0XHRwYWRkaW5nLWxlZnQ6ICczMHB4J1xuXHRdLFxuXG5cdCcuYm9hcmQtcm93OmFmdGVyJzogW1xuXHRcdGNsZWFyOiAnYm90aCcsXG5cdFx0Y29udGVudDogXCJcIixcblx0XHRkaXNwbGF5OiAndGFibGUnXG5cdF0sXG5cblx0Jy5zdGF0dXMnOiBbXG5cdFx0bWFyZ2luLWJvdHRvbTogJzEwcHgnXG5cdF0sXG5cblx0Jy5zcXVhcmUnOiBbXG5cdFx0YmFja2dyb3VuZDogJyNmZmYnLFxuXHRcdGJvcmRlcjogJzFweCBzb2xpZCAjOTk5Jyxcblx0XHRmbG9hdDogJ2xlZnQnLFxuXHRcdGZvbnQtc2l6ZTogJzI0cHgnLFxuXHRcdGZvbnQtd2VpZ2h0OiAnYm9sZCcsXG5cdFx0bGluZS1oZWlnaHQ6ICczNHB4Jyxcblx0XHRoZWlnaHQ6ICczNHB4Jyxcblx0XHRtYXJnaW4tcmlnaHQ6ICctMXB4Jyxcblx0XHRtYXJnaW4tdG9wOiAnLTFweCcsXG5cdFx0cGFkZGluZzogJzAnLFxuXHRcdHRleHQtYWxpZ246ICdjZW50ZXInLFxuXHRcdHdpZHRoOiAnMzRweCcsXG5cdFx0Jy53aW5uZXInOiBbXG5cdFx0XHRib3gtc2hhZG93OiBcImluc2V0IHJlZCAwcHggMHB4IDVweCAwcHhcIlxuXHRcdF1cblx0XSxcblxuXHQnLnNxdWFyZTpmb2N1cyc6IFtcblx0XHRvdXRsaW5lOiAnbm9uZSdcblx0XSxcblxuXHQnLmtiZC1uYXZpZ2F0aW9uIC5zcXVhcmU6Zm9jdXMnOiBbXG5cdFx0YmFja2dyb3VuZDogJyNkZGQnXG5cdF0sXG5cblx0Jy5nYW1lJzogW1xuXHRcdGRpc3BsYXk6ICdmbGV4Jyxcblx0XHRmbGV4LWRpcmVjdGlvbjogJ3Jvdydcblx0XSxcblxuXHQnLmdhbWUtaW5mbyc6IFtcblx0XHRtYXJnaW4tbGVmdDogJzIwcHgnXG5cdF1cbl07XG5cbmxldCBkb2MgPSBcbjxodG1sPlxuXHQ8aGVhZD5cblx0XHQ8dGl0bGU+XCJUaWMgVGFjIFRvZSBHYW1lXCI7PC90aXRsZT47XG5cdFx0PHN0eWxlPmNzczs8L3N0eWxlPjtcblx0PC9oZWFkPjtcblx0PGJvZHk+XG5cdFx0PEdhbWUgZm9vPVwiYmFyXCIvPjtcblx0PC9ib2R5PjtcbjwvaHRtbD47XG5cbnNlcnZlci5nZXQoXCIvXCIsIChjbGllbnQ6IFtdKSB7XG5cdGNsaWVudC5zZXRVc2VyVGFncyhnZXRBbGxUYWdzKCkpO1xuXHRjbGllbnQucmVzcG9uc2UucmVuZGVyKGRvYyk7XG59KTtcblxuc2VydmVyLmxpc3RlbihbcG9ydDogODA4MCwgY2xpZW50U2NvcGU6IHRydWVdKTsiXX0=