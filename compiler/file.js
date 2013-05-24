module.exports = function (args) {
    var hasSlash;
    return process.cwd() + '/' + (args[3] ||
        (
            ((hasSlash = args[2].lastIndexOf('/')) === -1) ?
            args[2] :
            (args[2].substr(
                hasSlash + 1,
                args[2].length - 1
            ))
        ).replace('.sc','.js'));
};
