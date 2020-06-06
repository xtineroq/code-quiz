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

        loopQuestions.choices.forEach(function(choice) {
            $(".qChoices").append("<div><button>" + choice + "</button></div>");
            $(".qChoices").click(revealAnswer);
        });

    }

    // Check if user's answer is correct
    function revealAnswer() {

        // Compare user answer vs result
        if ($(this).val() !== questionsArr[qcIndex].answer) {

            timer -= 10;
            if (timer < 0) {
            timer = 0;
            }

            $("#time").text = timer;

            $("#result").text("Wrong!");

        } else {
            $("#result").text("Correct!");
        }

        $("#result").addClass("result");
        setTimeout(function() {
            $("#result").addClass("result hide");
        }, 1000);

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


});