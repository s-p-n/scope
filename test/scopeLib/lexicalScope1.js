"use strict";

const ScopeApi = {
  "print": value => {
    console.log(...value);
  },

  "if": ([condition, ifTrueScope = () => {}, ifFalseScope = () => {}]) => {
    if (condition) {
      return scope.invokeExpression(ifTrueScope, []);
    }
    return scope.invokeExpression(ifFalseScope, []);
  },

  "for": ([array, block = () => {}]) => {
    let result = new Map();
    for (let [key, val] of array) {
      result.set(key, scope.invokeExpression(block, [val, key]));
    }
    return result;
  }
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
    /*
    this.root = context;
    this.context = context;
    this.newChildContext = () => {
      let parent = self.context;
      let newContext = {
        scoping: {
          let: new Map(),
          private: new Map(),
          protected: new Map(),
          public: new Map(),
          parent: parent
        }
      };
      newContext.args = [];
      self.context = newContext;
    };
     this.setParentContext = () => {
      self.context = self.context.scoping.parent;
    };
    */
    let h = require("hyperscript");
    this.xmlExpression = (tag, attr, ...children) => {
      let node = h(tag, attr, ...children);
      node.toString = () => {
        return node.outerHTML;
      };
      return node;
    };

    //this.newChildContext();
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

  declarationExpression({
    type,
    name,
    value
  }) {
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

  invokeExpression(f, args) {
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
    let result = f(args);
    if (result === undefined) {
      result = this._scoping.public;
    }
    this._scoping = scoping;
    return result;
  }
}
const scope = new Scope({});
module.exports = scope.invokeExpression(scope.createScope((args = []) => {

  scope.declarationExpression({
    type: "let",
    name: "something",
    value: "outer scope"
  });
  scope.declarationExpression({
    type: "let",
    name: "someScope",
    value: scope.invokeExpression(scope.createScope((args = []) => {

      scope.declarationExpression({
        type: "let",
        name: "something",
        value: "inner scope"
      });
      return scope.identifier("something");

    }), [])
  });
  return scope.identifier("something") + "," + scope.identifier("someScope");

}), []);