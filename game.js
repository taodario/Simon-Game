const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("h1").text("Level " + level);
    level++;
    userClickedPattern = []; // reset array
}

$(".btn").on('click', function() {
    handlerFunctionOnClick(this);
})

function handlerFunctionOnClick(element) {
    let userChosenColor = $(element).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var indexOfLastAnswer = userClickedPattern.length - 1;
    checkAnswer(level, indexOfLastAnswer);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

async function animatePress(userChosenColor) {
    $("#" + userChosenColor).addClass("pressed");
    
    setTimeout(function() {
        $("#" + userChosenColor).removeClass("pressed");
    }, 100)
}

$(document).on('keypress', function() {
    if (!started) {
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel, indexOfLastAnswer) {
    if (userClickedPattern[indexOfLastAnswer] === gamePattern[indexOfLastAnswer]) {
        console.log("success");

        if (indexOfLastAnswer === gamePattern.length - 1) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    } else {
        console.log("wrong");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();    
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}