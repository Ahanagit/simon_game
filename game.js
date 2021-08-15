var buttonColors=["green","red","yellow","blue"];

var gamePattern=[];

var userClickedPattern=[];
var started=false;

var level=0;

$(document).keypress(function(){
  if (!started){
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];

  level++;

  $("#level-title").text("level "+level);

  var randomNumber=Math.floor(Math.random()*4);

  var randomChosenColor=buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed")
  },100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    console.log("Wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){

      $("body").removeClass("game-over")

    },200);

    $("#level-title").text("Game over,Press Any Key To Restart");

    startOver();

  }
}
function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}
