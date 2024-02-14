const questions: {
    question: string;
    answers: { text: string; correct: boolean; }[];
  }[] = [
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
  
  
  
  const questionElement = document.getElementById("question")  as  HTMLElement ;
  const answerbuttons = document.getElementById("answer-buttons") as  HTMLElement ;
  const nextBtn = document.getElementById("next-btn") as HTMLElement ;
  const timerElement = document.getElementById("time") as HTMLElement;
  const timerElement2 = document.getElementById("timer") as HTMLElement ;
  
  let currentQuestionIndex: number = 0;
  let score: number = 0;
  let sec: number = 15;
  
  const time: NodeJS.Timeout = setInterval(myTimer, 1000);
  
  function myTimer(): void {
    if (timerElement2) {
        timerElement2.innerHTML = sec + "sec left";
    }
    sec--;
    if (sec === -1) {
        clearInterval(time);
        showRemarks();
    }
  }
  
  function startQuiz(): void {
    currentQuestionIndex = 0;
    score = 0;
    // if (nextBtn) {
        nextBtn.innerHTML = "Next";
    // }
    showQuestion();
  }
  
  function showQuestion(): void {
    myTimer();
    resetState();
  
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    if (questionElement) {
        questionElement.innerHTML = questionNo + " ." + currentQuestion.question;
    }
  
    if (answerbuttons) {
        currentQuestion.answers.forEach((answer) => {
            const button: HTMLButtonElement = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            if (answer.correct) {
                button.dataset.correct = String(answer.correct);
            }
            answerbuttons.appendChild(button);
            button.addEventListener("click", selectAnswer);
        });
    }
  }
  
  function resetState(): void {
    if (answerbuttons) {
        while (answerbuttons.firstChild) {
            answerbuttons.removeChild(answerbuttons.firstChild);
        }
    }
  }
  
  function showRemarks(): void {
    resetState();
    if (questionElement) {
        questionElement.innerHTML = `Your Scored ${score} out of ${questions.length}!`;
    }
    if (nextBtn) {
        nextBtn.style.display = "none";
    }
    const validationMessage: HTMLElement | null = document.getElementById("validationMessage");
    if (validationMessage) {
        validationMessage.innerHTML = "";
    }
    if (timerElement) {
        timerElement.style.display = "none";
    }
    if (timerElement2) {
        timerElement2.style.display = "none";
    }
  }
  
  function handleNextButton(): void {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showRemarks();
    }
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        console.log(answerbuttons, "ans");
        const parent: HTMLElement | null = answerbuttons;
        if (parent) {
            const children: HTMLCollection = parent.children;
            let c: boolean = false;
            for (let i = 0; i < children.length; i++) {
                const child: HTMLElement = children[i] as HTMLElement;
                if (child.classList.contains("Incorrect") || child.classList.contains("correct")) {
                    console.log("true", child);
                    c = true;
                }
            }
            const validationMessage: HTMLElement | null = document.getElementById("validationMessage");
            if (validationMessage) {
                validationMessage.style.display = c ? "none" : "block";
            }
            if (currentQuestionIndex < questions.length) {
                if (c) {
                    handleNextButton();
                }
            } else {
                if (true) {
                    if (validationMessage) {
                        validationMessage.style.display = "none";
                    }
                }
                startQuiz();
            }
        }
    });
  }
  
  function selectAnswer(e: Event): void {
    debugger;
    const selectedBtn: HTMLElement = e.target as HTMLElement;
    const isCorrect: boolean = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("Incorrect");
    }
    if (answerbuttons) {
        Array.from(answerbuttons.children).forEach((button: HTMLElement) => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
    }
  }
  
  startQuiz();
  
  
  