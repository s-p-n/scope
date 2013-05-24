module.exports = function termList (set, more) {
    if (more === void 0) {
        return 'obj'+set;//"obj"+set+",length:1"
    } else {
        return set + ',' + more; //+ ",length:"+(1+Number(set.substr(set.lastIndexOf(':')+1 ,set.length)));
    }
}
