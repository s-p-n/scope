let attr = [id: "realFoo", class: "foo bar", isReal: true];
let foo = <foo id="realFoo" ...attr class="big bold thing" />;
console.log(foo);