var $compare = function () {
  var equals = function(a, b) {
    var p;
    if (typeof a.$types !== "undefined") {
      //console.log("equals is a scope primitive:", a, b);
      return $compare(a, b).$values["Boolean"]();
    }
    //console.log("equals is a JS primitive:", a, b);
    if (typeof a !== "object") {
      return a === b;
    }
    for(p in a) {
      if(typeof(b[p])=='undefined') {return false;}
      if (a[p]) {
        switch(typeof(a[p])) {
          case 'object':
            if (!equals(a[p], b[p])) {
              return false;
            }
            break;
          case 'function':
            if (typeof(b[p])=='undefined' ||
              (p != 'equals' && (a[p].toString() != b[p].toString() ||
                a[p].unbind().toString() != b[p].unbind().toString()
              )
              )) {
              return false;
            }
            //console.log("func:", a[p].unbind().toString() != b[p].unbind().toString())
            break;
          default:
            if (a[p] !== b[p]) {
              return false;
            }
      }} else if (b[p]) {
        return false;
    }}
    for(p in b) {
      if(typeof(a[p])=='undefined') {
        return false;
    }}
    return true;
  };
  return function $compare (a, b) {
    var i, j, c, result = true;
    if (a.$types.length > b.$types.length) {
      c = a;
      a = b;
      b = a;
    }
    //console.log("$compare:")
    //Console.$values["Instance"]().write.$values["Scope"]()(a);
    //Console.$values["Instance"]().write.$values["Scope"]()(b);
    for (i = 0; i < a.$types.length; i += 1) {
      if (b.$types.indexOf(a.$types[i]) > -1 &&
          equals(a.$values[a.$types[i]](), b.$values[a.$types[i]]())
        ) {
        //console.log("Got true");
        continue;
      }
      //console.log("Got false");
      result = false;
      break;
    }
    //console.log("Returning", result);


    return $primitive("Boolean", function (val) {
      return function () {
        return val;
    }}(result)
)}}();
