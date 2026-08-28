// City lookup: "city_lowercase:CC" → [lon, lat]
const CITY_COORDS: Record<string, [number, number]> = {
  // United States
  'new york:US': [-74.006, 40.7128], 'los angeles:US': [-118.2437, 34.0522],
  'chicago:US': [-87.6298, 41.8781], 'houston:US': [-95.3698, 29.7604],
  'phoenix:US': [-112.074, 33.4484], 'philadelphia:US': [-75.1652, 39.9526],
  'san antonio:US': [-98.4936, 29.4241], 'san diego:US': [-117.1611, 32.7157],
  'dallas:US': [-96.797, 32.7767], 'san jose:US': [-121.8863, 37.3382],
  'austin:US': [-97.7431, 30.2672], 'san francisco:US': [-122.4194, 37.7749],
  'seattle:US': [-122.3321, 47.6062], 'denver:US': [-104.9903, 39.7392],
  'nashville:US': [-86.7816, 36.1627], 'washington:US': [-77.0369, 38.9072],
  'las vegas:US': [-115.1398, 36.1699], 'portland:US': [-122.6765, 45.5231],
  'boston:US': [-71.0589, 42.3601], 'detroit:US': [-83.0458, 42.3314],
  'atlanta:US': [-84.388, 33.749], 'miami:US': [-80.1918, 25.7617],
  'minneapolis:US': [-93.265, 44.9778], 'tampa:US': [-82.4572, 27.9506],
  'new orleans:US': [-90.0715, 29.9511], 'cleveland:US': [-81.6944, 41.4993],
  'pittsburgh:US': [-79.9959, 40.4406], 'st. louis:US': [-90.1994, 38.627],
  'st louis:US': [-90.1994, 38.627], 'salt lake city:US': [-111.891, 40.7608],
  'kansas city:US': [-94.5786, 39.0997], 'charlotte:US': [-80.8431, 35.2271],
  'raleigh:US': [-78.6382, 35.7796], 'omaha:US': [-95.9345, 41.2565],
  'richmond:US': [-77.436, 37.5407], 'columbus:US': [-82.9988, 39.9612],
  'indianapolis:US': [-86.1581, 39.7684], 'louisville:US': [-85.7585, 38.2527],
  'memphis:US': [-90.049, 35.1495], 'milwaukee:US': [-87.9065, 43.0389],
  'sacramento:US': [-121.4944, 38.5816], 'baltimore:US': [-76.6122, 39.2904],
  'oklahoma city:US': [-97.5164, 35.4676], 'albuquerque:US': [-106.6511, 35.0844],
  'tucson:US': [-110.9747, 32.2226], 'fresno:US': [-119.7871, 36.7378],
  'mesa:US': [-111.8315, 33.4152], 'virginia beach:US': [-76.0141, 36.8529],
  'colorado springs:US': [-104.8214, 38.8339], 'long beach:US': [-118.1937, 33.7701],
  'boise:US': [-116.2023, 43.615], 'madison:US': [-89.4012, 43.0731],
  'des moines:US': [-93.6091, 41.6005], 'spokane:US': [-117.426, 47.6588],
  'worcester:US': [-71.8023, 42.2626], 'hartford:US': [-72.6851, 41.7658],
  'buffalo:US': [-78.8784, 42.8864], 'rochester:US': [-77.6088, 43.1566],
  'birmingham:US': [-86.8025, 33.5186], 'little rock:US': [-92.2896, 34.7465],
  'knoxville:US': [-83.9207, 35.9606], 'akron:US': [-81.519, 41.0814],
  'jersey city:US': [-74.0776, 40.7282], 'orlando:US': [-81.3792, 28.5383],
  'fort worth:US': [-97.3308, 32.7555], 'el paso:US': [-106.485, 31.7619],
  'jacksonville:US': [-81.6557, 30.3322], 'durham:US': [-78.8986, 35.994],
  'greensboro:US': [-79.792, 36.0726], 'lexington:US': [-84.4947, 38.0406],
  'lincoln:US': [-96.6752, 40.8136], 'anchorage:US': [-149.9003, 61.2181],
  'plano:US': [-96.6989, 33.0198], 'henderson:US': [-114.9817, 36.0395],
  'baton rouge:US': [-91.1871, 30.4515], 'lubbock:US': [-101.8552, 33.5779],
  'irvine:US': [-117.8265, 33.6846], 'norfolk:US': [-76.2859, 36.8508],
  'garland:US': [-96.6389, 32.9126], 'glendale:US': [-112.186, 33.5387],
  'scottsdale:US': [-111.9261, 33.4942], 'irving:US': [-96.9489, 32.8141],
  'fremont:US': [-121.9886, 37.5485], 'gilbert:US': [-111.789, 33.3528],
  'san bernardino:US': [-117.2898, 34.1083], 'pasadena:US': [-95.2091, 29.6911],
  'sugar land:US': [-95.6349, 29.6197], 'pearland:US': [-95.286, 29.5635],
  'round rock:US': [-97.6789, 30.5083], 'mckinney:US': [-96.6397, 33.1972],
  'frisco:US': [-96.8236, 33.1507], 'allen:US': [-96.6705, 33.1032],
  'lewisville:US': [-96.9941, 33.0462], 'richardson:US': [-96.7298, 32.9483],
  'bellevue:US': [-122.2015, 47.6101], 'kirkland:US': [-122.2087, 47.6815],
  'renton:US': [-122.2176, 47.4829], 'redmond:US': [-122.1215, 47.674],
  'bothell:US': [-122.2059, 47.7601], 'cupertino:US': [-122.0322, 37.323],
  'mountain view:US': [-122.0838, 37.3861], 'menlo park:US': [-122.1817, 37.453],
  'palo alto:US': [-122.143, 37.4419], 'santa clara:US': [-121.9552, 37.3541],
  'sunnyvale:US': [-122.0363, 37.3688], 'san mateo:US': [-122.3255, 37.563],
  'foster city:US': [-122.266, 37.5585], 'burlingame:US': [-122.3649, 37.5841],
  'cedar park:US': [-97.8203, 30.5052], 'washougal:US': [-122.3548, 45.5849],
  'st. paul:US': [-93.09, 44.9537], 'st paul:US': [-93.09, 44.9537],
  'fort wayne:US': [-85.1394, 41.0793], 'chandler:US': [-111.8413, 33.3062],
  'cincinnati:US': [-84.512, 39.1031], 'north las vegas:US': [-115.1167, 36.1989],
  // Canada
  'toronto:CA': [-79.3832, 43.6532], 'montreal:CA': [-73.5673, 45.5017],
  'vancouver:CA': [-123.1207, 49.2827], 'calgary:CA': [-114.0719, 51.0447],
  'edmonton:CA': [-113.4909, 53.5461], 'ottawa:CA': [-75.6972, 45.4215],
  'winnipeg:CA': [-97.1384, 49.8951], 'quebec city:CA': [-71.208, 46.8139],
  'hamilton:CA': [-79.8711, 43.2557], 'kitchener:CA': [-80.4927, 43.4516],
  'london:CA': [-81.2453, 42.9849], 'victoria:CA': [-123.3656, 48.4284],
  'halifax:CA': [-63.5752, 44.6488], 'saskatoon:CA': [-106.67, 52.1579],
  'regina:CA': [-104.6178, 50.4452],
  // United Kingdom
  'london:GB': [-0.1276, 51.5074], 'manchester:GB': [-2.2426, 53.4808],
  'birmingham:GB': [-1.8904, 52.4862], 'leeds:GB': [-1.5491, 53.8008],
  'glasgow:GB': [-4.2518, 55.8642], 'edinburgh:GB': [-3.1883, 55.9533],
  'bristol:GB': [-2.5879, 51.4545], 'cardiff:GB': [-3.1791, 51.4816],
  'sheffield:GB': [-1.4659, 53.3811], 'liverpool:GB': [-2.9916, 53.4084],
  // France
  'paris:FR': [2.3522, 48.8566], 'marseille:FR': [5.3698, 43.2965],
  'lyon:FR': [4.8357, 45.764], 'toulouse:FR': [1.4442, 43.6047],
  'nice:FR': [7.262, 43.7102], 'nantes:FR': [-1.5534, 47.2184],
  'strasbourg:FR': [7.7521, 48.5734], 'bordeaux:FR': [-0.5792, 44.8378],
  // Germany
  'berlin:DE': [13.405, 52.52], 'hamburg:DE': [9.9937, 53.5753],
  'munich:DE': [11.582, 48.1351], 'cologne:DE': [6.9603, 50.9333],
  'frankfurt:DE': [8.6821, 50.1109], 'stuttgart:DE': [9.1829, 48.7758],
  'dusseldorf:DE': [6.7735, 51.2217], 'dortmund:DE': [7.4653, 51.5136],
  'essen:DE': [7.0116, 51.4556], 'leipzig:DE': [12.3731, 51.3397],
  'dresden:DE': [13.7373, 51.0504], 'hannover:DE': [9.7320, 52.3759],
  // Spain
  'madrid:ES': [-3.7038, 40.4168], 'barcelona:ES': [2.1734, 41.3851],
  'valencia:ES': [-0.3763, 39.4699], 'seville:ES': [-5.9845, 37.3891],
  'zaragoza:ES': [-0.8773, 41.6488], 'malaga:ES': [-4.4214, 36.7213],
  'bilbao:ES': [-2.9253, 43.263],
  // Italy
  'rome:IT': [12.4964, 41.9028], 'milan:IT': [9.19, 45.4654],
  'naples:IT': [14.2681, 40.8518], 'turin:IT': [7.6869, 45.0703],
  'florence:IT': [11.2558, 43.7696], 'bologna:IT': [11.3426, 44.4949],
  // Netherlands
  'amsterdam:NL': [4.9041, 52.3676], 'rotterdam:NL': [4.4777, 51.9244],
  'the hague:NL': [4.3007, 52.0705], 'utrecht:NL': [5.1214, 52.0907],
  // Belgium / Switzerland / Austria
  'brussels:BE': [4.3517, 50.8503], 'antwerp:BE': [4.4051, 51.2194],
  'zurich:CH': [8.5417, 47.3769], 'geneva:CH': [6.1432, 46.2044],
  'bern:CH': [7.4458, 46.9481], 'basel:CH': [7.5886, 47.5596],
  'vienna:AT': [16.3738, 48.2082], 'graz:AT': [15.4395, 47.0707],
  // Nordic
  'stockholm:SE': [18.0686, 59.3293], 'gothenburg:SE': [11.9746, 57.7089],
  'malmo:SE': [13.0038, 55.605], 'oslo:NO': [10.7522, 59.9139],
  'bergen:NO': [5.3221, 60.3913], 'copenhagen:DK': [12.5683, 55.6761],
  'aarhus:DK': [10.2039, 56.1629], 'helsinki:FI': [24.9384, 60.1699],
  'tampere:FI': [23.761, 61.4978],
  // Eastern Europe
  'warsaw:PL': [21.0122, 52.2297], 'krakow:PL': [19.945, 50.0647],
  'lodz:PL': [19.456, 51.7592], 'prague:CZ': [14.4208, 50.088],
  'brno:CZ': [16.6068, 49.1951], 'budapest:HU': [19.0402, 47.4979],
  'bucharest:RO': [26.1025, 44.4268], 'sofia:BG': [23.3219, 42.6977],
  'athens:GR': [23.7275, 37.9838], 'thessaloniki:GR': [22.9444, 40.6401],
  'lisbon:PT': [-9.1393, 38.7223], 'porto:PT': [-8.6291, 41.1579],
  'dublin:IE': [-6.2603, 53.3498], 'luxembourg:LU': [6.1296, 49.8153],
  'bratislava:SK': [17.1077, 48.1486], 'ljubljana:SI': [14.5058, 46.0569],
  'zagreb:HR': [15.9819, 45.815], 'belgrade:RS': [20.4651, 44.8176],
  'kyiv:UA': [30.5234, 50.4501], 'kharkiv:UA': [36.2304, 49.9935],
  'tallinn:EE': [24.7535, 59.437], 'riga:LV': [24.1052, 56.9496],
  'vilnius:LT': [25.2797, 54.6872], 'minsk:BY': [27.559, 53.9045],
  // Russia
  'moscow:RU': [37.6173, 55.7558], 'saint petersburg:RU': [30.3351, 59.9343],
  'novosibirsk:RU': [82.9346, 55.0084], 'yekaterinburg:RU': [60.6122, 56.8519],
  // Middle East
  'dubai:AE': [55.2708, 25.2048], 'abu dhabi:AE': [54.3773, 24.4539],
  'riyadh:SA': [46.6753, 24.6877], 'jeddah:SA': [39.1925, 21.4858],
  'tel aviv:IL': [34.7818, 32.0853], 'jerusalem:IL': [35.2137, 31.7683],
  'amman:JO': [35.9106, 31.9539], 'beirut:LB': [35.5018, 33.8938],
  'doha:QA': [51.531, 25.2854], 'kuwait city:KW': [47.9783, 29.3759],
  'tehran:IR': [51.389, 35.6892], 'istanbul:TR': [28.9784, 41.0082],
  'ankara:TR': [32.8597, 39.9334], 'cairo:EG': [31.2357, 30.0444],
  'casablanca:MA': [-7.5898, 33.5731], 'tunis:TN': [10.1815, 36.8065],
  'algiers:DZ': [3.0588, 36.7538],
  // Africa
  'lagos:NG': [3.3792, 6.5244], 'nairobi:KE': [36.8219, -1.2921],
  'johannesburg:ZA': [28.0473, -26.2041], 'cape town:ZA': [18.4241, -33.9249],
  'durban:ZA': [30.903, -29.8587], 'accra:GH': [-0.187, 5.6037],
  'addis ababa:ET': [38.7469, 9.032], 'dar es salaam:TZ': [39.2083, -6.7924],
  // Asia-Pacific
  'tokyo:JP': [139.6917, 35.6895], 'osaka:JP': [135.5023, 34.6937],
  'yokohama:JP': [139.638, 35.4437], 'nagoya:JP': [136.9066, 35.1815],
  'sapporo:JP': [141.3544, 43.0618], 'fukuoka:JP': [130.4017, 33.5904],
  'beijing:CN': [116.4074, 39.9042], 'shanghai:CN': [121.4737, 31.2304],
  'shenzhen:CN': [114.0579, 22.5431], 'guangzhou:CN': [113.2644, 23.1291],
  'chengdu:CN': [104.0668, 30.5728], 'hangzhou:CN': [120.1551, 30.2741],
  'wuhan:CN': [114.3054, 30.5928], 'nanjing:CN': [118.7969, 32.0603],
  'chongqing:CN': [106.5516, 29.563], 'tianjin:CN': [117.1902, 39.1256],
  'suzhou:CN': [120.5853, 31.2989], 'hong kong:HK': [114.1694, 22.3193],
  'seoul:KR': [126.978, 37.5665], 'busan:KR': [129.0756, 35.1796],
  'incheon:KR': [126.7052, 37.4563], 'taipei:TW': [121.5654, 25.033],
  'singapore:SG': [103.8198, 1.3521], 'kuala lumpur:MY': [101.6869, 3.139],
  'bangkok:TH': [100.5018, 13.7563], 'jakarta:ID': [106.8456, -6.2088],
  'manila:PH': [120.9842, 14.5995], 'ho chi minh city:VN': [106.6297, 10.8231],
  'hanoi:VN': [105.8544, 21.0285],
  'mumbai:IN': [72.8777, 19.076], 'delhi:IN': [77.1025, 28.7041],
  'new delhi:IN': [77.209, 28.6139], 'bangalore:IN': [77.5946, 12.9716],
  'bengaluru:IN': [77.5946, 12.9716], 'hyderabad:IN': [78.4867, 17.385],
  'chennai:IN': [80.2707, 13.0827], 'kolkata:IN': [88.3639, 22.5726],
  'pune:IN': [73.8567, 18.5204], 'ahmedabad:IN': [72.5714, 23.0225],
  'karachi:PK': [67.0099, 24.8607], 'lahore:PK': [74.3587, 31.5204],
  'islamabad:PK': [73.0479, 33.6844], 'dhaka:BD': [90.3563, 23.8103],
  'sydney:AU': [151.2093, -33.8688], 'melbourne:AU': [144.9631, -37.8136],
  'brisbane:AU': [153.0251, -27.4698], 'perth:AU': [115.8613, -31.9505],
  'adelaide:AU': [138.6007, -34.9285], 'auckland:NZ': [174.7633, -36.8485],
  // Latin America
  'sao paulo:BR': [-46.6333, -23.5505], 'rio de janeiro:BR': [-43.1729, -22.9068],
  'brasilia:BR': [-47.9292, -15.7942], 'belo horizonte:BR': [-43.9378, -19.9191],
  'curitiba:BR': [-49.2654, -25.4284], 'porto alegre:BR': [-51.2177, -30.0346],
  'mexico city:MX': [-99.1332, 19.4326], 'guadalajara:MX': [-103.3496, 20.6597],
  'monterrey:MX': [-100.3162, 25.6866], 'puebla:MX': [-98.2063, 19.0414],
  'buenos aires:AR': [-58.3816, -34.6037], 'cordoba:AR': [-64.1888, -31.4201],
  'bogota:CO': [-74.0721, 4.711], 'medellin:CO': [-75.5636, 6.2442],
  'lima:PE': [-77.0428, -12.0464], 'santiago:CL': [-70.6693, -33.4489],
  'quito:EC': [-78.4678, -0.1807], 'la paz:BO': [-68.1193, -16.5],
  'montevideo:UY': [-56.1882, -34.9011], 'caracas:VE': [-66.9036, 10.4806],
  'havana:CU': [-82.3666, 23.1136], 'panama city:PA': [-79.5197, 8.9936],
  'san jose:CR': [-84.0907, 9.9281], 'guatemala city:GT': [-90.5069, 14.6349],
};

