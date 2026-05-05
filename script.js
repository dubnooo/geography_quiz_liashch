document.addEventListener('DOMContentLoaded', () => {
        const questions = [

    // -------------------------
    // 1. Звичайні питання (1-7)
    // -------------------------
    {
        question: "Яка найбільша країна світу за площею?",
        answers: ["Канада", "Китай", "Росія", "США"],
        correct: 2
    },
    {
        question: "Яка столиця Австралії?",
        answers: ["Сідней", "Мельбурн", "Канберра", "Перт"],
        correct: 2
    },
    {
        question: "Найдовша річка світу?",
        answers: ["Амазонка", "Ніл", "Дніпро", "Міссісіпі"],
        correct: 1
    },
    {
        question: "Яка пустеля найбільша у світі?",
        answers: ["Гобі", "Сахара", "Калахарі", "Атакама"],
        correct: 1
    },
    {
        question: "Яка гора є найвищою у світі?",
        answers: ["Кіліманджаро", "Монблан", "Еверест", "Альпи"],
        correct: 2
    },
    {
        question: "Який океан найбільший?",
        answers: ["Атлантичний", "Індійський", "Північний Льодовитий", "Тихий"],
        correct: 3
    },
    {
        question: "Яка країна має форму чобота?",
        answers: ["Іспанія", "Італія", "Португалія", "Греція"],
        correct: 1
    },

    // -------------------------
    // 2. Питання з картинками (8-14)
    // -------------------------
   {
    question: "Який це прапор Франції?",
    answers: [
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
        "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
        "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg",
        "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"
    ],
    correct: 0,
    isImageQuiz: true
},
{
    question: "Яка з цих країн — Японія?",
    answers: [
        "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
        "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
        "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg"
    ],
    correct: 3,
    isImageQuiz: true
},
{
    question: "Який це прапор Бразилії?",
    answers: [
        "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg",
        "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg",
        "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
        "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"
    ],
    correct: 1,
    isImageQuiz: true
},
{
    question: "Який це прапор Канади?",
    answers: [
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg",
        "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
        "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
        "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg"
    ],
    correct: 0,
    isImageQuiz: true
},
{
    question: "Який це прапор України?",
    answers: [
        
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
        "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
        "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg",
        "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg"
    ],
    correct: 0,
    isImageQuiz: true
},

    // -------------------------
    // 3. Правда / Неправда (15-21)
    // -------------------------
    {
        question: "Київ є столицею України.",
        answers: ["Правда", "Неправда"],
        correct: 0
    },
    {
        question: "Сахара знаходиться в Південній Америці.",
        answers: ["Правда", "Неправда"],
        correct: 1
    },
    {
        question: "Еверест — найвища гора світу.",
        answers: ["Правда", "Неправда"],
        correct: 0
    },
    {
        question: "Амазонка протікає в Африці.",
        answers: ["Правда", "Неправда"],
        correct: 1
    },
    {
        question: "Антарктида — найхолодніший материк.",
        answers: ["Правда", "Неправда"],
        correct: 0
    },
    {
        question: "Європа більша за Азію.",
        answers: ["Правда", "Неправда"],
        correct: 1
    },
    {
        question: "Тихий океан найбільший у світі.",
        answers: ["Правда", "Неправда"],
        correct: 0
    }
];


    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const timerDisplay = document.querySelector('#timer');
    const scoreL = document.querySelector('#score-display');
    const finalScoreDisplay = document.querySelector('#final-score');

    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;

    function showQuestion(question) {
        clearInterval(interval);
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;

        question.answers.forEach((answer, i) => {
            const button = document.createElement('button');
            button.classList.add('answer-btn');

            if (question.isImageQuiz) {
                const img = document.createElement('img');
                img.src = answer;
                button.appendChild(img);
                button.classList.add('image-option');
            } else {
                button.innerText = answer;
            }

            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        });
    }

    function checkAnswer(button, i) {
        clearInterval(interval);
        const correct = questions[questionIndex].correct;
        
        if (i === correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }

        document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
        setTimeout(nextQuestion, 1000);
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${accuracy}%`;
        finalScoreDisplay.innerText = score;
    }

    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;
        scoreL.innerText = `Бали: ${score}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});

const starTypes = ['🌍'];

function createStar() {
    const container = document.getElementById('stars-container');
    if (!container) return; // На всяк випадок

    const star = document.createElement('div');
    
    // Вибираємо випадковий тип зірки
    star.innerText = starTypes[Math.floor(Math.random() * starTypes.length)];
    star.classList.add('star');
    
    // Випадкова позиція по горизонталі (від 0 до 100vw)
    star.style.left = Math.random() * 100 + 'vw';
    
    // Випадкова тривалість польоту від 2 до 5 секунд (швидше, ніж долари)
    const duration = Math.random() * 3 + 2;
    star.style.animationDuration = duration + 's';
    
    // Випадковий розмір шрифту для ефекту глибини
    star.style.fontSize = Math.random() * 15 + 10 + 'px';

    container.appendChild(star);

    // Видаляємо елемент після завершення анімації
    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}

// Запускаємо створення зірок кожні 100 мс (частіше для ефекту швидкості)
setInterval(createStar, 500);

