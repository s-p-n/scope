let fs = require('fs');
let path = require('path');
let ScopeParser = require ('./ScopeParser.js');

module.exports = (scope) => {
  const ScopeApi = {
    "print": value => {
    console.log(...value);
    },

    "debug": value => {
    value.forEach((val) => {
      ScopeApi.print([ScopeApi.__debugReturn(val)]);
    });
    },

    "__debugReturn": (value, spaces=2) => {
    let result = "";
    let spacef = () => {
      let r = '';
      for (let i = 0; i < spaces; i += 1) {
      r += ' ';
      }
      return r;
    };
    if (typeof value === "object" && value instanceof Map) {
      result += "Map(";
      for (let [key, val] of value) {
      result += `\n${spacef()}${key} => ${ScopeApi.__debugReturn(val, spaces + 2)}`
      }
      return `${result})`;
    } else if (typeof value === "function") {
      let source = value.toString();
      let args = source.match(/^\(args\=(\[.*\])\)/);
      if (args[1]) {
      args = eval(args[1]);
      } else {
      args = [];
      }
      //console.log('args:', args);
      result += "Scope([";
      args.forEach((arg) => {
      result += `\n${spacef()}(${typeof arg.value}) ${arg.key}: ${ScopeApi.__debugReturn(arg.value, spaces + 2)}`;
      });
      return `${result}])`;
    } else if (typeof value === "string") {
      return `"${value}"`;
    } else {
      return value;
    }
    },

    "if": ([condition, ifTrueScope = () => {}, ifFalseScope = () => {}]) => {
    if (condition) {
      return scope.invokeExpression(ifTrueScope, []);
    }
    return scope.invokeExpression(ifFalseScope, []);
    },

    "each": ([array, block = () => {}]) => {
    let result = new Map();
    for (let [key, val] of array) {
      result.set(key, scope.invokeExpression(block, [val, key]));
    }
    return result;
    },
    "eval": (code) => {
      let parser = new ScopeParser();
      let translation = parser.translate(code);
      console.log(translation.code);
      return eval(translation.code);
    },
    "compile": (filename) => {
      let parser = new ScopeParser();
      let srcFilename = path.join(__scopedir, filename);
      let libFilename = srcFilename.replace(/\.sc$/, ".js");
      return new ScopeApi.promise((resolve, reject) => {
        fs.readFile(srcFilename, "utf8", (err, srcCode) => {
          if (err) {
            reject(`Could not read file ${srcFilename}.\n${err}`);
          }
          let translation = parser.translate(srcCode, srcFilename, libFilename);
          fs.writeFile(libFilename, translation.code, (err) => {
            if (err) {
              reject(`Could not write to file ${libFilename}.\n${err}`);
            }
            resolve(scope.import(libFilename));
          });
        });
      });
    },
    "promise": function (executor) {
      let p = new Promise(function (resolve, reject) {
        scope.invokeExpression(executor, [scope.createScope(resolve), scope.createScope(reject)]);
      });
      let sP = new Map();

      sP.set("then", (sc) => {
        p.then((result) => {
          scope.invokeExpression(sc, [result]);
        });
      });

      sP.set("catch", (sc) => {
        p.catch((err) => {
          scope.invokeExpression(sc, [err]);
        });
      });

      sP.set("finally", (sc) => {
        p.finally(() => {
          scope.invokeExpression(sc, []);
        });
      });

      sP.originalPromise = p;

      return sP;
    }
  };
  ScopeApi.promise.get = (key) => {
    return ScopeApi.promise[key];
  };
  ScopeApi.promise.all = (m) => {
    let arrV = [];
    let arrK = [];
    for (let [key, val] of m) {
      let unpackVal;
      if (val.originalPromise !== undefined) {
        unpackVal = val.originalPromise;
      } else {
        unpackVal = val;
      }
      arrV.push(unpackVal);
      arrK.push(key);
    }
    let p = Promise.all(arrV);
    let sP = new Map();

    sP.set("then", (sc) => {
      p.then((values) => {
        let result = new Map();
        for (let i = 0; i < values.length; i += 1) {
          result.set(arrK[i], values[i]);
        }
        scope.invokeExpression(sc, [result]);
      });
    });

    sP.set("catch", (sc) => {
      p.catch((err) => {
        scope.invokeExpression(sc, [err]);
      });
    });

    sP.set("finally", (sc) => {
      p.finally(() => {
        scope.invokeExpression(sc, []);
      });
    });

    return sP;
  };
  ScopeApi.print._isScope = true;
  ScopeApi.debug._isScope = true;
  ScopeApi.if._isScope = true;
  ScopeApi.each._isScope = true;
  return ScopeApi;
};