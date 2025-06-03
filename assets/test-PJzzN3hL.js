import"./main-DGxdTxoS.js";import{t as g}from"./tests-BIac2Ow5.js";window.BASE_URL="/levelup/";const f=g.tests,$=new URLSearchParams(window.location.search),v=$.get("subject"),y=decodeURIComponent($.get("topic")),d=document.getElementById("question-container"),i=document.getElementById("test-title"),p=document.getElementById("result-container"),E=document.getElementById("score-text");let r=0,a=0,o=[],x=[];const l=f.find(e=>e.slug===v);l||(i.textContent="Предмет не знайдено");const u=l.tests.find(e=>e.slug===y);u||(i.textContent="Тест не знайдено");i.textContent=`${l.subject}: ${u.title}`;o=h([...u.questions]).map(e=>({...e,options:h(e.options)}));b();function b(){if(d.innerHTML="",r>=o.length){q();return}const e=o[r],t=document.createElement("div");t.className="card question-card mb-4 shadow",t.innerHTML=`
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
  `,d.appendChild(t),document.getElementById("next-btn").addEventListener("click",()=>{const s=document.querySelector('input[name="question"]:checked'),n=document.getElementById("error-msg");if(!s){n.classList.remove("d-none");return}const c=s.value,m=e.correct;c===m&&a++,x.push({question:e.question,correct:m,selected:c,explanation:e.explanation}),r++,b()})}function q(){d.innerHTML="",p.classList.remove("d-none"),E.textContent=`Правильно: ${a} з ${o.length} (${Math.round(a/o.length*100)}%)`;const e=document.createElement("div");e.className="mt-4",x.forEach((t,s)=>{const n=t.selected===t.correct,c=document.createElement("div");c.className=`card mb-3 ${n?"border-success":"border-danger"}`,c.innerHTML=`
      <div class="card-body">
        <h6 class="card-title">Питання ${s+1}: ${t.question}</h6>
        <p class="card-text ${n?"text-success":"text-danger"}">
          Ваша відповідь: ${t.selected}
        </p>
        ${n?"":`<p class="card-text text-success">Правильна відповідь: ${t.correct}</p>`}
        <div class="py-1">
            ${n?"":`<p class="card-text text-secondary fst-italic">${t.explanation}</p>`}
        </div>
      </div>
    `,e.appendChild(c)}),p.appendChild(e)}function h(e){return e.sort(()=>Math.random()-.5)}
