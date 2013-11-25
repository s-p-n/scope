return {
    private positions = [];
    public pass = (slits: []) {
        var observers = false;
        for slit in slits:
            if slit.observed:
                observers = true;
            end;
        end;

        if observers:
            var pickSlit = Math.random(0, Array.length(slits) - 1);
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
        var position = Array.random(positions);
        parent.positions = [position];
        return position;
    };
};
