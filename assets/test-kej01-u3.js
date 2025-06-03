import"./main-DGxdTxoS.js";import{t as g}from"./tests-Busmpe0m.js";const h=g.tests,m=new URLSearchParams(window.location.search),f=m.get("subject"),b=decodeURIComponent(m.get("topic")),r=document.getElementById("question-container"),d=document.getElementById("test-title"),$=document.getElementById("result-container"),v=document.getElementById("score-text");let o=0,i=0,e=[];const a=h.find(t=>t.slug===f);a||(d.textContent="Предмет не знайдено");const l=a.tests.find(t=>t.slug===b);l||(d.textContent="Тест не знайдено");d.textContent=`${a.subject}: ${l.title}`;e=u([...l.questions]).map(t=>({...t,options:u(t.options)}));p();function p(){if(r.innerHTML="",o>=e.length){x();return}const t=e[o],c=document.createElement("div");c.className="card question-card mb-4 shadow",c.innerHTML=`
    <div class="card-body">
      <h5 class="card-title">Питання ${o+1} з ${e.length}</h5>
      <p class="card-text">${t.question}</p>
      ${t.options.map((n,s)=>`
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question" id="ans${s}" value="${n}">
          <label class="form-check-label" for="ans${s}">${n}</label>
        </div>
      `).join("")}
      <div class="text-danger mt-2 d-none" id="error-msg">Виберіть відповідь перед переходом далі.</div>
      <button class="btn btn-success mt-3" id="next-btn">Далі</button>
    </div>
  `,r.appendChild(c),document.getElementById("next-btn").addEventListener("click",()=>{const n=document.querySelector('input[name="question"]:checked'),s=document.getElementById("error-msg");if(!n){s.classList.remove("d-none");return}n.value===t.correct&&i++,o++,p()})}function x(){r.innerHTML="",$.classList.remove("d-none"),v.textContent=`Правильно: ${i} з ${e.length} (${Math.round(i/e.length*100)}%)`}function u(t){return t.sort(()=>Math.random()-.5)}