const COUNTRY_CENTROIDS: Record<string, [number, number]> = {
  AF: [67.71, 33.939], AL: [20.168, 41.153], DZ: [1.66, 28.034],
  AO: [17.874, -11.203], AR: [-63.617, -38.416], AM: [45.038, 40.069],
  AU: [133.775, -25.274], AT: [14.55, 47.516], AZ: [47.577, 40.143],
  BD: [90.356, 23.685], BY: [27.953, 53.71], BE: [4.47, 50.504],
  BZ: [-88.498, 17.19], BJ: [2.316, 9.308], BO: [-64.991, -16.29],
  BA: [17.679, 43.916], BW: [24.685, -22.329], BR: [-51.925, -14.235],
  BG: [25.486, 42.734], BF: [-1.562, 12.364], BI: [29.919, -3.373],
  KH: [104.991, 12.566], CM: [12.355, 7.37], CA: [-96.797, 56.13],
  CF: [20.939, 6.611], TD: [18.732, 15.454], CL: [-71.543, -35.675],
  CN: [104.195, 35.862], CO: [-74.297, 4.571], CG: [15.828, -0.228],
  CD: [24.685, -4.038], CR: [-83.753, 9.749], HR: [15.2, 45.1],
  CU: [-79.52, 21.522], CY: [33.43, 35.126], CZ: [15.473, 49.818],
  DK: [9.502, 56.264], DJ: [42.59, 11.825], DO: [-70.163, 18.736],
  EC: [-78.183, -1.831], EG: [30.803, 26.821], SV: [-88.897, 13.794],
  EE: [25.014, 58.595], ET: [40.49, 9.145], FI: [25.748, 61.924],
  FR: [2.214, 46.228], GA: [11.609, -0.804], GE: [43.357, 42.315],
  DE: [10.452, 51.166], GH: [-1.023, 7.947], GR: [21.824, 39.074],
  GT: [-90.231, 15.784], GN: [-11.341, 9.946], GW: [-15.18, 11.804],
  GY: [-58.93, 4.86], HT: [-72.285, 18.971], HN: [-86.242, 15.2],
  HU: [19.503, 47.163], IS: [-19.021, 64.963], IN: [78.963, 20.594],
  ID: [113.921, -0.789], IR: [53.688, 32.428], IQ: [43.679, 33.223],
  IE: [-8.244, 53.413], IL: [34.852, 31.046], IT: [12.567, 41.872],
  JM: [-77.298, 18.11], JP: [138.253, 36.205], JO: [36.238, 30.585],
  KZ: [66.924, 48.02], KE: [37.906, -0.024], KP: [127.51, 40.34],
  KR: [127.767, 35.908], KW: [47.482, 29.312], KG: [74.766, 41.204],
  LA: [102.496, 19.856], LV: [24.603, 56.88], LB: [35.862, 33.855],
  LS: [28.234, -29.61], LR: [-9.43, 6.428], LY: [17.228, 26.335],
  LT: [23.881, 55.169], LU: [6.13, 49.815], MK: [21.745, 41.609],
  MG: [46.869, -18.767], MW: [34.302, -13.254], MY: [109.698, 4.211],
  ML: [-3.996, 17.571], MT: [14.375, 35.938], MR: [-10.941, 21.008],
  MX: [-102.553, 23.635], MD: [28.37, 47.412], MN: [103.847, 46.863],
  ME: [19.374, 42.709], MA: [-7.093, 31.792], MZ: [35.53, -18.666],
  MM: [95.956, 21.916], NA: [18.49, -22.958], NP: [84.124, 28.395],
  NL: [5.291, 52.133], NZ: [174.886, -40.901], NI: [-85.207, 12.865],
  NE: [8.082, 17.608], NG: [8.675, 9.082], NO: [8.469, 60.472],
  OM: [55.975, 21.513], PK: [69.345, 30.375], PA: [-80.782, 8.538],
  PG: [143.956, -6.315], PY: [-58.444, -23.443], PE: [-75.015, -9.19],
  PH: [121.774, 12.88], PL: [19.145, 51.919], PT: [-8.225, 39.4],
  QA: [51.184, 25.355], RO: [24.967, 45.943], RU: [105.319, 61.524],
  RW: [29.874, -1.94], SA: [45.079, 23.886], SN: [-14.452, 14.497],
  RS: [21.006, 44.017], SC: [55.492, -4.68], SL: [-11.78, 8.461],
  SG: [103.82, 1.352], SK: [19.699, 48.669], SI: [14.996, 46.151],
  SO: [46.2, 5.152], ZA: [22.938, -30.56], SS: [31.307, 6.877],
  ES: [-3.749, 40.464], LK: [80.772, 7.873], SD: [29.919, 12.863],
  SR: [-56.028, 3.919], SE: [18.644, 60.128], CH: [8.228, 46.818],
  SY: [38.997, 34.802], TW: [120.961, 23.698], TJ: [71.276, 38.861],
  TZ: [34.889, -6.369], TH: [100.993, 15.87], TL: [125.728, -8.874],
  TG: [0.825, 8.62], TT: [-61.223, 10.692], TN: [9.538, 33.887],
  TR: [35.243, 38.964], TM: [58.779, 38.97], UG: [32.29, 1.373],
  UA: [31.166, 48.379], AE: [53.848, 23.424], GB: [-3.436, 55.378],
  US: [-95.713, 37.09], UY: [-55.766, -32.523], UZ: [64.585, 41.378],
  VE: [-66.59, 6.424], VN: [108.277, 14.058], YE: [47.587, 15.553],
  ZM: [27.849, -13.134], ZW: [29.155, -19.015],
};

