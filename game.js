const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
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

