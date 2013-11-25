
var Add = (a: 0, b: 0) {
    return Text: a & b;
    return a + b;
}
var Add = (
    a Number: 0 or
    Text: "" or (
        Number: 0 and
        Text: ""
    ), b like a) {
    if compatible(a, b):
        if Types( a) has "Number":
            return Number: a + b;
        end;
        if Types( a) has "Text":
            return Text: a & b;
        end;
    end;
};

Add becomes Scope accepting a as Number and b as Number performing
    return of addition of a and b.
or (a as "" and b as "" performing
    return concatination of a and b).



var Apple = Scope.extend(Fruit, {
    public color = Color("red");
    public shape = Shape("roundish");
    ...

    return Color: color;
    return Shape: shape;
});

var Color = (textual: "white", hex: Hexadecimal, rgb: [256, 256, 256]) {..}
