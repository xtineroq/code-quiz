$(document).ready(function() {

    //Elements declaration
    var qcIndex = 0;
    var timer = 50;
    var clock;

    // sound effects
    var soundRight = new Audio("assets/right-sound.wav");
    var soundWrong = new Audio("assets/wrong-sound.wav");

    // Existing highscores
    var highScores = {};
    if( localStorage.getItem("highScores") ){
        highScores = JSON.parse(localStorage.getItem("highScores"));
    }

    var userId = 1;
    if( localStorage.getItem("userId")) {
        playerId = parseInt(localStorage.getItem("userId")) + 1;
    }
    localStorage.setItem("userId", userId);

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

        $("#qTitle").text(questionsArr[qcIndex].question);
        $("#qChoices").text("");

        questionsArr[qcIndex].choices.forEach(function(selection) {
            $("#qChoices").append("<div><button>" + selection + "</button></div>")
        });
        $(".qChoices").click(revealAnswer);
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

        $(".result").removeClass("hide");
        setTimeout(function() {
            $(".result").addClass("hide");
        }, 500);

        // Check if we still have questions
        if (qcIndex === questionsArr.length) {
            quizComplete();
        }

        // Next question
        qcIndex++;
        showQuestions();
    }

    // End of Quiz
    function quizComplete() {
        clearInterval(clock);
        $("#endQuiz").removeClass("hide");
        $("#fScore").text(timer);
        $("#qContainer").addClass("hide");
    }

    // Save user initials and scores
    $("#submitBtn").on("click", function saveScore(e) {
        e.preventDefault();

        var userInitials = $("#userInit").val().trim();
      
        if (userInitials === "") {
            $("#userInit").attr("placeholder", "Please enter initials")
        } else {
          highScores[userId] = {id: userId, score: time, userInitials: userInitials};
          localStorage.setItem("highScores", JSON.stringify(highScores));
      
          showHighScores();
        }
    });

    // If the user pressed enter to save
     $("#userInit").keyup(function enterKey(event) {
         if (event.key === "Enter") {
           saveScore();
         }
     });

     function showHighScores() {
      
          highScores.sort(function(x, y) {
            return x.hScore - y.hScore;
          });
      
          highScores.forEach(function(hScore) {
            var scoreList = $("#highScores").text("<li>" + hScore.initials + " : " + hScore.hScore + "</li>");
            $("#highScores").append(scoreList);
          });
       }
      
       $("#clearHS").on("click", function clearSavedScores() {
         localStorage.removeItem("highScores");
         window.location.reload();
       });
      
     showHighScores();
});