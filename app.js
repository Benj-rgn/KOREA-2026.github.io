(() => {
  const d = window.KOREA_DATA;
  const $ = (s) => document.querySelector(s);

  $("#routeCards").innerHTML = d.route.map((x,i) =>
    `<a class="route-card" href="#${["seoul","gyeongju","busan","seoul"][i]}">
      <span class="number">${x.number} · ${x.dates}</span>
      <div><h3>${x.city}</h3><p>${x.description}</p></div>
    </a>`).join("");

  const places = ["Tous", ...new Set(d.days.map(x => x.place))];
  $("#dayFilters").innerHTML = places.map((x,i) =>
    `<button class="filter ${i===0?"active":""}" data-place="${x}">${x}</button>`).join("");

  function renderDays(place="Tous") {
    $("#timeline").innerHTML = d.days.filter(x => place==="Tous" || x.place===place).map(x =>
      `<article class="day"><div class="day-date">${x.date}<br><small>${x.place}</small></div>
      <div><h3>${x.title}</h3><p>${x.text}</p></div></article>`).join("");
  }
  renderDays();

  $("#dayFilters").addEventListener("click", e => {
    const b = e.target.closest(".filter"); if (!b) return;
    document.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
    b.classList.add("active"); renderDays(b.dataset.place);
  });

  const key = "korea2026-votes";
  let votes = JSON.parse(localStorage.getItem(key) || "{}");

  function renderVotes() {
    $("#voteList").innerHTML = d.votes.map(v =>
      `<article class="vote-card"><p class="eyebrow">CHOIX</p><h3>${v.question}</h3>
      <div class="vote-options">${v.options.map((o,i) => {
        const selected = votes[v.id] === i;
        return `<button class="vote-btn ${selected?"selected":""}" data-vote="${v.id}" data-index="${i}">
          <strong>${o[0]}</strong><small>${o[1]}${selected ? " · Votre choix" : ""}</small>
        </button>`;
      }).join("")}</div></article>`).join("");
    $("#voteBadge").textContent = Object.keys(votes).length;
  }

  $("#voteList").addEventListener("click", e => {
    const b = e.target.closest(".vote-btn"); if (!b) return;
    const id = b.dataset.vote, i = Number(b.dataset.index);
    if (votes[id] === i) delete votes[id]; else votes[id] = i;
    localStorage.setItem(key, JSON.stringify(votes)); renderVotes();
  });
  renderVotes();


})();