const questions = [
    {
        question: "Mash hafta ko'rishishga nima disan?",
        answers: ["Ha, albatta san uchun hardoim bor", "Band bo'lishim mumkin", "Hmm bilmadim"],
        correct: 0 // 1-javob to'g'ri
    },
    {
        question: "Qaqa boramiz?",
        answers: ["Yana o'qishga", "Bilmasam", "Bon"],
        correct: 2 // 3-javob to'g'ri
    },
    {
        question: "Nechida ko'rishamiz?",
        answers: ["14:30", "13:30", "12:30"],
        correct: -1 // Hamma javob to'g'ri, qochmaydi
    },
    {
        question: "Kech qolganga qanaqa chora ko'ramiz?",
        answers: ["Qatl qilamiz", "Sizlab sevishini etish", "Bumaga ga osamiz"],
        correct: 1 // 2-javob to'g'ri
    },
    {
        question: "Mash kuningni man bilan o'tkazishga rozimisan?",
        answers: ["Albatta faqat san bilan", "Boshqa variantam yo'g'u"],
        correct: 0 // 1-javob to'g'ri
    }
];

let currentQuestion = 0;
let chosenTime = "14:30";

const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const ticket = document.getElementById("ticket");
const questionText = document.getElementById("question");
const answersBox = document.getElementById("answers");

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
        ticket.classList.add("active");
        document.getElementById("selectedTime").innerText = chosenTime;
        return;
    }

    showQuestion();
}

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