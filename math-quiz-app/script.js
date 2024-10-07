let num1, num2;
let correctAnswers = 0;
let totalQuestions = 5;
let timeLeft = 10;
let timer;

function generateQuestion() {
    clearTimeout(timer); // Clear the timer if it's running
    timeLeft = 10;
    updateTimer();

    // Reset the result section and hide it
    document.getElementById("result").classList.remove("show");
    document.querySelector(".container").classList.add("glowing"); // Add glow effect around the box

    // Generate two random numbers between 1 and 10
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;

    // Display the question with animation
    document.getElementById("question").innerText = `What is ${num1} + ${num2}?`;
    document.getElementById("answer").value = ''; // Clear the input field
    document.getElementById("feedback").innerText = ''; // Clear feedback
    document.getElementById("answer").classList.remove("wrong");

    timer = setInterval(countdown, 1000); // Start the timer
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer").value;
    let correctAnswer = num1 + num2;

    if (userAnswer == correctAnswer) {
        correctAnswers++;
        document.getElementById("feedback").innerText = "Correct! 🎉";
        document.getElementById("feedback").style.color = "green";
        document.getElementById("correct-sound").play();
    } else {
        document.getElementById("feedback").innerText = "Incorrect, try again!";
        document.getElementById("feedback").style.color = "red";
        document.getElementById("incorrect-sound").play();
        document.getElementById("answer").classList.add("wrong");
    }

    updateProgress();

    if (correctAnswers >= totalQuestions) {
        endGame();
    } else {
        setTimeout(generateQuestion, 2000); // New question after feedback
    }
}

function updateProgress() {
    let progressPercentage = (correctAnswers / totalQuestions) * 100;
    document.getElementById("progress").style.width = progressPercentage + "%";
}

function countdown() {
    timeLeft--;
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearTimeout(timer);
        checkAnswer(); // Automatically check if time runs out
    }
}

function updateTimer() {
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
}

function endGame() {
    // Show the result with a nice animation
    let resultDiv = document.getElementById("result");
    resultDiv.innerText = `Well done! You got ${correctAnswers} out of ${totalQuestions} correct.`;
    resultDiv.classList.add("show");

    document.querySelector(".container").classList.remove("glowing"); // Remove glow effect after game ends

    // Reset for the next round of questions
    correctAnswers = 0;
    updateProgress();
    setTimeout(generateQuestion, 3000); // Restart the game after 3 seconds
}

// Start the game with the first question
window.onload = generateQuestion;
