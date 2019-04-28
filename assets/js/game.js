// character class : stats is an object containing the battle powers for each character

class player {
    constructor(name,imgFile, stats){
        this.charName = name;
        this.charImage = imgFile;
        this.charAP = stats.AP;
        this.charHP = stats.HP;
        this.charCAP = stats.CAP;
        this.display();
    }
    
    // Character's Name
    charName = "";
    //Image file for each character
    charImage = "";
    //Character attributes (Attack Power, Heath Points, Counterattack Power)
    charAP = "";
    charHP = "";
    charCAP= "";

    // Character Display Function (Shows images in characterList Div for player to select)
    display = function(){
        //Dyanmically add images
        
        $("#characterList")
        .append($('<img>',{id:this.charName,src:this.charImage,alt:this.charName}));
    
        $("#"+this.charName).wrap($('<div>',{class:"character"}));
        
    };
}

//Event Listeners



//Testing
boba  = new player(
    "Boba_Fett",
    "assets/images/boba_fett.jpg",
    {AP:10,HP:100,CAP:30}
);
jabba  = new player(
    "Jabba_the_Hutt",
    "assets/images/jabba-the-hutt.jpeg",
    {AP:10,HP:100,CAP:30}
);
lando  = new player(
    "Lando_Calrissian",
    "assets/images/lando.jpeg",
    {AP:10,HP:100,CAP:30}
);
yoda  = new player(
    "Yoda",
    "assets/images/yoda.jpg",
    {AP:10,HP:100,CAP:30}
);


// console.log(player1.charCAP);
// $('body').text(player1.charCAP);
// $('#characterList').prepend($('<img>',{id:player1.charName,src:player1.charImage}));
