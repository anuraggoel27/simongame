var userClickedPattern=[];
var level=-1;
var gamePattern=[];
var count=0;
var buttonColours=["red","blue","green","yellow"];




function nextSequence()
{
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+ level);
    
}

////////////// USER CLICK
$("[type]").click(function(event){
       var userChosenColour=this.id;
       playSound(userChosenColour);
       userClickedPattern.push(userChosenColour);
       animatePress(this.id);
       check(userClickedPattern.length-1);
})



//////////////   PLAY SOUND
function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}



//////////////  ANIMATION
function animatePress(currentColour)
{
    $("."+currentColour).addClass("pressed");
    
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}




////////////   STARTING THE GAME
$("body").keydown(function()
{
    if(count===0)
    {
    nextSequence();
    $("h1").text("Level 0");
    count++;
    }
    
});





/////////// CHECK
 function check(currentLevel)
 {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
    
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);

        }
    }
    else
    {
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);
        var audio1=new Audio('sounds/wrong.mp3');
        audio1.play();
        $("h1").text("Game over,Press any key to restart the game");
        startOver();
    }
}   



function startOver()
{
    level=-1;
    gamePattern=[];
    count=0;
}