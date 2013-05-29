module.exports = function (extensions) {
    return {
        curParent: -1,
        parentId: -1,
        lastParent: [-1],
        simple: [],
        context: [],
        prevContext: [],
        contextDepth: 0,
        ext: extensions,
        codePrefix: '',
        codeSuffix: '',
        ast: null
    };
}
