class Benchmark {
	constructor () {
		this.benchmarks = {};
	}

	start (name) {
		this.benchmarks[name] = {
			start: Date.now(),
			end: NaN,
			difference: NaN
		}
	}

	end (name) {
		this.benchmarks[name].end = Date.now();
		this.benchmarks[name].difference = this.benchmarks[name].end - this.benchmarks[name].start;
	}

	report () {
		for (let name in this.benchmarks) {
			console.log(name, this.benchmarks[name].difference + "ms");
		}
	}
}

let mapSize = 1000000;

let m = new Map();

let b = new Benchmark();

function initMap () {
	let arr = [];
	for (let i = 0; i < mapSize; i += 1) {
		arr.push([i, i + 1]);
	}
	m = new Map(arr);
}

function iterDeletion (id) {
	let map = m;
	if (map.delete(id)) {
		if (id === map.size) {
			//console.log("fast delete");
			return true;
		}
		//console.log("renumber map");
		let i = 0;
		let stop = map.size + 0;
		for (let i = id; i < stop; i += 1) {
			//console.log(map);
			let val = map.get(i + 1);
			map.delete(i + 1);
			map.set(i, val);
		}
		return true;
	} else {
		return false;
	}
}

function newDeletion (id) {
	let map = m;
	let newArr = new Array(map.size - 1);
	if (m.delete(id)) {
		let i = 0;
		for (let [key, val] of m) {
			newArr[i] = [i, val];
			i += 1;
		}
		m = new Map(newArr);
	} else {
		return false;
	}
}

function runBenchmarks(id) {

	b.start(`${id}: init map`);
	initMap();
	b.end(`${id}: init map`);

	//console.log(m.size);

	b.start(`${id}: set 500,000th index`);
	m.set(500000, `${id}: apple`);
	b.end(`${id}: set 500,000th index`);

	//console.log(m.size);

	b.start(`${id}: get 500,000th index`);
	m.get(500000);
	b.end(`${id}: get 500,000th index`);

	//console.log(m.size);

	b.start(`${id}: iterDeletion(0)`);
	iterDeletion(0);
	b.end(`${id}: iterDeletion(0)`);

	//console.log(m.size);

	b.start(`${id}: newDeletion(0)`);
	newDeletion(0);
	b.end(`${id}: newDeletion(0)`);

	//console.log(m.size);

	b.start(`${id}: iterDeletion(500000)`);
	iterDeletion(500000);
	b.end(`${id}: iterDeletion(500000)`);

	//console.log(m.size);

	b.start(`${id}: newDeletion(500000)`);
	newDeletion(500000);
	b.end(`${id}: newDeletion(500000)`);

	//console.log(m.size);

	b.start(`${id}: iterDeletion(999995)`);
	iterDeletion(999995);
	b.end(`${id}: iterDeletion(999995)`);

	//console.log(m.size);

	b.start(`${id}: newDeletion(999994)`);
	newDeletion(999994);
	b.end(`${id}: newDeletion(999994)`);

	//console.log(m.size);
}

function findWhenNewSlowerThanInit () {
	let step = 10000;
	initMap();
	for (let i = 0; i < mapSize; i += step) {
		console.log(`${i}: map size: ${m.size}`);
		b.start('new' + i);
		newDeletion(i);
		b.end('new' + i);
		b.start('iter' + i);
		iterDeletion(i);
		b.end('iter' + i);
		if (b.benchmarks['new' + i].difference > b.benchmarks['iter' + i].difference) {
			console.log("iter faster than new at", i);
			return i;
		} else {
			console.log(`new faster by ${b.benchmarks['iter' + i].difference - b.benchmarks['new' + i].difference}ms`);
		}
	}
}
let results = [];
for (let i = 0; i < 10; i += 1) {
	console.log("Running benchmark:", i);
	results.push(findWhenNewSlowerThanInit());
}


b.report();
console.log(results);