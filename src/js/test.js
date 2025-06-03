import tests from "../data/tests.json"
const subjects = tests.tests
const params = new URLSearchParams(window.location.search);
const subjectKey = params.get('subject');
const topic = decodeURIComponent(params.get('topic'));

const container = document.getElementById('question-container');
const title = document.getElementById('test-title');
const resultBlock = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');

let currentIndex = 0;
let score = 0;
let questions = [];

// Знайти тему
const subject = subjects.find(s => s.slug === subjectKey);
if (!subject) {
    title.textContent = "Предмет не знайдено";
}
const test = subject.tests.find(t => t.slug === topic);
if (!test) {
    title.textContent = "Тест не знайдено";
}
title.textContent = `${subject.subject}: ${test.title}`;

// Перемішати питання і відповіді
questions = shuffleArray([...test.questions]).map(q => ({
    ...q,
    options: shuffleArray(q.options)
}));

renderQuestion();

function renderQuestion() {
    container.innerHTML = '';

    if (currentIndex >= questions.length) {
        showResult();
        return;
    }

    const q = questions[currentIndex];
    const card = document.createElement('div');
    card.className = 'card question-card mb-4 shadow';
    card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">Питання ${currentIndex + 1} з ${questions.length}</h5>
      <p class="card-text">${q.question}</p>
      ${q.options.map((ans, i) => `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question" id="ans${i}" value="${ans}">
          <label class="form-check-label" for="ans${i}">${ans}</label>
        </div>
      `).join('')}
      <div class="text-danger mt-2 d-none" id="error-msg">Виберіть відповідь перед переходом далі.</div>
      <button class="btn btn-success mt-3" id="next-btn">Далі</button>
    </div>
  `;
    container.appendChild(card);

    document.getElementById('next-btn').addEventListener('click', () => {
        const selected = document.querySelector('input[name="question"]:checked');
        const errorMsg = document.getElementById('error-msg');

        if (!selected) {
            errorMsg.classList.remove('d-none');
            return;
        }

        if (selected.value === q.correct) {
            score++;
        }

        currentIndex++;
        renderQuestion();
    });
}

function showResult() {
    container.innerHTML = '';
    resultBlock.classList.remove('d-none');
    scoreText.textContent = `Правильно: ${score} з ${questions.length} (${Math.round(score / questions.length * 100)}%)`;
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}