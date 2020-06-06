$(document).ready(function() {

    //Elements declaration
    var qcIndex = 0;
    var timer = questionsArr.length * 10;
    var clock;


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

        var loopQuestions = questionsArr[qcIndex];

        $("#qTitle").html(loopQuestions.question);
        $("#qChoices").html("");

        loopQuestions.choices.forEach(function(selection) {
            $(".qChoices").append("<div><button>" + selection + "</button></div>")
            $(".qChoices").click(revealAnswer);
        });

    }

    // Check if user's answer is correct
    function revealAnswer() {

        // Compare user answer vs result
        if (typeof $(this)[qcIndex] !== questionsArr[qcIndex].answer) {

            timer -= 10;
            if (timer < 0) {
            timer = 0;
            }

            $("#time").text = timer;

            $("#result").text("Wrong!");

        } else {
            $("#result").text("Correct!");
        }

        $(".result").removeClass("hide");
        setTimeout(function() {
            $(".result").addClass("hide");
        }, 500);

        // Next question
        qcIndex++;

        // Check if we still have questions
        if (qcIndex === questionsArr.length) {
            quizComplete();
        } else {
            showQuestions();
        }

    }

    // End of Quiz
    function quizComplete() {
        clearInterval(clock);
        $("#endQuiz").removeClass("hide");
        $("#fScore").text(timer);
        $("#qContainer").addClass("hide");
    }
    
    // Countdown timer
    function countdown() {
        timer--;
        $("#time").text(timer);
      
        if (timer <= 0) {
          quizComplete();
        }
    }

    // Save user initials and scores
    $("#submitBtn").on("click", function saveScore() {
        var userInitials = $("#userInit").val().trim();
      
        if (userInitials === null) {
            $("#userInit").attr("placeholder", "Please enter your initials")
        } else {
          var highScores = JSON.parse(window.localStorage.getItem("highscores")) || [];
      
          var userScore = {
            score: time,
            userInitials: userInitials
          };
      
          highScores.push(userScore);
          window.localStorage.setItem("highscores", JSON.stringify(highScores));
      
          window.location.href = "highscores.html";
        }
    });

    // If the user pressed enter to save
    $("#userInit").keyup(function enterKey(event) {
        if (event.key === "Enter") {
          saveScore();
        }
    });

    function showHighScores() {
        var userHighScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
      
        userHighScores.sort(function(x, y) {
          return x.hScore - y.hScore;
        });
      
        userHighScores.forEach(function(hScore) {
          var scoreList = $("#highScores").text("<li>" + hScore.initials + " : " + hScore.hScore + "</li>");
          $("#highScores").append(scoreList);
        });
      }
      
      $("#clearHS").on("click", function clearSavedScores() {
        window.localStorage.removeItem("highScores");
        window.location.reload();
      });
      
      showHighScores();
});