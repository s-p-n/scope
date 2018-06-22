"use strict";

const ScopeApi = {
  print(value) {
    console.log(value);
  }
};

class Scope {
  constructor(context) {
    this.root = context;
    this.parent = context;
    this.context = context;
    context.scoping = {
      let: new Map(),
      private: new Map(),
      protected: new Map(),
      public: new Map()
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

  invokeExpression(f, args) {
    return f(...args);
  }
}
const scope = new Scope({});
scope.declarationExpression({
  type: "let",
  name: "foo",
  value: "Hello, \nmultiline\nstring!"
});
scope.declarationExpression({
  type: "let",
  name: "bar",
  value: true
});
scope.declarationExpression({
  type: "let",
  name: "baz",
  value: scope.declarationExpression({
    type: "let",
    name: "qux",
    value: 101
  })
});
scope.invokeExpression(ScopeApi.print, [scope.identifier("foo") + "kk"]);