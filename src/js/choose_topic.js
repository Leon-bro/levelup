import tests from "../data/tests.json"
const data = tests.tests

const query = new URLSearchParams(window.location.search);
const slug = query.get("subject");

const subject = data.find(sub => sub.slug === slug);
if (!subject) {
    document.getElementById("subjectTitle").textContent = "Невідомий предмет";
} else {
    document.getElementById("subjectTitle").textContent = subject.title;
    const container = document.getElementById("topicList");
    const template = document.getElementById("topicTemplate");

    subject.tests.forEach(topic => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.card-title').textContent = topic.title;
        clone.querySelector('.card-text').textContent = topic.description;
        clone.querySelector('.btn').addEventListener("click", () => {
            window.location.href = `/pages/test.html?subject=${slug}&topic=${topic.slug}`;
        });
        container.appendChild(clone);
    });
}