const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean",
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["Five", "Six", "Seven", "Eight"],
    answer: "Six",
  },
  {
    question: "Which animal is the tallest in the world?",
    options: ["Elephant", "Ostrich", "Giraffe", "Camel"],
    answer: "Giraffe",
  },
  {
    question: "What is the main language spoken in Brazil?",
    options: ["Spanish", "French", "Portuguese", "Italian"],
    answer: "Portuguese",
  },
  {
    question: "Which instrument has keys, pedals, and strings?",
    options: ["Harp", "Piano", "Flute", "Violin"],
    answer: "Piano",
  },
  {
    question: "What is the closest star to Earth?",
    options: ["Sirius", "Proxima Centauri", "The Sun", "Polaris"],
    answer: "The Sun",
  },
  {
    question: "In which direction does the sun rise?",
    options: ["North", "South", "West", "East"],
    answer: "East",
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionCount = document.querySelector("#question-count");
const scoreDisplay = document.querySelector("#score");
const progressTrack = document.querySelector("#progress-track");
const progressBar = document.querySelector("#progress-bar");
const questionText = document.querySelector("#question");
const optionsContainer = document.querySelector("#options");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const quizContent = document.querySelector("#quiz-content");
const resultScreen = document.querySelector("#result-screen");
const finalScore = document.querySelector("#final-score");
const resultMessage = document.querySelector("#result-message");
const resultIcon = document.querySelector("#result-icon");
const restartButton = document.querySelector("#restart-button");

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionCount.innerHTML = `QUESTION ${String(currentQuestionIndex + 1).padStart(2, "0")} <span>/ ${String(questions.length).padStart(2, "0")}</span>`;
  scoreDisplay.textContent = score;
  questionText.textContent = currentQuestion.question;
  optionsContainer.replaceChildren();
  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.disabled = true;
  progressTrack.setAttribute("aria-valuenow", currentQuestionIndex);
  progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;

  currentQuestion.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    const letter = document.createElement("span");
    const label = document.createElement("span");

    button.className = "option-button";
    button.type = "button";
    button.dataset.answer = option;
    letter.className = "option-letter";
    letter.textContent = String.fromCharCode(65 + optionIndex);
    label.className = "option-label";
    label.textContent = option;
    button.append(letter, label);
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
    optionsContainer.append(button);
  });
}

function selectAnswer(selectedButton, correctAnswer) {
  if (selectedButton.disabled) {
    return;
  }

  const isCorrect = selectedButton.dataset.answer === correctAnswer;
  const optionButtons = optionsContainer.querySelectorAll(".option-button");

  optionButtons.forEach((button) => {
    button.disabled = true;

    if (button.dataset.answer === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (isCorrect) {
    score += 1;
    scoreDisplay.textContent = score;
    feedback.textContent = "That's right! Nicely done.";
    feedback.classList.add("is-correct");
  } else {
    selectedButton.classList.add("incorrect");
    feedback.textContent = `Not quite — the correct answer is ${correctAnswer}.`;
    feedback.classList.add("is-incorrect");
  }

  nextButton.disabled = false;
}

function showResults() {
  const feedbackByScore = score >= 7
    ? { icon: "🏆", message: "Outstanding! You've got a wonderfully curious mind." }
    : score >= 5
      ? { icon: "✨", message: "Great work! You know your way around a fun fact." }
      : score >= 3
        ? { icon: "🌱", message: "Nice effort! There's always something new to learn." }
        : { icon: "💡", message: "Every quiz is a fresh start. Ready for another round?" };

  quizContent.hidden = true;
  resultIcon.textContent = feedbackByScore.icon;
  finalScore.textContent = `You scored ${score} out of ${questions.length}`;
  resultMessage.textContent = feedbackByScore.message;
  progressTrack.setAttribute("aria-valuenow", questions.length);
  progressBar.style.width = "100%";
  resultScreen.hidden = false;
}

nextButton.addEventListener("click", () => {
  if (nextButton.disabled) {
    return;
  }

  currentQuestionIndex += 1;

  if (currentQuestionIndex === questions.length) {
    showResults();
    return;
  }

  renderQuestion();
});

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  quizContent.hidden = false;
  resultScreen.hidden = true;
  renderQuestion();
});

renderQuestion();
