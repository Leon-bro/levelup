# levelup

сайт написаний на чистом JavaScript, HTML, а також SCSS препроцесорі.
Використання SCSS необхідно було для коректного підключення Bootstrap бібліотеки стилей та імпортування користувацьких файлів класів.
Збиральник проєктів Vite компілює ці файли, тому на виході scss трансформується в єдиний css.
Зверніть увагу, що підключення стилей не дуже стандартне. Вони підключаються через main.js як статичний файл, це дуже спрощує розробку, щоб не писати кожен раз шляхи для кожного html файлу окремо (це фішка vite, без збиралька проєктів так не вийде зробити).

Динамічна генерація контенту (тестів, предметів, тощо) виконано за допомогою відносно нового тегу template.
Далі приклад коду розмітки і динамічної генерації через js.
В розмітці лише шаблон однієї картки в яку треба підставити дані з js
```` html 
      <div class="row" id="subjectContainer"></div>

      <!-- Шаблон картки -->
      <template id="subjectTemplate">
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card shadow fade-in h-100" data-subject="">
            <img src="" alt="" class="card-img rounded" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title py-2"></h5>
              <p class="card-text text-secondary small py-2"></p>
              <div class="mt-auto">
                <button class="btn btn-primary w-100 py-3">Перейти до тесту</button>
              </div>
            </div>
          </div>
        </div>
      </template>
````
В джаваскрипті цей шаблон клонується і заповнюється даними з json файлу src/data/tests.json.
Це файл де зберігаються тести, які може пройти користувач сайту.
```` js
subjects.forEach(({ subject, description, slug, image }, index) => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.card');
    card.dataset.subject = slug;
    clone.querySelector('.card-img').src = window.BASE_URL + image;
    clone.querySelector('.card-title').textContent = subject;
    clone.querySelector('.card-text').textContent = description;

    clone.querySelector('.btn').addEventListener("click", () => {
        window.location.href = window.BASE_URL + `pages/choose-topic.html?subject=${slug}`;
    });

    container.appendChild(clone);
});
````

Проблема: GitHub Pages містить лише статичні файли, які не можуть бути змінені користувачем через веб сайт, тому заповнення сайту даними неможливо з сайту.

Рішення: Для вирішення цієї проблеми вручну було заповнено json файл з тестами, який знаходиться за шляхом src/data/tests.json, тому GitHub Pages бере вже готові дані з файлів.

Для проходження тестів реалізована лише одна функція рендеру тесту. Тести відображаються один за другим, після переходу до іншого питання, робиться рекурсивний виклик функції renderQuestion() з новим поточним індексом, а отже і новим питанням.
```` js
function renderQuestion() {
        container.innerHTML = '';
    
        if (currentIndex >= questions.length) {
            showResult();
            return;
        }
        ......

        const userAnswer = selected.value;
        const correctAnswer = q.correct;

        if (userAnswer === correctAnswer) score++;

        userAnswers.push({
            question: q.question,
            correct: correctAnswer,
            selected: userAnswer,
            explanation: q.explanation
        });

        currentIndex++;
        renderQuestion();
    });
}
````

Форма з результатами просто не відображаться на сторінці поки користувач не пройде тест.

Як було сказано раніше, неможливо зберігати інформацію на GitHub Pages, тому флеш картки зберігаються в локальній пам'ятті браузера.
Тому всі маніпуляції з додаванням та видаленням відбувається саме через локальну пам'ять
```` js

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
````
Для складних анімацій було зроблено окремі файли. Це саме анімація перегортання картки.
Перегортається саме внутрішня частина картки, але анімація вимагає абсолютного позіціонування, тому контейнер має relative позіціонування (це вимагає position:absolute, бо елемент позіціонується відносно relative позіціонованого елемента).
Там є окрема анімація за ключовими кадрами (це тряска картки, типу відповідь на наведення, або натискання.)
За допомогою transform, а також динамічному присвоєнню класів в js зроблено саме перегортання картки


```` css

.flip-card {
  width: 200px;
  height: 250px;
  perspective: 1000px;
  position: relative;
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  transition: transform 1s ease;
  transform-style: preserve-3d;
  position: relative;
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.flip-card-front {
  background-color: #ffffff;
  color: black;
}

.flip-card-back {
  background-color: #f8d7da;
  color: #721c24;
  transform: rotateY(180deg);
}

.flip-card:hover {
  animation: shake 0.3s;
  animation-iteration-count: 1;
}

.flip-card.hovering .flip-card-inner {
  transform: rotateY(180deg);
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
}

.delete-btn {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: auto;
  width: 75%;
}
@media (hover: none) and (pointer: coarse) {
  /* Для мобільних пристроїв — торкання */
  .flip-card {
    touch-action: manipulation;
  }
}
````

Для відображення іконок для кожного окремого предмета були додані шляхи до заздалегідь збережених зображень у файл з тестами.
