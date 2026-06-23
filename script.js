const questions = [
    {
        question: "Mash hafta ko'rishishga vaqtn bom?",
        answers: ["Ha, albatta san uchun hardoim bor", "Band bo'lishim mumkin", "Hmm bilmadim"],
        correct: 0
    },
    {
        question: "Qaqa boramiz?",
        answers: ["Yana o'qishga", "Bilmasam", "Bon", "The Mart", "Gietto"],
        correct: 2
    },
    {
        question: "Nechida ko'rishamiz?",
        answers: ["14:30", "13:30", "12:30"],
        correct: -1
    },
    {
        question: "Kech qolganga qanaqa chora ko'ramiz?",
        answers: ["Qatl qilamiz", "Sizlab sevishini etish", "Bumaga ga osamiz"],
        correct: 1
    },
    {
        question: "Mash kuningni man bilan o'tkazishga rozimisan?",
        answers: ["Albatta, faqat san bilan", "Boshqa variantam yo'g'u"],
        correct: 0
    }
];

let currentQuestion = 0;
let chosenTime = "14:30";
let envelopeClicks = 0;

const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const envelopeScreen = document.getElementById("envelope-screen");
const ticket = document.getElementById("ticket");
const questionText = document.getElementById("question");
const answersBox = document.getElementById("answers");
const secretEnvelope = document.getElementById("secretEnvelope");

document.getElementById("startBtn").onclick = () => {
    intro.classList.remove("active");
    quiz.classList.add("active");
    showQuestion();
};

function showQuestion() {
    answersBox.innerHTML = "";
    const q = questions[currentQuestion];
    questionText.innerText = q.question;

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.innerText = answer;
        btn.className = "answer-btn";

        btn.style.position = "absolute";
        btn.style.left = "50%";
        btn.style.transform = "translateX(-50%)";
        btn.style.top = (index * 75) + "px";

        if (q.correct !== -1 && q.correct === index) {
            btn.classList.add("correct");
        }

        if (q.correct !== -1 && index !== q.correct) {
            btn.addEventListener("mouseenter", () => moveButton(btn));
            btn.addEventListener("touchstart", (e) => {
                e.preventDefault();
                moveButton(btn);
            });
        } else {
            btn.onclick = () => {
                if (q.correct === -1) {
                    chosenTime = answer;
                }
                nextQuestion();
            };
        }

        answersBox.appendChild(btn);
    });
}

function moveButton(btn) {
    const padding = 40;
    const maxX = window.innerWidth - btn.offsetWidth - padding;
    const maxY = window.innerHeight - btn.offsetHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    btn.style.transform = "none";
    btn.style.position = "fixed";
    btn.style.left = randomX + "px";
    btn.style.top = randomY + "px";
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        quiz.classList.remove("active");
        envelopeScreen.classList.add("active");
        return;
    }

    showQuestion();
}

secretEnvelope.onclick = () => {
    envelopeClicks++;

    secretEnvelope.classList.remove("shake-animation");
    void secretEnvelope.offsetWidth;
    secretEnvelope.classList.add("shake-animation");

    if (envelopeClicks >= 3) {
        secretEnvelope.classList.add("fade-out-envelope");
        setTimeout(() => {
            envelopeScreen.classList.remove("active");
            ticket.classList.add("active");
            document.getElementById("selectedTime").innerText = chosenTime;
        }, 600);
    }
};

document.getElementById("downloadBtn").onclick = () => {
    const ticketCard = document.getElementById("ticketCard");

    html2canvas(ticketCard, {
        backgroundColor: null,
        scale: 2
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "Bon_Taklifnoma_Chipta.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
};