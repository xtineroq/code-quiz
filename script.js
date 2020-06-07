$(document).ready(function() {

    //Elements declaration
    var qcIndex = 0;
    var timer = 50;
    var clock;

    // sound effects
    var soundRight = new Audio("assets/right-sound.wav");
    var soundWrong = new Audio("assets/wrong-sound.wav");

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

    function showHighScores() {

        var highScores = window.localStorage.getItem("userScore");
        [].slice.call(highScores).sort(function(hsa, hsb) {
            return (hsb.highScores - hsa.highScores);
        });

            if (highScores !== null) {
                highScores = JSON.parse(highScores);
            } else {
                highScores = [];
            }
        
        for (var i = 0; i < highScores.length; i++) {
            var highScores = highScores[i];
            $("#highScores").append($("<li>").text(highScores.initials + " : " + highScores.score));
        }

    }

    // Save user initials and score
    var saveScore = function() {

        var userInitials = $("#userInit").val().trim();

        // Validate input
        if (userInitials !== "") {

            var newHighScore = {score: timer, initials: userInitials};

            var highScores = window.localStorage.getItem('userScore');

            if (highScores !== null) {
                highScores = JSON.parse(highScores);
            } else {
                highScores = [];
            }

            highScores.push(newHighScore);

            window.localStorage.setItem("userScore", JSON.stringify(highScores));

            $("#userInit").val("");
        
            window.location.href = "highscores.html";

            showHighScores();

        } else {
            $("#userInit").attr("placeholder", "Please enter initials");
        }
    }

    
      
    $("#clearHS").on("click", function clearSavedScores(e) {
        e.preventDefault();
        window.localStorage.removeItem("highScores");
        window.location.reload();
    });
      
    // run when page loads
    showHighScores();
       
      
});