/** Deterministic 32-bit hash — same input always yields the same value. */
function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Privacy jitter, deterministic per victim: the same record always lands on the
 * same spot instead of hopping around every time the 4h cache is rebuilt.
 * `axis` (0 = lng, 1 = lat) decorrelates the two components.
 */
function jitter(seed: string, axis: number, amplitude: number): number {
  const h = hashSeed(`${seed}#${axis}`);
  return ((h / 0xffffffff) - 0.5) * 2 * amplitude;
}

/** ~5 km — enough to blur an exact address, small enough to stay inside the city. */
const CITY_JITTER = 0.05;
/** ~40 km — country centroids are approximate anyway, spread the cluster out. */
const COUNTRY_JITTER = 0.4;

// Maps full country names (and common variants) to ISO 3166-1 alpha-2 codes.
// Used when the API returns victimCountry (name) instead of / in addition to victimCC (code).
const COUNTRY_NAME_TO_CC: Record<string, string> = {
  'afghanistan': 'AF', 'albania': 'AL', 'algeria': 'DZ', 'angola': 'AO',
  'argentina': 'AR', 'armenia': 'AM', 'australia': 'AU', 'austria': 'AT',
  'azerbaijan': 'AZ', 'bahrain': 'BH', 'bangladesh': 'BD', 'belarus': 'BY',
  'belgium': 'BE', 'belize': 'BZ', 'benin': 'BJ', 'bolivia': 'BO',
  'bosnia and herzegovina': 'BA', 'bosnia': 'BA', 'botswana': 'BW',
  'brazil': 'BR', 'bulgaria': 'BG', 'burkina faso': 'BF', 'burundi': 'BI',
  'cambodia': 'KH', 'cameroon': 'CM', 'canada': 'CA',
  'central african republic': 'CF', 'chad': 'TD', 'chile': 'CL',
  'china': 'CN', "people's republic of china": 'CN', 'colombia': 'CO',
  'congo': 'CG', 'democratic republic of the congo': 'CD', 'dr congo': 'CD',
  'costa rica': 'CR', 'croatia': 'HR', 'cuba': 'CU', 'cyprus': 'CY',
  'czech republic': 'CZ', 'czechia': 'CZ', 'denmark': 'DK', 'djibouti': 'DJ',
  'dominican republic': 'DO', 'ecuador': 'EC', 'egypt': 'EG',
  'el salvador': 'SV', 'estonia': 'EE', 'ethiopia': 'ET', 'finland': 'FI',
  'france': 'FR', 'gabon': 'GA', 'georgia': 'GE', 'germany': 'DE',
  'ghana': 'GH', 'greece': 'GR', 'guatemala': 'GT', 'guinea': 'GN',
  'guinea-bissau': 'GW', 'guyana': 'GY', 'haiti': 'HT', 'honduras': 'HN',
  'hungary': 'HU', 'iceland': 'IS', 'india': 'IN', 'indonesia': 'ID',
  'iran': 'IR', 'iraq': 'IQ', 'ireland': 'IE', 'israel': 'IL', 'italy': 'IT',
  'jamaica': 'JM', 'japan': 'JP', 'jordan': 'JO', 'kazakhstan': 'KZ',
  'kenya': 'KE', 'north korea': 'KP', 'south korea': 'KR', 'korea': 'KR',
  'kuwait': 'KW', 'kyrgyzstan': 'KG', 'laos': 'LA', 'latvia': 'LV',
  'lebanon': 'LB', 'lesotho': 'LS', 'liberia': 'LR', 'libya': 'LY',
  'lithuania': 'LT', 'luxembourg': 'LU', 'north macedonia': 'MK',
  'madagascar': 'MG', 'malawi': 'MW', 'malaysia': 'MY', 'mali': 'ML',
  'malta': 'MT', 'mauritania': 'MR', 'mexico': 'MX', 'moldova': 'MD',
  'mongolia': 'MN', 'montenegro': 'ME', 'morocco': 'MA', 'mozambique': 'MZ',
  'myanmar': 'MM', 'namibia': 'NA', 'nepal': 'NP', 'netherlands': 'NL',
  'new zealand': 'NZ', 'nicaragua': 'NI', 'niger': 'NE', 'nigeria': 'NG',
  'norway': 'NO', 'oman': 'OM', 'pakistan': 'PK', 'panama': 'PA',
  'papua new guinea': 'PG', 'paraguay': 'PY', 'peru': 'PE',
  'philippines': 'PH', 'poland': 'PL', 'portugal': 'PT', 'qatar': 'QA',
  'romania': 'RO', 'russia': 'RU', 'russian federation': 'RU', 'rwanda': 'RW',
  'saudi arabia': 'SA', 'senegal': 'SN', 'serbia': 'RS', 'seychelles': 'SC',
  'sierra leone': 'SL', 'singapore': 'SG', 'slovakia': 'SK', 'slovenia': 'SI',
  'somalia': 'SO', 'south africa': 'ZA', 'south sudan': 'SS', 'spain': 'ES',
  'sri lanka': 'LK', 'sudan': 'SD', 'suriname': 'SR', 'sweden': 'SE',
  'switzerland': 'CH', 'syria': 'SY', 'taiwan': 'TW', 'tajikistan': 'TJ',
  'tanzania': 'TZ', 'thailand': 'TH', 'timor-leste': 'TL', 'togo': 'TG',
  'trinidad and tobago': 'TT', 'tunisia': 'TN', 'turkey': 'TR',
  'turkmenistan': 'TM', 'uganda': 'UG', 'ukraine': 'UA',
  'united arab emirates': 'AE', 'uae': 'AE',
  'united kingdom': 'GB', 'uk': 'GB', 'great britain': 'GB',
  'united states': 'US', 'usa': 'US', 'united states of america': 'US',
  'uruguay': 'UY', 'uzbekistan': 'UZ', 'venezuela': 'VE', 'vietnam': 'VN',
  'viet nam': 'VN', 'yemen': 'YE', 'zambia': 'ZM', 'zimbabwe': 'ZW',
  // Extra common ones
  'hong kong': 'HK', 'macau': 'MO', 'palestine': 'PS', 'kosovo': 'XK',
  'puerto rico': 'PR', 'bahamas': 'BS', 'barbados': 'BB', 'bermuda': 'BM',
  'cayman islands': 'KY', 'liechtenstein': 'LI', 'monaco': 'MC',
  'san marino': 'SM', 'andorra': 'AD',
  'trinidad & tobago': 'TT', 'republic of ireland': 'IE',
  'republic of korea': 'KR', 'republic of the philippines': 'PH',
};

