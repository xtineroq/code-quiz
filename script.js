$(document).ready(function() {

    //Elements declaration
    var qcIndex = 0;
    var timer = 50;
    var clock;
    var score = 0;

    // sound effects
    var soundRight = new Audio("assets/right-sound.wav");
    var soundWrong = new Audio("assets/wrong-sound.wav");

    // Existing highscores
    var highScores = {};
    if( window.localStorage.getItem("hScores") ){
        highScores = JSON.parse(window.localStorage.getItem("hScores"));
    }

    var userId = 1;
    if( window.localStorage.getItem("userId")) {
        playerId = parseInt(window.localStorage.getItem("userId")) + 1;
    }
    window.localStorage.setItem("userId", userId);

    // Start button function
    $("#startBtn").on("click", function quizStart() {

        $("#main-screen").addClass("hide");
        $("#qContainer").removeClass("hide");

        //Timer
        clock = setInterval(countdown, 1000);
        $("#timer").text(timer);
    
        showQuestions();

    });

    // Fetch questions and choices function
    function showQuestions() {

        if (qcIndex < questionsArr.length) {
            $("#qTitle").text(questionsArr[qcIndex].question);
            $(".qChoices").text("");

            var storeChoices = questionsArr[qcIndex].choices;

            storeChoices.forEach(function(selection) {
                $(".qChoices").append("<button>" + selection + "</button>");
            });

        } else {
            quizComplete();
        }
        $("#qChoices").unbind('click');
        $("#qChoices").click(revealAnswer);
    }

    // Countdown timer
    function countdown() {
        timer--;
        $("#time").text(timer);
      
        if (timer <= 0) {
          quizComplete();
        }
    }

    // Check if user's answer is correct
    function revealAnswer(e) {
        // Compare user answer vs result
        var userAnswer = questionsArr[qcIndex].choices.indexOf(e.target.innerHTML);

        $(".result").removeClass("hide");
        setTimeout(function() {
            $(".result").addClass("hide");
        }, 500);

        $("#result").text("");

        if (userAnswer === questionsArr[qcIndex].answer) {
            soundRight.play();
            $("#result").text("Correct!");
            
        } else {
            timer -= 10;
            $("#time").text = timer;
            soundWrong.play();
            $("#result").text("Wrong!");
        }

        // Next question
        qcIndex++;
        setTimeout(showQuestions, 500);
    }

    // End of Quiz
    function quizComplete() {
        clearInterval(clock);
        $("#endQuiz").removeClass("hide");
        $("#fScore").text(timer);
        $("#qContainer").addClass("hide");
        
        $(document).on("click", "#submitBtn", function() {
            saveScore();
        });

        $("#userInit").keyup(function enterKey(event) {
            if (event.key === "Enter") {
            saveScore();
            }
        });
    }

    // Save user initials and score
    var saveScore = function() {

        var userInitials = $("#userInit").val();

        // Validate input
        if (userInitials !== "") {

            highScores[userId] = {id: userId, score: timer, initials: userInitials};
            window.localStorage.setItem("hScores", JSON.stringify(highScores));
        
            window.location.href = "highscores.html";

            showHighScores();

        } else {
            $("#userInit").attr("placeholder", "Please enter initials");
        }
    }

    function showHighScores() {

        var sortScores = Object.values(highScores).sort((x, y) => (x.score > by.score) ? -1 : 1);
        

        sortScores.forEach(function(hScore) {
            var scoreList = $("#highScores").text("<li>" + hScore.initials + " : " + hScore.hScore + "</li>");
            $("#highScores").append(scoreList);
        });

        $("#clearHS").on("click", function clearSavedScores() {
        window.localStorage.removeItem("hScores");
        window.location.reload();
        });
    }
      
       
      
});