var fs = require('fs');
module.exports = function (args, code, deps) {
    var i, f;
    var file = require('./file')(args);

    for (i in deps) {
        f = process.cwd() + deps[i].substr(deps[i].lastIndexOf('/'), deps[i].length);

        fs.writeFile(f, fs.readFileSync(deps[i]), function (err) {
            if (err) {
                console.log("Error loading dependency:", err);
            }
            console.log("wrote file:", f);
        });
    }

    fs.writeFileSync(file, "#!/usr/bin/env node\n" + code);

    fs.chmodSync(file, '0755');
    console.log("Compiled to " + file);
}
