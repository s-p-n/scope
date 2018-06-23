"use strict";

const ScopeApi = {
  print(value) {
    console.log(...value);
  }
};

class Scope {
  constructor(context) {
    const self = this;
    this.root = context;
    this.parent = context;
    this.context = context;
    context.scoping = {
      let: new Map(),
      private: new Map(),
      protected: new Map(),
      public: new Map()
    };
    this.newChildContext = () => {
      self.parent = self.context;
      let newContext = {
        scoping: {
          let: new Map(),
          private: new Map(),
          protected: new Map(),
          public: new Map()
        }
      };
      newContext.args = [];
      self.context = newContext;
    };

    this.setParentContext = () => {
      self.context = self.parent;
    };
    let h = require("hyperscript");
    this.xmlExpression = (tag, attr, ...children) => {
      let node = h(tag, attr, ...children);
      node.toString = () => {
        return node.outerHTML;
      };
      return node;
    };
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

  identifier(name) {
    const self = this;
    if (self.context.scoping.let.has(name)) {
      return self.context.scoping.let.get(name);
    }
    if (self.context.scoping.private.has(name)) {
      return self.context.scoping.private.get(name);
    }
    if (self.context.scoping.protected.has(name)) {
      return self.context.scoping.protected.get(name);
    }
    if (self.context.scoping.public.has(name)) {
      return self.context.scoping.public.get(name);
    }
    throw `Identifier '${name}' is not defined`;
  }

  createScope(f) {
    return f;
  }

  invokeExpression(f, args) {
    return f(args);
  }
}
const scope = new Scope({});
scope.invokeExpression(scope.createScope((args = []) => {
  scope.newChildContext();

  scope.declarationExpression({
    type: "let",
    name: "foo",
    value: scope.createScope((args = [{
      key: "greeting",
      value: "hello"
    }, {
      key: "name",
      value: "scope"
    }]) => {
      scope.newChildContext();
      scope.declarationExpression({
        type: "let",
        name: "greeting",
        value: args[0] === undefined ? "hello" : args[0]
      });
      scope.declarationExpression({
        type: "let",
        name: "name",
        value: args[1] === undefined ? "scope" : args[1]
      });
      scope.invokeExpression(ScopeApi.print, [scope.identifier("greeting"), scope.identifier("name")]);

      scope.setParentContext();
    })
  });
  scope.invokeExpression(scope.identifier("foo"), []);
  scope.invokeExpression(scope.identifier("foo"), ["testing"]);
  scope.invokeExpression(scope.identifier("foo"), ["test", "passed"]);

  scope.setParentContext();
}), [])