var alex = Alcoholic("Alex", 0);
var ankleBracelet = ankleBraceletObserver();
alex.attach(ankleBracelet);


alex.drink("beer");
alex.sleepItOff();

alex.drink("beer");
alex.drink("beer");
alex.sleepItOff();

alex.drink("shot");

print(ankleBracelet.data);
