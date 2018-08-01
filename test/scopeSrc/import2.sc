let Scope = import "inc/scope.sc";
let s2 = import "inc/module.sc";
let s = Scope();

debug(s);
debug(s2);

return [s, s2];