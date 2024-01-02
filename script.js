const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
started = false;

let colors = () => {
    let random = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[random];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeOut(200).fadeIn(200);

    colorSound = new Audio(`sounds/${randomChosenColor}.mp3`);
    colorSound.play();
    level++;
};

$(".btn").on("click", (e) => {
    userChosenColor = $(e.target).attr("id");
    userClickedPattern.push(userChosenColor);
    colorSound = new Audio(`sounds/${userChosenColor}.mp3`);
    colorSound.play();
    $(e.target).addClass("pressed");
    setTimeout(() => [$(e.target).removeClass("pressed")], 100);
    checkAnswer(userClickedPattern.length - 1);
});
$(document).on("keypress", () => {
    if (!started) {
        colors();
        $("h1").text(`Level ${level}`);
        started = true;
    }
});

let checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                colors();
                $("h1").text(`Level ${level}`);
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        wrong = new Audio(`sounds/wrong.mp3`);
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(() => [$("body").removeClass("game-over")], 200);
        $("h1").text(`Game Over, Press Any Key to Restart`);
        startOver();
    }
};
let startOver = () => {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
};