
(() => {
  const d = window.KOREA_DATA;
  const $ = (s) => document.querySelector(s);

  $("#routeCards").innerHTML = d.route.map((x, i) =>
    `<a class="route-card" href="#${["seoul", "gyeongju", "busan", "seoul"][i]}">
      <span class="number">${x.number} · ${x.dates}</span>
      <div><h3>${x.city}</h3><p>${x.description}</p></div>
    </a>`
  ).join("");

  const places = ["Tous", ...new Set(d.days.map(x => x.place))];

  $("#dayFilters").innerHTML = places.map((x, i) =>
    `<button class="filter ${i === 0 ? "active" : ""}" data-place="${x}">${x}</button>`
  ).join("");

  function renderDays(place = "Tous") {
    $("#timeline").innerHTML = d.days
      .filter(x => place === "Tous" || x.place === place)
      .map(x =>
        `<article class="day">
          <div class="day-date">${x.date}<br><small>${x.place}</small></div>
          <div><h3>${x.title}</h3><p>${x.text}</p></div>
        </article>`
      ).join("");
  }

  renderDays();

  $("#dayFilters").addEventListener("click", e => {
    const b = e.target.closest(".filter");
    if (!b) return;

    document.querySelectorAll(".filter").forEach(x =>
      x.classList.remove("active")
    );

    b.classList.add("active");
    renderDays(b.dataset.place);
  });
})();
