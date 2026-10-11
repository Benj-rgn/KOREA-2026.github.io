
(() => {
  "use strict";

  const data = window.KOREA_DATA;
  if (!data || !Array.isArray(data.days) || !Array.isArray(data.route)) {
    console.error("Korea 2026 : données absentes ou invalides.");
    return;
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);

  function parseDate(value) {
    return new Date(`${value}T12:00:00`);
  }

  function formatDate(value, options = {}) {
    if (!value) return "";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      ...options
    }).format(parseDate(value));
  }

  function formatFullDate(value) {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(parseDate(value));
  }

  function getCurrentRoute() {
    const current = data.route.find((step, index) => {
      const start = step.startDate;
      const end = step.endDate;
      return todayISO >= start &&
        (todayISO < end || (index === data.route.length - 1 && todayISO === end));
    });
    return current || null;
  }

  function renderRoute() {
    const container = $("#routeTimeline");
    if (!container) return;

    const currentRoute = getCurrentRoute();

    container.innerHTML = `
      <div class="route-timeline">
        ${data.route.map((step, index) => {
          const active = currentRoute && currentRoute.id === step.id;
          const passed = todayISO >= step.endDate;
          return `
            <a class="route-stop${active ? " is-current" : ""}${passed ? " is-past" : ""}"
               href="#${escapeHTML(step.sectionId)}"
               ${active ? 'aria-current="location"' : ""}>
              <span class="route-stop-marker">${escapeHTML(step.number)}</span>
              <span class="route-stop-city">${escapeHTML(step.city)}</span>
              <span class="route-stop-date">${escapeHTML(step.dates)}</span>
            </a>
            ${index < data.route.length - 1 ? '<span class="route-connector" aria-hidden="true"></span>' : ""}
          `;
        }).join("")}
      </div>
    `;
  }

  function renderTransport(date) {
    const train = (data.transport || []).find((item) => item.date === date);
    if (!train) return "";

    return `
      <article class="transport-card" aria-label="Trajet en train confirmé">
        <p class="transport-eyebrow">TRAIN CONFIRMÉ · ${escapeHTML(train.train)}</p>
        <div class="transport-route">
          <div class="transport-station">
            <strong>${escapeHTML(train.departure)}</strong>
            <span>${escapeHTML(train.from)}</span>
          </div>
          <div class="transport-middle">
            <span>${escapeHTML(train.duration)}</span>
            <span class="transport-line" aria-hidden="true"></span>
          </div>
          <div class="transport-station">
            <strong>${escapeHTML(train.arrival)}</strong>
            <span>${escapeHTML(train.to)}</span>
          </div>
        </div>
        <div class="transport-details">
          <p><strong>Train</strong><span>${escapeHTML(train.train)}</span></p>
          <p><strong>Voiture</strong><span>${escapeHTML(train.carriage)}</span></p>
          <p><strong>Sièges</strong><span>${escapeHTML((train.seats || []).join(", "))}</span></p>
          <p><strong>Passagers</strong><span>${escapeHTML(train.passengers)} billets</span></p>
          <p><strong>Prix par personne</strong><span>${escapeHTML(train.pricePerPerson)}</span></p>
          <p><strong>Total</strong><span>${escapeHTML(train.totalPrice)}</span></p>
        </div>
      </article>
    `;
  }

  function renderActivities(activities, emptyMessage = "Les activités de cette journée restent à définir.") {
    if (!Array.isArray(activities) || activities.length === 0) {
      return `<p class="activities-empty">${escapeHTML(emptyMessage)}</p>`;
    }

    return `
      <div class="activity-list">
        ${activities.map((activity, index) => `
          <article class="activity-item">
            <span class="activity-marker" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
            <div class="activity-body">
              <div class="activity-heading">
                <h4>${escapeHTML(activity.title)}</h4>
                ${activity.time ? `<span class="activity-time">${escapeHTML(activity.time)}</span>` : ""}
              </div>
              ${activity.detail ? `<p>${escapeHTML(activity.detail)}</p>` : ""}
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderToday() {
    const dateLabel = $("#todayDate");
    const activities = $("#todayActivities");
    const visual = $("#todayVisual");
    if (!dateLabel || !activities) return;

    dateLabel.textContent = formatFullDate(todayISO);

    const day = data.days.find((item) => item.date === todayISO);

    if (day) {
      const transport = renderTransport(day.transportId || day.date);
      activities.innerHTML = `
        <p class="today-location">${escapeHTML(day.place)} · ${escapeHTML(day.title)}</p>
        ${day.text ? `<p class="today-intro">${escapeHTML(day.text)}</p>` : ""}
        ${transport}
        ${renderActivities(day.activities)}
      `;
      if (visual) {
        visual.className = `today-visual destination-${day.place === "Busan" ? "busan" : day.place === "Gyeongju" ? "gyeongju" : "seoul"}`;
        visual.setAttribute("aria-label", `Paysage de ${day.place}`);
      }
      return;
    }

    const firstDay = data.days[0];
    const lastDay = data.days[data.days.length - 1];

    if (todayISO < firstDay.date) {
      activities.innerHTML = `
        <p class="today-location">Le voyage approche</p>
        <p class="today-intro">Le départ est prévu le ${escapeHTML(formatFullDate(firstDay.date))}.</p>
        <a class="text-link" href="#planning">Voir le planning complet ↗</a>
      `;
      if (visual) visual.className = "today-visual destination-seoul";
    } else {
      activities.innerHTML = `
        <p class="today-location">Voyage terminé</p>
        <p class="today-intro">Notre voyage en Corée s'est terminé le ${escapeHTML(formatFullDate(lastDay.date))}.</p>
      `;
      if (visual) visual.className = "today-visual destination-seoul";
    }
  }

  const filtersContainer = $("#dayFilters");
  const timelineContainer = $("#timeline");
  const places = ["Tous", ...new Set(data.days.map((day) => day.place))];
  let selectedPlace = "Tous";

  function renderFilters() {
    if (!filtersContainer) return;
    filtersContainer.innerHTML = places.map((place, index) => `
      <button type="button"
        class="filter${index === 0 ? " active" : ""}"
        data-place="${escapeHTML(place)}"
        aria-pressed="${index === 0}">
        ${escapeHTML(place)}
      </button>
    `).join("");
  }

  function renderDays() {
    if (!timelineContainer) return;

    const filtered = data.days.filter((day) =>
      selectedPlace === "Tous" || day.place === selectedPlace
    );

    timelineContainer.innerHTML = filtered.map((day) => `
      <article class="day${day.fixed ? " day-fixed" : ""}${day.date === todayISO ? " is-today" : ""}"
        id="day-${escapeHTML(day.date)}"
        data-day-type="${escapeHTML(day.type || "explore")}">
        <div class="day-date">
          <time datetime="${escapeHTML(day.date)}">${escapeHTML(day.label || formatDate(day.date))}</time>
          <small>${escapeHTML(day.place)}</small>
        </div>
        <div class="day-content">
          <div class="day-heading">
            <h3>${escapeHTML(day.title)}</h3>
            ${day.date === todayISO ? '<span class="day-tag">Aujourd’hui</span>' : ""}
            ${day.fixed && day.date !== todayISO ? '<span class="day-tag">Date clé</span>' : ""}
          </div>
          <p class="day-intro">${escapeHTML(day.text || "")}</p>
          ${renderTransport(day.transportId || day.date)}
          <details class="day-details" ${day.date === todayISO ? "open" : ""}>
            <summary>
              Programme détaillé
              <span>${Array.isArray(day.activities) ? day.activities.length : 0} étapes</span>
            </summary>
            ${renderActivities(day.activities)}
          </details>
        </div>
      </article>
    `).join("");
  }

  function selectPlace(place) {
    selectedPlace = places.includes(place) ? place : "Tous";
    $$(".filter", filtersContainer || document).forEach((button) => {
      const active = button.dataset.place === selectedPlace;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderDays();
  }

  if (filtersContainer) {
    filtersContainer.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-place]");
      if (button) selectPlace(button.dataset.place);
    });
  }

  function renderAccommodations() {
    const container = $("#accommodationCards");
    if (!container) return;

    container.innerHTML = (data.accommodations || []).map((stay) => `
      <article class="info-card">
        <p class="info-label">${escapeHTML(stay.city)}${stay.area ? ` · ${escapeHTML(stay.area)}` : ""}</p>
        <h4>${escapeHTML(stay.name || "Hébergement à confirmer")}</h4>
        ${stay.room ? `<p>${escapeHTML(stay.room)}</p>` : ""}
        ${stay.startDate && stay.endDate
          ? `<p>${escapeHTML(formatDate(stay.startDate))} – ${escapeHTML(formatDate(stay.endDate))}</p>`
          : ""}
        ${stay.address ? `<p>${escapeHTML(stay.address)}</p>` : ""}
        ${stay.notes ? `<p>${escapeHTML(stay.notes)}</p>` : ""}
        ${stay.mapsUrl
          ? `<p><a class="text-link" href="${escapeHTML(stay.mapsUrl)}" target="_blank" rel="noopener noreferrer">Localiser sur Naver Maps ↗</a></p>`
          : ""}
      </article>
    `).join("");
  }

  function renderFlights() {
    const container = $("#flightCards");
    if (!container || !data.trip) return;

    const arrival = data.trip.arrival;
    const departure = data.trip.departure;

    container.innerHTML = `
      <article class="info-card">
        <p class="info-label">ARRIVÉE</p>
        <h4>${escapeHTML(arrival.airport)} · ${escapeHTML(arrival.code)}</h4>
        <p>${escapeHTML(formatFullDate(arrival.date))} à ${escapeHTML(arrival.time)}</p>
      </article>
      <article class="info-card">
        <p class="info-label">RETOUR</p>
        <h4>${escapeHTML(departure.airport)} · ${escapeHTML(departure.code)}</h4>
        <p>${escapeHTML(formatFullDate(departure.date))} à ${escapeHTML(departure.time)}</p>
      </article>
    `;
  }

  function setupNavigation() {
    const links = $$(".nav a, .mobile-nav a");
    const targets = [
      "#home", "#today", "#planning", "#map",
      "#seoul", "#busan", "#gyeongju", "#infos"
    ].map((hash) => ({ hash, element: $(hash) })).filter((item) => item.element);

    function setActive(hash) {
      links.forEach((link) => {
        const active = link.getAttribute("href") === hash;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const target = targets.find((item) => item.element === visible.target);
        if (target) setActive(target.hash);
      }, { rootMargin: "-18% 0px -58% 0px", threshold: [0, 0.2, 0.45] });

      targets.forEach(({ element }) => observer.observe(element));
    }

    links.forEach((link) => link.addEventListener("click", () => {
      setActive(link.getAttribute("href"));
    }));
  }

  renderRoute();
  renderToday();
  renderFilters();
  renderDays();
  renderAccommodations();
  renderFlights();
  setupNavigation();

  console.info("Korea 2026 : interface initialisée.");
})();
