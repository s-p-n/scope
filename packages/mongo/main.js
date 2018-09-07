module.exports = require("mongojs");
/*
let priv = new WeakMap();

mongojs.get = function (id) {
	return this[id];
}

let collectionPrototype = {
	aggregate: function (pipeline, callback) {},
	count: function (query, callback) {},
	createIndex: function (keys, options, callback) {},
	distinct: function (field, query, callback) {},
	drop: function (callback) {},
	dropIndex: function (index, callback) {},
	ensureIndex: function (keys, options, callback) {},
	find: function (criteria, projection, callback) {},
	findOne: function (criteria, projection, callback) {},
	findAndModify: function (document, callback) {},
	getIndexes: function (callback) {},
	group: function (document, callback) {},
	insert: function (docOrDocs, callback) {},
	isCapped: function (callback) {},
	mapReduce: function (map, reduce, options, callback) {},
	reIndex: function (callback) {},
	remove: function (query, justOne, callback) {},
	runCommand: function (command, callback) {},
	save: function (doc, callback) {},
	stats: function (callback) {},
	update: function (query, update, options, callback) {}
};

let cursorPrototype = {
	batchSize: function (size, callback) {},
	count: function (callback) {},
	explain: function (callback) {},
	forEach: function (func) {},
	limit: function (n, callback) {},
	map: function (func, callback) {},
	next: function (callback) {},
	skip: function (callback) {},
	sort: function (options, callback) {},
	inArray: function (callback) {}
};


class Mongo {
	constructor (...args) {
		let db = mongojs(...args);
		let self = this;
		priv.set(this, Object.create(null));
		priv.get(this).db = db;

		db.get = function (id) {
			return db[id];
		}
		this.get = function get (collection) {
			let db = priv.get(self).db;
			let col = null;
			if (collection in db) {
				col = db[collection];
			} else {
				col = db.collection(collection);
			}
			if (!col.get) {
				col.get = function (id) {
					return col[id];
				}
			}
			return col;
		}
	}

	
}

let db = new Mongo("scopeUser:abc123@scope");
//let users = db.get('users');
console.log(db.get('users').get('insert')());

*/