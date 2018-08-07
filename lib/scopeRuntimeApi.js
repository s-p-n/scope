"use strict";

module.exports = scope => {
  const ScopeApi = {
    "print": value => {
      console.log(...value);
    },

    "debug": value => {
      value.forEach(val => {
        ScopeApi.print([ScopeApi.__debugReturn(val)]);
      });
    },

    "__debugReturn": (value, spaces = 2) => {
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
          result += `\n${spacef()}${key} => ${ScopeApi.__debugReturn(val, spaces + 2)}`;
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
        args.forEach(arg => {
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
    }
  };
  return ScopeApi;
};