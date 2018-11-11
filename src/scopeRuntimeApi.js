let fs = require('fs');
let path = require('path');
let ScopeParser = require ('./ScopeParser.js');

module.exports = (scope) => {
  let userTags = scope.userTags;
  const ScopeApi = {
    "print": value => {
      let result = [];
      for (let i = 0; i < value.length; i += 1) {
        if (value[i] instanceof Map || value[i] instanceof scope.arrayExpression().__proto__.constructor) {
          result.push(value[i].toString());
        } else {
          result.push(value[i]);
        }
      }
      console.log(...result);
    },
    createTag: (name, T) => {
      userTags[name.toLowerCase()] = T;
    },
    getTag: name => {
      return userTags[name.toLowerCase()];
    },
    getAllTags: () => {
      return userTags;
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

    "dereference": (idOrMap, id) => {
      let map;
      if (id === undefined) {
        id = idOrMap;
      } else {
        map = idOrMap;
      }

      if (map instanceof Map || map instanceof scope.arrayExpression().__proto__.constructor) {
        return map.delete(id);
      }
      return scope.dereferenceIdentifier(id);
    },

    "if": ([condition, ifTrueExpr = () => {}, ifFalseExpr = () => {}, executeScopes = true]) => {
      if (condition) {
        if (executeScopes && typeof ifTrueExpr === "function") {
          return ifTrueExpr();
        }
        return ifTrueExpr;
      }
      if (executeScopes && typeof ifFalseExpr === "function") {
        return ifFalseExpr();
      }
      return ifFalseExpr;
    },

    "each": ([array, block = () => {}]) => {
      let cancelLoop = false;
      let cancel = () => {
        cancelLoop = true;
      };
      if (array.type === "numeric") {
        let result = [];
        for (let i = 0; i < array.size; i += 1) {
          result.push(block(array.get(i), i, cancel));
          if (cancelLoop) {
            break;
          }
        }
        return scope.arrayExpression(...result);
      }
      let result = scope.mapExpression();
      for (let [key, val] of array) {
        result.set(key, block(val, key, cancel));
        if (cancelLoop) {
          break;
        }
      }
      return result;
    },
    toJS: (input) => {
      let result;
      if (typeof input !== "object" || input === null) {
        return input;
      }
      if (input instanceof Map) {
        result = {};
        for (let [key, val] of input) {
          result[key] = ScopeApi.toJS(val);
        }
        return result;
      }
      if (input instanceof scope.arrayExpression().__proto__.constructor) {
        let result = [];
        for (let i = 0; i < input.size; i += 1) {
          result.push(ScopeApi.toJS(input[i]));
        }
        return result;
      }
      return null;
    },
    toJSON: (input) => {
      return JSON.stringify(ScopeApi.toJS(input));
    },
    "BSONtoMap": (input) => {
      let result;
      if (typeof input !== "object" || Buffer.isBuffer(input) || ("_bsontype" in input)) {
        return input;
      }
      if (input === null) {
        return false;
      }
      if (input instanceof Array) {
        result = scope.arrayExpression();
        for (let i = 0; i < input.length; i += 1) {
          result[i] = ScopeApi.BSONtoMap(input[i]);
        }
        return result;
      }
      result = scope.mapExpression();
      for (let i in input) {
        if (Object.hasOwnProperty.call(input, i)) {
          result[i] = ScopeApi.BSONtoMap(input[i]);
        }
      }
      return result;
    },
    "eval": (code) => {
      let parser = new ScopeParser();
      let translation = parser.translate(code);
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
            let imp = scope.import(libFilename);
            resolve(imp);
          });
        });
      });
    },
    "promise": function (executor) {
      let p = new Promise(function (resolve, reject) {
        executor(resolve, reject);
      });
      let sP = scope.mapExpression();

      sP.set("then", (sc) => {
        p.then((result) => {
          sc(result);
        });
      });

      sP.set("catch", (sc) => {
        p.catch((err) => {
          sc(err);
        });
      });

      sP.set("finally", (sc) => {
        p.finally(() => {
          sc();
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
    let sP = scope.mapExpression();

    sP.set("then", (sc) => {
      p.then((values) => {
        let result = scope.mapExpression();
        for (let i = 0; i < values.length; i += 1) {
          result.set(arrK[i], values[i]);
        }
        sc(result);
      });
    });

    sP.set("catch", (sc) => {
      p.catch((err) => {
        sc(err);
      });
    });

    sP.set("finally", (sc) => {
      p.finally(() => {
        sc();
      });
    });

    return sP;
  };
  ScopeApi.print = scope.createScope(ScopeApi.print);
  ScopeApi.debug = scope.createScope(ScopeApi.debug);
  ScopeApi.if = scope.createScope(ScopeApi.if);
  ScopeApi.each = scope.createScope(ScopeApi.each);
  return ScopeApi;
};