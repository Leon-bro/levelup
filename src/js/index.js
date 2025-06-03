import tests from "../data/tests.json"
window.BASE_URL = import.meta.env.BASE_URL;
const subjects = tests.tests

const container = document.getElementById("subjectContainer");
const template = document.getElementById("subjectTemplate");

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