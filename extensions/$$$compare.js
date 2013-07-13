var $$$compare = function $$$compare (a, b) {
    if ((typeof a) !== (typeof b)) {
        return false;
    }

    var equals = function(x) {
        var p;
        for(p in this) {
          if(typeof(x[p])=='undefined') {return false;}
          if (this[p]) {
              switch(typeof(this[p])) {
                  case 'object':
                      if (!equals.call(this[p], x[p])) { return false; }
                  break;
                  case 'function':
                      if (typeof(x[p])=='undefined' ||
                          (p != 'equals' && this[p].toString() != x[p].toString()))
                          return false;
                      break;
                  default:
                      if (this[p] !== x[p]) { return false; }
              }
          } else if (x[p]) {
              return false;
          }
        }

        for(p in x) {
          if(typeof(this[p])=='undefined') {return false;}
        }

        return true;
    }

    return (typeof a === 'object') ? equals.call(a, b) : a === b;
}

console.log($$$compare({ e: [ 1, 2, 3, 4, 5 ] }, { e: [ 1, 2, 3, 4, 5 ] }));
