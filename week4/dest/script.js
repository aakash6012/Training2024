"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { questions } from "./question.js";
// console.log(questions)
const startbtn = document.getElementById("start-btn");
const quiz1 = document.getElementById('quiz');
const rules1 = document.getElementById('rules');
startbtn.addEventListener('click', () => {
    quiz1.style.display = "block";
    rules1.style.display = "none";
    var questions;
    function fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("question.json");
            const json = yield response.json();
            let data = json;
            console.log(typeof data);
            return data;
        });
    }
    fetchData().then((data) => {
        questions = data;
        const questionElement = document.getElementById("question");
        const answerbuttons = document.getElementById("answer-buttons");
        const nextBtn = document.getElementById("next-btn");
        const timeElement = document.getElementById("time");
        const timerElement = document.getElementById("timer");
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
            const validationMessage = document.getElementById("validationMessage");
            validationMessage.innerHTML = "";
            timeElement.style.display = "none";
            timerElement.style.display = "none";
        }
        function handleNextButton() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            }
            else {
                showRemarks();
            }
        }
        nextBtn.addEventListener("click", () => {
            const parent = answerbuttons;
            const children = parent.children;
            let classFlag = false;
            for (let i = 0; i < children.length; i++) {
                if (children[i].classList.contains("Incorrect") ||
                    children[i].classList.contains("correct")) {
                    classFlag = true;
                }
            }
            if (!classFlag) {
                document.getElementById("validationMessage").style.display = "block";
            }
            else {
                document.getElementById("validationMessage").style.display = "none";
            }
            if (currentQuestionIndex < questions.length) {
                if (classFlag) {
                    handleNextButton();
                }
            }
            else {
                if (true) {
                    document.getElementById("validationMessage").style.display = "none";
                }
                startQuiz();
            }
            const len = questions.length;
            if (currentQuestionIndex == len - 1) {
                nextBtn.innerHTML = "Submit";
            }
        });
        function selectAnswer(e) {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if (isCorrect) {
                selectedBtn.classList.add("correct");
                score++;
            }
            else {
                selectedBtn.classList.add("Incorrect");
            }
            Array.from(answerbuttons.children).forEach((button) => {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
        }
        startQuiz();
    });
});
