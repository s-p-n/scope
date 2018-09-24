let list = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
let nodeList = each(list, (val: '') {
	return <li>val;</li>;
});
let result = <ul>nodeList;</ul>;

return result;