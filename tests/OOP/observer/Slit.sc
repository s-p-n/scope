return (Observer: "") {
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
