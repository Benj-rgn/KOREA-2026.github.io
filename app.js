(() => {
  "use strict";

  const data = window.KOREA_DATA;

  if (!data || !Array.isArray(data.route) || !Array.isArray(data.days)) {
    console.error("KOREA_DATA est absent ou invalide. Vérifie data.js.");
    return;
  }

  const routeContainer = document.querySelector("#routeCards");
  const filtersContainer = document.querySelector("#dayFilters");
  const timelineContainer = document.querySelector("#timeline");

  if (!routeContainer || !filtersContainer || !timelineContainer) {
    console.error(
      "Un élément HTML nécessaire est absent. Vérifie index.html."
    );
    return;
  }

  // Les deux étapes de Séoul pointent vers la même section.
  const sectionByRouteId = {
    "seoul-start": "seoul",
    busan: "busan",
    gyeongju: "gyeongju",
    "seoul-return": "seoul"
  };

  // Génère les cartes du parcours.
  routeContainer.innerHTML = data.route
    .map((step) => {
      const sectionId = sectionByRouteId[step.id];

      if (!sectionId) {
        console.warn(
          `Aucune section définie pour l'étape : ${step.id}`
        );
        return "";
      }

      return `
        <a class="route-card" href="#${sectionId}">
          <span class="number">
            ${step.number} · ${step.dates}
          </span>

          <div>
            <h3>${step.city}</h3>
            <p>${step.description}</p>
          </div>
        </a>
      `;
    })
    .join("");

  // Construit la liste des destinations présentes dans le planning.
  const places = [
    "Tous",
    ...new Set(data.days.map((day) => day.place))
  ];

  // Génère les boutons de filtre.
  filtersContainer.innerHTML = places
    .map((place, index) => {
      const active = index === 0;

      return `
        <button
          type="button"
          class="filter${active ? " active" : ""}"
          data-place="${place}"
          aria-pressed="${active}"
        >
          ${place}
        </button>
      `;
    })
    .join("");

  // Affiche les journées correspondant au filtre sélectionné.
  function renderDays(selectedPlace = "Tous") {
    const filteredDays = data.days.filter(
      (day) =>
        selectedPlace === "Tous" ||
        day.place === selectedPlace
    );

    if (filteredDays.length === 0) {
      timelineContainer.innerHTML =
        "<p>Aucune journée prévue pour cette destination.</p>";
      return;
    }

    timelineContainer.innerHTML = filteredDays
      .map(
        (day) => `
          <article class="day">
            <div class="day-date">
              ${day.date}
              <br>
              <small>${day.place}</small>
            </div>

            <div>
              <h3>${day.title}</h3>
              <p>${day.text}</p>
            </div>
          </article>
        `
      )
      .join("");
  }

  // Affiche le planning complet au chargement.
  renderDays();

  // Gère les changements de filtre.
  filtersContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".filter");

    if (!button || !filtersContainer.contains(button)) {
      return;
    }

    filtersContainer.querySelectorAll(".filter").forEach((filter) => {
      const isActive = filter === button;

      filter.classList.toggle("active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });

    renderDays(button.dataset.place);
  });
})();
