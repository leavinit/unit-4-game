// character class : stats is an object containing the battle powers for each character

class player {
    constructor(name,imgFile, stats){
        this.charName = name;
        this.charImage = imgFile;
        this.charAP = stats.AP;
        this.charHP = stats.HP;
        this.charBaseHP = stats.HP;
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
    charBaseHP = "";
    // Character Display Function (Shows images in characterList Div for player to select)
    display = function(){
        //Dyanmically add images
        
        $("#characterList")
        .append($('<img>',{id:this.charName,src:this.charImage,alt:this.charName}));
    
        $("#"+this.charName).css("position","relative")
            .wrap($('<div>',{class:"character", id:this.charName+"Div"}));
        $("#"+this.charName).css('border','solid 2px lime')
            .css('display','relative');

        //console.log("#"+this.charName+"Div");
        
        $("#"+this.charName+"Div").css("position","relative")
            .append(
                "<div class='nameTag'>"+
                    "<div>"+this.charName+"</div>"+
                    "<div class='hpClass'>HP: "+this.charHP+"</div>"+
                "</div>");
        
        // $(".hpClass").text(this.charHP-20);
        $(".nameTag")
            .css("text-align","center").css("position","absolute")
            .css("top","60px").css("margin","auto")
            .css("left","14%")
            .css("padding","2px 3%").css("color","white")
            .css("background-color","gray").css("opacity",".75")
            .css("border","1px solid white");
    };
}

function startGame(){
    // Create the players
    var Boba_Fett  = new player(
        "Boba_Fett",
        "assets/images/boba_fett.jpg",
        {AP:20,HP:100,CAP:10}
    );
    var Jabba_the_Hutt  = new player(
        "Jabba_the_Hutt",
        "assets/images/jabba-the-hutt.jpeg",
        {AP:18,HP:200,CAP:5}
    );
    var Lando_Calrissian = new player(
        "Lando_Calrissian",
        "assets/images/lando.jpeg",
        {AP:15,HP:300,CAP:20}
    );
    var Yoda = new player(
        "Yoda",
        "assets/images/yoda.jpg",
        {AP:8,HP:150,CAP:15}
    );
    return [Boba_Fett,Jabba_the_Hutt,Lando_Calrissian,Yoda];
}

var characters = startGame();



//Event Listeners

var charSelected = false;
var enemySelected = false;
var charId;
var selectedId;


$(".character > img").click(function(){
    if (!charSelected){
        console.log("image clicked");
        charId = $(this).attr("id");
        $(this).css("border","solid 2px red");
        enemies = $(this).parent().siblings()
        enemies.css("display","None");
        $("#enemiesList").html(enemies);
        enemies.css("display","block").addClass("enemyCharacter");
        charSelected = true;
        
    }
    
    $(".enemyCharacter > img").click(function(){
        if (charSelected && !enemySelected){
            selectedId = $(this).attr("id");
            enemySelected = true;

            console.log("clicked");
            otherEnemies = $(this).parent().siblings();
            otherEnemies.children().css("border" , "solid 2px black");
            selectedEnemy = $(this).parent();
            
            selectedEnemy.hide();
            
            $("#defenderSection").html(selectedEnemy);
            selectedEnemy.show().addClass("selectedEnemy");
            // temp = selectedEnemy.find("img");
            
            console.log("enemy selected was:  " + selectedId);
            console.log("character selected was:  " + charId);

        }
    });
    
    $("#fightButton").click(function(evt){
        evt.stopImmediatePropagation();
        if (charSelected && enemySelected){
            
//          myArray.find(x => x.id === '45').foo;
            // console.log(characters.find(x => x.charName === charId));
            // console.log(characters.find(x => x.charName === selectedId));
            var attacker = characters.find(x => x.charName === charId);
            var defender = characters.find(x => x.charName === selectedId)
            
            //Adjust stats upon attack
            defender.charHP -= attacker.charAP;
            attacker.charAP += attacker.charBaseHP;
            attacker.charHP -= defender.charCAP;

            //If defender hp < 0, eliminate that defender and restart playing
            if (defender.charHP <= 0){
                console.log("defender died: " + selectedId);
                diedMsg = "<div>"+ selectedId+ " died: Well Done!</div>";
                $("#statusSection").html(diedMsg);
                $("#"+selectedId+"Div").hide();
                $("#characterList").append($("#enemiesList").children());
                $(".character > img").css("border","solid 2px lime");
                
                //TO DO:  UPDATE CHARACTER LIST
                //characters.splice( ,1) //gotta find the index of the dead enemy
                // $("#characterList > img").css("border","solid 2x lime");
            }
            //If character hp < 0, game over and reset the game
            else if (attacker.charHP <= 0){
                console.log("attacker died" + charId);
                console.log("You Lose. Try Again.")
                charSelected = false;
                enemySelected = false;
                // charId = "";
                // selectedId="";
                $("#characterList").empty();
                msg = "<div>You Lose. Try again!</div>"
                $("#statusSection").html(msg);
                $('#defenderSection').empty();
                $("#enemiesList").empty();
                // $("#fightButton").off();  //turns off button click events
                attacker = "";
                defender = "";
                characters = startGame();
                // location.reload();
                //TO DO: FIX GAME RELOAD
            }
            else {
                //Update status section div
                attackerStatus = $("<div>").text(charId + "'s new hp is "+ attacker.charHP);
                defenderStatus = $("<div>").text(selectedId  + "'s new hp is "+ defender.charHP);
                statusDiv = $("<div>").append(attackerStatus).append(defenderStatus);
                $("#statusSection").html(statusDiv);
                console.log(charId + "'s new hp is "+ attacker.charHP);
                console.log(selectedId + "'s new hp is "+ defender.charHP);
            }
        }
        
        
    });
});

//GAME UNFINISHED. HIT MAJOR ROADBLOCKS TRYING TO RESTART THE GAME :(
