var Slit = (Observer: "") {
    print("Creating Slit");
    public open = true;
    public observed = false;
    if Type(Observer) has "Instance":
        observed = true;
    end;
    public objectPasses = (object: "") {
        if parent.observed:
            Observer.notify(object);
        end;
    };
};

var Electron = {
    private positions = [];
    public pass = (slits: []) {
        var observers = false;
        for i:slit in slits:
            Console.write("Observers:", slit.observed);
            if slit.observed:
                observers = true;
            end;
        end;
        if observers:
            var pickSlit = Math.random(0, List.length(slits) - 1);
            parent.positions &= [pickSlit];
            var slit = slits[pickSlit];
            slit.objectPasses(parent);
        else:
            var prev = 0;
            for i:slit in slits:
                parent.positions &= [i];
                if prev isnt 0:
                    parent.positions &= [prev + i];
                end;
                prev = i;
                slit.objectPasses(parent);
            end;
        end;
    };

    public getPosition = {
        var position = List.random(parent.positions);
        parent.positions = [position];
        return position;
    };
};
var observer = {
    public notify = (what: "") {
        print("Notification!");
        print(what);
    };
}();
var slits = [Slit(observer), Slit()];
var resultPositions = List(10);
var electron = ".";

Console.write("slit0  observed?", slits[0].observed);
for index:value in resultPositions:
    electron = Electron();
    electron.pass(slits);
    resultPositions[index] = electron.getPosition();
end;

Console.write(resultPositions);

