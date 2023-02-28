function *generatorFunction() {
    console.log("Generator function is running!");

    let x = 5;
    yield x;

    x++;
    y = yield x;
    x += y;

    z = yield x;

    return x+y+z;
}

let iterator = generatorFunction();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next(10));
console.log(iterator.next(12));
