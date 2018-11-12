let arr = [1] + 2; // [1, 2]
arr += 3; // [1, 2, 3]
let newArr = arr + 4;



let arr2 = [1, 2]; // new Array/
arr2[] = 3; // Add 3 to reference.
let newArr2 = arr2 <& 4; // set newArr2 to (add 4 to arr2 reference (returns the reference))
newArr2[] = 5; // Add 5 to reference in newArr2- which is arr2.

print(arr2);    // 1, 2, 3, 4, 5
print(newArr2); // 1, 2, 3, 4, 5



return [arr, newArr, arr2, newArr2];