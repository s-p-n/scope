module.exports = function (extensions) {
    return {
        curParent: -1,
        parentId: -1,
        lastParent: [],
        scopeId: 0,
        scopeList: [],
        simple: [],
        context: [],
        prevContext: [],
        contextDepth: 0,
        ext: extensions,
        codePrefix: '',
        codeSuffix: '',
        ast: null,
        defined_ids: [],
        termType: [],
        primitives: [],
        primStore: [],
        returns: [],
        returnStore: [],
        path: require('path'),
        fs: require('fs'),
        templates: {},
        loadTemplate: function loadTemplate (template_name, filter) {
            var template, key, val;
            var special_id = /(\$)/g;
            if (!this.templates[template_name]) {
                this.templates[template_name] = this.fs.readFileSync(
                    this.path.resolve(
                        __dirname, 
                        '../templates/' + template_name + '.txt'
                ), {"encoding": "utf8"});
            }
            template = this.templates[template_name];

            if (typeof filter !== "object") {
                return template;
            }

            for (key in filter) {
                if (!filter.hasOwnProperty(key)) {
                    continue;
                }
                val = filter[key].toString().replace(special_id, '[[SPECIAL]]');
                key = new RegExp('\\%' + key + '\\%', 'g');
                template = template.replace(key, val).replace(/\[\[SPECIAL\]\]/g, '$$');

            }
            return template; 
        }
    };
}
