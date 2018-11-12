const comments = false;
const presets = [
	["@babel/env", {
		targets: {
			edge: "12",
			firefox: "42",
			chrome: "49",
			safari: "10"
		},
		useBuiltIns: "usage"
	}],
	["minify", {builtIns: false}]
];
const plugins = [
];
module.exports = { comments, presets, plugins };