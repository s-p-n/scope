module.exports = function _require (file, name) {
    var p = process.argv[2];
    var code;
    p = './' + p.substr(0, p.lastIndexOf('/')+1);
    code = "(function () {" +
        this.compile(
            this.parse(
                require('fs').readFileSync(
                    p + file.replace(/"|'/g, ''),
                    "utf8"
                )
            )
        ) +
        "}())";

    return "var " + name + "=" + code;

}
