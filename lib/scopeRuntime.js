#!/usr/bin/env node

"use strict";

require('source-map-support').install();

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
  /**
    inject: Injects all of the entities (except for the last entity)
            into the last entity.
  ** /
  "inject": entities => {
    let extensions = entities;
    let lastScope = extensions.pop();
    return (...args) => {
      let pub = new Map();
      let prot = new Map();
      let result;
      extensions.forEach(E => {
        let e = scope.invokeExpression(E, args, true);
        if (e instanceof Map) {
          if (e.has("protected")) {
            for (let [key, val] of e.get("protected")) {
              prot.set(key, val);
            }
          }
          if (e.has("public")) {
            for (let [key, val] of e.get("public")) {
              pub.set(key, val);
            }
          }
        }
      });
      result = scope.invokeExpression(lastScope, args, new Map([
        ["public", pub],
        ["protected", prot]
      ]));
      return result;
    };
  } */
};

class Scope {
  constructor(context) {
    const self = this;
    this._scoping = {
      let: new Map(),
      private: new Map(),
      protected: new Map(),
      public: new Map(),
      parent: null
    };
    let h = require("hyperscript");
    this.xmlExpression = (tag, attr, ...children) => {
      let node = h(tag, attr, ...children);
      node.toString = () => {
        return node.outerHTML;
      };
      node.get = key => {
        return node[key];
      };
      node.childNodes.get = key => {
        return node.childNodes[key];
      };
      return node;
    };
  }

  arrayExpression(...items) {
    let arr = new Map();
    items.forEach((item, i) => {
      if (typeof item === "object" && item.key !== undefined && item.value !== undefined) {
        arr.set(item.key, item.value);
      } else {
        arr.set(i, item);
      }
    });
    return arr;
  }

  assignmentExpression(names, value, ctx = this._scoping) {
    const self = this;
    let name;
    if (names.length > 1) {
      return names[0].set(names[1], value);
    } else {
      name = names[names.length - 1];
    }
    if (ctx.let.has(name)) {
      return ctx.let.set(name, value);
    }
    if (ctx.private.has(name)) {
      return ctx.private.set(name, value);
    }
    if (ctx.protected.has(name)) {
      return ctx.protected.set(name, value);
    }
    if (ctx.public.has(name)) {
      return ctx.public.set(name, value);
    }
    if (ctx.parent) {
      return self.assignmentExpression([name], value, ctx.parent);
    }

    throw `Identifier '${name}' is not defined`;
  }

  declarationExpression({ type, name, value }) {
    const self = this;
    if (type === 'let') {
      if (self._scoping.let.has(name)) {
        throw `Identifier '${name}' has already been declared`;
      }
      self._scoping.let.set(name, value);
      return value;
    }
    if (type === 'private') {
      if (self._scoping.private.has(name)) {
        throw `Identifier '${name}' has already been declared`;
      }
      self._scoping.private.set(name, value);
      return value;
    }
    if (type === 'protected') {
      if (self._scoping.protected.has(name)) {
        throw `Identifier '${name}' has already been declared`;
      }
      self._scoping.protected.set(name, value);
      return value;
    }
    if (type === 'public') {
      if (self._scoping.public.has(name)) {
        throw `Identifier '${name}' has already been declared`;
      }
      self._scoping.public.set(name, value);
      return value;
    }
    throw "A problem occurred - unknown declaration type.";
  }

  identifier(name, ctx = this._scoping) {
    const self = this;
    if (ctx.let.has(name)) {
      return ctx.let.get(name);
    }
    if (ctx.private.has(name)) {
      return ctx.private.get(name);
    }
    if (ctx.protected.has(name)) {
      return ctx.protected.get(name);
    }
    if (ctx.public.has(name)) {
      return ctx.public.get(name);
    }
    if (ctx.parent) {
      return self.identifier(name, ctx.parent);
    }

    throw `Identifier '${name}' is not defined`;
  }

  createScope(f) {
    f._parent = this._scoping;
    return f;
  }

  invokeExpression(f, args, extension = false) {
    let scoping = this._scoping;
    if (f === undefined) {
      throw new Error(`Call to undefined scope`);
    }
    this._scoping = {
      parent: f._parent,
      let: new Map(),
      private: new Map(),
      protected: new Map(),
      public: new Map()
    };
    if (extension instanceof Map) {
      if (extension.has("protected")) {
        for (let [key, val] of extension.get("protected")) {
          this._scoping.protected.set(key, val);
        }
      }
      if (extension.has("public")) {
        for (let [key, val] of extension.get("public")) {
          this._scoping.public.set(key, val);
        }
      }
    }
    let result = f(args);
    if (result === undefined) {
      if (extension === true) {
        result = new Map([["public", this._scoping.public], ["protected", this._scoping.protected]]);
      } else {
        result = this._scoping.public;
      }
    }
    this._scoping = scoping;
    return result;
  }

  use(usable, useOnly) {
    let self = this;
    usable.forEach(sc => {
      if (typeof sc !== "function") {
        throw new Error("Attempt to use non-scope");
      }
      let temp = self.invokeExpression(sc, [], true);
      for (let [key, val] of temp.get("protected")) {
        if (useOnly === undefined || useOnly.indexOf(key) !== -1) {
          self._scoping.protected.set(key, val);
        }
      }
      for (let [key, val] of temp.get("public")) {
        if (useOnly === undefined || useOnly.indexOf(key) !== -1) {
          self._scoping.public.set(key, val);
        }
      }
    });
  }
}
const scope = new Scope({});