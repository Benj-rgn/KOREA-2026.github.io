
window.KOREA_DATA = {
  trip: {
    title: "Korea 2026",
    subtitle: "9000km away…",
    startDate: "2026-10-24",
    endDate: "2026-11-04",
    arrival: {
      date: "2026-10-24",
      time: "09:30",
      airport: "Incheon International Airport",
      code: "ICN"
    },
    departure: {
      date: "2026-11-04",
      time: "13:20",
      airport: "Incheon International Airport",
      code: "ICN"
    },
    travelers: [
      "Benjamin",
      "Morgane"
    ],
    additionalTravelers: [
      "Damien",
      "Nelly"
    ],
    groupDetails:
      "Benjamin et Morgane voyagent avec Damien et Nelly pour les étapes à Busan et Gyeongju."
  },

  route: [
    {
      id: "seoul-start",
      number: "01",
      city: "Séoul",
      englishName: "Seoul",
      startDate: "2026-10-24",
      endDate: "2026-10-26",
      dates: "24–26 OCT",
      description:
        "Arrivée en Corée, moments en famille et anniversaire de Papa.",
      sectionId: "seoul"
    },
    {
      id: "busan",
      number: "02",
      city: "Busan",
      englishName: "Busan",
      startDate: "2026-10-26",
      endDate: "2026-10-28",
      dates: "26–28 OCT",
      description:
        "Découvertes côtières, gastronomie et paysages maritimes.",
      sectionId: "busan"
    },
    {
      id: "gyeongju",
      number: "03",
      city: "Gyeongju",
      englishName: "Gyeongju",
      startDate: "2026-10-28",
      endDate: "2026-10-30",
      dates: "28–30 OCT",
      description:
        "Patrimoine historique, nature et découverte à vélo.",
      sectionId: "gyeongju"
    },
    {
      id: "seoul-return",
      number: "04",
      city: "Séoul",
      englishName: "Seoul",
      startDate: "2026-10-30",
      endDate: "2026-11-04",
      dates: "30 OCT–4 NOV",
      description:
        "Retour à Séoul, mariage familial et dernières découvertes.",
      sectionId: "seoul"
    }
  ],

  accommodations: [
    {
      id: "seoul-hotel",
      city: "Séoul",
      name: "Hotel Anteroom Seoul",
      area: "Gangnam",
      status: "known",
      notes:
        "Hébergement prévu pour les nuits à Séoul."
    },
    {
      id: "gyeongju-hanok",
      city: "Gyeongju",
      name: "Hanok Stay Leafy Dalshimnal",
      room: "Ondol Room",
      status: "known",
      notes:
        "Hébergement de style hanok à Gyeongju."
    },
    {
      id: "busan-stay",
      city: "Busan",
      name: null,
      status: "to-confirm",
      notes:
        "Nom de l'hébergement à compléter."
    }
  ],

  importantEvents: [
    {
      date: "2026-10-25",
      city: "Séoul",
      title: "Anniversaire de Papa",
      description:
        "Célébration familiale. Journée réservée."
    },
    {
      date: "2026-10-31",
      city: "Séoul",
      title: "Mariage de ton frère",
      description:
        "Journée réservée au mariage et aux célébrations familiales."
    }
  ],

  preferences: [
    {
      id: "gastronomy",
      label: "Gastronomie",
      priority: 5
    },
    {
      id: "scenery",
      label: "Paysages et photographie",
      priority: 5
    },
    {
      id: "sea",
      label: "Mer et plages",
      priority: 5
    },
    {
      id: "cafes",
      label: "Cafés",
      priority: 4
    },
    {
      id: "nature",
      label: "Nature et parcs",
      priority: 3
    },
    {
      id: "cycling",
      label: "Vélo",
      priority: 3
    },
    {
      id: "architecture",
      label: "Architecture et design",
      priority: 3
    },
    {
      id: "hiking",
      label: "Randonnée",
      priority: 3
    },
    {
      id: "spa",
      label: "Spa et jjimjilbang",
      priority: 3
    },
    {
      id: "heritage",
      label: "Histoire et patrimoine",
      priority: 2
    },
    {
      id: "nightlife",
      label: "Bars et vie nocturne",
      priority: 2
    },
    {
      id: "shopping",
      label: "Shopping",
      priority: 2
    }
  ],

  days: [
    {
      date: "2026-10-24",
      label: "24 OCT",
      place: "Séoul",
      title: "Arrivée en Corée",
      text:
        "Arrivée à Incheon à 09:30, transfert et installation. Prévoir une première journée légère après le vol.",
      type: "travel",
      fixed: true
    },
    {
      date: "2026-10-25",
      label: "25 OCT",
      place: "Séoul",
      title: "Anniversaire de Papa",
      text:
        "Journée consacrée à la célébration familiale.",
      type: "event",
      fixed: true
    },
    {
      date: "2026-10-26",
      label: "26 OCT",
      place: "Busan",
      title: "Séoul → Busan",
      text:
        "Départ de Séoul, trajet vers Busan et installation.",
      type: "travel",
      fixed: true
    },
    {
      date: "2026-10-27",
      label: "27 OCT",
      place: "Busan",
      title: "Découverte de Busan",
      text:
        "Journée à organiser autour de la mer, de la gastronomie et des paysages.",
      type: "explore",
      fixed: false
    },
    {
      date: "2026-10-28",
      label: "28 OCT",
      place: "Gyeongju",
      title: "Busan → Gyeongju",
      text:
        "Départ pour Gyeongju, installation et premières découvertes.",
      type: "travel",
      fixed: true
    },
    {
      date: "2026-10-29",
      label: "29 OCT",
      place: "Gyeongju",
      title: "Gyeongju à vélo",
      text:
        "Journée dédiée à la découverte du grand parc et des sites historiques à vélo.",
      type: "explore",
      fixed: false
    },
    {
      date: "2026-10-30",
      label: "30 OCT",
      place: "Séoul",
      title: "Gyeongju → Séoul",
      text:
        "Retour à Séoul et préparation du week-end familial.",
      type: "travel",
      fixed: true
    },
    {
      date: "2026-10-31",
      label: "31 OCT",
      place: "Séoul",
      title: "Mariage de ton frère",
      text:
        "Journée réservée au mariage et aux célébrations familiales.",
      type: "event",
      fixed: true
    },
    {
      date: "2026-11-01",
      label: "1 NOV",
      place: "Séoul",
      title: "Séoul",
      text:
        "Journée de découverte à organiser selon les envies et le rythme du groupe.",
      type: "explore",
      fixed: false
    },
    {
      date: "2026-11-02",
      label: "2 NOV",
      place: "Séoul",
      title: "Séoul",
      text:
        "Prévoir des découvertes, des pauses café et de bonnes adresses gastronomiques.",
      type: "explore",
      fixed: false
    },
    {
      date: "2026-11-03",
      label: "3 NOV",
      place: "Séoul",
      title: "Dernière journée complète",
      text:
        "Dernières découvertes, derniers repas et préparation du départ.",
      type: "explore",
      fixed: false
    },
    {
      date: "2026-11-04",
      label: "4 NOV",
      place: "Séoul",
      title: "Retour",
      text:
        "Départ depuis l'aéroport d'Incheon. Horaire indiqué pour le vol : 13:20.",
      type: "travel",
      fixed: true
    }
  ]
};
