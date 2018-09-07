#!/usr/bin/env node
				"use strict";
				global.__scopedir = __dirname;
				require('source-map-support').install();
				const scope = require("/home/spence/Projects/scope/lib/scopeRuntime.js");
				const ScopeApi = require("/home/spence/Projects/scope/lib/scopeRuntimeApi.js")(scope);module.exports=scope.invokeExpression(scope.createScope((args)=>{const __oldthis__ = scope.thisObj;scope.setForeignThis(this);scope.declarationExpression({
				type: "let",
				name: "mongojs",
				value: scope.import("/home/spence/Projects/scope/packages/mongojs/main.js")
			});return scope.invokeExpression(scope.identifier("mongojs"),["scopeUser:abc123@scope"]);scope.setForeignThis(__oldthis__);}),[]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NwZW5jZS9Qcm9qZWN0cy9zY29wZS90ZXN0L2h1bWFuVGVzdHMvaW5jL2RiLnNjIl0sIm5hbWVzIjpbIjxhbm9ueW1vdXNlPiIsIjxzY29wZT4iLCJtb25nb2pzIl0sIm1hcHBpbmdzIjoiQUFDdUNBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLHlHQUFBQyx1QkFBQUQsd0ZBRFRBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BQ1NBLE9BQUFDLHVCQUF6QkMsMkJBQXlCRCxFQUFBRCx3QkFBQUMsRUFBQUQscUNBQUFDLElBQUFEIiwic291cmNlc0NvbnRlbnQiOlsibGV0IG1vbmdvanMgPSBpbXBvcnQgXCJtb25nb2pzXCI7XG5yZXR1cm4gbW9uZ29qcyhcInNjb3BlVXNlcjphYmMxMjNAc2NvcGVcIik7XG5cbiJdfQ==