export function countryNameToCC(name: string | null): string | null {
  if (!name) return null;
  return COUNTRY_NAME_TO_CC[name.toLowerCase().trim()] ?? null;
}

// ── Live city resolution ────────────────────────────────────────────────────
// The static table above covers ~300 large cities. Anything else (Parma IT,
// Aarau CH, Tulsa US …) silently fell back to the country centroid, so a popup
// could read "Parma, PR, IT" while the dot sat in the middle of Italy.
// Unknown cities are now resolved against the Open-Meteo geocoding API (free,
// no key) and memoised process-wide, including negative results.

type LatLng = [number, number];

declare global {
  var __depCityGeocodeCache: Map<string, LatLng | null> | undefined;
}
const cityCache: Map<string, LatLng | null> = (globalThis.__depCityGeocodeCache ??= new Map());

const GEOCODE_ENDPOINT = 'https://geocoding-api.open-meteo.com/v1/search';
const GEOCODE_CONCURRENCY = 5;
const GEOCODE_TIMEOUT_MS = 5000;
/** Hard ceiling on live lookups per privlist rebuild (i.e. once every 4h). */
const GEOCODE_MAX_PER_RUN = 200;

function liveGeocodeEnabled(): boolean {
  return process.env.DEP_LIVE_GEOCODE !== 'false';
}

