// import { questions } from "./question.js";
// console.log(questions)

var questions: { question: string; answers: { text: string; correct: boolean; }[] }[]

async function fetchData() {
  const response = await fetch("question.json");
  const json = await response.json();
  let data: any = json;
  console.log(typeof data);
  return data; 
}


fetchData().then((data) => {
 
  questions = data;
  
const questionElement = document.getElementById("question") as HTMLElement;
const answerbuttons = document.getElementById("answer-buttons") as HTMLElement;
const nextBtn = document.getElementById("next-btn") as HTMLElement;
const timeElement = document.getElementById("time") as HTMLElement;
const timerElement = document.getElementById("timer") as HTMLElement;
let currentQuestionIndex = 0;
let score = 0;
let sec = 50;
const time = setInterval(myTimer, 1000);

function myTimer() {
  timerElement.innerHTML = sec + " sec left";
  sec--;
  if (sec === -1) {
    clearInterval(time);
    showRemarks();
  }
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  showQuestion();
}

function showQuestion() {
  myTimer();
  resetState();
  answerbuttons.innerHTML = "";
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + " ." + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = String(answer.correct);
    }
    answerbuttons.appendChild(button);
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while (answerbuttons.firstChild) {
    answerbuttons.removeChild(answerbuttons.firstChild);
  }
}

function showRemarks() {
  resetState();
  questionElement.innerHTML = `Your Scored ${score} out of ${questions.length}!`;
  nextBtn.style.display = "none";
  const validationMessage = document.getElementById("validationMessage") as HTMLElement;
  validationMessage.innerHTML = "";
  timeElement.style.display = "none";
  timerElement.style.display = "none";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showRemarks();
  }
}

nextBtn.addEventListener("click", () => {
  const parent = answerbuttons;
  const children = parent.children;
  let classFlag = false;
  for (let i = 0; i < children.length; i++) {
    if (
      children[i].classList.contains("Incorrect") ||
      children[i].classList.contains("correct")
    ) {
      classFlag = true;
    }
  }
  if (!classFlag) {
    (document.getElementById("validationMessage") as HTMLElement).style.display = "block";
  } else {
    (document.getElementById("validationMessage") as HTMLElement).style.display = "none";
  }
  if (currentQuestionIndex < questions.length) {
    if (classFlag) {
      handleNextButton();
    }
  } else {
    if (true) {
      (document.getElementById("validationMessage") as HTMLElement).style.display = "none";
    }
    startQuiz();
  }
  const len = questions.length;
  if (currentQuestionIndex == len - 1) {
    nextBtn.innerHTML = "Submit";
  }
});

function selectAnswer(e: Event) {
  const selectedBtn = e.target as HTMLButtonElement;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("Incorrect");
  }
  Array.from(answerbuttons.children).forEach((button: any) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
}

startQuiz();
});