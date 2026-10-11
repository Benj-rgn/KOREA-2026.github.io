
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
    travelers: ["Benjamin", "Morgane"],
    additionalTravelers: ["Damien", "Nelly"],
    groupDetails:
      "Benjamin et Morgane voyagent avec Damien et Nelly pour les étapes à Busan et Gyeongju."
  },

  transport: [
    {
      date: "2026-10-26",
      from: "Séoul",
      to: "Busan",
      departure: "10:28",
      arrival: "13:14",
      train: "KTX 027",
      carriage: "Voiture 1",
      duration: "2 h 46",
      passengers: 4,
      seats: ["8A", "8B", "9A", "9B"],
      pricePerPerson: "51 000 ₩",
      totalPrice: "204 000 ₩"
    },
    {
      date: "2026-10-28",
      from: "Busan",
      to: "Gyeongju",
      departure: "14:20",
      arrival: "14:47",
      train: "KTX 042",
      carriage: "Voiture 10",
      duration: "27 min",
      passengers: 4,
      seats: ["8A", "8B", "9A", "9B"],
      pricePerPerson: "9 600 ₩",
      totalPrice: "38 400 ₩"
    },
    {
      date: "2026-10-30",
      from: "Gyeongju",
      to: "Séoul",
      departure: "09:14",
      arrival: "11:24",
      train: "KTX 018",
      carriage: "Voiture 14",
      duration: "2 h 10",
      passengers: 4,
      seats: ["2A", "2B", "2C", "2D"],
      pricePerPerson: "44 100 ₩",
      totalPrice: "176 400 ₩"
    }
  ],

  route: [
    {
      id: "seoul-start",
      number: "01",
      city: "Séoul",
      englishName: "Seoul",
      startDate: "2026-10-24",
      endDate: "2026-10-26",
      dates: "24–26 OCT",
      description: "Arrivée en Corée, moments en famille et anniversaire de Papa.",
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
      description: "Découvertes côtières, gastronomie et paysages maritimes.",
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
      description: "Patrimoine historique, nature et découverte à vélo.",
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
      description: "Retour à Séoul, mariage familial et dernières découvertes.",
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
      notes: "Hébergement prévu pour les nuits à Séoul."
    },

    {
      id: "busan-stay",
      city: "Busan",
      name: "Sunset Hotel",
      area: "Haeundae",
      address: "46, Gunam-ro, Haeundae-gu, 48094 Busan, Corée du Sud",
      startDate: "2026-10-26",
      endDate: "2026-10-28",
      mapsUrl: "https://map.naver.com/p/search/Sunset%20Hotel%20Busan",
      status: "known",
      notes: "Séjour du 26 au 28 octobre, dans le quartier de Haeundae."
    }

    {
      id: "gyeongju-hanok",
      city: "Gyeongju",
      name: "Hanok Stay Leafy Dalshimnal",
      room: "Ondol Room",
      status: "known",
      notes: "Hébergement de style hanok à Gyeongju."
    }
  ],

  importantEvents: [
    {
      date: "2026-10-25",
      city: "Séoul",
      title: "Anniversaire de Papa",
      description: "Célébration familiale. Journée réservée."
    },
    {
      date: "2026-10-31",
      city: "Séoul",
      title: "Mariage de ton frère",
      description: "Journée réservée au mariage et aux célébrations familiales."
    }
  ],

  preferences: [
    { id: "gastronomy", label: "Gastronomie", priority: 5 },
    { id: "scenery", label: "Paysages et photographie", priority: 5 },
    { id: "sea", label: "Mer et plages", priority: 5 },
    { id: "cafes", label: "Cafés", priority: 4 },
    { id: "nature", label: "Nature et parcs", priority: 3 },
    { id: "cycling", label: "Vélo", priority: 3 },
    { id: "architecture", label: "Architecture et design", priority: 3 },
    { id: "hiking", label: "Randonnée", priority: 3 },
    { id: "spa", label: "Spa et jjimjilbang", priority: 3 },
    { id: "heritage", label: "Histoire et patrimoine", priority: 2 },
    { id: "nightlife", label: "Bars et vie nocturne", priority: 2 },
    { id: "shopping", label: "Shopping", priority: 2 }
  ],

  days: [
    {
      date: "2026-10-24",
      label: "24 OCT",
      place: "Séoul",
      title: "Arrivée en Corée",
      text: "Arrivée à Incheon à 09:30, transfert et installation. Prévoir une première journée légère après le vol.",
      type: "travel",
      fixed: true,
      activities: [
        { title: "Arrivée à Incheon", time: "09:30", detail: "Arrivée à l'aéroport international d'Incheon (ICN)." },
        { title: "Transfert et installation", detail: "Rejoindre l'hébergement et prendre le temps de récupérer après le vol." }
      ]
    },
    {
      date: "2026-10-25",
      label: "25 OCT",
      place: "Séoul",
      title: "Anniversaire de Papa",
      text: "Journée consacrée à la célébration familiale.",
      type: "event",
      fixed: true,
      activities: [
        { title: "Célébration familiale", detail: "Anniversaire de Papa. Journée réservée à la famille." }
      ]
    },
    {
      date: "2026-10-26",
      label: "26 OCT",
      place: "Busan",
      title: "Séoul → Busan",
      text: "Train le matin, découverte du front de mer de Haeundae puis soirée autour des marchés et quartiers animés.",
      type: "travel",
      fixed: true,
      transportId: "2026-10-26",
      activities: [
        {
          title: "KTX 027 : Séoul → Busan",
          time: "10:28–13:14",
          detail: "Durée : 2 h 46 · Voiture 1 · Sièges 8A, 8B, 9A et 9B. 4 billets à 51 000 ₩ chacun, soit 204 000 ₩ au total."
        },
        {
          title: "Déjeuner à l'arrivée",
          time: "Après 13:14",
          detail: "Déjeuner à Busan après l'arrivée et avant de commencer les visites."
        },
        {
          title: "Haeundae Beach",
          time: "Après-midi",
          detail: "Découvrir la plage de Haeundae et profiter du paysage côtier."
        },
        {
          title: "Dongbaek Park",
          time: "Après-midi",
          detail: "Balade dans le parc côtier de Dongbaek."
        },
        {
          title: "Jagalchi Market",
          time: "Soirée",
          detail: "Explorer le marché aux poissons et découvrir la gastronomie locale."
        },
        {
          title: "Nampo-dong et BIFF Square",
          time: "Soirée",
          detail: "Se promener dans les rues animées et profiter de l'ambiance du quartier."
        },
        {
          title: "Nuit à Busan",
          detail: "Sunset Hotel, quartier de Haeundae."
        }
      ]
    },
    {
      date: "2026-10-27",
      label: "27 OCT",
      place: "Busan",
      title: "Temples, Sky Capsule et Gamcheon",
      text: "Une journée pour découvrir le littoral, prendre le Sky Capsule et visiter le village coloré de Gamcheon.",
      type: "explore",
      fixed: false,
      activities: [
        {
          title: "Haedong Yonggungsa",
          time: "Matin",
          detail: "Visiter le temple en bord de mer et profiter de son cadre côtier."
        },
        {
          title: "Sky Capsule : Mipo → Cheongsapo",
          time: "Fin de matinée",
          detail: "Trajet panoramique en capsule le long de la côte."
        },
        {
          title: "Gamcheon Culture Village",
          time: "Après-midi",
          detail: "Explorer les ruelles, les maisons colorées et les points de vue du village."
        },
        {
          title: "Soirée libre",
          time: "Soirée",
          detail: "À organiser selon les recommandations de l'ami de Nelly."
        }
      ]
    },
    {
      date: "2026-10-28",
      label: "28 OCT",
      place: "Gyeongju",
      title: "Busan → Gyeongju",
      text: "Matinée tranquille à Busan, puis train pour Gyeongju et installation au hanok.",
      type: "travel",
      fixed: true,
      transportId: "2026-10-28",
      activities: [
        {
          title: "Matinée tranquille à Busan",
          time: "Matin",
          detail: "Petit-déjeuner, check-out et temps libre."
        },
        {
          title: "Rejoindre la gare",
          time: "Avant 14:20",
          detail: "Prévoir suffisamment d'avance pour rejoindre la gare et embarquer sereinement."
        },
        {
          title: "KTX 042 : Busan → Gyeongju",
          time: "14:20–14:47",
          detail: "Durée : 27 min · Voiture 10 · Sièges 8A, 8B, 9A et 9B. 4 billets à 9 600 ₩ chacun, soit 38 400 ₩ au total."
        },
        {
          title: "Installation au hanok",
          time: "Après l'arrivée",
          detail: "Rejoindre Hanok Stay Leafy Dalshimnal, chambre Ondol, s'installer et profiter d'une fin de journée libre."
        }
      ]
    },
    {
      date: "2026-10-29",
      label: "29 OCT",
      place: "Gyeongju",
      title: "Gyeongju à vélo",
      text: "Journée complète consacrée à la boucle historique du centre de Gyeongju, avec des pauses pour déjeuner, prendre un café et faire des photos.",
      type: "explore",
      fixed: false,
      activities: [
        {
          title: "Daereungwon Tomb Complex",
          time: "Matin",
          detail: "Commencer la boucle par le complexe de tumulus royaux."
        },
        {
          title: "Inwang-dong Ancient Tombs of Silla",
          time: "Matin",
          detail: "Poursuivre la découverte des vestiges et des tombes anciennes de Silla."
        },
        {
          title: "Cheomseongdae",
          time: "Fin de matinée",
          detail: "Découvrir l'observatoire historique et ses environs."
        },
        {
          title: "Pause déjeuner et cafés",
          time: "Midi",
          detail: "Prévoir du temps pour déjeuner, faire une pause café et profiter des arrêts photo."
        },
        {
          title: "Gyochon Traditional Village",
          time: "Après-midi",
          detail: "Parcourir le village traditionnel et découvrir l'architecture locale."
        },
        {
          title: "Woljeonggyo Bridge",
          time: "Après-midi",
          detail: "Découvrir le pont traditionnel et les paysages autour de la rivière."
        },
        {
          title: "Donggung Palace & Wolji",
          time: "Option en soirée",
          detail: "Visite facultative si le timing et l'énergie du groupe le permettent."
        },
        {
          title: "Acorn Caricature",
          time: "Option",
          detail: "À intégrer uniquement si cela s'insère facilement dans le parcours."
        }
      ]
    },
    {
      date: "2026-10-30",
      label: "30 OCT",
      place: "Séoul",
      title: "Gyeongju → Séoul",
      text: "Départ matinal en train, arrivée à Séoul à 11:24 puis transfert vers l'hébergement. Après-midi disponible avant le mariage.",
      type: "travel",
      fixed: true,
      transportId: "2026-10-30",
      activities: [
        {
          title: "Check-out et départ pour la gare",
          time: "Matin",
          detail: "Quitter l'hébergement et rejoindre la gare suffisamment tôt pour le train."
        },
        {
          title: "KTX 018 : Gyeongju → Séoul",
          time: "09:14–11:24",
          detail: "Durée : 2 h 10 · Voiture 14 · Sièges 2A, 2B, 2C et 2D. 4 billets à 44 100 ₩ chacun, soit 176 400 ₩ au total."
        },
        {
          title: "Transfert vers l'hébergement",
          time: "Après 11:24",
          detail: "À l'arrivée à Séoul, rejoindre l'hébergement et déposer les bagages."
        },
        {
          title: "Après-midi libre à Séoul",
          time: "Après-midi",
          detail: "Temps disponible avant le mariage familial du lendemain."
        }
      ]
    },
    {
      date: "2026-10-31",
      label: "31 OCT",
      place: "Séoul",
      title: "Mariage de ton frère",
      text: "Journée réservée au mariage et aux célébrations familiales.",
      type: "event",
      fixed: true,
      activities: [
        { title: "Mariage familial", detail: "Journée réservée au mariage de ton frère." }
      ]
    },
    {
      date: "2026-11-01",
      label: "1 NOV",
      place: "Séoul",
      title: "Séoul",
      text: "Journée de découverte à organiser selon les envies et le rythme du groupe.",
      type: "explore",
      fixed: false,
      activities: []
    },
    {
      date: "2026-11-02",
      label: "2 NOV",
      place: "Séoul",
      title: "Séoul",
      text: "Prévoir des découvertes, des pauses café et de bonnes adresses gastronomiques.",
      type: "explore",
      fixed: false,
      activities: []
    },
    {
      date: "2026-11-03",
      label: "3 NOV",
      place: "Séoul",
      title: "Dernière journée complète",
      text: "Dernières découvertes, derniers repas et préparation du départ.",
      type: "explore",
      fixed: false,
      activities: []
    },
    {
      date: "2026-11-04",
      label: "4 NOV",
      place: "Séoul",
      title: "Retour",
      text: "Départ depuis l'aéroport d'Incheon. Horaire du vol : 13:20.",
      type: "travel",
      fixed: true,
      activities: [
        {
          title: "Vol retour depuis Incheon",
          time: "13:20",
          detail: "Départ depuis l'aéroport international d'Incheon (ICN)."
        }
      ]
    }
  ]
};
