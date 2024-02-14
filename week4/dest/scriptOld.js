const questions = [
  {
    question: " which is largest animal in the world ?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Elephant", correct: false },
    ],
  },
  {
    question: " which is smallest  continent in the world ?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: " which is capital of India ?",
    answers: [
      { text: "New Delhi", correct: true },
      { text: "jaipur", correct: false },
      { text: "Udaipur", correct: false },
      { text: "Kota", correct: false },
    ],
  },

  {
    question: " which city is called as Pink City ?",
    answers: [
      { text: "New Delhi", correct: false },
      { text: "jaipur", correct: true },
      { text: "Udaipur", correct: false },
      { text: "Kota", correct: false },
    ],
  },

  {
    question: " which city is called as City of lake ?",
    answers: [
      { text: "New Delhi", correct: false },
      { text: "jaipur", correct: false },
      { text: "Udaipur", correct: true },
      { text: "Kota", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const timerElement = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + " ." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerbuttons.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click",selectAnswer);

  });
}

function resetState() {
  
  while (answerbuttons.firstChild) {
    answerbuttons.removeChild(answerbuttons.firstChild);
  }
}

function showRemarks(){
  resetState();
  questionElement.innerHTML = `Your Scored ${score} out of ${questions.length}!`
  nextBtn.innerHTML = "Play Again"
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  }
  else{
    showRemarks();
  }
}
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});



function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct ==="true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("Incorrect");
  }
  Array.from(answerbuttons.children).forEach(button =>{
    if(button.dataset.correct ==="true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  })
  nextBtn.style.display ="block";

}

startQuiz();