/** Strips accents, punctuation and common prefixes so "Parma," === "parma". */
function normalizeCity(city: string): string {
  return city
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/^(city|town|municipality|comune|commune) of /, '')
    .replace(/[.,;]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Cache key. Includes the state/province: "Springfield, IL" and
 * "Springfield, MA" are different places and must not share a cache entry.
 */
export function cityKey(city: string, cc: string, state: string | null): string {
  return `${normalizeCity(city)}:${cc.toUpperCase()}:${state ? normalizeCity(state) : ''}`;
}

/** US states / CA provinces are usually 2-letter codes; the geocoder returns full names. */
const SUBDIVISION_NAMES: Record<string, string> = {
  'US:AL': 'alabama', 'US:AK': 'alaska', 'US:AZ': 'arizona', 'US:AR': 'arkansas',
  'US:CA': 'california', 'US:CO': 'colorado', 'US:CT': 'connecticut', 'US:DE': 'delaware',
  'US:DC': 'district of columbia', 'US:FL': 'florida', 'US:GA': 'georgia', 'US:HI': 'hawaii',
  'US:ID': 'idaho', 'US:IL': 'illinois', 'US:IN': 'indiana', 'US:IA': 'iowa',
  'US:KS': 'kansas', 'US:KY': 'kentucky', 'US:LA': 'louisiana', 'US:ME': 'maine',
  'US:MD': 'maryland', 'US:MA': 'massachusetts', 'US:MI': 'michigan', 'US:MN': 'minnesota',
  'US:MS': 'mississippi', 'US:MO': 'missouri', 'US:MT': 'montana', 'US:NE': 'nebraska',
  'US:NV': 'nevada', 'US:NH': 'new hampshire', 'US:NJ': 'new jersey', 'US:NM': 'new mexico',
  'US:NY': 'new york', 'US:NC': 'north carolina', 'US:ND': 'north dakota', 'US:OH': 'ohio',
  'US:OK': 'oklahoma', 'US:OR': 'oregon', 'US:PA': 'pennsylvania', 'US:RI': 'rhode island',
  'US:SC': 'south carolina', 'US:SD': 'south dakota', 'US:TN': 'tennessee', 'US:TX': 'texas',
  'US:UT': 'utah', 'US:VT': 'vermont', 'US:VA': 'virginia', 'US:WA': 'washington',
  'US:WV': 'west virginia', 'US:WI': 'wisconsin', 'US:WY': 'wyoming',
  'CA:AB': 'alberta', 'CA:BC': 'british columbia', 'CA:MB': 'manitoba',
  'CA:NB': 'new brunswick', 'CA:NL': 'newfoundland and labrador', 'CA:NS': 'nova scotia',
  'CA:NT': 'northwest territories', 'CA:NU': 'nunavut', 'CA:ON': 'ontario',
  'CA:PE': 'prince edward island', 'CA:QC': 'quebec', 'CA:SK': 'saskatchewan',
  'CA:YT': 'yukon',
};

/** The state as given, plus its expanded name when it is a known 2-letter code. */
function stateAliases(state: string | null, cc: string): string[] {
  if (!state) return [];
  const norm = normalizeCity(state);
  const full = SUBDIVISION_NAMES[`${cc.toUpperCase()}:${state.toUpperCase().trim()}`];
  return full ? [norm, full] : [norm];
}

/** Static-table hit, tolerant of "St." / "Saint" and accented spellings. */
function staticCityCoords(city: string, cc: string): LatLng | undefined {
  const name = normalizeCity(city);
  const variants = [
    name,
    name.replace(/^st /, 'st. '),
    name.replace(/^st\. /, 'st '),
    name.replace(/^saint /, 'st '),
  ];
  for (const v of variants) {
    const c = CITY_COORDS[`${v}:${cc.toUpperCase()}`];
    if (c) return c;
  }
  return undefined;
}

interface OpenMeteoResult {
  name: string;
  latitude: number;
  longitude: number;
  country_code?: string;
  admin1?: string;
  admin2?: string;
  population?: number;
}

/**
 * Picks the best candidate for a city: it must sit in the expected country, and
 * a match on the victim's state/province beats raw population (many countries
 * have several same-named towns).
 */
function pickBest(results: OpenMeteoResult[], cc: string, state: string | null): OpenMeteoResult | null {
  const inCountry = results.filter(r => (r.country_code || '').toUpperCase() === cc.toUpperCase());
  if (inCountry.length === 0) return null;

  const wanted = stateAliases(state, cc);
  const scored = inCountry.map(r => {
    let score = 0;
    if (wanted.length > 0) {
      const admins = [r.admin1, r.admin2].filter(Boolean).map(a => normalizeCity(a!));
      const hit = admins.some(a => wanted.some(w => a === w || a.includes(w) || w.includes(a)));
      if (hit) score += 1_000_000;
    }
    return { r, score: score + (r.population ?? 0) };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0].r;
}

async function fetchCityCoords(city: string, cc: string, state: string | null): Promise<LatLng | null> {
  const url = `${GEOCODE_ENDPOINT}?name=${encodeURIComponent(normalizeCity(city))}&count=10&language=en&format=json`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(GEOCODE_TIMEOUT_MS) });
    if (!res.ok) return null;
    const data = await res.json();
    const best = pickBest(Array.isArray(data?.results) ? data.results : [], cc, state);
    return best ? [best.longitude, best.latitude] : null;
  } catch {
    return null; // offline / rate limited / timeout — the country fallback still applies
  }
}

