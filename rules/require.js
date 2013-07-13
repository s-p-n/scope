module.exports = function _require (file, name) {
    var p = process.argv[2];
    var code;
    p = './' + p.substr(0, p.lastIndexOf('/')+1);
    return this.loadTemplate('require', {
        name: name,
        code: this.compile(
            this.parse(
                require('fs').readFileSync(
                    p + file.replace(/"|'/g, ''),
                    "utf8"
                )
            )
        )
    });
}
