var buttoncolors=["red","yellow","blue","green"];

var gamepattern=[];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour)
    animatepress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

  if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");


    if (userClickedPattern.length === gamepattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

  
    startOver();
  }

}


function nextSequence(){
  userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);
   var randomnumber=Math.floor(Math.random()*4);
   var randomchosencolor=buttoncolors[randomnumber];
    gamepattern.push(randomchosencolor);

    $("#" + randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);

 
    playSound(randomchosencolor);

}
function playSound(name) {


    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatepress(currentcolor){
    $("#" + currentcolor).addClass("pressed");
    setTimeout(()=>{
        $("#" + currentcolor).removeClass("pressed");
    },100);
  }
  function startOver() {

    
    level = 0;
    gamepattern = [];
    started = false;
  }
  