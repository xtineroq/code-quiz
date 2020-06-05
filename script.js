$(document).ready(function() {

    //Elements declaration
    var quizChoices = $("#qChoices");
    var qcIndex = 0;


    // Start button function
    $("#startBtn").on("click", function quizStart() {

        $("#main-screen").addClass("hide");

        $("#qContainer").removeClass("hide");
    
        showQuestions();

    });

    // Fetch questions and choices function
    function showQuestions() {

        $("#qTitle").html(questionsArr[qcIndex].question);

        quizChoices.html("");

        questionsArr[qcIndex].choices.forEach(function(choice, i) {
            $("#qChoices").append("<div><button>" + choice + "</button></div>");
            $("#qChoices").click(revealAnswer);
        });

    }

    // Check if user's answer is correct
    function revealAnswer() {
       
    }
    
        
});