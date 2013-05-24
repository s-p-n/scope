var fs = require('fs');
module.exports = function extensions(data) {
    var extensionsDir = __dirname + '/../extensions/',
    notLoaded = [],
    extContainer = {};
   fs.readdirSync(extensionsDir).forEach(function(fileName) {
        if (fileName.indexOf('.js') === -1) {
            return;
        }
        var extName = fileName.substr(0,fileName.indexOf('.'));
        notLoaded.push(extName);
        extContainer[extName] = function() {
            if (notLoaded.indexOf(extName) !== -1) // not data.loaded
            {
                if (fs.existsSync(extensionsDir + extName + '.node')) {
                    data.deps.push(extensionsDir + extName + '.node');
                }
                data.loaded += fs.readFileSync(extensionsDir + extName + '.js', 'utf8');
                notLoaded.splice(notLoaded.indexOf(extName), 1);
            };
            return extName;
        };
    });
    return extContainer;
};
