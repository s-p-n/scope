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
  }
};

class Scope {
  constructor(context) {
    const self = this;
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
    let h = require("hyperscript");
    this.xmlExpression = (tag, attr, ...children) => {
      let node = h(tag, attr, ...children);
      node.toString = () => {
        return node.outerHTML;
      };
      return node;
    };

    this.newChildContext();
  }

  assignmentExpression(name, value, ctx = this.context) {
    const self = this;
    if (ctx.scoping.let.has(name)) {
      return ctx.scoping.let.set(name, value);
    }
    if (ctx.scoping.private.has(name)) {
      return ctx.scoping.private.set(name, value);
    }
    if (ctx.scoping.protected.has(name)) {
      return ctx.scoping.protected.set(name, value);
    }
    if (ctx.scoping.public.has(name)) {
      return ctx.scoping.public.set(name, value);
    }
    if (ctx.scoping.parent.scoping) {
      return self.assignmentExpression(name, value, ctx.scoping.parent);
    }

    throw `Identifier '${name}' is not defined`;
  }

  declarationExpression({
    type,
    name,
    value
  }) {
    const self = this;
    if (self.context.scoping.let.has(name)) {
      throw `Identifier '${name}' has already been declared`;
    }
    self.context.scoping.let.set(name, value);
    return value;
  }

  identifier(name, ctx = this.context) {
    const self = this;
    if (ctx.scoping.let.has(name)) {
      return ctx.scoping.let.get(name);
    }
    if (ctx.scoping.private.has(name)) {
      return ctx.scoping.private.get(name);
    }
    if (ctx.scoping.protected.has(name)) {
      return ctx.scoping.protected.get(name);
    }
    if (ctx.scoping.public.has(name)) {
      return ctx.scoping.public.get(name);
    }
    if (ctx.scoping.parent.scoping) {
      return self.identifier(name, ctx.scoping.parent);
    }

    throw `Identifier '${name}' is not defined`;
  }

  createScope(f) {
    return f;
  }

  invokeExpression(f, args) {
    this.newChildContext();
    let result = f(args);
    this.setParentContext();
    return result;
  }
}
const scope = new Scope({});
module.exports = scope.invokeExpression(scope.createScope((args = []) => {

  return scope.xmlExpression("foo", {}, scope.xmlExpression("bar", {}, "hello"));

}), []);