export interface CityLookup {
  city: string | null;
  cc: string | null;
  state: string | null;
}

/**
 * Resolves every city not already known (statically or from a previous run) and
 * memoises the result. Bounded by `budgetMs` so a slow geocoding API can never
 * stall the privlist response — anything left unresolved simply keeps the
 * country-level fallback until the next rebuild.
 */
export async function warmCityGeocodeCache(lookups: CityLookup[], budgetMs = 8000): Promise<number> {
  if (!liveGeocodeEnabled()) return 0;

  const pending = new Map<string, { city: string; cc: string; state: string | null }>();
  for (const l of lookups) {
    if (!l.city || !l.cc) continue;
    const key = cityKey(l.city, l.cc, l.state);
    if (staticCityCoords(l.city, l.cc) || cityCache.has(key) || pending.has(key)) continue;
    pending.set(key, { city: l.city, cc: l.cc, state: l.state });
  }

  const queue = [...pending.entries()].slice(0, GEOCODE_MAX_PER_RUN);
  if (queue.length === 0) return 0;

  const deadline = Date.now() + budgetMs;
  let cursor = 0;
  let resolved = 0;

  async function worker(): Promise<void> {
    while (cursor < queue.length && Date.now() < deadline) {
      const [key, lookup] = queue[cursor++];
      const coords = await fetchCityCoords(lookup.city, lookup.cc, lookup.state);
      cityCache.set(key, coords);
      if (coords) resolved++;
    }
  }

  await Promise.all(Array.from({ length: Math.min(GEOCODE_CONCURRENCY, queue.length) }, worker));
  console.log(`[DEP geocode] live lookups: ${queue.length} attempted, ${resolved} resolved, cache size ${cityCache.size}`);
  return resolved;
}

export function geocodeVictim(
  victimCity: string | null,
  victimCC: string | null,
  victimCountry: string | null = null,
  victimState: string | null = null,
  seed = '',
): { lat: number; lng: number; tier: 'city' | 'country' } | null {
  // Resolve CC from name if not provided directly
  const cc = victimCC ?? countryNameToCC(victimCountry);
  const jseed = seed || `${victimCity ?? ''}|${victimState ?? ''}|${cc ?? ''}`;

  if (victimCity && cc) {
    const c = staticCityCoords(victimCity, cc) ?? cityCache.get(cityKey(victimCity, cc, victimState)) ?? null;
    if (c) {
      return {
        lng: c[0] + jitter(jseed, 0, CITY_JITTER),
        lat: c[1] + jitter(jseed, 1, CITY_JITTER),
        tier: 'city',
      };
    }
  }
  if (cc) {
    const c = COUNTRY_CENTROIDS[cc.toUpperCase()];
    if (c) {
      return {
        lng: c[0] + jitter(jseed, 0, COUNTRY_JITTER),
        lat: c[1] + jitter(jseed, 1, COUNTRY_JITTER),
        tier: 'country',
      };
    }
  }
  return null;
}
