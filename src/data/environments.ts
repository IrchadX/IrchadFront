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
          properties: {
            type: "wall",
            description: "Outer wall",
            image: "",
          },
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
          properties: {
            type: "door",
            description: "Main door",
            image: "",
          },
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
          properties: {
            type: "window",
            description: "Window 1",
            image: "",
          },
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
          properties: {
            type: "wall",
            description: "Inner wall",
            image: "",
          },
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
          properties: {
            type: "poi",
            description: "bureau",
            image: "",
          },
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
          properties: {
            type: "poi",
            description: "datashow",
            image: "",
          },
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
          properties: {
            type: "wall",
            description: "Outer wall",
          },
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
          properties: {
            type: "door",
            description: "Main door",
          },
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
          properties: {
            type: "window",
            description: "Window 1",
          },
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
          properties: {
            type: "wall",
            description: "",
            image: "",
          },
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
          properties: {
            type: "poi",
            description: "bureau",
            image: "",
          },
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
          properties: {
            type: "poi",
            description: "datashow",
            image: "",
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [3.174812, 36.704666],
              [3.174788, 36.70462],
            ],
          },
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174896, 36.704829],
                [3.174875, 36.704773],
                [3.175093, 36.704682],
                [3.175119, 36.704781],
                [3.17494, 36.704823],
                [3.174896, 36.704829],
              ],
            ],
          },
          properties: {
            type: "Zone de circulation",
            nom: "Nom de la zone",
            description: "Description de la zone",
          },
          id: "feature-1741734844930",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174571, 36.704786],
                [3.174506, 36.704666],
                [3.174769, 36.704577],
                [3.174834, 36.704701],
                [3.174571, 36.704786],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "Cyber",
            description: "",
          },
          id: "feature-1741735261456",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174094, 36.704782],
                [3.17419, 36.704751],
                [3.174163, 36.704697],
                [3.174064, 36.704724],
                [3.174094, 36.704782],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "bureau1",
            description: "",
          },
          id: "feature-1741735293748",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174166, 36.704698],
                [3.174226, 36.704678],
                [3.174259, 36.704728],
                [3.174191, 36.704752],
                [3.174166, 36.704698],
              ],
            ],
          },
          properties: {
            type: "zone",
            nom: "bureau2",
            description: "",
          },
          id: "feature-1741735307062",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174053, 36.704697],
                [3.17403, 36.704654],
                [3.174101, 36.70463],
                [3.174127, 36.704676],
                [3.174053, 36.704697],
              ],
            ],
          },
          properties: {
            type: "zone",
            nom: "bureau3",
            description: "",
          },
          id: "feature-1741735340785",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174129, 36.704677],
                [3.174214, 36.704649],
                [3.17419, 36.7046],
                [3.1741, 36.70463],
                [3.174129, 36.704677],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "bureau4",
            description: "Description de la zone",
          },
          id: "feature-1741735361636",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174216, 36.704649],
                [3.174296, 36.704627],
                [3.174271, 36.704574],
                [3.174191, 36.704602],
                [3.174216, 36.704649],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "WC",
            description: "Description de la zone",
          },
          id: "feature-1741735383474",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174217, 36.70461],
                [3.174211, 36.704601],
                [3.174236, 36.704596],
                [3.174241, 36.704608],
                [3.174217, 36.70461],
              ],
            ],
          },
          properties: {
            type: "poi",
            nom: "WC",
            categorie: "WC",
            description: "",
          },
          id: "feature-1741735400246",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174292, 36.704619],
                [3.174278, 36.704623],
                [3.174264, 36.704601],
                [3.174281, 36.704593],
                [3.174292, 36.704619],
              ],
            ],
          },
          properties: {
            type: "poi",
            nom: "Lavabo",
            categorie: "Lavabo",
            description: "Description du POI",
          },
          id: "feature-1741735427173",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174314, 36.70471],
                [3.174286, 36.704661],
                [3.174432, 36.704612],
                [3.174459, 36.704663],
                [3.174314, 36.70471],
              ],
            ],
          },
          properties: {
            type: "poi",
            nom: "bureau6",
            categorie: "Bureau",
            description: "Description du POI",
          },
          id: "feature-1741735445495",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174322, 36.704706],
                [3.174294, 36.70466],
                [3.174427, 36.704608],
                [3.174459, 36.704661],
                [3.174322, 36.704706],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "bureau6",
            description: "Description de la zone",
          },
          id: "feature-1741735471529",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.174258, 36.704727],
                [3.174323, 36.704706],
                [3.17429, 36.704659],
                [3.174429, 36.704607],
                [3.174387, 36.704537],
                [3.174274, 36.704573],
                [3.174296, 36.704628],
                [3.174052, 36.704698],
                [3.174064, 36.704722],
                [3.174226, 36.704678],
                [3.174258, 36.704727],
              ],
            ],
          },
          properties: {
            type: "Zone de circulation",
            nom: "hall",
            description: "",
          },
          id: "feature-1741735494226",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.173556, 36.704638],
                [3.173568, 36.704667],
                [3.17367, 36.704679],
                [3.173714, 36.704653],
                [3.17372, 36.70461],
                [3.17367, 36.704603],
                [3.173674, 36.704572],
                [3.173725, 36.704546],
                [3.173736, 36.704553],
                [3.173771, 36.704524],
                [3.173773, 36.704477],
                [3.173762, 36.704461],
                [3.173737, 36.704445],
                [3.173691, 36.704435],
                [3.173649, 36.704438],
                [3.173649, 36.704457],
                [3.173567, 36.704482],
                [3.173586, 36.704502],
                [3.17348, 36.704536],
                [3.173464, 36.704552],
                [3.173456, 36.704575],
                [3.173463, 36.704605],
                [3.173477, 36.704623],
                [3.173517, 36.704637],
                [3.173556, 36.704638],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "Biblotheque",
            description: "Description de la zone",
          },
          id: "feature-1741737094329",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.173715, 36.704655],
                [3.173638, 36.704643],
                [3.173568, 36.704667],
                [3.173672, 36.704679],
                [3.173715, 36.704655],
              ],
            ],
          },
          properties: {
            type: "Zone de service",
            nom: "Buvette",
            description: "Description de la zone",
          },
          id: "feature-1741737285478",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.173669, 36.704675],
                [3.173661, 36.70467],
                [3.173673, 36.704657],
                [3.173686, 36.704658],
                [3.173669, 36.704675],
              ],
            ],
          },
          properties: {
            type: "poi",
            nom: "Distributeur",
            categorie: "Réfrigérateur",
            description: "Description du POI",
          },
          id: "feature-1741737662434",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.175116, 36.704618],
                [3.175068, 36.704616],
                [3.175094, 36.70456],
                [3.17512, 36.704579],
                [3.175116, 36.704618],
              ],
            ],
          },
          properties: {
            type: "zone",
            nom: "Nom de la zone",
            description: "Description de la zone",
          },
          id: "feature-1742687493350",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.17498, 36.704656],
                [3.174858, 36.704626],
                [3.174957, 36.704515],
                [3.175044, 36.704511],
                [3.175078, 36.704534],
                [3.17504, 36.704619],
                [3.17498, 36.704656],
              ],
            ],
          },
          properties: {
            type: "zone",
            nom: "Nom de la zone",
            description: "Description de la zone",
          },
          id: "feature-1742687531218",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.17498, 36.704604],
                [3.174969, 36.704591],
                [3.174988, 36.70456],
                [3.175016, 36.704577],
                [3.175016, 36.704608],
                [3.174998, 36.704625],
                [3.17498, 36.704604],
              ],
            ],
          },
          properties: {
            type: "poi",
            nom: "Nom du POI",
            categorie: "",
            description: "Description du POI",
          },
          id: "feature-1742687539965",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.175204, 36.704523],
                [3.17482, 36.704529],
                [3.174923, 36.704281],
                [3.175284, 36.704318],
                [3.175357, 36.704413],
                [3.175345, 36.704529],
                [3.175204, 36.704523],
              ],
            ],
          },
          properties: {
            type: "zone",
            nom: "Nom de la zone",
            description: "Description de la zone",
          },
          id: "feature-1742687626151",
        },
        {
          type: "polygon",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.175147, 36.704462],
                [3.174965, 36.704456],
                [3.174959, 36.704331],
                [3.175146, 36.704353],
                [3.175222, 36.70443],
                [3.175147, 36.704462],
              ],
            ],
          },
          properties: {
            type: "poi",
            nom: "Nom du POI",
            categorie: "",
            description: "Description du POI",
          },
          id: "feature-1742687639259",
        },
      ],
      properties: {
        environment: {
          name: "ESI",
          isPublic: false,
          userId: "user-123",
          address:
            "Ecole Nationale Supérieure d'Informatique (ESI ex.INI), Alger, Oued Smar 16309",
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
