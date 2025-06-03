import tests from "../data/tests.json"
const subjects = tests.tests

const container = document.getElementById("subjectContainer");
const template = document.getElementById("subjectTemplate");

subjects.forEach(({ subject, description, slug }, index) => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.card');
    card.dataset.subject = slug;

    clone.querySelector('.card-title').textContent = subject;
    clone.querySelector('.card-text').textContent = description;

    clone.querySelector('.btn').addEventListener("click", () => {
        window.location.href = `/pages/choose-topic.html?subject=${slug}`;
    });

    container.appendChild(clone);
});