module.exports = function (extensions) {
    return {
        curParent: -1,
        parentId: -1,
        lastParent: [-1],
        ext: extensions,
        codePrefix: '',
        codeSuffix: ''
    };
}
