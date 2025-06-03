import"./main-DGxdTxoS.js";import{t as f}from"./tests-Busmpe0m.js";window.BASE_URL="/levelup/";const v=f.tests,b=new URLSearchParams(window.location.search),x=b.get("subject"),y=decodeURIComponent(b.get("topic")),d=document.getElementById("question-container"),a=document.getElementById("test-title"),p=document.getElementById("result-container"),E=document.getElementById("score-text");let r=0,i=0,o=[],g=[];const l=v.find(e=>e.slug===x);l||(a.textContent="Предмет не знайдено");const u=l.tests.find(e=>e.slug===y);u||(a.textContent="Тест не знайдено");a.textContent=`${l.subject}: ${u.title}`;o=h([...u.questions]).map(e=>({...e,options:h(e.options)}));$();function $(){if(d.innerHTML="",r>=o.length){q();return}const e=o[r],t=document.createElement("div");t.className="card question-card mb-4 shadow",t.innerHTML=`
    <div class="card-body">
      <h5 class="card-title">Питання ${r+1} з ${o.length}</h5>
      <p class="card-text">${e.question}</p>
      ${e.options.map((s,n)=>`
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question" id="ans${n}" value="${s}">
          <label class="form-check-label" for="ans${n}">${s}</label>
        </div>
      `).join("")}
      <div class="text-danger mt-2 d-none" id="error-msg">Виберіть відповідь перед переходом далі.</div>
      <button class="btn btn-success mt-3" id="next-btn">Далі</button>
    </div>
  `,d.appendChild(t),document.getElementById("next-btn").addEventListener("click",()=>{const s=document.querySelector('input[name="question"]:checked'),n=document.getElementById("error-msg");if(!s){n.classList.remove("d-none");return}const c=s.value,m=e.correct;c===m&&i++,g.push({question:e.question,correct:m,selected:c}),r++,$()})}function q(){d.innerHTML="",p.classList.remove("d-none"),E.textContent=`Правильно: ${i} з ${o.length} (${Math.round(i/o.length*100)}%)`;const e=document.createElement("div");e.className="mt-4",g.forEach((t,s)=>{const n=t.selected===t.correct,c=document.createElement("div");c.className=`card mb-3 ${n?"border-success":"border-danger"}`,c.innerHTML=`
      <div class="card-body">
        <h6 class="card-title">Питання ${s+1}: ${t.question}</h6>
        <p class="card-text ${n?"text-success":"text-danger"}">
          Ваша відповідь: ${t.selected}
        </p>
        ${n?"":`<p class="card-text text-success">Правильна відповідь: ${t.correct}</p>`}
      </div>
    `,e.appendChild(c)}),p.appendChild(e)}function h(e){return e.sort(()=>Math.random()-.5)}
