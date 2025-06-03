// 📁 src/js/flashcards.js
import subjects from "../data/tests.json";
window.BASE_URL = import.meta.env.BASE_URL;
const flashcardSections = document.getElementById('flashcard-sections');
const template = document.getElementById('flashcard-template');
const form = document.getElementById('add-flashcard-form');
const frontInput = document.getElementById('front-text');
const backInput = document.getElementById('back-text');
const subjectSelect = document.getElementById('subject-select');
const warning = document.getElementById('limit-warning');

// Заповнення select предметами
subjects.tests.forEach(subject => {
    const opt = document.createElement('option');
    opt.value = subject.slug;
    opt.textContent = subject.subject;
    subjectSelect.appendChild(opt);
});

// Завантаження карток з localStorage
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

// Перший рендер
renderFlashcards();

// Додавання нової картки
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (flashcards.length >= 15) {
        warning.classList.remove('d-none');
        return;
    } else {
        warning.classList.add('d-none');
    }

    const front = frontInput.value.trim();
    const back = backInput.value.trim();
    const subject = subjectSelect.value;

    if (front && back && subject) {
        flashcards.push({ front, back, subject });
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        form.reset();
        renderFlashcards();
    }
});

function renderFlashcards() {
    flashcardSections.innerHTML = '<h1 class="mb-4 text-center">Мої флеш-картки</h1>';

    subjects.tests.forEach(subject => {
        const cardsBySubject = flashcards.filter(card => card.subject === subject.slug);
        if (cardsBySubject.length === 0) return;

        const subjectBlock = document.createElement('div');
        subjectBlock.className = "mb-5";

        const titleRow = document.createElement('div');
        titleRow.className = "d-flex align-items-center mb-3 gap-3";

        const img = document.createElement('img');
        img.src = window.BASE_URL + `${subject.image}`;
        img.alt = subject.subject;
        img.width = 50;
        img.height = 50;

        const title = document.createElement('h4');
        title.textContent = subject.subject;

        titleRow.appendChild(img);
        titleRow.appendChild(title);
        subjectBlock.appendChild(titleRow);

        const container = document.createElement('div');
        container.className = "d-flex flex-wrap gap-3";

        cardsBySubject.forEach((card, index) => {
            const clone = template.content.cloneNode(true);
            const front = clone.querySelector('.flip-card-front');
            const back = clone.querySelector('.flip-card-back');
            const cardElement = clone.querySelector('.flip-card');
            const deleteBtn = clone.querySelector('.delete-btn');

            front.textContent = card.front;
            back.textContent = card.back;

            let flipTimeout;

            cardElement.addEventListener('mouseenter', () => {
                flipTimeout = setTimeout(() => {
                    cardElement.classList.add('hovering');
                }, 500);
            });

            cardElement.addEventListener('mouseleave', () => {
                clearTimeout(flipTimeout);
                cardElement.classList.remove('hovering');
            });

            cardElement.addEventListener('touchend', (e) => {
                const isFlipped = cardElement.classList.contains('flipped');
                if (!e.target.classList.contains('delete-btn')) {
                    cardElement.classList.toggle('flipped', !isFlipped);
                    if (!isFlipped) {
                        setTimeout(() => {
                            cardElement.classList.remove('flipped');
                        }, 500);
                    }
                }
            });

            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const globalIndex = flashcards.findIndex((fc, i) =>
                    fc.front === card.front &&
                    fc.back === card.back &&
                    fc.subject === card.subject
                );
                if (globalIndex !== -1) {
                    flashcards.splice(globalIndex, 1);
                    localStorage.setItem('flashcards', JSON.stringify(flashcards));
                    renderFlashcards();
                }
            });

            container.appendChild(clone);
        });

        subjectBlock.appendChild(container);
        flashcardSections.appendChild(subjectBlock);
    });
}