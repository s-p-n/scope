var Animal = (name: "") {
    protected move = (meters: 0) {
        print(parent.name, "moved", Text(meters) & "m.");
    };
};
var Snake = Scope.extend(Animal, {
    public move = {
        print("Slithering...");
        parent.extended.move(5);
    };
});

var Horse = Scope.extend(Animal, {
    public move = {
        print("Galloping...");
        parent.extended.move(45);
    };
});
/*
var Turtle = Scope.extend(Animal, {
    public move = (type: "") {
        var m = 0;
        if type is "swim":
            print("Swimming...");
            m = 10;
        else if (type is "walk"):
            print("Walking...");
            m = 2;
        else:
            print("Sitting still...");
        end;
        parent.extended.move(m);
    };
    public swim = {
        parent.move("swim");
    };
    public walk = {
        parent.move("walk");
    };
});
*/
/*
var blob = Animal("Blobby the Animal");
blob.move();
print('');
*/
var sam = Snake('Sammy the Python');
sam.move();
print('');

var tom = Horse('Tommy the Palomino');
tom.move();
print('');
/*
var tim = Turtle("Timmy the Turtle");
tim.move();
tim.move("swim"); // same as tim.swim()
tim.walk();
*/
/* @Expect:
Blobby the Animal moved 0m.

Slithering...
Sammy the Python moved 5m.

Galloping...
Tommy the Palomino moved 45m.

Sitting still...
Timmy the Turtle moved 0m.
Swimming...
Timmy the Turtle moved 10m.
Walking...
Timmy the Turtle moved 2m.
*/





