const flashcardList = document.getElementById('flashcard-list');
const template = document.getElementById('flashcard-template');
const form = document.getElementById('add-flashcard-form');
const frontInput = document.getElementById('front-text');
const backInput = document.getElementById('back-text');
const warning = document.getElementById('limit-warning');

let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

renderFlashcards();

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

    if (front && back) {
        flashcards.push({ front, back });
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        form.reset();
        renderFlashcards();
    }
});

function renderFlashcards() {
    flashcardList.innerHTML = '';
    flashcards.forEach((card, index) => {
        const clone = template.content.cloneNode(true);
        const front = clone.querySelector('.flip-card-front');
        const back = clone.querySelector('.flip-card-back');
        const cardElement = clone.querySelector('.flip-card');
        const deleteBtn = clone.querySelector('.delete-btn');
        const inner = clone.querySelector('.flip-card-inner');

        front.textContent = card.front;
        back.textContent = card.back;

        let flipTimeout;

        // Наведення для десктопів
        cardElement.addEventListener('mouseenter', () => {
            flipTimeout = setTimeout(() => {
                cardElement.classList.add('hovering');
            }, 1500);
        });

        cardElement.addEventListener('mouseleave', () => {
            clearTimeout(flipTimeout);
            cardElement.classList.remove('hovering');
        });

        // Торкання для мобільних
        cardElement.addEventListener('touchend', (e) => {
            const isFlipped = cardElement.classList.contains('flipped');
            // Перевірка, чи натиснули не на кнопку
            if (!e.target.classList.contains('delete-btn')) {
                cardElement.classList.toggle('flipped', !isFlipped);
                // Автоматичне повернення назад через 3с
                if (!isFlipped) {
                    setTimeout(() => {
                        cardElement.classList.remove('flipped');
                    }, 1500);
                }
            }
        });

        // Кнопка видалення
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            flashcards.splice(index, 1);
            localStorage.setItem('flashcards', JSON.stringify(flashcards));
            renderFlashcards();
        });

        flashcardList.appendChild(clone);
    });
}