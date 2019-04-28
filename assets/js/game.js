// character class : stats is an object containing the battle powers for each character

class player {
    constructor(name,imgFile, stats){
        this.charName = name;
        this.charImage = imgFile;
        this.charAP = stats.AP;
        this.charHP = stats.HP;
        this.charCAP = stats.CAP;

    }
    
    // Character's Name
    charName = "";
    //Image file for each character
    charImage = "";
    //Character attributes (Attack Power, Heath Points, Counterattack Power)
    charAP = "";
    charHP = "";
    charCAP= "";

}

//Event Listeners



//Testing
player1  = new player(
    "Boba Fett",
    "assets/images/boba-fett.webp",
    {AP:10,HP:100,CAP:30}
);
console.log(player1.charCAP);