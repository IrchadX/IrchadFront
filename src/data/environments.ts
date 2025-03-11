const environments = [
  {
    id: "env-1",
    title: "Cyber",
    address:
      "Ecole Nationale Supérieure d'Informatique (ESI ex.INI), Alger, Oued Smar 16309",
    imgSrc: "/assets/admin/environments/env-map.png",
    geoData: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { type: "wall", description: "Outer wall" },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174571, 36.704788],
                [3.174504, 36.704667],
                [3.174768, 36.704576],
                [3.174834, 36.704699],
                [3.174571, 36.704788],
              ],
            ],
          },
        },
        {
          type: "Feature",
          properties: { type: "door", description: "Main door" },
          geometry: {
            type: "LineString",
            coordinates: [
              [3.174606, 36.704634],
              [3.174654, 36.704617],
            ],
          },
        },
        {
          type: "Feature",
          properties: { type: "window", description: "Window 1" },
          geometry: {
            type: "LineString",
            coordinates: [
              [3.174828, 36.704701],
              [3.174806, 36.704708],
            ],
          },
        },
        {
          type: "Feature",
          properties: { type: "wall", description: "", image: "" },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174541, 36.704734],
                [3.174601, 36.704708],
                [3.174647, 36.704749],
                [3.174638, 36.704765],
                [3.174571, 36.704788],
                [3.174541, 36.704734],
              ],
            ],
          },
        },
        {
          type: "Feature",
          properties: { type: "poi", description: "bureau", image: "" },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174744, 36.70465],
                [3.174722, 36.704604],
                [3.174747, 36.704595],
                [3.174767, 36.704643],
                [3.174744, 36.70465],
              ],
            ],
          },
        },
        {
          type: "Feature",
          properties: { type: "poi", description: "datashow", image: "" },
          geometry: {
            type: "LineString",
            coordinates: [
              [3.174812, 36.704666],
              [3.174788, 36.70462],
            ],
          },
        },
      ],
    },
    properties: {
      name: "Cyber",
      isPublic: true,
      userId: null,
      address:
        "Ecole Nationale Supérieure d'Informatique (ESI ex.INI), Alger, Oued Smar 16309",
    },
  },
  {
    id: "env-2",
    title: "ESI",
    address:
      "Ecole Nationale Supérieure d'Informatique (ESI ex.INI), Alger, Oued Smar 16309",
    imgSrc: "/assets/admin/environments/env-map.png",
    geoData: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174653, 36.704661],
                [3.175, 36.705],
                [3.176, 36.704],
              ],
            ],
          },
          properties: {
            name: "Zone 2",
            description: "This is another zone",
          },
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.173567, 36.704665],
                [3.173557, 36.704636],
                [3.173514, 36.704636],
                [3.173476, 36.704623],
                [3.173459, 36.704602],
                [3.173454, 36.704576],
                [3.173466, 36.704551],
                [3.173482, 36.704537],
                [3.173584, 36.704503],
                [3.173568, 36.704481],
                [3.173649, 36.704455],
                [3.173648, 36.704438],
                [3.173686, 36.704434],
                [3.17374, 36.704447],
                [3.173761, 36.70446],
                [3.173771, 36.704478],
                [3.173772, 36.704524],
                [3.173734, 36.704554],
                [3.173724, 36.704546],
                [3.173675, 36.704572],
                [3.17367, 36.704602],
                [3.173718, 36.704611],
                [3.173713, 36.704653],
                [3.17367, 36.70468],
                [3.173567, 36.704665],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "Bibliotheque",
            description:
              "Un espace dédié à la lecture, l'apprentissage et la recherche. ",
          },
          id: "feature-1741725997517",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.173621, 36.704568],
                [3.173595, 36.704541],
                [3.173709, 36.704483],
                [3.173743, 36.704516],
                [3.173621, 36.704568],
              ],
            ],
          },
          properties: {
            type: "poi",
            nom: "Tables",
            categorie: "Table",
            description: "",
          },
          id: "feature-1741726204717",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.173661, 36.704671],
                [3.173602, 36.704662],
                [3.173605, 36.70465],
                [3.173666, 36.704658],
                [3.173661, 36.704671],
              ],
            ],
          },
          properties: {
            type: "poi",
            nom: "Distributeur ",
            categorie: "Réfrigérateur",
            description: "",
          },
          id: "feature-1741726238917",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174095, 36.704782],
                [3.174028, 36.704653],
                [3.174388, 36.704538],
                [3.174458, 36.704662],
                [3.174095, 36.704782],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "Administration",
            description: "",
          },
          id: "feature-1741726563859",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174094, 36.704782],
                [3.174068, 36.704731],
                [3.17414, 36.704707],
                [3.174169, 36.704758],
                [3.174094, 36.704782],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "Bureau 1 ",
            description: "",
          },
          id: "feature-1741726650271",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174167, 36.704758],
                [3.174139, 36.704705],
                [3.174227, 36.704679],
                [3.174254, 36.704729],
                [3.174167, 36.704758],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "Bureau2",
            description: "Description de la zone",
          },
          id: "feature-1741726667953",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174309, 36.704711],
                [3.174279, 36.704665],
                [3.174431, 36.704613],
                [3.17446, 36.704664],
                [3.174309, 36.704711],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "Bureau3",
            description: "Description de la zone",
          },
          id: "feature-1741726681576",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174414, 36.704585],
                [3.174264, 36.704635],
                [3.174239, 36.704585],
                [3.174388, 36.704538],
                [3.174414, 36.704585],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "Bureau4",
            description: "",
          },
          id: "feature-1741726791882",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174263, 36.704636],
                [3.174215, 36.704651],
                [3.174183, 36.704601],
                [3.174238, 36.704584],
                [3.174263, 36.704636],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "Sanitaires",
            description: "",
          },
          id: "feature-1741726826031",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174184, 36.704602],
                [3.17421, 36.704652],
                [3.174052, 36.704701],
                [3.174028, 36.704652],
                [3.174184, 36.704602],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "Bureau5",
            description: "Description de la zone",
          },
          id: "feature-1741726870295",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174253, 36.70473],
                [3.174308, 36.704711],
                [3.174279, 36.704666],
                [3.17443, 36.704613],
                [3.174415, 36.704585],
                [3.174052, 36.704701],
                [3.174068, 36.704731],
                [3.174228, 36.704679],
                [3.174253, 36.70473],
              ],
            ],
          },
          properties: {
            type: "Zone de circulation",
            nom: "Hall",
            description: "",
          },
          id: "feature-1741727055321",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.173566, 36.704666],
                [3.173674, 36.70468],
                [3.173711, 36.704654],
                [3.173717, 36.704609],
                [3.17367, 36.704601],
                [3.173676, 36.704569],
                [3.173724, 36.704544],
                [3.173735, 36.704555],
                [3.173775, 36.704524],
                [3.173772, 36.704473],
                [3.173761, 36.704458],
                [3.173736, 36.704447],
                [3.173688, 36.704433],
                [3.173647, 36.704436],
                [3.173651, 36.704459],
                [3.173568, 36.704482],
                [3.173582, 36.704499],
                [3.173479, 36.704538],
                [3.173466, 36.704553],
                [3.173457, 36.704574],
                [3.173464, 36.704608],
                [3.173474, 36.704623],
                [3.173518, 36.704637],
                [3.173558, 36.704638],
                [3.173566, 36.704666],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "Bibliotheque",
            description: "",
          },
          id: "feature-1741729515220",
        },
      ],
      properties: {
        environment: {
          name: "ESI",
          isPublic: false,
          userId: "user-123",
        },
      },
    },
    properties: {
      name: "ESI",
      isPublic: false,
      userId: "user-123",
      address:
        "Ecole Nationale Supérieure d'Informatique (ESI ex.INI), Alger, Oued Smar 16309",
    },
  },
];

export default environments;
