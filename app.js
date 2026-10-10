
(() => {
  "use strict";

  const data = window.KOREA_DATA;

  if (!data || !Array.isArray(data.route) || !Array.isArray(data.days)) {
    console.error("Données du voyage absentes ou invalides. Vérifie data.js.");
    return;
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  const routeContainer = $("#routeCards");
  const filtersContainer = $("#dayFilters");
  const timelineContainer = $("#timeline");

  if (!routeContainer || !filtersContainer || !timelineContainer) {
    console.error("Un conteneur HTML nécessaire est absent. Vérifie index.html.");
    return;
  }

  // Échappe le texte avant de l'insérer dans le HTML.
  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };

      return entities[character];
    });
  }

  function formatDate(dateString, options = {}) {
    if (!dateString) return "";

    const date = new Date(`${dateString}T12:00:00`);

    if (Number.isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      ...options
    }).format(date);
  }

  // -----------------------------------------
  // 1. CARTES DU PARCOURS
  // -----------------------------------------

  routeContainer.innerHTML = data.route.map((step) => {
    const sectionId = step.sectionId || step.id;

    return `
      <a
        class="route-card"
        href="#${escapeHTML(sectionId)}"
        aria-label="${escapeHTML(step.city)} : ${escapeHTML(step.dates)}"
      >
        <span class="number">
          ${escapeHTML(step.number)} · ${escapeHTML(step.dates)}
        </span>

        <div>
          <h3>${escapeHTML(step.city)}</h3>
          <p>${escapeHTML(step.description)}</p>
        </div>

        <span class="route-card-link" aria-hidden="true">Découvrir →</span>
      </a>
    `;
  }).join("");

  // -----------------------------------------
  // 2. FILTRES ET PLANNING
  // -----------------------------------------

  const places = [
    "Tous",
    ...new Set(data.days.map((day) => day.place))
  ];

  let selectedPlace = "Tous";

  filtersContainer.innerHTML = places.map((place, index) => `
    <button
      type="button"
      class="filter${index === 0 ? " active" : ""}"
      data-place="${escapeHTML(place)}"
      aria-pressed="${index === 0 ? "true" : "false"}"
    >
      ${escapeHTML(place)}
    </button>
  `).join("");

  function renderDays() {
    const filteredDays = data.days.filter((day) =>
      selectedPlace === "Tous" || day.place === selectedPlace
    );

    if (!filteredDays.length) {
      timelineContainer.innerHTML =
        "<p>Aucune journée prévue pour cette destination.</p>";
      return;
    }

    timelineContainer.innerHTML = filteredDays.map((day) => `
      <article
        class="day${day.fixed ? " day-fixed" : ""}"
        data-day-type="${escapeHTML(day.type || "explore")}"
      >
        <div class="day-date">
          <time datetime="${escapeHTML(day.date)}">
            ${escapeHTML(day.label || formatDate(day.date))}
          </time>
          <br>
          <small>${escapeHTML(day.place)}</small>
        </div>

        <div class="day-content">
          <div class="day-heading">
            <h3>${escapeHTML(day.title)}</h3>
            ${day.fixed
              ? '<span class="day-tag">Date clé</span>'
              : ""}
          </div>
          <p>${escapeHTML(day.text)}</p>
        </div>
      </article>
    `).join("");
  }

  function selectPlace(place) {
    selectedPlace = places.includes(place) ? place : "Tous";

    $$(".filter", filtersContainer).forEach((button) => {
      const isActive = button.dataset.place === selectedPlace;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    renderDays();
  }

  filtersContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".filter");

    if (!button || !filtersContainer.contains(button)) return;

    selectPlace(button.dataset.place);
  });

  renderDays();

  // -----------------------------------------
  // 3. CARTE SCHÉMATIQUE DYNAMIQUE
  // -----------------------------------------

  const mapLine = $(".map-line");
  const mapLabels = $(".map-labels");

  if (mapLine && mapLabels) {
    mapLine.innerHTML = data.route.map((step, index) => `
      ${index > 0 ? "<i></i>" : ""}
      <div class="map-dot${index === 0 ? " active" : ""}">
        ${escapeHTML(step.number)}
      </div>
    `).join("");

    mapLabels.innerHTML = data.route.map((step) => `
      <div>
        ${escapeHTML(step.city.toUpperCase())}
        <small>${escapeHTML(step.dates)}</small>
      </div>
    `).join("");
  }

  // -----------------------------------------
  // 4. HÉBERGEMENTS
  // Conteneur facultatif : #accommodationCards
  // -----------------------------------------

  const accommodationContainer = $("#accommodationCards");

  if (accommodationContainer && Array.isArray(data.accommodations)) {
    accommodationContainer.innerHTML = data.accommodations.map((stay) => `
      <article class="info-card">
        <p class="eyebrow">${escapeHTML(stay.city)}</p>
        <h3>${escapeHTML(stay.name || "À confirmer")}</h3>
        ${stay.area ? `<p>${escapeHTML(stay.area)}</p>` : ""}
        ${stay.room ? `<p>${escapeHTML(stay.room)}</p>` : ""}
        <p>${escapeHTML(stay.notes)}</p>
        <span class="status">
          ${stay.status === "known" ? "Information enregistrée" : "À compléter"}
        </span>
      </article>
    `).join("");
  }

  // -----------------------------------------
  // 5. ÉVÉNEMENTS IMPORTANTS
  // Conteneur facultatif : #eventCards
  // -----------------------------------------

  const eventContainer = $("#eventCards");

  if (eventContainer && Array.isArray(data.importantEvents)) {
    eventContainer.innerHTML = data.importantEvents.map((item) => `
      <article class="info-card">
        <p class="eyebrow">
          ${escapeHTML(formatDate(item.date, { year: "numeric" }))}
          · ${escapeHTML(item.city)}
        </p>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>
      </article>
    `).join("");
  }

  // -----------------------------------------
  // 6. PRÉFÉRENCES DE VOYAGE
  // Conteneur facultatif : #preferenceList
  // -----------------------------------------

  const preferenceContainer = $("#preferenceList");

  if (preferenceContainer && Array.isArray(data.preferences)) {
    const sortedPreferences = [...data.preferences].sort(
      (a, b) => b.priority - a.priority
    );

    preferenceContainer.innerHTML = sortedPreferences.map((item) => `
      <div class="preference-item">
        <span>${escapeHTML(item.label)}</span>
        <span class="preference-score" aria-label="Priorité ${item.priority} sur 5">
          ${"●".repeat(item.priority)}${"○".repeat(5 - item.priority)}
        </span>
      </div>
    `).join("");
  }

  // -----------------------------------------
  // 7. RÉSUMÉ DU VOYAGE
  // Conteneur facultatif : #tripSummary
  // -----------------------------------------

  const tripSummary = $("#tripSummary");

  if (tripSummary && data.trip) {
    tripSummary.innerHTML = `
      <p>
        <strong>Dates :</strong>
        ${escapeHTML(formatDate(data.trip.startDate, { year: "numeric" }))}
        – ${escapeHTML(formatDate(data.trip.endDate, { year: "numeric" }))}
      </p>
      <p>
        <strong>Arrivée :</strong>
        ${escapeHTML(data.trip.arrival.airport)}
        (${escapeHTML(data.trip.arrival.code)}),
        ${escapeHTML(data.trip.arrival.time)}
      </p>
      <p>
        <strong>Retour :</strong>
        ${escapeHTML(data.trip.departure.airport)}
        (${escapeHTML(data.trip.departure.code)}),
        ${escapeHTML(data.trip.departure.time)}
      </p>
      <p>${escapeHTML(data.trip.groupDetails)}</p>
    `;
  }

  // -----------------------------------------
  // 8. NAVIGATION ACTIVE
  // Home n'est actif que lorsque le hero est visible.
  // -----------------------------------------

  const navigationLinks = $$(".nav a, .mobile-nav a");

  function setActiveNavigation(hash) {
    navigationLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === hash;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const hash = link.getAttribute("href");
      setActiveNavigation(hash);

      // Le filtre de planning reste indépendant de la navigation.
      if (hash === "#planning") {
        selectPlace(selectedPlace);
      }
    });
  });

  const hero = $(".hero");
  const navigationTargets = [
    { hash: "#home", element: hero },
    { hash: "#planning", element: $("#planning") },
    { hash: "#map", element: $("#map") },
    { hash: "#seoul", element: $("#seoul") },
    { hash: "#busan", element: $("#busan") },
    { hash: "#gyeongju", element: $("#gyeongju") },
    { hash: "#infos", element: $("#infos") }
  ].filter((item) => item.element);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleEntries.length) return;

      const currentElement = visibleEntries[0].target;
      const current = navigationTargets.find(
        (item) => item.element === currentElement
      );

      if (current) setActiveNavigation(current.hash);
    }, {
      rootMargin: "-18% 0px -58% 0px",
      threshold: [0, 0.15, 0.35, 0.6]
    });

    navigationTargets.forEach(({ element }) => observer.observe(element));
  } else {
    // Repli pour les navigateurs sans IntersectionObserver.
    window.addEventListener("scroll", () => {
      const marker = window.scrollY + window.innerHeight * 0.3;
      let current = navigationTargets[0];

      navigationTargets.forEach((item) => {
        if (item.element.getBoundingClientRect().top + window.scrollY <= marker) {
          current = item;
        }
      });

      if (current) setActiveNavigation(current.hash);
    }, { passive: true });
  }

  // Au chargement, Home est actif par défaut.
  setActiveNavigation("#home");

  console.info("Korea 2026 : application initialisée.");
})();
