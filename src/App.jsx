import React, { useState, useMemo } from "react";
import {
  Home, Camera, Sprout, CloudSun, TrendingUp, FlaskConical, MessageCircle,
  FileText, Tractor, ShoppingCart, BarChart3, Bell, MapPin, Droplets,
  Sun, CloudRain, Wind, ChevronRight, Globe, Edit2, Leaf, Wheat, Lock,
  Upload, ShieldCheck, AlertTriangle, Loader2, X, Info, Sparkles,
  Thermometer, Umbrella, Waves, ArrowLeft, LogOut, User, Volume2,
  Send, Mic, Search, CheckCircle2, Phone, Plus, Minus, Trash2,
  Droplet, TrendingDown, BellRing, BellOff, Bug, Ruler, Layers, Bot, ChevronDown
} from "lucide-react";

// ---------- Static data ----------

const LANGS = ["EN", "TE", "HI"];

const T = {
  EN: {
    greeting: "Namaste",
    tagline: "Here's how your farm looks today",
    nav: {
      home: "Home", disease: "Disease Detection", recommend: "Crop Recommendation",
      weather: "Smart Weather", market: "Market Prices", fertilizer: "Fertilizer Advisor",
      assistant: "AI Assistant", schemes: "Govt Schemes", equipment: "Equipment Rental",
      marketplace: "Marketplace", analytics: "Analytics", notifications: "Notifications",
    },
    profileCard: "Farm profile", editProfile: "Edit",
    weatherCard: "Weather", forecast7: "7-day forecast",
    seasonWheel: "Season wheel", tipCard: "Today's tip",
    nextTip: "Next tip", comingSoon: "Coming soon", comingSoonBody: "This module is next in the build queue.",
    rainAlert: "Rain alert", heatAlert: "Heatwave warning", allClear: "No weather alerts",
    daysSince: "Days since sowing", nextIrrigation: "Next irrigation", harvestWindow: "Harvest window",
  },
  TE: {
    greeting: "నమస్కారం",
    tagline: "ఈరోజు మీ పొలం పరిస్థితి ఇదిగో",
    nav: {
      home: "హోమ్", disease: "వ్యాధి గుర్తింపు", recommend: "పంట సిఫార్సు",
      weather: "వాతావరణం", market: "మార్కెట్ ధరలు", fertilizer: "ఎరువుల సలహా",
      assistant: "AI సహాయకుడు", schemes: "ప్రభుత్వ పథకాలు", equipment: "పరికరాల అద్దె",
      marketplace: "మార్కెట్‌ప్లేస్", analytics: "విశ్లేషణ", notifications: "నోటిఫికేషన్లు",
    },
    profileCard: "పొలం వివరాలు", editProfile: "మార్చు",
    weatherCard: "వాతావరణం", forecast7: "7-రోజుల సూచన",
    seasonWheel: "సీజన్ చక్రం", tipCard: "నేటి సలహా",
    nextTip: "తర్వాతి సలహా", comingSoon: "త్వరలో", comingSoonBody: "ఈ విభాగం తర్వాత అభివృద్ధి చేయబడుతుంది.",
    rainAlert: "వర్ష హెచ్చరిక", heatAlert: "వడగాలుల హెచ్చరిక", allClear: "హెచ్చరికలు లేవు",
    daysSince: "విత్తిన రోజుల నుండి", nextIrrigation: "తదుపరి నీటిపారుదల", harvestWindow: "కోత సమయం",
  },
  HI: {
    greeting: "नमस्ते",
    tagline: "आज आपके खेत की स्थिति यह है",
    nav: {
      home: "होम", disease: "रोग पहचान", recommend: "फसल सुझाव",
      weather: "मौसम", market: "बाज़ार भाव", fertilizer: "उर्वरक सलाह",
      assistant: "AI सहायक", schemes: "सरकारी योजनाएं", equipment: "उपकरण किराया",
      marketplace: "बाज़ार", analytics: "विश्लेषण", notifications: "सूचनाएं",
    },
    profileCard: "खेत की जानकारी", editProfile: "बदलें",
    weatherCard: "मौसम", forecast7: "7-दिन का पूर्वानुमान",
    seasonWheel: "ऋतु चक्र", tipCard: "आज की सलाह",
    nextTip: "अगली सलाह", comingSoon: "जल्द आ रहा है", comingSoonBody: "यह भाग अगले चरण में बनाया जाएगा.",
    rainAlert: "बारिश की चेतावनी", heatAlert: "लू की चेतावनी", allClear: "कोई चेतावनी नहीं",
    daysSince: "बुवाई के दिन", nextIrrigation: "अगली सिंचाई", harvestWindow: "कटाई का समय",
  },
};

const NAV = [
  { key: "home", icon: Home, active: true },
  { key: "disease", icon: Camera },
  { key: "recommend", icon: Sprout },
  { key: "weather", icon: CloudSun },
  { key: "market", icon: TrendingUp },
  { key: "fertilizer", icon: FlaskConical },
  { key: "assistant", icon: MessageCircle },
  { key: "schemes", icon: FileText },
  { key: "equipment", icon: Tractor },
  { key: "marketplace", icon: ShoppingCart },
  { key: "analytics", icon: BarChart3 },
  { key: "notifications", icon: Bell },
];

const SOIL_TYPES = ["Black soil", "Red soil", "Alluvial soil", "Laterite soil", "Sandy soil", "Clay soil"];

const SOIL_TYPES_I18N = {
  EN: { "Black soil": "Black soil", "Red soil": "Red soil", "Alluvial soil": "Alluvial soil", "Laterite soil": "Laterite soil", "Sandy soil": "Sandy soil", "Clay soil": "Clay soil" },
  TE: { "Black soil": "నల్ల నేల", "Red soil": "ఎర్ర నేల", "Alluvial soil": "ఒడ్డు నేల", "Laterite soil": "లాటరైట్ నేల", "Sandy soil": "ఇసుక నేల", "Clay soil": "జిగట నేల" },
  HI: { "Black soil": "काली मिट्टी", "Red soil": "लाल मिट्टी", "Alluvial soil": "जलोढ़ मिट्टी", "Laterite soil": "लैटेराइट मिट्टी", "Sandy soil": "रेतीली मिट्टी", "Clay soil": "चिकनी मिट्टी" },
};

const CROPS = ["Rice (paddy)", "Cotton", "Maize", "Groundnut", "Chilli", "Turmeric", "Wheat", "Sugarcane"];

const CROPS_I18N = {
  EN: { "Rice (paddy)": "Rice (paddy)", Cotton: "Cotton", Maize: "Maize", Groundnut: "Groundnut", Chilli: "Chilli", Turmeric: "Turmeric", Wheat: "Wheat", Sugarcane: "Sugarcane" },
  TE: { "Rice (paddy)": "వరి (వర్జం)", Cotton: "పత్తి", Maize: "మక్కజొన్న", Groundnut: "వేరుశనగ", Chilli: "మిరపకాయ", Turmeric: "పసుపు", Wheat: "గోధుమ", Sugarcane: "చెరకు" },
  HI: { "Rice (paddy)": "चावल (धान)", Cotton: "कपास", Maize: "मक्का", Groundnut: "मूंगफली", Chilli: "मिर्च", Turmeric: "हल्दी", Wheat: "गेहूं", Sugarcane: "गन्ना" },
};

const SEASONS = ["Kharif (Jun-Oct)", "Rabi (Oct-Mar)", "Zaid (Mar-Jun)"];

const SEASONS_I18N = {
  EN: { "Kharif (Jun-Oct)": "Kharif (Jun-Oct)", "Rabi (Oct-Mar)": "Rabi (Oct-Mar)", "Zaid (Mar-Jun)": "Zaid (Mar-Jun)" },
  TE: { "Kharif (Jun-Oct)": "ఖరీఫ్ (జూన్-అక్టో)", "Rabi (Oct-Mar)": "రబీ (అక్టో-మార్చి)", "Zaid (Mar-Jun)": "జైద్ (మార్చి-జూన్)" },
  HI: { "Kharif (Jun-Oct)": "खरीफ (जून-अक्तूबर)", "Rabi (Oct-Mar)": "रबी (अक्तूबर-मार्च)", "Zaid (Mar-Jun)": "जायद (मार्च-जून)" },
};

const CROP_PROFILES = [
  { name: "Rice (paddy)", soils: ["Alluvial soil", "Clay soil"], seasons: ["Kharif (Jun-Oct)"], rainfall: [900, 1600],
    why: { EN: "Needs standing water and heavy monsoon rain — thrives in clay/alluvial soil that holds moisture.", TE: "నిలిచిన నీరు మరియు భారీ వర్షం అవసరం — తేమను నిలుపుకునే జిగట/ఒడ్డు నేలలో బాగా పెరుగుతుంది.", HI: "खड़े पानी और भारी मानसूनी बारिश चाहिए — नमी बनाए रखने वाली चिकनी/जलोढ़ मिट्टी में अच्छी होती है." } },
  { name: "Cotton", soils: ["Black soil"], seasons: ["Kharif (Jun-Oct)"], rainfall: [500, 900],
    why: { EN: "Black soil retains just enough moisture without waterlogging, which cotton roots need.", TE: "నల్ల నేల నీరు నిలవకుండా అవసరమైన తేమను నిలుపుతుంది — పత్తి వేర్లకు ఇది సరిపోతుంది.", HI: "काली मिट्टी जलभराव के बिना ज़रूरी नमी बनाए रखती है, जो कपास की जड़ों के लिए ज़रूरी है." } },
  { name: "Maize", soils: ["Alluvial soil", "Red soil"], seasons: ["Kharif (Jun-Oct)", "Rabi (Oct-Mar)"], rainfall: [500, 1000],
    why: { EN: "Tolerates a wide rainfall range and grows in both main seasons.", TE: "విస్తృత వర్షపాత శ్రేణిని తట్టుకుంటుంది మరియు రెండు ప్రధాన సీజన్లలో పెరుగుతుంది.", HI: "व्यापक वर्षा सीमा सहन करता है और दोनों मुख्य मौसमों में उगता है." } },
  { name: "Groundnut", soils: ["Red soil", "Sandy soil"], seasons: ["Kharif (Jun-Oct)", "Zaid (Mar-Jun)"], rainfall: [400, 750],
    why: { EN: "Sandy/red soil drains well, which groundnut pods need to avoid rot.", TE: "ఇసుక/ఎర్ర నేల నీరు బాగా వెళ్తుంది — వేరుశనగ కాయలు కుళ్లకుండా ఉండటానికి ఇది అవసరం.", HI: "रेतीली/लाल मिट्टी अच्छी जल निकासी देती है, जो मूंगफली की फलियों को सड़ने से बचाती है." } },
  { name: "Chilli", soils: ["Black soil", "Red soil"], seasons: ["Rabi (Oct-Mar)", "Kharif (Jun-Oct)"], rainfall: [600, 1000],
    why: { EN: "Moderate rainfall with good drainage suits chilli across both seasons.", TE: "మంచి నీటి వెళ్లుదలతో మధ్యస్థ వర్షం మిరపకు రెండు సీజన్లలో సరిపోతుంది.", HI: "अच्छी जल निकासी के साथ मध्यम वर्षा मिर्च के लिए दोनों मौसमों में उपयुक्त है." } },
  { name: "Turmeric", soils: ["Red soil", "Laterite soil"], seasons: ["Kharif (Jun-Oct)"], rainfall: [1000, 1600],
    why: { EN: "Needs high rainfall and well-drained red/laterite soil for rhizome growth.", TE: "దుంప పెరుగుదలకు ఎక్కువ వర్షం మరియు నీరు బాగా వెళ్లే ఎర్ర/లాటరైట్ నేల అవసరం.", HI: "कंद वृद्धि के लिए अधिक वर्षा और अच्छी जल निकासी वाली लाल/लैटेराइट मिट्टी चाहिए." } },
  { name: "Wheat", soils: ["Alluvial soil", "Black soil"], seasons: ["Rabi (Oct-Mar)"], rainfall: [350, 700],
    why: { EN: "A cool-season, lower-rainfall crop suited to alluvial or black soil.", TE: "చల్లని సీజన్‌లో తక్కువ వర్షంతో పెరిగే పంట — ఒడ్డు లేదా నల్ల నేలకు సరిపోతుంది.", HI: "ठंडे मौसम, कम वर्षा वाली फसल — जलोढ़ या काली मिट्टी के लिए उपयुक्त." } },
  { name: "Sugarcane", soils: ["Alluvial soil", "Black soil"], seasons: ["Kharif (Jun-Oct)"], rainfall: [1200, 2000],
    why: { EN: "A thirsty, long-duration crop — needs high rainfall or reliable irrigation.", TE: "ఎక్కువ నీరు అవసరమయ్యే దీర్ఘకాలిక పంట — అధిక వర్షం లేదా నమ్మకమైన నీటిపారుదల కావాలి.", HI: "अधिक पानी चाहने वाली दीर्घकालिक फसल — भारी वर्षा या भरोसेमंद सिंचाई ज़रूरी." } },
];

const WEATHER_LABELS = {
  EN: {
    title: "Smart weather", subtitle: "Current conditions and irrigation guidance for",
    humidity: "Humidity", wind: "Wind", forecast7: "7-day forecast", rainChance: "Rain chance",
    sunnyMock: "Sunny", healthyMock: "Healthy", marketTrendMock: "Market trend",
    rainAlert: "Rain alert", rainAlertBody: "Rain is likely in the coming days — hold off on fertilizer application.",
    heatAlert: "Heatwave warning", heatAlertBody: "Temperatures may cross 40°C — irrigate early morning or evening only.",
    allClear: "No active alerts", allClearBody: "Conditions look normal for the week ahead.",
    irrigation: "Irrigation suggestion",
    skipToday: "Skip irrigation today — rain is likely.",
    heatIrrigate: "Irrigate early morning or evening to reduce evaporation loss.",
    normalSchedule: "Maintain your regular irrigation schedule.",
    nextGoodDay: "Best next irrigation day",
  },
  TE: {
    title: "వాతావరణం", subtitle: "ప్రస్తుత పరిస్థితులు మరియు నీటిపారుదల సలహా",
    humidity: "తేమ", wind: "గాలి", forecast7: "7-రోజుల సూచన", rainChance: "వర్ష అవకాశం",
    sunnyMock: "ఎండ", healthyMock: "ఆరోగ్యంగా ఉంది", marketTrendMock: "మార్కెట్ ధోరణి",
    rainAlert: "వర్ష హెచ్చరిక", rainAlertBody: "రాబోయే రోజుల్లో వర్షం అవకాశం — ఎరువులు వేయడం ఆపండి.",
    heatAlert: "వడగాలుల హెచ్చరిక", heatAlertBody: "ఉష్ణోగ్రత 40°C దాటవచ్చు — ఉదయం లేదా సాయంత్రం మాత్రమే నీరు పెట్టండి.",
    allClear: "హెచ్చరికలు లేవు", allClearBody: "ఈ వారం పరిస్థితులు సాధారణంగా ఉన్నాయి.",
    irrigation: "నీటిపారుదల సలహా",
    skipToday: "ఈరోజు నీరు పెట్టవద్దు — వర్షం అవకాశం ఉంది.",
    heatIrrigate: "బాష్పీభవనం తగ్గించడానికి ఉదయం లేదా సాయంత్రం నీరు పెట్టండి.",
    normalSchedule: "మీ సాధారణ నీటిపారుదల షెడ్యూల్‌ను కొనసాగించండి.",
    nextGoodDay: "తదుపరి మంచి నీటిపారుదల రోజు",
  },
  HI: {
    title: "मौसम", subtitle: "मौजूदा हालात और सिंचाई सलाह",
    humidity: "नमी", wind: "हवा", forecast7: "7-दिन का पूर्वानुमान", rainChance: "बारिश की संभावना",
    sunnyMock: "धूप", healthyMock: "स्वस्थ", marketTrendMock: "बाज़ार का रुझान",
    rainAlert: "बारिश की चेतावनी", rainAlertBody: "अगले कुछ दिनों में बारिश संभव है — उर्वरक डालना रोकें.",
    heatAlert: "लू की चेतावनी", heatAlertBody: "तापमान 40°C से ऊपर जा सकता है — केवल सुबह या शाम सिंचाई करें.",
    allClear: "कोई चेतावनी नहीं", allClearBody: "इस हफ्ते हालात सामान्य दिख रहे हैं.",
    irrigation: "सिंचाई सलाह",
    skipToday: "आज सिंचाई न करें — बारिश की संभावना है.",
    heatIrrigate: "वाष्पीकरण कम करने के लिए सुबह या शाम सिंचाई करें.",
    normalSchedule: "अपना सामान्य सिंचाई कार्यक्रम जारी रखें.",
    nextGoodDay: "अगला उपयुक्त सिंचाई दिन",
  },
};

const RECOMMEND_LABELS = {
  EN: {
    title: "Crop recommendation", subtitle: "Tell us your conditions and we'll suggest the best-fit crops",
    soil: "Soil type", season: "Season", rainfall: "Expected rainfall (mm)", location: "Location",
    submit: "Recommend crops", match: "Match", why: "Why this crop",
  },
  TE: {
    title: "పంట సిఫార్సు", subtitle: "మీ పరిస్థితులు చెప్పండి, సరిపోయే పంటలను సూచిస్తాము",
    soil: "నేల రకం", season: "సీజన్", rainfall: "అంచనా వర్షపాతం (మి.మీ)", location: "ప్రాంతం",
    submit: "పంటలను సూచించండి", match: "సరిపోలిక", why: "ఈ పంట ఎందుకు",
  },
  HI: {
    title: "फसल सुझाव", subtitle: "अपनी स्थिति बताएं, हम सही फसल सुझाएंगे",
    soil: "मिट्टी का प्रकार", season: "मौसम", rainfall: "अनुमानित वर्षा (मि.मी)", location: "स्थान",
    submit: "फसल सुझाएं", match: "मिलान", why: "यह फसल क्यों",
  },
};

const TIPS = {
  EN: {
    "Rice (paddy)": [
      "Keep 2-5 cm standing water during tillering stage for best yield.",
      "Watch for stem borer moths at dusk — pheromone traps help catch them early.",
      "Apply nitrogen in 3 split doses instead of all at once to reduce lodging.",
    ],
    "Cotton": [
      "Check the undersides of leaves weekly for whitefly eggs.",
      "Avoid excess nitrogen — it encourages leafy growth over boll formation.",
      "Pink bollworm traps work best when hung at canopy height, not above it.",
    ],
    "Maize": [
      "Fall armyworm damage looks like ragged holes near the whorl — inspect young plants closely.",
      "Maize needs the most water during tasseling and silking, not before.",
      "Intercropping with legumes can cut fertilizer needs by up to a third.",
    ],
    _default: [
      "Rotate crops each season to break pest and disease cycles naturally.",
      "Test your soil every 2-3 years — fertilizer guesswork wastes money.",
      "Mulching between rows cuts water loss and suppresses weeds at the same time.",
    ],
  },
  TE: {
    "Rice (paddy)": [
      "\u0c2e\u0c02\u0c1a\u0c3f \u0c26\u0c3f\u0c17\u0c41\u0c2c\u0c21\u0c3f \u0c15\u0c4b\u0c38\u0c02 \u0c2a\u0c3f\u0c32\u0c15\u0c32 \u0c26\u0c36\u0c32\u0c4b 2-5 \u0c38\u0c46.\u0c2e\u0c40. \u0c28\u0c40\u0c30\u0c41 \u0c28\u0c3f\u0c32\u0c4d\u0c35 \u0c09\u0c02\u0c1a\u0c02\u0c21\u0c3f.",
      "సాయంత్రం వేళలో కాండం తొలిచే పురుగు మాత్రలను గమనించండి \u2014 ఫెరోమోన్ ట్రాప్‌లు వాటిని ముందుగా పట్టుకోవడానికి సహాయపడతాయి.",
      "\u0c2c\u0c30\u0c41\u0c35\u0c41 \u0c2a\u0c21\u0c3f\u0c2a\u0c4b\u0c15\u0c41\u0c02\u0c21\u0c3e \u0c09\u0c02\u0c21\u0c21\u0c3e\u0c28\u0c3f\u0c15\u0c3f \u0c2a\u0c48\u0c1f\u0c4d\u0c30\u0c1c\u0c28\u0c4d \u0c2e\u0c42\u0c21\u0c41 \u0c35\u0c3f\u0c21\u0c24\u0c32\u0c41\u0c17\u0c3e \u0c35\u0c47\u0c2f\u0c02\u0c21\u0c3f.",
    ],
    "Cotton": [
      "తెల్ల ఈగ గుడ్ల కోసం వారానికి ఒకసారి ఆకుల కింది భాగం పరీక్షించండి.",
      "\u0c05\u0c27\u0c3f\u0c15 \u0c28\u0c3e\u0c1f\u0c4d\u0c30\u0c1c\u0c28\u0c4d \u0c05\u0c35\u0c38\u0c30\u0c02 \u0c32\u0c47\u0c26\u0c41 \u2014 \u0c07\u0c26\u0c3f \u0c06\u0c15\u0c41\u0c32 \u0c2a\u0c46\u0c30\u0c41\u0c17\u0c41\u0c26\u0c32\u0c28\u0c41 \u0c2a\u0c46\u0c02\u0c1a\u0c41\u0c24\u0c41\u0c02\u0c26\u0c3f.",
      "గులాబీ పురుగు ట్రాప్‌లను మట్టంలో గాక మొక్కల ఎత్తులో వేలాడిస్తే మంచి ఫలితం ఉంటుంది.",
    ],
    "Maize": [
      "\u0c2a\u0c46\u0c17\u0c41 \u0c06\u0c30\u0c4d\u0c2e\u0c40\u0c35\u0c30\u0c4d\u0c2e\u0c4d \u0c28\u0c37\u0c4d\u0c1f\u0c02 \u0c1a\u0c3f\u0c28\u0c4d\u0c28 \u0c2e\u0c4a\u0c15\u0c4d\u0c15\u0c32\u0c28\u0c41 \u0c17\u0c2e\u0c28\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f.",
      "\u0c2a\u0c42\u0c24 \u0c26\u0c36\u0c32\u0c4b \u0c2e\u0c15\u0c4d\u0c15\u0c1c\u0c4a\u0c28\u0c4d\u0c28\u0c15\u0c41 \u0c1a\u0c3e\u0c32\u0c3e \u0c28\u0c40\u0c30\u0c41 \u0c05\u0c35\u0c38\u0c30\u0c02.",
      "\u0c05\u0c02\u0c24\u0c30\u0c2a\u0c02\u0c1f \u0c38\u0c3e\u0c17\u0c41\u0c24\u0c4b \u0c0e\u0c30\u0c41\u0c35\u0c41\u0c32 \u0c05\u0c35\u0c38\u0c30\u0c02 \u0c24\u0c17\u0c4d\u0c17\u0c41\u0c24\u0c41\u0c02\u0c26\u0c3f.",
    ],
    _default: [
      "\u0c2a\u0c47\u0c1f\u0c32\u0c41 \u0c2e\u0c31\u0c4d\u0c1f\u0c41 \u0c35\u0c4d\u0c2f\u0c3e\u0c27\u0c41\u0c32\u0c41 \u0c24\u0c17\u0c4d\u0c17\u0c3f\u0c02\u0c1a\u0c21\u0c3e\u0c28\u0c3f\u0c15\u0c3f \u0c2a\u0c4d\u0c30\u0c24\u0c3f \u0c38\u0c40\u0c1c\u0c28\u0c4d \u0c2a\u0c02\u0c1f \u0c2e\u0c3e\u0c30\u0c4d\u0c1a\u0c02\u0c21\u0c3f.",
      "2-3 \u0c0f\u0c33\u0c4d\u0c32\u0c15\u0c41 \u0c12\u0c15\u0c38\u0c3e\u0c30\u0c3f \u0c28\u0c47\u0c32 \u0c2a\u0c30\u0c40\u0c15\u0c4d\u0c37 \u0c1a\u0c47\u0c2f\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f.",
      "\u0c38\u0c3e\u0c33\u0c4d\u0c33\u0c4d\u0c32 \u0c2e\u0c27\u0c4d\u0c2f \u0c2e\u0c32\u0c4d\u0c1a\u0c3f\u0c02\u0c17\u0c4d \u0c1a\u0c47\u0c2f\u0c21\u0c02 \u0c35\u0c32\u0c4d\u0c32 \u0c28\u0c40\u0c30\u0c41 \u0c06\u0c26\u0c3e \u0c05\u0c35\u0c41\u0c24\u0c41\u0c02\u0c26\u0c3f, \u0c15\u0c33\u0c4d\u0c33\u0c41 \u0c05\u0c26\u0c41\u0c2a\u0c41\u0c32\u0c4b \u0c09\u0c02\u0c1f\u0c3e\u0c2f\u0c3f.",
    ],
  },
  HI: {
    "Rice (paddy)": [
      "\u0938\u092c\u0938\u0947 \u0905\u091a\u094d\u091b\u0940 \u092a\u0948\u0926\u093e\u0935\u093e\u0930 \u0915\u0947 \u0932\u093f\u090f \u0915\u0932\u094d\u0932\u093e \u0905\u0935\u0938\u094d\u0925\u093e \u092e\u0947\u0902 2-5 \u0938\u0947\u092e\u0940 \u092a\u093e\u0928\u0940 \u0916\u0921\u093c\u093e \u0930\u0916\u0947\u0902.",
      "\u0936\u093e\u092e \u0915\u0947 \u0938\u092e\u092f \u0924\u0928\u093e \u092b\u0932\u0947\u0926\u0915 \u0915\u0940\u091f \u092a\u0930 \u0928\u091c\u0930 \u0930\u0916\u0947\u0902 \u2014 \u092b\u0947\u0930\u094b\u092e\u094b\u0928 \u091f\u094d\u0930\u0948\u092a \u092e\u0926\u0926 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902.",
      "\u092a\u094c\u0927\u0947 \u0917\u093f\u0930\u0928\u0947 \u0938\u0947 \u0930\u094b\u0915\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0928\u093e\u0907\u091f\u094d\u0930\u094b\u091c\u0928 \u0915\u094b 3 \u092d\u093e\u0917\u094b\u0902 \u092e\u0947\u0902 \u0921\u093e\u0932\u0947\u0902.",
    ],
    "Cotton": [
      "\u0939\u0930 \u0939\u092b\u094d\u0924\u0947 \u092a\u0924\u094d\u0924\u094b\u0902 \u0915\u0947 \u0928\u0940\u091a\u0947 \u0938\u092b\u0947\u0926 \u092e\u0915\u094d\u0916\u0940 \u0915\u0947 \u0905\u0902\u0921\u0947 \u091c\u093e\u0902\u091a\u0947\u0902.",
      "\u091c\u094d\u092f\u093e\u0926\u093e \u0928\u093e\u0907\u091f\u094d\u0930\u094b\u091c\u0928 \u0938\u0947 \u092c\u091a\u0947\u0902 \u2014 \u092f\u0939 \u092a\u0924\u094d\u0924\u093f\u092f\u094b\u0902 \u0915\u093f \u0935\u0943\u0926\u094d\u0927\u093f \u092c\u0922\u093c\u093e\u0924\u093e \u0939\u0948.",
      "\u0917\u0941\u0932\u093e\u092c\u0940 \u0938\u0942\u0902\u0921\u0940 \u091f\u094d\u0930\u0948\u092a \u092a\u094c\u0927\u094b\u0902 \u0915\u0940 \u090a\u0902\u091a\u093e\u0908 \u092a\u0930 \u0938\u092c\u0938\u0947 \u0905\u091a\u094d\u091b\u0947 \u0915\u093e\u092e \u0915\u0930\u0924\u0947 \u0939\u0948\u0902.",
    ],
    "Maize": [
      "\u092b\u0949\u0932 \u0906\u0930\u094d\u092e\u0940\u0935\u0930\u094d\u092e \u0915\u093e \u0928\u0941\u0915\u0938\u093e\u0928 \u0928\u0908 \u092a\u0924\u094d\u0924\u093f\u092f\u094b\u0902 \u092a\u0930 \u091c\u0932\u094d\u0926\u0940 \u0926\u093f\u0916\u0924\u093e \u0939\u0948 \u2014 \u0927\u094d\u092f\u093e\u0928 \u0938\u0947 \u091c\u093e\u0902\u091a\u0947\u0902.",
      "\u092b\u0942\u0932 \u0906\u0928\u0947 \u0915\u0947 \u0938\u092e\u092f \u092e\u0915\u094d\u0915\u093e \u0915\u094b \u0938\u092c\u0938\u0947 \u091c\u094d\u092f\u093e\u0926\u093e \u092a\u093e\u0928\u0940 \u091a\u093e\u0939\u093f\u090f.",
      "\u0926\u0932\u0939\u0928 \u092b\u0938\u0932\u094b\u0902 \u0915\u0947 \u0938\u093e\u0925 \u092e\u093f\u0936\u094d\u0930\u093f\u0924 \u0916\u0947\u0924\u0940 \u0938\u0947 \u0909\u0930\u094d\u0935\u0930\u0915 \u0915\u0940 \u091c\u0930\u0942\u0930\u0924 \u0915\u092e \u0939\u094b\u0924\u0940 \u0939\u0948.",
    ],
    _default: [
      "\u0915\u0940\u091f \u0914\u0930 \u0930\u094b\u0917 \u091a\u0915\u094d\u0930 \u0924\u094b\u0921\u093c\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0939\u0930 \u092e\u094c\u0938\u092e \u092b\u0938\u0932 \u092c\u0926\u0932\u0947\u0902.",
      "\u0939\u0930 2-3 \u0938\u093e\u0932 \u092e\u093f\u091f\u094d\u091f\u0940 \u0915\u0940 \u091c\u093e\u0902\u091a \u0915\u0930\u0947\u0902.",
      "\u0915\u0924\u093e\u0930\u094b\u0902 \u0915\u0947 \u092c\u0940\u091a \u092e\u0932\u094d\u091a\u093f\u0902\u0917 \u0938\u0947 \u092a\u093e\u0928\u0940 \u0915\u0940 \u092c\u091a\u0924 \u0939\u094b\u0924\u0940 \u0939\u0948 \u0914\u0930 \u0916\u0930\u092a\u0924\u0935\u093e\u0930 \u0926\u092c\u0924\u0947 \u0939\u0948\u0902.",
    ],
  },
};

const DISEASE_LABELS = {
  EN: {
    title: "Crop disease detection", subtitle: "Upload a clear photo of the affected leaf or plant",
    dropText: "Click to upload a photo", change: "Upload a different photo", analyze: "Analyze photo",
    analyzing: "Analyzing photo\u2026", confidence: "Confidence", treatment: "Treatment", prevention: "Prevention",
    disclaimer: "Demo mode: this uses a simulated model for the prototype, not a trained AI vision model yet. Confirm any diagnosis with your local agriculture officer before treating.",
    healthy: "No disease signs detected", healthyBody: "The plant appears healthy. Keep monitoring weekly.",
  },
  TE: {
    title: "పంట వ్యాధి గుర్తింపు", subtitle: "ప్రభావిత ఆకు లేదా మొక్క ఫోటో అప్‌లోడ్ చేయండి",
    dropText: "ఫోటో అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి", change: "వేరే ఫోటో ఎంచుకోండి", analyze: "ఫోటో విశ్లేషించండి",
    analyzing: "విశ్లేషిస్తోంది\u2026", confidence: "నమ్మకం", treatment: "చికిత్స", prevention: "నివారణ",
    disclaimer: "డెమో మోడ్: ఇది ప్రోటోటైప్ కోసం అనుకరణ మోడల్‌ను ఉపయోగిస్తుంది. చికిత్స ముందు స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.",
    healthy: "వ్యాధి సంకేతాలు కనబడలేదు", healthyBody: "మొక్క ఆరోగ్యంగా కనిపిస్తోంది. వారానికి ఒకసారి పరిశీలించండి.",
  },
  HI: {
    title: "फसल रोग पहचान", subtitle: "प्रभावित पत्ती या पौधे की साफ फोटो अपलोड करें",
    dropText: "फोटो अपलोड करने के लिए क्लिक करें", change: "दूसरी फोटो चुनें", analyze: "फोटो जांचें",
    analyzing: "जांच हो रही है\u2026", confidence: "विश्वसनीयता", treatment: "उपचार", prevention: "बचाव",
    disclaimer: "डेमो मोड: यह प्रोटोटाइप के लिए एक नकली मॉडल इस्तेमाल करता है, असली AI मॉडल नहीं. इलाज से पहले स्थानीय कृषि अधिकारी से सलाह लें.",
    healthy: "कोई रोग नहीं मिला", healthyBody: "पौधा स्वस्थ दिख रहा है. हर हफ्ते जांच करते रहें.",
  },
};

const DISEASES = [
  {
    name: { EN: "Leaf blight", TE: "ఆకు ఎండు తెగులు", HI: "पत्ती झुलसा रोग" },
    crops: ["Rice (paddy)", "Maize", "Wheat"],
    treatment: {
      EN: ["Spray a copper-based fungicide at first sign of spots.", "Remove and burn severely affected leaves.", "Avoid overhead irrigation which spreads spores."],
      TE: ["మచ్చలు కనిపించగానే కాపర్ ఆధారిత శిలీంద్రనాశినిని పిచికారీ చేయండి.", "తీవ్రంగా దెబ్బతిన్న ఆకులను తీసివేసి కాల్చండి.", "పైనుండి నీరు పెట్టడం మానుకోండి — ఇది బీజాలను వ్యాపింపజేస్తుంది."],
      HI: ["धब्बे दिखते ही कॉपर-आधारित फफूंदनाशक का छिड़काव करें.", "बुरी तरह प्रभावित पत्तियों को हटाकर जला दें.", "ऊपर से सिंचाई से बचें, इससे बीजाणु फैलते हैं."],
    },
    prevention: {
      EN: ["Use certified disease-resistant seed varieties.", "Maintain 20-25cm spacing for airflow.", "Rotate with a non-host crop each season."],
      TE: ["ధృవీకరించిన వ్యాధి నిరోధక విత్తన రకాలను వాడండి.", "గాలి ప్రసరణ కోసం 20-25 సెం.మీ. దూరం ఉంచండి.", "ప్రతి సీజన్‌లో వేరే పంటతో మార్చండి."],
      HI: ["प्रमाणित रोग-प्रतिरोधी बीज किस्मों का उपयोग करें.", "हवा के प्रवाह के लिए 20-25 सेमी दूरी रखें.", "हर मौसम में अलग फसल के साथ फसल चक्र अपनाएं."],
    },
  },
  {
    name: { EN: "Powdery mildew", TE: "బూడిద తెగులు", HI: "चूर्णिल आसिता (पाउडरी मिल्ड्यू)" },
    crops: ["Cotton", "Chilli", "Groundnut"],
    treatment: {
      EN: ["Apply wettable sulfur spray in the evening.", "Increase spacing between plants to reduce humidity.", "Remove heavily infected leaves promptly."],
      TE: ["సాయంత్రం సమయంలో వెటబుల్ సల్ఫర్ స్ప్రే వేయండి.", "తేమ తగ్గించడానికి మొక్కల మధ్య దూరం పెంచండి.", "బాగా సోకిన ఆకులను వెంటనే తీసివేయండి."],
      HI: ["शाम के समय वेटेबल सल्फर स्प्रे करें.", "नमी घटाने के लिए पौधों के बीच दूरी बढ़ाएं.", "अधिक प्रभावित पत्तियों को तुरंत हटा दें."],
    },
    prevention: {
      EN: ["Avoid excess nitrogen fertilizer.", "Plant in locations with good morning sun exposure.", "Water at the base, not on the foliage."],
      TE: ["అధిక నత్రజని ఎరువులు వాడకండి.", "ఉదయం ఎండ బాగా తగిలే ప్రాంతంలో నాటండి.", "ఆకులపై కాకుండా మొదట్లో నీరు పెట్టండి."],
      HI: ["अधिक नाइट्रोजन उर्वरक से बचें.", "सुबह अच्छी धूप वाली जगह पर बोएं.", "पत्तियों पर नहीं, जड़ के पास पानी दें."],
    },
  },
  {
    name: { EN: "Bacterial wilt", TE: "బాక్టీరియా వాడు తెగులు", HI: "जीवाणु म्लानि (बैक्टीरियल विल्ट)" },
    crops: ["Turmeric", "Sugarcane", "Chilli"],
    treatment: {
      EN: ["Uproot and destroy infected plants immediately.", "Drench soil around healthy plants with copper oxychloride.", "Avoid working in the field when leaves are wet."],
      TE: ["సోకిన మొక్కలను వెంటనే పీకి నాశనం చేయండి.", "ఆరోగ్యకరమైన మొక్కల చుట్టూ కాపర్ ఆక్సీక్లోరైడ్‌తో నేలను తడపండి.", "ఆకులు తడిగా ఉన్నప్పుడు పొలంలో పనిచేయవద్దు."],
      HI: ["संक्रमित पौधों को तुरंत उखाड़कर नष्ट करें.", "स्वस्थ पौधों के आसपास कॉपर ऑक्सीक्लोराइड से मिट्टी भिगोएं.", "पत्तियां गीली होने पर खेत में काम करने से बचें."],
    },
    prevention: {
      EN: ["Use raised beds to improve drainage.", "Disinfect tools between plants.", "Practice a 2-3 year rotation away from host crops."],
      TE: ["నీరు బాగా వెళ్లడానికి ఎత్తైన బెడ్లు వాడండి.", "మొక్కల మధ్య పనిముట్లను శుభ్రం చేయండి.", "2-3 సంవత్సరాలు ఈ పంటలకు దూరంగా పంట మార్పిడి చేయండి."],
      HI: ["जल निकासी बेहतर करने के लिए ऊंची क्यारियां बनाएं.", "पौधों के बीच औजारों को कीटाणुरहित करें.", "2-3 साल तक इन फसलों से दूर फसल चक्र अपनाएं."],
    },
  },
  {
    name: { EN: "Rust", TE: "కుంకుమ తెగులు (రస్ట్)", HI: "रतुआ रोग (रस्ट)" },
    crops: ["Wheat", "Groundnut", "Maize"],
    treatment: {
      EN: ["Spray triazole-based fungicide at early pustule stage.", "Remove volunteer plants that can harbor spores.", "Time sprays before rain where possible."],
      TE: ["తొలి దశలోనే ట్రయాజోల్ ఆధారిత శిలీంద్రనాశిని పిచికారీ చేయండి.", "బీజాలను ఆశ్రయించే స్వచ్ఛంద మొక్కలను తీసివేయండి.", "వీలైతే వర్షానికి ముందు స్ప్రే చేయండి."],
      HI: ["शुरुआती अवस्था में ही ट्रायज़ोल-आधारित फफूंदनाशक छिड़कें.", "बीजाणु फैलाने वाले जंगली पौधों को हटाएं.", "जहां संभव हो, बारिश से पहले छिड़काव करें."],
    },
    prevention: {
      EN: ["Choose rust-tolerant varieties for your zone.", "Avoid dense sowing.", "Monitor weekly during humid weather."],
      TE: ["మీ ప్రాంతానికి తగిన రస్ట్ నిరోధక రకాలను ఎంచుకోండి.", "దట్టంగా విత్తడం మానుకోండి.", "తేమ వాతావరణంలో వారానికి ఒకసారి పరిశీలించండి."],
      HI: ["अपने क्षेत्र के लिए रतुआ-सहनशील किस्में चुनें.", "घनी बुवाई से बचें.", "नमी वाले मौसम में साप्ताहिक निगरानी करें."],
    },
  },
];

const WEATHER_CONDITIONS = [
  { icon: Sun, label: { EN: "Clear", TE: "నిర్మలం", HI: "साफ़" } },
  { icon: CloudSun, label: { EN: "Partly cloudy", TE: "పాక్షిక మేఘావృతం", HI: "आंशिक बादल" } },
  { icon: CloudRain, label: { EN: "Rain showers", TE: "వర్ష జల్లులు", HI: "बारिश की फुहारें" } },
  { icon: Wind, label: { EN: "Windy", TE: "గాలులు", HI: "तेज़ हवा" } },
];

// ---------- Helpers ----------

function seededRandom(seedStr) {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  return function () {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

const DAY_LABELS_I18N = {
  EN: ["Today", "Tomorrow", "Wed", "Thu", "Fri", "Sat", "Sun"],
  TE: ["ఈరోజు", "రేపు", "బుధ", "గురు", "శుక్ర", "శని", "ఆది"],
  HI: ["आज", "कल", "बुध", "गुरु", "शुक्र", "शनि", "रवि"],
};

function buildWeather(location, lang = "EN") {
  const rand = seededRandom(location || "default");
  const days = DAY_LABELS_I18N[lang] || DAY_LABELS_I18N.EN;
  const forecast = days.map((d) => {
    const high = Math.round(28 + rand() * 12);
    const low = high - Math.round(6 + rand() * 5);
    const rainChance = Math.round(rand() * 100);
    const humidity = Math.round(40 + rand() * 50);
    const wind = Math.round(5 + rand() * 20);
    const cond = WEATHER_CONDITIONS[rainChance > 55 ? 2 : Math.floor(rand() * 2)];
    return { day: d, high, low, rainChance, humidity, wind, cond };
  });
  const rainAlert = forecast.some((f) => f.rainChance > 65);
  const heatAlert = forecast.some((f) => f.high >= 40);
  return { forecast, rainAlert, heatAlert };
}

const SEASON_INFO_I18N = {
  Kharif: { months: { EN: "Jun \u2013 Oct", TE: "\u0c1c\u0c42\u0c28\u0c4d \u2013 \u0c05\u0c15\u0c4d\u0c1f\u0c4b", HI: "\u091c\u0942\u0928 \u2013 \u0905\u0915\u094d\u0924\u0942\u092c\u0930" },
    crops: { EN: "Rice, cotton, maize, groundnut", TE: "\u0c35\u0c30\u0c3f, \u0c2a\u0c24\u0c4d\u0c24\u0c3f, \u0c2e\u0c15\u0c4d\u0c15\u0c1c\u0c4a\u0c28\u0c4d\u0c28, \u0c35\u0c47\u0c30\u0c41\u0c36\u0c28\u0c17", HI: "\u091a\u093e\u0935\u0932, \u0915\u092a\u093e\u0938, \u092e\u0915\u094d\u0915\u093e, \u092e\u0942\u0902\u0917\u092b\u0932\u0940" } },
  Rabi: { months: { EN: "Oct \u2013 Mar", TE: "\u0c05\u0c15\u0c4d\u0c1f\u0c4b \u2013 \u0c2e\u0c3e\u0c30\u0c4d\u0c1a\u0c3f", HI: "\u0905\u0915\u094d\u0924\u0942\u092c\u0930 \u2013 \u092e\u093e\u0930\u094d\u091a" },
    crops: { EN: "Wheat, mustard, gram, barley", TE: "\u0c17\u0c4b\u0c27\u0c41\u0c2e, \u0c06\u0c35\u0c3e\u0c32\u0c41, \u0c36\u0c28\u0c17\u0c2a\u0c2a\u0c4d\u0c2a\u0c41, \u0c2c\u0c3e\u0c30\u0c4d\u0c32\u0c40", HI: "\u0917\u0947\u0939\u0942\u0902, \u0938\u0930\u0938\u094b\u0902, \u091a\u0928\u093e, \u091c\u094c" } },
  Zaid: { months: { EN: "Mar \u2013 Jun", TE: "\u0c2e\u0c3e\u0c30\u0c4d\u0c1a\u0c3f \u2013 \u0c1c\u0c42\u0c28\u0c4d", HI: "\u092e\u093e\u0930\u094d\u091a \u2013 \u091c\u0942\u0928" },
    crops: { EN: "Watermelon, cucumber, moong", TE: "\u0c2a\u0c48\u0c1a\u0c4d\u0c1a, \u0c26\u0c4b\u0c38\u0c15\u0c3e\u0c2f, \u0c2a\u0c46\u0c38\u0c30\u0c2a\u0c2a\u0c4d\u0c2a\u0c41", HI: "\u0924\u0930\u092c\u0942\u091c, \u0916\u0940\u0930\u093e, \u092e\u0942\u0902\u0917" } },
};
const SEASON_NAME_I18N = { Kharif: { EN: "Kharif", TE: "\u0c16\u0c30\u0c40\u0c2b\u0c4d", HI: "\u0916\u0930\u0940\u092b" }, Rabi: { EN: "Rabi", TE: "\u0c30\u0c2c\u0c40", HI: "\u0930\u092c\u0940" }, Zaid: { EN: "Zaid", TE: "\u0c1c\u0c48\u0c26\u0c4d", HI: "\u091c\u093e\u092f\u0926" } };

function seasonInfo(date) {
  const month = date.getMonth(); // 0-11
  // Kharif: Jun(5)-Oct(9), Rabi: Oct(9? overlap)-Mar, Zaid: Mar-Jun
  // simplified non-overlapping bands for the wheel
  if (month >= 5 && month <= 9) {
    return { name: "Kharif", share: 5 / 12, order: 0 };
  }
  if (month >= 9 || month <= 2) {
    return { name: "Rabi", share: 5 / 12, order: 1 };
  }
  return { name: "Zaid", share: 2 / 12, order: 2 };
}

function dayOfYearFraction(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay) / 365;
}

// ---------- Shared: audio (text-to-speech) ----------

const SPEECH_LANG = { EN: "en-IN", TE: "te-IN", HI: "hi-IN" };

function getVoicesAsync() {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return resolve([]);
    const existing = window.speechSynthesis.getVoices();
    if (existing && existing.length) return resolve(existing);
    const onChange = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", onChange);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener("voiceschanged", onChange);
    // fallback in case the event never fires on this browser
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 800);
  });
}

function findVoiceForLang(voices, langCode) {
  const prefix = langCode.split("-")[0];
  return (
    voices.find((v) => v.lang && v.lang.toLowerCase() === langCode.toLowerCase()) ||
    voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(prefix)) ||
    null
  );
}

async function speakText(text, lang) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return { ok: false, hasNativeVoice: false };
  try {
    const langCode = SPEECH_LANG[lang] || "en-IN";
    const voices = await getVoicesAsync();
    const voice = findVoiceForLang(voices, langCode);
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langCode;
    utter.rate = 0.95;
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
    return { ok: true, hasNativeVoice: !!voice };
  } catch (e) {
    return { ok: false, hasNativeVoice: false };
  }
}

const SPEAK_LABELS = {
  EN: { listen: "Listen", unsupported: "Voice playback not supported in this browser", noVoice: "No {lang} voice installed on this device \u2014 playing with a different accent" },
  TE: { listen: "వినండి", unsupported: "ఈ బ్రౌజర్‌లో వాయిస్ ప్లేబ్యాక్ మద్దతు లేదు", noVoice: "ఈ పరికరంలో {lang} వాయిస్ ఇన్‌స్టాల్ చేయలేదు \u2014 వేరే యాసలో ప్లే అవుతోంది" },
  HI: { listen: "सुनें", unsupported: "इस ब्राउज़र में आवाज़ प्लेबैक समर्थित नहीं है", noVoice: "इस डिवाइस पर {lang} आवाज़ इंस्टॉल नहीं है \u2014 दूसरे उच्चारण में चलाया जा रहा है" },
};

function SpeakButton({ text, lang, className = "" }) {
  const [supported] = useState(() => typeof window !== "undefined" && "speechSynthesis" in window);
  const [speaking, setSpeaking] = useState(false);
  const [noVoiceWarning, setNoVoiceWarning] = useState(false);
  const sp = SPEAK_LABELS[lang] || SPEAK_LABELS.EN;

  async function handleClick() {
    if (!supported) return;
    const result = await speakText(text, lang);
    if (result.ok) {
      setSpeaking(true);
      setNoVoiceWarning(lang !== "EN" && !result.hasNativeVoice);
      setTimeout(() => setSpeaking(false), 1800);
    }
  }

  const langName = lang === "TE" ? "Telugu" : lang === "HI" ? "Hindi" : "English";
  const warningText = sp.noVoice.replace("{lang}", langName);

  return (
    <span className="relative inline-flex items-center">
      <button
        onClick={handleClick}
        disabled={!supported}
        title={supported ? sp.listen : sp.unsupported}
        aria-label={supported ? sp.listen : sp.unsupported}
        className={`inline-flex items-center justify-center rounded-full p-1.5 transition-colors ${
          supported ? "text-green-800 hover:bg-green-50" : "text-stone-300 cursor-not-allowed"
        } ${className}`}
      >
        <Volume2 size={14} className={speaking ? "animate-pulse" : ""} />
      </button>
      {noVoiceWarning && (
        <span title={warningText} className="ml-0.5">
          <Info size={11} className="text-amber-600" />
        </span>
      )}
    </span>
  );
}

// ---------- Season Wheel (signature component) ----------

function SeasonWheel({ current, lang }) {
  const R = 78;
  const C = 2 * Math.PI * R;
  const segments = [
    { name: "Kharif", frac: 5 / 12, color: "#2F4A31" },
    { name: "Rabi", frac: 5 / 12, color: "#8B5A3C" },
    { name: "Zaid", frac: 2 / 12, color: "#D99B2B" },
  ];
  let offsetAcc = 0;
  const today = new Date();
  const yearFrac = dayOfYearFraction(today);
  const angle = yearFrac * 360 - 90; // degrees, start at top

  return (
    <svg viewBox="0 0 220 220" className="w-full h-full">
      <circle cx="110" cy="110" r={R} fill="none" stroke="#E4DCC6" strokeWidth="20" />
      {segments.map((seg, i) => {
        const dash = seg.frac * C;
        const gap = C - dash;
        const rotate = (offsetAcc / C) * 360 - 90;
        offsetAcc += dash;
        const isCurrent = seg.name === current.name;
        return (
          <circle
            key={seg.name}
            cx="110"
            cy="110"
            r={R}
            fill="none"
            stroke={seg.color}
            strokeWidth={isCurrent ? 22 : 16}
            strokeDasharray={`${dash} ${gap}`}
            strokeLinecap="butt"
            opacity={isCurrent ? 1 : 0.35}
            transform={`rotate(${rotate} 110 110)`}
          />
        );
      })}
      {/* marker for today */}
      <g transform={`rotate(${angle} 110 110)`}>
        <circle cx={110 + R} cy="110" r="7" fill="#23291F" />
        <circle cx={110 + R} cy="110" r="3" fill="#F6F1E4" />
      </g>
      <text x="110" y="104" textAnchor="middle" fontSize="15" fill="#23291F" fontWeight="600">
        {SEASON_NAME_I18N[current.name][lang]}
      </text>
      <text x="110" y="122" textAnchor="middle" fontSize="10" fill="#5b5a52">
        {SEASON_INFO_I18N[current.name].months[lang]}
      </text>
    </svg>
  );
}

// ---------- Onboarding ----------

const ONBOARD_LABELS = {
  EN: {
    tagline: "Set up your farm profile to get started.", name: "Your name", namePlaceholder: "e.g. Ramesh",
    crop: "Main crop", land: "Land size (acres)", landPlaceholder: "e.g. 3.5", soil: "Soil type",
    location: "Village / location", locationPlaceholder: "e.g. Khammam, Telangana",
    useLocation: "Use my current location", locating: "Detecting location\u2026",
    locationError: "Couldn't detect location \u2014 please type it in.",
    remember: "Remember me on this device", submit: "Create my dashboard", save: "Save", changeLocation: "Change location",
    appTagline: "Everything your farm needs, in one place.",
    headline1: "Smart Farming.", headline2: "Stronger Tomorrow.",
    heroParagraph: "AI powered solutions for modern farmers. Get crop insights, weather updates, market prices and more \u2014 all in one place.",
    welcomeBack: "Welcome Back", trustBadge: "Your data is safe and secure with us",
    featureDisease: "AI Disease Detection", featureDiseaseDesc: "Identify plant diseases early",
    featureWeather: "Weather Alerts", featureWeatherDesc: "Real-time weather updates",
    featureMarket: "Live Mandi Prices", featureMarketDesc: "Get best prices near you",
    featureRecommend: "Crop Recommendation", featureRecommendDesc: "AI suggestions for better yield",
    featureFertilizer: "Fertilizer Advice", featureFertilizerDesc: "Right fertilizer for healthy crops",
    featureAssistant: "AI Farming Assistant", featureAssistantDesc: "Your smart farming companion",
  },
  TE: {
    tagline: "ప్రారంభించడానికి మీ పొలం వివరాలు నమోదు చేయండి.", name: "మీ పేరు", namePlaceholder: "ఉదా. రమేష్",
    crop: "ప్రధాన పంట", land: "భూమి పరిమాణం (ఎకరాలు)", landPlaceholder: "ఉదా. 3.5", soil: "నేల రకం",
    location: "గ్రామం / ప్రాంతం", locationPlaceholder: "ఉదా. ఖమ్మం, తెలంగాణ",
    useLocation: "నా ప్రస్తుత స్థానాన్ని వాడండి", locating: "స్థానాన్ని గుర్తిస్తోంది\u2026",
    locationError: "స్థానాన్ని గుర్తించలేకపోయాము \u2014 దయచేసి టైప్ చేయండి.",
    remember: "ఈ పరికరంలో నన్ను గుర్తుంచుకోండి", submit: "నా డాష్‌బోర్డ్ సృష్టించండి", save: "సేవ్ చేయి", changeLocation: "స్థానం మార్చు",
    appTagline: "మీ పొలానికి కావాల్సినవన్నీ ఒకే చోట.",
    headline1: "స్మార్ట్ వ్యవసాయం.", headline2: "బలమైన రేపు.",
    heroParagraph: "ఆధునిక రైతుల కోసం AI ఆధారిత పరిష్కారాలు. పంట సూచనలు, వాతావరణ అప్‌డేట్‌లు, మార్కెట్ ధరలు మరియు మరిన్ని \u2014 అన్నీ ఒకే చోట.",
    welcomeBack: "తిరిగి స్వాగతం", trustBadge: "మీ డేటా మాతో సురక్షితంగా ఉంది",
    featureDisease: "AI వ్యాధి గుర్తింపు", featureDiseaseDesc: "మొక్కల వ్యాధులను ముందుగానే గుర్తించండి",
    featureWeather: "వాతావరణ హెచ్చరికలు", featureWeatherDesc: "రియల్-టైమ్ వాతావరణ అప్‌డేట్‌లు",
    featureMarket: "లైవ్ మండి ధరలు", featureMarketDesc: "మీ దగ్గర ఉత్తమ ధరలు పొందండి",
    featureRecommend: "పంట సిఫార్సు", featureRecommendDesc: "మెరుగైన దిగుబడికి AI సూచనలు",
    featureFertilizer: "ఎరువుల సలహా", featureFertilizerDesc: "ఆరోగ్యకరమైన పంటలకు సరైన ఎరువు",
    featureAssistant: "AI వ్యవసాయ సహాయకుడు", featureAssistantDesc: "మీ స్మార్ట్ వ్యవసాయ సహచరుడు",
  },
  HI: {
    tagline: "शुरू करने के लिए अपनी खेत प्रोफ़ाइल भरें.", name: "आपका नाम", namePlaceholder: "जैसे रमेश",
    crop: "मुख्य फसल", land: "भूमि (एकड़)", landPlaceholder: "जैसे 3.5", soil: "मिट्टी का प्रकार",
    location: "गांव / स्थान", locationPlaceholder: "जैसे खम्मम, तेलंगाना",
    useLocation: "मेरा वर्तमान स्थान उपयोग करें", locating: "स्थान खोजा जा रहा है\u2026",
    locationError: "स्थान नहीं मिल सका \u2014 कृपया खुद लिखें.",
    remember: "इस डिवाइस पर मुझे याद रखें", submit: "मेरा डैशबोर्ड बनाएं", save: "सेव करें", changeLocation: "स्थान बदलें",
    appTagline: "आपके खेत की हर ज़रूरत, एक ही जगह.",
    headline1: "स्मार्ट खेती.", headline2: "मज़बूत कल.",
    heroParagraph: "आधुनिक किसानों के लिए AI समाधान. फसल जानकारी, मौसम अपडेट, बाज़ार भाव और भी बहुत कुछ \u2014 सब एक ही जगह.",
    welcomeBack: "वापसी पर स्वागत है", trustBadge: "आपका डेटा हमारे साथ सुरक्षित है",
    featureDisease: "AI रोग पहचान", featureDiseaseDesc: "पौधों की बीमारियां जल्दी पहचानें",
    featureWeather: "मौसम चेतावनी", featureWeatherDesc: "रीयल-टाइम मौसम अपडेट",
    featureMarket: "लाइव मंडी भाव", featureMarketDesc: "आस-पास के सबसे अच्छे भाव पाएं",
    featureRecommend: "फसल सुझाव", featureRecommendDesc: "बेहतर उपज के लिए AI सुझाव",
    featureFertilizer: "उर्वरक सलाह", featureFertilizerDesc: "स्वस्थ फसल के लिए सही उर्वरक",
    featureAssistant: "AI कृषि सहायक", featureAssistantDesc: "आपका स्मार्ट खेती साथी",
  },
};

// ---------- Animated farm illustration (original artwork, no photos) ----------

function FarmScene({ lang }) {
  const w = WEATHER_LABELS[lang];
  return (
    <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-700">
      <style>{`
        @keyframes farmCardIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes farmBubbleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes farmOrbDrift { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(14px,-10px); } }
        @keyframes farmBarGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .farm-card-in { animation: farmCardIn 0.5s ease-out; }
        .farm-bubble { animation: farmBubbleFloat 3s ease-in-out infinite; }
        .farm-orb { animation: farmOrbDrift 8s ease-in-out infinite; }
        .farm-bar { animation: farmBarGrow 0.7s ease-out forwards; transform-origin: bottom; }
      `}</style>

      {/* abstract aurora blobs */}
      <div className="farm-orb absolute -top-10 -left-10 w-56 h-56 rounded-full bg-emerald-400/30 blur-3xl" />
      <div className="farm-orb absolute bottom-0 right-0 w-64 h-64 rounded-full bg-amber-300/20 blur-3xl" style={{ animationDelay: "-3s" }} />
      <div className="farm-orb absolute top-10 right-24 w-40 h-40 rounded-full bg-sky-300/20 blur-3xl" style={{ animationDelay: "-5s" }} />

      {/* subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* floating stat chips */}
      <div className="farm-bubble absolute" style={{ left: "6%", top: "14%" }}>
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur rounded-xl shadow-lg px-3 py-2">
          <CloudSun size={15} className="text-sky-600" />
          <span className="text-xs font-semibold text-stone-900">28&deg;C</span>
        </div>
      </div>
      <div className="farm-bubble absolute" style={{ left: "8%", top: "62%", animationDelay: "0.6s" }}>
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur rounded-xl shadow-lg px-3 py-2">
          <TrendingUp size={15} className="text-amber-600" />
          <span className="text-xs font-semibold text-stone-900">+12%</span>
        </div>
      </div>
      <div className="farm-bubble absolute" style={{ right: "6%", top: "18%", animationDelay: "1.1s" }}>
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur rounded-xl shadow-lg px-3 py-2">
          <Sparkles size={15} className="text-green-700" />
          <span className="text-xs font-semibold text-stone-900">AI Verified</span>
        </div>
      </div>

      {/* floating product mockup card */}
      <div className="farm-card-in absolute inset-0 flex items-center justify-center">
        <div className="w-56 sm:w-64 bg-white rounded-2xl shadow-2xl p-4">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="ml-auto text-[10px] font-semibold text-stone-400">AgriLink AI</span>
          </div>
          <div className="flex items-center justify-between border-t border-stone-100 pt-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
                <CloudSun size={16} className="text-sky-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-900 leading-none">28&deg;C</div>
                <div className="text-[10px] text-stone-400 mt-0.5">{w.sunnyMock}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-semibold px-2 py-1 rounded-full">
              <CheckCircle2 size={11} /> {w.healthyMock}
            </div>
          </div>
          <div className="border-t border-stone-100 mt-3 pt-3">
            <div className="flex items-end justify-between gap-1.5 h-12">
              {[40, 65, 50, 80, 60, 95].map((h, i) => (
                <div key={i} className="farm-bar flex-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t" style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-stone-400">{w.marketTrendMock}</span>
              <span className="text-[10px] font-semibold text-green-700 flex items-center gap-0.5"><TrendingUp size={10} /> +12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SITE_LABELS = {
  EN: { home: "Home", features: "Features", about: "About", contact: "Contact", explore: "Explore Features",
    badge: "AI-Powered Agriculture Platform", privacy: "Privacy Policy", terms: "Terms", copyright: "\u00a9 2026 AgriLink AI. All rights reserved.",
    aboutTitle: "About AgriLink AI", aboutBody: "AgriLink AI is a prototype platform built to bring disease detection, weather guidance, market prices, and government scheme information to farmers in their own language. This demo runs entirely in your browser \u2014 no farm data is sent to an external server.",
    privacyTitle: "Privacy", privacyBody: "This is a demo application. Your profile and preferences are stored only in your browser (and only if you choose \"Remember me\"). Nothing is uploaded to a server or shared with third parties.",
    termsTitle: "Terms", termsBody: "This prototype is provided for demonstration purposes only. Disease diagnoses, crop recommendations, and prices shown are illustrative, not certified agricultural advice \u2014 always confirm with your local agriculture officer before acting on them.",
    contactTitle: "Contact", contactBody: "This is a student/portfolio project without a live support line yet. Reach the developer through the platform where you received this app." },
  TE: { home: "హోమ్", features: "ఫీచర్లు", about: "గురించి", contact: "సంప్రదించండి", explore: "ఫీచర్లు చూడండి",
    badge: "AI ఆధారిత వ్యవసాయ వేదిక", privacy: "గోప్యతా విధానం", terms: "నిబంధనలు", copyright: "\u00a9 2026 AgriLink AI. అన్ని హక్కులు కలిగి ఉన్నాయి.",
    aboutTitle: "AgriLink AI గురించి", aboutBody: "రైతులకు వారి స్వంత భాషలో వ్యాధి గుర్తింపు, వాతావరణ సలహా, మార్కెట్ ధరలు మరియు ప్రభుత్వ పథకాల సమాచారం అందించడానికి రూపొందించిన ప్రోటోటైప్ వేదిక ఇది. ఈ డెమో పూర్తిగా మీ బ్రౌజర్‌లోనే నడుస్తుంది \u2014 ఏ డేటా బయటి సర్వర్‌కు పంపబడదు.",
    privacyTitle: "గోప్యత", privacyBody: "ఇది ఒక డెమో అప్లికేషన్. మీ ప్రొఫైల్ మీ బ్రౌజర్‌లో మాత్రమే నిల్వ చేయబడుతుంది (\"నన్ను గుర్తుంచుకోండి\" ఎంచుకుంటేనే). ఏదీ సర్వర్‌కు అప్‌లోడ్ చేయబడదు లేదా మూడో పక్షాలతో పంచుకోబడదు.",
    termsTitle: "నిబంధనలు", termsBody: "ఈ ప్రోటోటైప్ కేవలం ప్రదర్శన కోసం మాత్రమే. చూపిన వ్యాధి నిర్ధారణలు, పంట సిఫార్సులు, ధరలు ఉదాహరణ మాత్రమే \u2014 వాటిపై చర్య తీసుకునే ముందు మీ స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.",
    contactTitle: "సంప్రదించండి", contactBody: "ఇది ఇంకా లైవ్ సపోర్ట్ లేని విద్యార్థి/పోర్ట్‌ఫోలియో ప్రాజెక్ట్. ఈ యాప్ మీకు అందించిన వేదిక ద్వారా డెవలపర్‌ను సంప్రదించండి." },
  HI: { home: "होम", features: "विशेषताएं", about: "हमारे बारे में", contact: "संपर्क करें", explore: "विशेषताएं देखें",
    badge: "AI-संचालित कृषि मंच", privacy: "गोपनीयता नीति", terms: "नियम", copyright: "\u00a9 2026 AgriLink AI. सर्वाधिकार सुरक्षित.",
    aboutTitle: "AgriLink AI के बारे में", aboutBody: "किसानों को उनकी अपनी भाषा में रोग पहचान, मौसम सलाह, बाज़ार भाव और सरकारी योजनाओं की जानकारी देने के लिए बनाया गया एक प्रोटोटाइप मंच. यह डेमो पूरी तरह आपके ब्राउज़र में चलता है \u2014 कोई डेटा बाहरी सर्वर को नहीं भेजा जाता.",
    privacyTitle: "गोपनीयता", privacyBody: "यह एक डेमो एप्लिकेशन है. आपकी प्रोफ़ाइल केवल आपके ब्राउज़र में सहेजी जाती है (केवल तभी जब आप \"मुझे याद रखें\" चुनें). कुछ भी सर्वर पर अपलोड नहीं होता या किसी तीसरे पक्ष के साथ साझा नहीं होता.",
    termsTitle: "नियम", termsBody: "यह प्रोटोटाइप केवल प्रदर्शन के लिए है. दिखाए गए रोग निदान, फसल सुझाव और भाव उदाहरण मात्र हैं \u2014 इन पर कार्रवाई करने से पहले अपने स्थानीय कृषि अधिकारी से पुष्टि करें.",
    contactTitle: "संपर्क करें", contactBody: "यह अभी बिना लाइव सपोर्ट वाला छात्र/पोर्टफोलियो प्रोजेक्ट है. जिस मंच से आपको यह ऐप मिला, वहीं से डेवलपर से संपर्क करें." },
};

function Onboarding({ onSubmit, lang, setLang, rememberMe, setRememberMe }) {
  const o = ONBOARD_LABELS[lang];
  const [form, setForm] = useState({ name: "", crop: CROPS[0], land: "", soil: SOIL_TYPES[0], location: "" });
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const canSubmit = form.name.trim() && Number(form.land) > 0 && form.location.trim();
  const geoSupported = typeof navigator !== "undefined" && "geolocation" in navigator;

  function toggleLocation(e) {
    const on = e.target.checked;
    setLocationError(false);
    if (!on || !geoSupported) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lon = pos.coords.longitude.toFixed(4);
        setForm((f) => ({ ...f, location: `${lat}, ${lon}` }));
        setLocating(false);
      },
      () => {
        setLocating(false);
        setLocationError(true);
      },
      { timeout: 8000 }
    );
  }

  const FEATURES = [
    { icon: Sprout, title: o.featureDisease, desc: o.featureDiseaseDesc, bg: "bg-gradient-to-br from-green-500 to-green-700" },
    { icon: CloudRain, title: o.featureWeather, desc: o.featureWeatherDesc, bg: "bg-gradient-to-br from-sky-400 to-sky-600" },
    { icon: TrendingUp, title: o.featureMarket, desc: o.featureMarketDesc, bg: "bg-gradient-to-br from-amber-400 to-amber-600" },
    { icon: Sprout, title: o.featureRecommend, desc: o.featureRecommendDesc, bg: "bg-gradient-to-br from-green-500 to-green-700" },
    { icon: FlaskConical, title: o.featureFertilizer, desc: o.featureFertilizerDesc, bg: "bg-gradient-to-br from-amber-600 to-amber-800" },
    { icon: Bot, title: o.featureAssistant, desc: o.featureAssistantDesc, bg: "bg-gradient-to-br from-green-600 to-emerald-800" },
  ];
  const s = SITE_LABELS[lang];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-50 via-white to-white">
      <style>{`
        @keyframes heroFade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .hero-fade { opacity: 0; animation: heroFade 0.6s ease-out forwards; }
      `}</style>

      {/* Top navigation */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-white/70 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center shrink-0">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="font-serif text-base text-stone-900 whitespace-nowrap">AgriLink <span className="text-green-600">AI</span></span>
          </div>
          <div className="flex bg-stone-100 border border-stone-200 rounded-full overflow-hidden shrink-0">
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${lang === l ? "bg-green-700 text-white" : "text-stone-500"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-2.5 flex items-center gap-5 text-xs sm:text-sm text-stone-500 font-medium overflow-x-auto">
          <a href="#home" className="hover:text-green-700 transition-colors whitespace-nowrap">{s.home}</a>
          <a href="#features" className="hover:text-green-700 transition-colors whitespace-nowrap">{s.features}</a>
          <a href="#about" className="hover:text-green-700 transition-colors whitespace-nowrap">{s.about}</a>
          <a href="#contact" className="hover:text-green-700 transition-colors whitespace-nowrap">{s.contact}</a>
        </div>
      </div>

      <div id="home" className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 pb-16">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left: headline + illustrated scene + feature cards */}
          <div className="lg:col-span-3">
            <div className="hero-fade inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
              <Sparkles size={12} /> {s.badge}
            </div>
            <h1 className="hero-fade font-serif text-4xl sm:text-5xl font-bold text-stone-900 leading-tight" style={{ animationDelay: "0.05s" }}>
              {o.headline1} <span>&#127793;</span>
            </h1>
            <h1 className="hero-fade font-serif text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent leading-tight mb-5" style={{ animationDelay: "0.1s" }}>
              {o.headline2}
            </h1>
            <p className="hero-fade text-base text-stone-500 max-w-lg mb-7 leading-relaxed" style={{ animationDelay: "0.15s" }}>{o.heroParagraph}</p>

            <a
              href="#features"
              className="hero-fade inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-green-700/20 hover:shadow-xl hover:shadow-green-700/30 hover:-translate-y-0.5 transition-all mb-8"
              style={{ animationDelay: "0.2s" }}
            >
              {s.explore} <ChevronRight size={16} />
            </a>

            <div className="hero-fade" style={{ animationDelay: "0.25s" }}>
              <FarmScene lang={lang} />
            </div>

            <div id="features" className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 scroll-mt-24">
              {FEATURES.map((f, i) => {
                const Ic = f.icon;
                return (
                  <div key={i} className="group bg-white border border-stone-200 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
                      <Ic size={17} className="text-white" />
                    </div>
                    <div className="text-sm font-semibold text-stone-900 leading-tight">{f.title}</div>
                    <div className="text-xs text-stone-500 mt-1 leading-snug">{f.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: glassmorphism form card */}
          <div className="lg:col-span-2">
            <div className="farm-card-in backdrop-blur-xl bg-white/80 rounded-3xl border border-white shadow-2xl shadow-green-900/10 p-7 lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shrink-0 shadow-lg shadow-green-700/20">
                  <Leaf size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-serif text-xl text-stone-900 leading-none">{o.welcomeBack} &#128075;</div>
                  <div className="text-xs text-stone-500 mt-1.5">{o.tagline}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 my-5">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
                <Leaf size={12} className="text-green-600" />
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="ob-name" className="text-xs font-medium text-stone-500 mb-1 block">{o.name}</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600" />
                    <input
                      id="ob-name"
                      className="w-full border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-shadow"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={o.namePlaceholder}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="ob-crop" className="text-xs font-medium text-stone-500 mb-1 block">{o.crop}</label>
                    <div className="relative">
                      <Sprout size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 z-10" />
                      <select
                        id="ob-crop"
                        className="w-full border border-stone-200 rounded-xl pl-9 pr-8 py-2.5 text-sm bg-white/70 appearance-none focus:outline-none focus:ring-2 focus:ring-green-300"
                        value={form.crop}
                        onChange={(e) => setForm({ ...form, crop: e.target.value })}
                      >
                        {CROPS.map((c) => <option key={c} value={c}>{CROPS_I18N[lang][c]}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ob-land" className="text-xs font-medium text-stone-500 mb-1 block">{o.land}</label>
                    <div className="relative">
                      <Ruler size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600" />
                      <input
                        id="ob-land"
                        type="number"
                        min="0"
                        className="w-full border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-300"
                        value={form.land}
                        onChange={(e) => setForm({ ...form, land: e.target.value })}
                        placeholder={o.landPlaceholder}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="ob-soil" className="text-xs font-medium text-stone-500 mb-1 block">{o.soil}</label>
                  <div className="relative">
                    <Layers size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-700 z-10" />
                    <select
                      id="ob-soil"
                      className="w-full border border-stone-200 rounded-xl pl-9 pr-8 py-2.5 text-sm bg-white/70 appearance-none focus:outline-none focus:ring-2 focus:ring-green-300"
                      value={form.soil}
                      onChange={(e) => setForm({ ...form, soil: e.target.value })}
                    >
                      {SOIL_TYPES.map((s2) => <option key={s2} value={s2}>{SOIL_TYPES_I18N[lang][s2]}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="ob-location" className="text-xs font-medium text-stone-500 mb-1 block">{o.location}</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                    <input
                      id="ob-location"
                      className="w-full border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-300"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder={o.locationPlaceholder}
                    />
                  </div>
                  <label className={`flex items-center gap-2 mt-2.5 text-xs ${geoSupported ? "text-stone-500" : "text-stone-300"}`}>
                    <input type="checkbox" disabled={!geoSupported} onChange={toggleLocation} className="accent-green-700" />
                    {locating ? o.locating : o.useLocation}
                  </label>
                  {locationError && <p className="text-xs text-orange-700 mt-1">{o.locationError}</p>}
                </div>
                <label className="flex items-center gap-2 text-xs text-stone-500">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="accent-green-700" />
                  {o.remember}
                </label>
                <button
                  disabled={!canSubmit}
                  onClick={() => onSubmit(form)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 disabled:opacity-40 text-white rounded-xl py-3 text-sm font-semibold mt-1 shadow-lg shadow-green-700/25 hover:shadow-xl hover:shadow-green-700/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
                >
                  {o.submit} <ChevronRight size={16} />
                </button>
                <div className="flex items-center justify-center gap-2 bg-green-50 rounded-xl py-2.5 mt-1">
                  <Lock size={12} className="text-green-700" />
                  <span className="text-xs text-green-800">{o.trustBadge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div id="about" className="scroll-mt-24 mt-14 bg-white border border-stone-200 rounded-3xl p-8 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-xl text-stone-900 mb-2">{s.aboutTitle}</h2>
          <p className="text-sm text-stone-500 leading-relaxed">{s.aboutBody}</p>
        </div>

        {/* Legal / contact */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6 max-w-5xl mx-auto">
          <div id="privacy" className="scroll-mt-24 bg-white border border-stone-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-stone-900 mb-1.5">{s.privacyTitle}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{s.privacyBody}</p>
          </div>
          <div id="terms" className="scroll-mt-24 bg-white border border-stone-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-stone-900 mb-1.5">{s.termsTitle}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{s.termsBody}</p>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-stone-900 mb-1.5">{s.contactTitle}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{s.contactBody}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div id="contact" className="scroll-mt-24 border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf size={16} className="text-green-700" />
            <span className="font-serif text-sm text-stone-900">AgriLink AI</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-stone-500">
            <a href="#privacy" className="hover:text-green-700 transition-colors">{s.privacy}</a>
            <a href="#terms" className="hover:text-green-700 transition-colors">{s.terms}</a>
            <a href="#contact" className="hover:text-green-700 transition-colors">{s.contact}</a>
          </div>
          <div className="text-xs text-stone-400">{s.copyright}</div>
        </div>
      </div>
    </div>
  );
}

// ---------- Placeholder for un-built modules ----------

function ComingSoon({ label, icon: Icon, body }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-6">
      <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center mb-4">
        <Icon size={26} className="text-amber-800" />
      </div>
      <h2 className="font-serif text-xl text-stone-900 mb-1">{label}</h2>
      <p className="text-sm text-stone-500 max-w-xs">{body}</p>
      <div className="flex items-center gap-1 text-xs text-amber-800 mt-4 border border-stone-200 rounded-full px-3 py-1">
        <Lock size={12} /> Coming soon
      </div>
    </div>
  );
}

// ---------- Dashboard home ----------

function DashboardHome({ profile, lang, onEdit }) {
  const t = T[lang];
  const weather = useMemo(() => buildWeather(profile.location, lang), [profile.location, lang]);
  const today = weather.forecast[0];
  const season = useMemo(() => seasonInfo(new Date()), []);
  const tipsPool = (TIPS[lang] && TIPS[lang][profile.crop]) || TIPS[lang]._default;
  const [tipIndex, setTipIndex] = useState(0);

  const daysSince = 34; // illustrative placeholder derived from a typical mid-season point
  const CurrentIcon = today.cond.icon;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-stone-900">{t.greeting}, {profile.name}</h1>
        <p className="text-sm text-stone-500 mt-0.5">{t.tagline}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Profile card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 md:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">{t.profileCard}</span>
            <button onClick={onEdit} className="text-amber-800 flex items-center gap-1 text-xs hover:underline">
              <Edit2 size={12} /> {t.editProfile}
            </button>
          </div>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-2 text-stone-900"><Sprout size={15} className="text-green-800" /> {profile.crop}</div>
            <div className="flex items-center gap-2 text-stone-900"><Wheat size={15} className="text-amber-800" /> {profile.land} acres &middot; {profile.soil}</div>
            <div className="flex items-center gap-2 text-stone-900"><MapPin size={15} className="text-sky-700" /> {profile.location}</div>
          </div>
        </div>

        {/* Weather card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 md:col-span-2">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">{t.weatherCard}</span>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <CurrentIcon size={34} className="text-sky-700" />
              <div>
                <div className="text-2xl font-semibold text-stone-900">{today.high}&deg;C</div>
                <div className="text-xs text-stone-500">{today.cond.label[lang]} &middot; low {today.low}&deg;C</div>
              </div>
            </div>
            <div className="text-right">
              {weather.rainAlert && (
                <div className="flex items-center gap-1 text-xs text-sky-700 bg-sky-50 rounded-full px-3 py-1 mb-1">
                  <Droplets size={12} /> {t.rainAlert}
                </div>
              )}
              {weather.heatAlert && (
                <div className="flex items-center gap-1 text-xs text-orange-700 bg-orange-50 rounded-full px-3 py-1">
                  <Sun size={12} /> {t.heatAlert}
                </div>
              )}
              {!weather.rainAlert && !weather.heatAlert && (
                <div className="text-xs text-stone-500">{t.allClear}</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5 mt-5 pt-4 border-t border-stone-200">
            {weather.forecast.map((f) => {
              const Ic = f.cond.icon;
              return (
                <div key={f.day} className="flex flex-col items-center text-center">
                  <span className="text-[10px] text-stone-500 mb-1">{f.day}</span>
                  <Ic size={16} className="text-sky-700 mb-1" />
                  <span className="text-[11px] font-medium text-stone-900">{f.high}&deg;</span>
                  <span className="text-[10px] text-stone-500">{f.low}&deg;</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Season wheel */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col items-center md:col-span-1">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wide self-start mb-2">{t.seasonWheel}</span>
          <div className="w-44 h-44">
            <SeasonWheel current={season} lang={lang} />
          </div>
          <p className="text-xs text-stone-500 text-center mt-2">{SEASON_INFO_I18N[season.name].crops[lang]}</p>
        </div>

        {/* Quick stats */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 md:col-span-1 flex flex-col justify-center gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500">{t.daysSince}</span>
            <span className="text-sm font-semibold text-stone-900">{daysSince} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500">{t.nextIrrigation}</span>
            <span className="text-sm font-semibold text-stone-900">in 2 days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500">{t.harvestWindow}</span>
            <span className="text-sm font-semibold text-stone-900">~ 65 days</span>
          </div>
        </div>

        {/* Tip card */}
        <div className="bg-green-800 text-white rounded-2xl p-5 md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-green-200 uppercase tracking-wide">{t.tipCard}</span>
              <SpeakButton text={tipsPool[tipIndex]} lang={lang} className="text-green-200 hover:bg-white/10" />
            </div>
            <p className="text-sm mt-3 leading-relaxed">{tipsPool[tipIndex]}</p>
          </div>
          <button
            onClick={() => setTipIndex((tipIndex + 1) % tipsPool.length)}
            className="self-start text-xs text-amber-600 mt-4 flex items-center gap-1 hover:underline"
          >
            {t.nextTip} <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Disease Detection ----------

function DiseaseDetection({ lang, cropHint }) {
  const d = DISEASE_LABELS[lang];
  const [image, setImage] = useState(null);
  const [fileMeta, setFileMeta] = useState(null);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setFileMeta({ name: file.name, size: file.size });
    setResult(null);
    setStatus("idle");
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target.result);
    reader.readAsDataURL(file);
  }

  function analyze() {
    if (!fileMeta) return;
    setStatus("analyzing");
    setTimeout(() => {
      const rand = seededRandom(fileMeta.name + fileMeta.size);
      const isHealthy = rand() < 0.15;
      if (isHealthy) {
        setResult({ healthy: true, confidence: Math.round(80 + rand() * 15) });
      } else {
        const candidates = DISEASES.filter((dz) => !cropHint || dz.crops.includes(cropHint));
        const pool = candidates.length ? candidates : DISEASES;
        const pick = pool[Math.floor(rand() * pool.length)];
        setResult({ healthy: false, disease: pick, confidence: Math.round(68 + rand() * 27) });
      }
      setStatus("done");
    }, 1200);
  }

  function reset() {
    setImage(null);
    setFileMeta(null);
    setResult(null);
    setStatus("idle");
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="font-serif text-2xl text-stone-900">{d.title}</h1>
      <p className="text-sm text-stone-500 mt-0.5 mb-6">{d.subtitle}</p>

      {!image ? (
        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-stone-200 rounded-2xl py-16 cursor-pointer hover:border-amber-800 transition-colors bg-white">
          <Upload size={26} className="text-amber-800" />
          <span className="text-sm text-stone-500">{d.dropText}</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>
      ) : (
        <div className="bg-white border border-stone-200 rounded-2xl p-5">
          <div className="flex gap-4">
            <img src={image} alt="Uploaded crop" className="w-32 h-32 object-cover rounded-xl border border-stone-200 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-stone-900 truncate">{fileMeta.name}</span>
                <button onClick={reset} aria-label={d.change} className="text-stone-500 hover:text-stone-900"><X size={16} /></button>
              </div>
              {status !== "done" && (
                <button
                  onClick={analyze}
                  disabled={status === "analyzing"}
                  className="bg-green-800 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2 disabled:opacity-60"
                >
                  {status === "analyzing" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> {d.analyzing}
                    </>
                  ) : (
                    <>
                      <Camera size={15} /> {d.analyze}
                    </>
                  )}
                </button>
              )}
              {status !== "done" && (
                <label className="block text-xs text-amber-800 mt-3 cursor-pointer hover:underline">
                  {d.change}
                  <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </label>
              )}
            </div>
          </div>

          {status === "done" && result && (
            <div className="mt-5 pt-5 border-t border-stone-200">
              {result.healthy ? (
                <div className="flex items-start gap-3">
                  <ShieldCheck size={22} className="text-green-800 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-stone-900">{d.healthy}</span>
                      <span className="text-xs bg-green-50 text-green-800 rounded-full px-2 py-0.5">{result.confidence}% {d.confidence.toLowerCase()}</span>
                    </div>
                    <p className="text-sm text-stone-500 mt-1">{d.healthyBody}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle size={22} className="text-orange-700 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-stone-900">{result.disease.name[lang]}</span>
                        <span className="text-xs bg-orange-50 text-orange-800 rounded-full px-2 py-0.5">{result.confidence}% {d.confidence.toLowerCase()}</span>
                        <SpeakButton text={result.disease.name[lang]} lang={lang} />
                      </div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">{d.treatment}</span>
                      <ul className="mt-2 space-y-1.5">
                        {result.disease.treatment[lang].map((t, i) => (
                          <li key={i} className="text-sm text-stone-900 flex gap-2"><span className="text-amber-800">&bull;</span>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">{d.prevention}</span>
                      <ul className="mt-2 space-y-1.5">
                        {result.disease.prevention[lang].map((p, i) => (
                          <li key={i} className="text-sm text-stone-900 flex gap-2"><span className="text-green-800">&bull;</span>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex items-start gap-2 mt-5 text-xs text-stone-500 bg-stone-100 rounded-lg px-3 py-2.5">
        <Info size={14} className="shrink-0 mt-0.5" />
        {d.disclaimer}
      </div>
    </div>
  );
}

// ---------- Crop Recommendation ----------

function scoreCrop(crop, soil, season, rainfall) {
  let score = 0;
  if (crop.soils.includes(soil)) score += 40;
  if (crop.seasons.includes(season)) score += 40;
  const [lo, hi] = crop.rainfall;
  if (rainfall >= lo && rainfall <= hi) {
    score += 20;
  } else {
    const dist = rainfall < lo ? lo - rainfall : rainfall - hi;
    score += Math.max(0, 20 - dist / 20);
  }
  return Math.round(score);
}

function CropRecommendation({ lang, profile }) {
  const r = RECOMMEND_LABELS[lang];
  const [soil, setSoil] = useState(profile.soil);
  const [season, setSeason] = useState(SEASONS[0]);
  const [rainfall, setRainfall] = useState(800);
  const [location, setLocation] = useState(profile.location);
  const [results, setResults] = useState(null);

  function submit() {
    const ranked = CROP_PROFILES
      .map((c) => ({ ...c, score: scoreCrop(c, soil, season, rainfall) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    setResults(ranked);
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="font-serif text-2xl text-stone-900">{r.title}</h1>
      <p className="text-sm text-stone-500 mt-0.5 mb-6">{r.subtitle}</p>

      <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="rec-soil" className="text-xs font-medium text-stone-500 mb-1 block">{r.soil}</label>
            <select id="rec-soil" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm bg-white" value={soil} onChange={(e) => setSoil(e.target.value)}>
              {SOIL_TYPES.map((s) => <option key={s} value={s}>{SOIL_TYPES_I18N[lang][s]}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="rec-season" className="text-xs font-medium text-stone-500 mb-1 block">{r.season}</label>
            <select id="rec-season" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm bg-white" value={season} onChange={(e) => setSeason(e.target.value)}>
              {SEASONS.map((s) => <option key={s} value={s}>{SEASONS_I18N[lang][s]}</option>)}
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="rec-rainfall" className="text-xs font-medium text-stone-500 mb-1 block">{r.rainfall}</label>
            <input
              id="rec-rainfall"
              type="number" min="0"
              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <label htmlFor="rec-location" className="text-xs font-medium text-stone-500 mb-1 block">{r.location}</label>
            <input
              id="rec-location"
              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={submit}
          className="bg-green-800 hover:bg-green-900 text-white rounded-lg px-4 py-2.5 text-sm font-medium flex items-center gap-2"
        >
          <Sparkles size={15} /> {r.submit}
        </button>
      </div>

      {results && (
        <div className="mt-5 space-y-3">
          {results.map((c, i) => (
            <div key={c.name} className="bg-white border border-stone-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500">#{i + 1}</span>
                  <span className="font-medium text-stone-900">{CROPS_I18N[lang][c.name]}</span>
                </div>
                <span className="text-sm font-semibold text-green-800">{c.score}% {r.match.toLowerCase()}</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-green-800 rounded-full" style={{ width: `${c.score}%` }} />
              </div>
              <p className="text-xs text-stone-500"><span className="font-medium text-stone-500">{r.why}: </span>{c.why[lang]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Smart Weather ----------

function SmartWeather({ lang, profile }) {
  const w = WEATHER_LABELS[lang];
  const weather = useMemo(() => buildWeather(profile.location, lang), [profile.location, lang]);
  const today = weather.forecast[0];
  const CurrentIcon = today.cond.icon;

  const nextGoodDayIndex = weather.forecast.findIndex((f, i) => i > 0 && f.rainChance < 50);
  const nextGoodDay = nextGoodDayIndex >= 0 ? weather.forecast[nextGoodDayIndex].day : weather.forecast[1].day;

  let irrigationMsg = w.normalSchedule;
  if (today.rainChance > 60) irrigationMsg = w.skipToday;
  else if (weather.heatAlert) irrigationMsg = w.heatIrrigate;

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <h1 className="font-serif text-2xl text-stone-900">{w.title}</h1>
      <p className="text-sm text-stone-500 mt-0.5 mb-6">{w.subtitle} {profile.location}</p>

      {/* current conditions */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-5">
        <div className="flex items-center gap-4">
          <CurrentIcon size={44} className="text-sky-700" />
          <div>
            <div className="text-3xl font-semibold text-stone-900">{today.high}&deg;C</div>
            <div className="text-sm text-stone-500">{today.cond.label[lang]} &middot; low {today.low}&deg;C</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-stone-200">
          <div className="flex items-center gap-2">
            <Waves size={16} className="text-sky-700" />
            <div>
              <div className="text-xs text-stone-500">{w.humidity}</div>
              <div className="text-sm font-medium text-stone-900">{today.humidity}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind size={16} className="text-sky-700" />
            <div>
              <div className="text-xs text-stone-500">{w.wind}</div>
              <div className="text-sm font-medium text-stone-900">{today.wind} km/h</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Umbrella size={16} className="text-sky-700" />
            <div>
              <div className="text-xs text-stone-500">{w.rainChance}</div>
              <div className="text-sm font-medium text-stone-900">{today.rainChance}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* alerts */}
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        {weather.rainAlert && (
          <div className="bg-sky-50 border border-stone-200 rounded-2xl p-4 flex gap-3">
            <Droplets size={20} className="text-sky-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-stone-900">{w.rainAlert}</div>
              <p className="text-xs text-stone-500 mt-1">{w.rainAlertBody}</p>
            </div>
          </div>
        )}
        {weather.heatAlert && (
          <div className="bg-orange-50 border border-stone-200 rounded-2xl p-4 flex gap-3">
            <Thermometer size={20} className="text-orange-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-stone-900">{w.heatAlert}</div>
              <p className="text-xs text-stone-500 mt-1">{w.heatAlertBody}</p>
            </div>
          </div>
        )}
        {!weather.rainAlert && !weather.heatAlert && (
          <div className="bg-green-50 border border-stone-200 rounded-2xl p-4 flex gap-3 sm:col-span-2">
            <ShieldCheck size={20} className="text-green-800 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-stone-900">{w.allClear}</div>
              <p className="text-xs text-stone-500 mt-1">{w.allClearBody}</p>
            </div>
          </div>
        )}
      </div>

      {/* irrigation suggestion */}
      <div className="bg-green-800 text-white rounded-2xl p-5 mb-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-green-200 uppercase tracking-wide">{w.irrigation}</span>
          <SpeakButton text={irrigationMsg} lang={lang} className="text-green-200 hover:bg-white/10" />
        </div>
        <p className="text-sm mt-2 leading-relaxed">{irrigationMsg}</p>
        <p className="text-xs text-green-200 mt-3">{w.nextGoodDay}: <span className="text-white font-medium">{nextGoodDay}</span></p>
      </div>

      {/* 7-day forecast */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5">
        <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">{w.forecast7}</span>
        <div className="mt-3 divide-y divide-stone-200">
          {weather.forecast.map((f) => {
            const Ic = f.cond.icon;
            return (
              <div key={f.day} className="flex items-center justify-between py-2.5">
                <span className="text-sm text-stone-900 w-20 shrink-0">{f.day}</span>
                <Ic size={18} className="text-sky-700 shrink-0" />
                <span className="text-xs text-stone-500 flex-1 text-center">{f.cond.label[lang]}</span>
                <span className="text-xs text-sky-700 w-14 text-center">{f.rainChance}% rain</span>
                <span className="text-sm font-medium text-stone-900 w-16 text-right">{f.high}&deg;/{f.low}&deg;</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const STAGES = ["Sowing", "Vegetative", "Flowering", "Maturity"];

const STAGES_I18N = {
  EN: { Sowing: "Sowing", Vegetative: "Vegetative", Flowering: "Flowering", Maturity: "Maturity" },
  TE: { Sowing: "విత్తనం", Vegetative: "అభివృద్ధి", Flowering: "పూత దశ", Maturity: "పక్వత దశ" },
  HI: { Sowing: "बुआई", Vegetative: "विकास अवस्था", Flowering: "फूल अवस्था", Maturity: "पकने की अवस्था" },
};

const FERTILIZER_LABELS = {
  EN: { title: "Fertilizer advisor", subtitle: "Get a dose schedule based on your crop and growth stage",
    stage: "Growth stage", land: "Land size (acres)", perAcre: "Recommended per acre", total: "Total for your land",
    tip: "Application tip", urea: "Urea", dap: "DAP", mop: "MOP (Potash)" },
  TE: { title: "ఎరువుల సలహా", subtitle: "మీ పంట మరియు దశ ఆధారంగా మోతాదు షెడ్యూల్ పొందండి",
    stage: "పెరుగుదల దశ", land: "భూమి పరిమాణం (ఎకరాలు)", perAcre: "ఎకరానికి సిఫార్సు", total: "మీ భూమికి మొత్తం",
    tip: "వేసే విధానం సలహా", urea: "యూరియా", dap: "DAP", mop: "MOP (పొటాష్)" },
  HI: { title: "उर्वरक सलाह", subtitle: "अपनी फसल और अवस्था के अनुसार खुराक अनुसूची पाएं",
    stage: "विकास अवस्था", land: "भूमि (एकड़)", perAcre: "प्रति एकड़ सुझाव", total: "आपकी जमीन के लिए कुल",
    tip: "उपयोग सलाह", urea: "यूरिया", dap: "डीएपी", mop: "एमओपी (पोटाश)" },
};

const FERTILIZER_SCHEDULE = {
  _default: {
    Sowing: { urea: 20, dap: 40, mop: 15, tip: { EN: "Apply full DAP and half of MOP at sowing, mixed into the soil.", TE: "విత్తే సమయంలో పూర్తి DAP మరియు సగం MOP నేలలో కలిపి వేయండి.", HI: "बुवाई के समय पूरा डीएपी और आधा एमओपी मिट्टी में मिलाकर डालें." } },
    Vegetative: { urea: 25, dap: 0, mop: 0, tip: { EN: "Split urea into two doses during active leaf growth.", TE: "ఆకుల పెరుగుదల దశలో యూరియాను రెండు మోతాదులుగా వేయండి.", HI: "पत्तियों की सक्रिय वृद्धि के दौरान यूरिया को दो खुराकों में बांटें." } },
    Flowering: { urea: 15, dap: 0, mop: 10, tip: { EN: "Apply remaining MOP now to support flowering and grain fill.", TE: "పుష్పించే మరియు గింజ నిండే దశకు మిగిలిన MOP ఇప్పుడు వేయండి.", HI: "फूल आने और दाना भरने में मदद के लिए बचा हुआ एमओपी अभी डालें." } },
    Maturity: { urea: 0, dap: 0, mop: 0, tip: { EN: "Stop fertilizer application; focus on water management only.", TE: "ఎరువులు వేయడం ఆపండి; నీటి నిర్వహణపై మాత్రమే దృష్టి పెట్టండి.", HI: "उर्वरक देना बंद करें; केवल पानी प्रबंधन पर ध्यान दें." } },
  },
  "Rice (paddy)": {
    Sowing: { urea: 25, dap: 50, mop: 20, tip: { EN: "Apply as basal dose before transplanting, into standing water.", TE: "నాటడానికి ముందు నిలిచిన నీటిలో బేసల్ మోతాదుగా వేయండి.", HI: "रोपाई से पहले खड़े पानी में आधार खुराक के रूप में डालें." } },
    Vegetative: { urea: 30, dap: 0, mop: 0, tip: { EN: "Top-dress urea at active tillering stage, 20-25 days after transplanting.", TE: "నాటిన 20-25 రోజుల తర్వాత పిలకలు వచ్చే దశలో యూరియా వేయండి.", HI: "रोपाई के 20-25 दिन बाद सक्रिय कल्ले फूटने की अवस्था में यूरिया डालें." } },
    Flowering: { urea: 20, dap: 0, mop: 15, tip: { EN: "Apply at panicle initiation for better grain filling.", TE: "గింజ మంచిగా నిండటానికి వెన్ను వచ్చే దశలో వేయండి.", HI: "बेहतर दाना भरने के लिए बाली निकलने की शुरुआत में डालें." } },
    Maturity: { urea: 0, dap: 0, mop: 0, tip: { EN: "Drain field gradually; no more fertilizer needed.", TE: "పొలంలో నీటిని క్రమంగా తీసివేయండి; ఇక ఎరువులు అవసరం లేదు.", HI: "खेत से पानी धीरे-धीरे निकालें; अब उर्वरक की ज़रूरत नहीं." } },
  },
  Cotton: {
    Sowing: { urea: 15, dap: 35, mop: 15, tip: { EN: "Place basal dose 5cm below and beside the seed, not in direct contact.", TE: "బేసల్ మోతాదును విత్తనానికి 5సెం.మీ. కింద, పక్కన ఉంచండి — నేరుగా తగలకుండా.", HI: "आधार खुराक बीज से 5सेमी नीचे और बगल में रखें, सीधे संपर्क में नहीं." } },
    Vegetative: { urea: 25, dap: 0, mop: 10, tip: { EN: "Apply 30-35 days after sowing alongside light earthing up.", TE: "విత్తిన 30-35 రోజుల తర్వాత తేలికపాటి మట్టి ఎగదోతతో పాటు వేయండి.", HI: "बुवाई के 30-35 दिन बाद हल्की मिट्टी चढ़ाने के साथ डालें." } },
    Flowering: { urea: 20, dap: 0, mop: 15, tip: { EN: "Boll development stage — avoid excess nitrogen to prevent excess leaf growth.", TE: "కాయ ఏర్పడే దశ — ఆకుల మితిమీరిన పెరుగుదల నివారించడానికి అధిక నత్రజని వాడకండి.", HI: "गुटी विकास अवस्था — अधिक पत्ती वृद्धि रोकने के लिए ज़्यादा नाइट्रोजन से बचें." } },
    Maturity: { urea: 0, dap: 0, mop: 0, tip: { EN: "Withhold fertilizer as bolls mature and open.", TE: "కాయలు పండి విచ్చుకునేటప్పుడు ఎరువులు ఆపండి.", HI: "गुटी पकने और खुलने पर उर्वरक देना रोक दें." } },
  },
};

const MARKET_LABELS = {
  EN: { title: "Market prices", subtitle: "Compare mandi prices near you and spot the best market",
    crop: "Crop", perQuintal: "per quintal", bestMarket: "Best price", trend: "7-day trend", distance: "away" },
  TE: { title: "మార్కెట్ ధరలు", subtitle: "సమీప మార్కెట్ ధరలను పోల్చి, ఉత్తమ మార్కెట్‌ను కనుగొనండి",
    crop: "పంట", perQuintal: "క్వింటాల్‌కు", bestMarket: "ఉత్తమ ధర", trend: "7-రోజుల ధోరణి", distance: "దూరం" },
  HI: { title: "बाज़ार भाव", subtitle: "आस-पास की मंडी कीमतों की तुलना करें और सबसे अच्छा बाज़ार खोजें",
    crop: "फसल", perQuintal: "प्रति क्विंटल", bestMarket: "सबसे अच्छा भाव", trend: "7-दिन का रुझान", distance: "दूर" },
};

const MARKET_NAMES = ["Central Mandi", "Rythu Bazaar", "District APMC", "Village Collection Center"];
const MARKET_NAMES_I18N = {
  EN: { "Central Mandi": "Central Mandi", "Rythu Bazaar": "Rythu Bazaar", "District APMC": "District APMC", "Village Collection Center": "Village Collection Center" },
  TE: { "Central Mandi": "సెంట్రల్ మండి", "Rythu Bazaar": "రైతు బజార్", "District APMC": "జిల్లా APMC", "Village Collection Center": "గ్రామ సేకరణ కేంద్రం" },
  HI: { "Central Mandi": "सेंट्रल मंडी", "Rythu Bazaar": "रायथु बाज़ार", "District APMC": "जिला APMC", "Village Collection Center": "ग्राम संग्रह केंद्र" },
};

function buildMarketPrices(crop) {
  const basePrice = { "Rice (paddy)": 2100, Cotton: 6800, Maize: 1900, Groundnut: 5800, Chilli: 14500, Turmeric: 8200, Wheat: 2300, Sugarcane: 340 }[crop] || 2500;
  return MARKET_NAMES.map((m) => {
    const rand = seededRandom(crop + m);
    const price = Math.round(basePrice * (0.9 + rand() * 0.22));
    const distance = Math.round(3 + rand() * 25);
    const trend = Array.from({ length: 7 }, () => Math.round(basePrice * (0.85 + rand() * 0.3)));
    return { market: m, price, distance, trend };
  });
}

const SCHEMES_LABELS = {
  EN: { title: "Government schemes", subtitle: "Search central schemes for farmers", search: "Search schemes\u2026", documents: "Documents needed", eligibility: "Eligibility" },
  TE: { title: "ప్రభుత్వ పథకాలు", subtitle: "రైతుల కోసం కేంద్ర పథకాలను వెతకండి", search: "పథకాలను వెతకండి\u2026", documents: "అవసరమైన పత్రాలు", eligibility: "అర్హత" },
  HI: { title: "सरकारी योजनाएं", subtitle: "किसानों के लिए केंद्रीय योजनाएं खोजें", search: "योजनाएं खोजें\u2026", documents: "आवश्यक दस्तावेज़", eligibility: "पात्रता" },
};

const SCHEMES = [
  { name: { EN: "PM-KISAN", TE: "PM-KISAN", HI: "PM-KISAN" },
    eligibility: { EN: "Small and marginal landholding farmer families across India.", TE: "భారతదేశం అంతటా చిన్న మరియు సన్నకారు భూమి కలిగిన రైతు కుటుంబాలు.", HI: "पूरे भारत में छोटे और सीमांत भूमिधारक किसान परिवार." },
    documents: { EN: ["Aadhaar card", "Land ownership papers", "Bank account details"], TE: ["ఆధార్ కార్డు", "భూమి యాజమాన్య పత్రాలు", "బ్యాంక్ ఖాతా వివరాలు"], HI: ["आधार कार्ड", "भूमि स्वामित्व कागज़ात", "बैंक खाता विवरण"] } },
  { name: { EN: "Pradhan Mantri Fasal Bima Yojana (crop insurance)", TE: "ప్రధాన మంత్రి ఫసల్ బీమా యోజన (పంట బీమా)", HI: "प्रधानमंत्री फसल बीमा योजना" },
    eligibility: { EN: "Farmers growing notified crops in notified areas, including tenant/sharecropper farmers.", TE: "నోటిఫై చేసిన ప్రాంతాల్లో నోటిఫై చేసిన పంటలు పండించే రైతులు, కౌలు రైతులతో సహా.", HI: "अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले किसान, बटाईदार किसानों सहित." },
    documents: { EN: ["Aadhaar card", "Land records or tenancy agreement", "Bank account", "Sowing declaration"], TE: ["ఆధార్ కార్డు", "భూమి రికార్డులు లేదా కౌలు ఒప్పందం", "బ్యాంక్ ఖాతా", "విత్తన ప్రకటన"], HI: ["आधार कार्ड", "भूमि रिकॉर्ड या पट्टा समझौता", "बैंक खाता", "बुवाई घोषणा"] } },
  { name: { EN: "Soil Health Card Scheme", TE: "నేల ఆరోగ్య కార్డు పథకం", HI: "मृदा स्वास्थ्य कार्ड योजना" },
    eligibility: { EN: "Open to all farmers; soil samples collected periodically by agriculture department.", TE: "అన్ని రైతులకు అందుబాటులో ఉంటుంది; వ్యవసాయ శాఖ నేల నమూనాలను క్రమానుగతంగా సేకరిస్తుంది.", HI: "सभी किसानों के लिए खुली; कृषि विभाग समय-समय पर मिट्टी के नमूने लेता है." },
    documents: { EN: ["Aadhaar card", "Land details"], TE: ["ఆధార్ కార్డు", "భూమి వివరాలు"], HI: ["आधार कार्ड", "भूमि विवरण"] } },
  { name: { EN: "Kisan Credit Card (KCC)", TE: "కిసాన్ క్రెడిట్ కార్డు (KCC)", HI: "किसान क्रेडिट कार्ड (केसीसी)" },
    eligibility: { EN: "Farmers, tenant farmers, and sharecroppers needing short-term crop loans.", TE: "స్వల్పకాలిక పంట రుణాలు అవసరమైన రైతులు, కౌలు రైతులు.", HI: "अल्पकालिक फसल ऋण चाहने वाले किसान, बटाईदार किसान." },
    documents: { EN: ["Aadhaar card", "Land records", "Passport-size photo", "Bank account"], TE: ["ఆధార్ కార్డు", "భూమి రికార్డులు", "పాస్‌పోర్ట్ సైజు ఫోటో", "బ్యాంక్ ఖాతా"], HI: ["आधार कार्ड", "भूमि रिकॉर्ड", "पासपोर्ट साइज़ फोटो", "बैंक खाता"] } },
  { name: { EN: "PM-KUSUM (solar pump subsidy)", TE: "PM-KUSUM (సోలార్ పంపు సబ్సిడీ)", HI: "पीएम-कुसुम (सोलर पंप सब्सिडी)" },
    eligibility: { EN: "Farmers wanting to install solar-powered irrigation pumps.", TE: "సోలార్ ఆధారిత నీటిపారుదల పంపులను ఏర్పాటు చేయాలనుకునే రైతులు.", HI: "सोलर-संचालित सिंचाई पंप लगाना चाहने वाले किसान." },
    documents: { EN: ["Aadhaar card", "Land ownership proof", "Electricity connection details (if any)"], TE: ["ఆధార్ కార్డు", "భూమి యాజమాన్య రుజువు", "విద్యుత్ కనెక్షన్ వివరాలు (ఉంటే)"], HI: ["आधार कार्ड", "भूमि स्वामित्व प्रमाण", "बिजली कनेक्शन विवरण (यदि हो)"] } },
];

const EQUIPMENT_LABELS = {
  EN: { title: "Equipment rental", subtitle: "Rent tractors and tools from nearby owners", perDay: "/ day", contact: "Contact owner", demoNote: "Demo listing — contact booking isn't wired to a real backend yet.", away: "km away" },
  TE: { title: "పరికరాల అద్దె", subtitle: "సమీపంలోని యజమానుల నుండి ట్రాక్టర్లు, పరికరాలు అద్దెకు తీసుకోండి", perDay: "/ రోజుకు", contact: "యజమానిని సంప్రదించండి", demoNote: "డెమో లిస్టింగ్ — బుకింగ్ ఇంకా అనుసంధానించబడలేదు.", away: "కి.మీ దూరం" },
  HI: { title: "उपकरण किराया", subtitle: "पास के मालिकों से ट्रैक्टर और उपकरण किराए पर लें", perDay: "/ दिन", contact: "मालिक से संपर्क करें", demoNote: "डेमो लिस्टिंग — बुकिंग अभी वास्तविक सिस्टम से नहीं जुड़ी है.", away: "किमी दूर" },
};

const EQUIPMENT = [
  { name: { EN: "Tractor (45 HP)", TE: "ట్రాక్టర్ (45 HP)", HI: "ट्रैक्टर (45 HP)" }, owner: "Venkat Rao", distance: 4, price: 900 },
  { name: { EN: "Rotavator", TE: "రోటావేటర్", HI: "रोटावेटर" }, owner: "Lakshmi Farms", distance: 6, price: 500 },
  { name: { EN: "Combine harvester", TE: "కంబైన్ హార్వెస్టర్", HI: "कंबाइन हार्वेस्टर" }, owner: "Suresh Reddy", distance: 12, price: 2200 },
  { name: { EN: "Power sprayer", TE: "పవర్ స్ప్రేయర్", HI: "पावर स्प्रेयर" }, owner: "Anjali Agro", distance: 3, price: 250 },
];

const MARKETPLACE_LABELS = {
  EN: { title: "Marketplace", subtitle: "Buy inputs or list your harvest for sale", buy: "Buy", sell: "Sell",
    addToCart: "Add", cart: "Cart", total: "Total", cropName: "Crop", quantity: "Quantity (quintals)", expectedPrice: "Expected price (per quintal)",
    listBtn: "Create listing", listed: "Listing created — buyers in your area will be able to see this (demo).",
    increase: "Increase quantity", decrease: "Decrease quantity" },
  TE: { title: "మార్కెట్‌ప్లేస్", subtitle: "ఎరువులు కొనండి లేదా మీ పంటను అమ్మకానికి పెట్టండి", buy: "కొనుగోలు", sell: "అమ్మకం",
    addToCart: "జోడించు", cart: "కార్ట్", total: "మొత్తం", cropName: "పంట", quantity: "పరిమాణం (క్వింటాళ్లు)", expectedPrice: "అంచనా ధర (క్వింటాల్‌కు)",
    listBtn: "లిస్టింగ్ సృష్టించండి", listed: "లిస్టింగ్ సృష్టించబడింది — మీ ప్రాంతంలోని కొనుగోలుదారులు దీన్ని చూడగలరు (డెమో).",
    increase: "పరిమాణం పెంచు", decrease: "పరిమాణం తగ్గించు" },
  HI: { title: "बाज़ार", subtitle: "सामान खरीदें या अपनी फसल बेचने के लिए सूचीबद्ध करें", buy: "खरीदें", sell: "बेचें",
    addToCart: "जोड़ें", cart: "कार्ट", total: "कुल", cropName: "फसल", quantity: "मात्रा (क्विंटल)", expectedPrice: "अनुमानित भाव (प्रति क्विंटल)",
    listBtn: "लिस्टिंग बनाएं", listed: "लिस्टिंग बन गई — आपके क्षेत्र के खरीदार इसे देख सकेंगे (डेमो).",
    increase: "मात्रा बढ़ाएं", decrease: "मात्रा घटाएं" },
};

const MARKETPLACE_PRODUCTS = [
  { name: { EN: "Hybrid paddy seeds (5kg)", TE: "హైబ్రిడ్ వరి విత్తనాలు (5కేజీ)", HI: "हाइब्रिड धान बीज (5 किलो)" }, price: 450 },
  { name: { EN: "Urea (45kg bag)", TE: "యూరియా (45కేజీ బస్తా)", HI: "यूरिया (45 किलो बैग)" }, price: 266 },
  { name: { EN: "DAP (50kg bag)", TE: "DAP (50కేజీ బస్తా)", HI: "डीएपी (50 किलो बैग)" }, price: 1350 },
  { name: { EN: "Neem-based pesticide (1L)", TE: "వేప ఆధారిత పురుగుమందు (1లీ)", HI: "नीम आधारित कीटनाशक (1 लीटर)" }, price: 320 },
  { name: { EN: "Bio-fungicide (500ml)", TE: "బయో-శిలీంద్రనాశిని (500మి.లీ)", HI: "बायो-फफूंदनाशक (500 मिली)" }, price: 280 },
];

const ANALYTICS_LABELS = {
  EN: { title: "Analytics", subtitle: "A snapshot of how this season is trending", growth: "Crop growth", water: "Water usage this month", yieldPred: "Predicted yield", expenses: "Expenses", revenue: "Estimated revenue", profit: "Estimated profit", perAcreUnit: "quintals / acre" },
  TE: { title: "విశ్లేషణ", subtitle: "ఈ సీజన్ ధోరణి ఇదిగో", growth: "పంట పెరుగుదల", water: "ఈ నెల నీటి వినియోగం", yieldPred: "అంచనా దిగుబడి", expenses: "ఖర్చులు", revenue: "అంచనా ఆదాయం", profit: "అంచనా లాభం", perAcreUnit: "క్వింటాళ్లు / ఎకరం" },
  HI: { title: "विश्लेषण", subtitle: "इस सीज़न का रुझान", growth: "फसल वृद्धि", water: "इस महीने पानी उपयोग", yieldPred: "अनुमानित उपज", expenses: "खर्च", revenue: "अनुमानित आय", profit: "अनुमानित लाभ", perAcreUnit: "क्विंटल / एकड़" },
};

const NOTIF_LABELS = {
  EN: { title: "Notifications", subtitle: "Everything that needs your attention", dismiss: "Dismiss", empty: "You're all caught up." },
  TE: { title: "నోటిఫికేషన్లు", subtitle: "మీ దృష్టి అవసరమైనవి", dismiss: "తీసివేయి", empty: "అన్నీ పూర్తయ్యాయి." },
  HI: { title: "सूचनाएं", subtitle: "जिन पर आपका ध्यान चाहिए", dismiss: "हटाएं", empty: "सब कुछ ठीक है." },
};

const ASSISTANT_LABELS = {
  EN: { title: "AI farming assistant", subtitle: "Ask about weather, disease, fertilizer, prices, or schemes",
    placeholder: "Type your question\u2026", greeting: "Namaste! Ask me about weather, crop disease, fertilizer schedules, market prices, or government schemes.",
    disclaimer: "Demo mode: replies are matched from a small set of topics, not a full AI model yet.",
    micUnsupported: "Voice input isn't supported in this browser.",
    weatherReply: "Here's today's outlook based on your location.",
    diseaseReply: "Head to the Disease Detection tab and upload a photo of the affected plant for a diagnosis.",
    fertilizerReply: "Open the Fertilizer Advisor tab — pick your crop's growth stage and I'll calculate the dose for your land size.",
    priceReply: "Check the Market Prices tab for today's mandi rates and the best nearby market.",
    schemeReply: "The Government Schemes tab lists current programs like PM-KISAN and crop insurance with eligibility details.",
    fallback: "I can help with weather, crop disease, fertilizer schedules, market prices, or government schemes — try asking about one of those, or tap a module in the sidebar.",
  },
  TE: { title: "AI వ్యవసాయ సహాయకుడు", subtitle: "వాతావరణం, వ్యాధి, ఎరువులు, ధరలు లేదా పథకాల గురించి అడగండి",
    placeholder: "మీ ప్రశ్న టైప్ చేయండి\u2026", greeting: "నమస్కారం! వాతావరణం, పంట వ్యాధి, ఎరువుల షెడ్యూల్, మార్కెట్ ధరలు లేదా ప్రభుత్వ పథకాల గురించి అడగండి.",
    disclaimer: "డెమో మోడ్: సమాధానాలు కొన్ని అంశాల నుండి సరిపోల్చబడ్డాయి, పూర్తి AI మోడల్ కాదు.",
    micUnsupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ మద్దతు లేదు.",
    weatherReply: "మీ ప్రాంతం ఆధారంగా ఈరోజు వాతావరణం ఇదిగో.",
    diseaseReply: "వ్యాధి గుర్తింపు ట్యాబ్‌కు వెళ్లి ప్రభావిత మొక్క ఫోటో అప్‌లోడ్ చేయండి.",
    fertilizerReply: "ఎరువుల సలహా ట్యాబ్ తెరవండి — పంట దశ ఎంచుకోండి, మోతాదు లెక్కిస్తాను.",
    priceReply: "నేటి మార్కెట్ ధరల కోసం మార్కెట్ ధరలు ట్యాబ్ చూడండి.",
    schemeReply: "ప్రభుత్వ పథకాలు ట్యాబ్‌లో PM-KISAN వంటి పథకాలు అర్హత వివరాలతో ఉన్నాయి.",
    fallback: "వాతావరణం, పంట వ్యాధి, ఎరువులు, మార్కెట్ ధరలు లేదా ప్రభుత్వ పథకాల గురించి అడగవచ్చు — లేదా సైడ్‌బార్‌లో ఒక విభాగం తాకండి.",
  },
  HI: { title: "AI कृषि सहायक", subtitle: "मौसम, रोग, उर्वरक, भाव या योजनाओं के बारे में पूछें",
    placeholder: "अपना सवाल लिखें\u2026", greeting: "नमस्ते! मौसम, फसल रोग, उर्वरक अनुसूची, बाज़ार भाव या सरकारी योजनाओं के बारे में पूछें.",
    disclaimer: "डेमो मोड: जवाब कुछ चुने हुए विषयों से मिलाए जाते हैं, पूरा AI मॉडल नहीं है.",
    micUnsupported: "इस ब्राउज़र में आवाज़ इनपुट समर्थित नहीं है.",
    weatherReply: "आपके स्थान के आधार पर आज का मौसम यह है.",
    diseaseReply: "रोग पहचान टैब खोलें और प्रभावित पौधे की फोटो अपलोड करें.",
    fertilizerReply: "उर्वरक सलाह टैब खोलें — फसल की अवस्था चुनें, मैं खुराक निकाल दूंगा.",
    priceReply: "आज के मंडी भाव के लिए बाज़ार भाव टैब देखें.",
    schemeReply: "सरकारी योजनाएं टैब में PM-KISAN जैसी योजनाएं पात्रता विवरण के साथ हैं.",
    fallback: "मौसम, फसल रोग, उर्वरक, बाज़ार भाव या सरकारी योजनाओं के बारे में पूछ सकते हैं — या साइडबार में कोई भाग खोलें.",
  },
};

const PROFILE_LABELS = {
  EN: { title: "Your profile", edit: "Edit profile", logout: "Log out", logoutConfirm: "This clears your local demo session. Continue?", cancel: "Cancel" },
  TE: { title: "మీ ప్రొఫైల్", edit: "ప్రొఫైల్ మార్చు", logout: "లాగ్ అవుట్", logoutConfirm: "ఇది మీ డెమో సెషన్‌ను క్లియర్ చేస్తుంది. కొనసాగించాలా?", cancel: "రద్దు చేయి" },
  HI: { title: "आपकी प्रोफ़ाइल", edit: "प्रोफ़ाइल बदलें", logout: "लॉग आउट", logoutConfirm: "यह आपका डेमो सेशन साफ़ कर देगा. जारी रखें?", cancel: "रद्द करें" },
};

// ---------- Fertilizer Advisor ----------

function FertilizerAdvisor({ lang, profile }) {
  const f = FERTILIZER_LABELS[lang];
  const [stage, setStage] = useState(STAGES[0]);
  const land = Number(profile.land) || 1;
  const schedule = FERTILIZER_SCHEDULE[profile.crop] || FERTILIZER_SCHEDULE._default;
  const dose = schedule[stage];

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="font-serif text-2xl text-stone-900">{f.title}</h1>
      <p className="text-sm text-stone-500 mt-0.5 mb-6">{f.subtitle}</p>

      <div className="bg-white border border-stone-200 rounded-2xl p-5">
        <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">{f.stage}</span>
        <div className="flex flex-wrap gap-2 mt-2 mb-5">
          {STAGES.map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                stage === s ? "bg-green-800 text-white border-green-800" : "border-stone-200 text-stone-500"
              }`}
            >
              {STAGES_I18N[lang][s]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[["urea", dose.urea], ["dap", dose.dap], ["mop", dose.mop]].map(([key, perAcre]) => (
            <div key={key} className="border border-stone-200 rounded-xl p-3 text-center">
              <div className="text-xs text-stone-500">{f[key]}</div>
              <div className="text-lg font-semibold text-stone-900 mt-1">{Math.round(perAcre * land)} kg</div>
              <div className="text-[10px] text-stone-500 mt-0.5">{perAcre} kg {f.perAcre.toLowerCase()}</div>
            </div>
          ))}
        </div>

        <div className="flex items-start justify-between gap-2 mt-5 pt-4 border-t border-stone-200">
          <div>
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">{f.tip}</span>
            <p className="text-sm text-stone-900 mt-1">{dose.tip[lang]}</p>
          </div>
          <SpeakButton text={dose.tip[lang]} lang={lang} />
        </div>
      </div>
    </div>
  );
}

// ---------- Market Prices ----------

function MarketPrices({ lang, profile }) {
  const m = MARKET_LABELS[lang];
  const [crop, setCrop] = useState(profile.crop);
  const markets = useMemo(() => buildMarketPrices(crop), [crop]);
  const best = markets.reduce((a, b) => (b.price > a.price ? b : a), markets[0]);
  const maxTrend = Math.max(...markets.flatMap((mk) => mk.trend));

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="font-serif text-2xl text-stone-900">{m.title}</h1>
      <p className="text-sm text-stone-500 mt-0.5 mb-6">{m.subtitle}</p>

      <div className="mb-5">
        <label htmlFor="market-crop" className="text-xs font-medium text-stone-500 mb-1 block">{m.crop}</label>
        <select id="market-crop" className="border border-stone-200 rounded-lg px-3 py-2 text-sm bg-white" value={crop} onChange={(e) => setCrop(e.target.value)}>
          {CROPS.map((c) => <option key={c} value={c}>{CROPS_I18N[lang][c]}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {markets.map((mk) => (
          <div key={mk.market} className={`bg-white border rounded-2xl p-4 flex items-center justify-between ${mk.market === best.market ? "border-green-800" : "border-stone-200"}`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-stone-900">{MARKET_NAMES_I18N[lang][mk.market]}</span>
                {mk.market === best.market && (
                  <span className="text-[10px] bg-green-50 text-green-800 rounded-full px-2 py-0.5">{m.bestMarket}</span>
                )}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">{mk.distance} km {m.distance}</div>
            </div>
            <div className="flex items-end gap-2">
              <div className="flex items-end gap-0.5 h-8">
                {mk.trend.map((v, i) => (
                  <div key={i} className="w-1.5 bg-sky-700 rounded-sm" style={{ height: `${(v / maxTrend) * 100}%` }} />
                ))}
              </div>
              <span className="text-lg font-semibold text-stone-900">&#8377;{mk.price}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-stone-500 mt-3">{m.perQuintal} &middot; {m.trend}</p>
    </div>
  );
}

// ---------- Government Schemes ----------

function GovtSchemes({ lang }) {
  const s = SCHEMES_LABELS[lang];
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);
  const filtered = SCHEMES.filter((sc) => sc.name[lang].toLowerCase().includes(query.toLowerCase()) || sc.name.EN.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="font-serif text-2xl text-stone-900">{s.title}</h1>
      <p className="text-sm text-stone-500 mt-0.5 mb-6">{s.subtitle}</p>

      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
        <input
          className="w-full border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-sm bg-white"
          placeholder={s.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((sc) => {
          const isOpen = open === sc.name.EN;
          return (
            <div key={sc.name.EN} className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : sc.name.EN)} className="w-full flex items-center justify-between p-4 text-left">
                <span className="font-medium text-stone-900 text-sm">{sc.name[lang]}</span>
                <ChevronRight size={16} className={`text-stone-500 transition-transform ${isOpen ? "rotate-90" : ""}`} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-sm">
                  <div className="mb-2"><span className="text-xs font-medium text-stone-500 uppercase">{s.eligibility}</span><p className="text-stone-900 mt-1">{sc.eligibility[lang]}</p></div>
                  <div><span className="text-xs font-medium text-stone-500 uppercase">{s.documents}</span>
                    <ul className="mt-1 space-y-1">
                      {sc.documents[lang].map((d) => (
                        <li key={d} className="flex items-center gap-2 text-stone-900"><CheckCircle2 size={13} className="text-green-800" />{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Equipment Rental ----------

function EquipmentRental({ lang }) {
  const e = EQUIPMENT_LABELS[lang];
  const [revealed, setRevealed] = useState({});

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="font-serif text-2xl text-stone-900">{e.title}</h1>
      <p className="text-sm text-stone-500 mt-0.5 mb-6">{e.subtitle}</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {EQUIPMENT.map((eq) => (
          <div key={eq.name.EN} className="bg-white border border-stone-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Tractor size={18} className="text-amber-800" />
              <span className="font-medium text-stone-900 text-sm">{eq.name[lang]}</span>
            </div>
            <div className="text-xs text-stone-500">{eq.owner} &middot; {eq.distance} {e.away}</div>
            <div className="text-lg font-semibold text-stone-900 mt-2">&#8377;{eq.price}<span className="text-xs font-normal text-stone-500">{e.perDay}</span></div>
            <button
              onClick={() => setRevealed({ ...revealed, [eq.name.EN]: true })}
              className="mt-3 w-full bg-green-800 text-white rounded-lg py-2 text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <Phone size={13} /> {revealed[eq.name.EN] ? "98xxx-xxx" + (10 + EQUIPMENT.indexOf(eq)) : e.contact}
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-stone-500 mt-4">{e.demoNote}</p>
    </div>
  );
}

// ---------- Marketplace ----------

function MarketplaceView({ lang }) {
  const mp = MARKETPLACE_LABELS[lang];
  const [tab, setTab] = useState("buy");
  const [cart, setCart] = useState({});
  const [sellForm, setSellForm] = useState({ crop: CROPS[0], quantity: "", price: "" });
  const [listed, setListed] = useState(false);

  function adjust(name, delta) {
    setCart((c) => {
      const next = { ...c, [name]: Math.max(0, (c[name] || 0) + delta) };
      if (next[name] === 0) delete next[name];
      return next;
    });
  }
  const cartTotal = Object.entries(cart).reduce((sum, [name, qty]) => {
    const product = MARKETPLACE_PRODUCTS.find((p) => p.name.EN === name);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="font-serif text-2xl text-stone-900">{mp.title}</h1>
      <p className="text-sm text-stone-500 mt-0.5 mb-6">{mp.subtitle}</p>

      <div className="flex gap-2 mb-5">
        <button onClick={() => setTab("buy")} className={`px-4 py-1.5 rounded-full text-sm font-medium ${tab === "buy" ? "bg-green-800 text-white" : "bg-white border border-stone-200 text-stone-500"}`}>{mp.buy}</button>
        <button onClick={() => setTab("sell")} className={`px-4 py-1.5 rounded-full text-sm font-medium ${tab === "sell" ? "bg-green-800 text-white" : "bg-white border border-stone-200 text-stone-500"}`}>{mp.sell}</button>
      </div>

      {tab === "buy" ? (
        <div className="space-y-3">
          {MARKETPLACE_PRODUCTS.map((p) => (
            <div key={p.name.EN} className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-stone-900 text-sm">{p.name[lang]}</div>
                <div className="text-xs text-stone-500">&#8377;{p.price}</div>
              </div>
              {cart[p.name.EN] ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => adjust(p.name.EN, -1)} aria-label={mp.decrease} className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center"><Minus size={13} /></button>
                  <span className="text-sm w-5 text-center">{cart[p.name.EN]}</span>
                  <button onClick={() => adjust(p.name.EN, 1)} aria-label={mp.increase} className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center"><Plus size={13} /></button>
                </div>
              ) : (
                <button onClick={() => adjust(p.name.EN, 1)} className="bg-green-800 text-white rounded-lg px-3 py-1.5 text-xs font-medium">{mp.addToCart}</button>
              )}
            </div>
          ))}
          {cartTotal > 0 && (
            <div className="bg-green-800 text-white rounded-2xl p-4 flex items-center justify-between">
              <span className="text-sm">{mp.cart}</span>
              <span className="font-semibold">{mp.total}: &#8377;{cartTotal}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4">
          <div>
            <label htmlFor="sell-crop" className="text-xs font-medium text-stone-500 mb-1 block">{mp.cropName}</label>
            <select id="sell-crop" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm bg-white" value={sellForm.crop} onChange={(e) => { setSellForm({ ...sellForm, crop: e.target.value }); setListed(false); }}>
              {CROPS.map((c) => <option key={c} value={c}>{CROPS_I18N[lang][c]}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="sell-quantity" className="text-xs font-medium text-stone-500 mb-1 block">{mp.quantity}</label>
              <input id="sell-quantity" type="number" min="0" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm" value={sellForm.quantity} onChange={(e) => { setSellForm({ ...sellForm, quantity: e.target.value }); setListed(false); }} />
            </div>
            <div>
              <label htmlFor="sell-price" className="text-xs font-medium text-stone-500 mb-1 block">{mp.expectedPrice}</label>
              <input id="sell-price" type="number" min="0" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm" value={sellForm.price} onChange={(e) => { setSellForm({ ...sellForm, price: e.target.value }); setListed(false); }} />
            </div>
          </div>
          <button
            onClick={() => setListed(true)}
            disabled={!(sellForm.quantity && Number(sellForm.quantity) > 0 && sellForm.price && Number(sellForm.price) > 0)}
            className="bg-green-800 disabled:opacity-40 text-white rounded-lg px-4 py-2 text-sm font-medium"
          >
            {mp.listBtn}
          </button>
          {listed && <p className="text-xs text-green-800 bg-green-50 rounded-lg px-3 py-2">{mp.listed}</p>}
        </div>
      )}
    </div>
  );
}

// ---------- Analytics ----------

function Analytics({ lang, profile }) {
  const a = ANALYTICS_LABELS[lang];
  const rand = seededRandom(profile.crop + profile.location);
  const growth = Math.round(35 + rand() * 50);
  const water = Math.round(4000 + rand() * 6000);
  const yieldPred = (12 + rand() * 10).toFixed(1);
  const expenses = Math.round(15000 + rand() * 20000);
  const revenue = Math.round(expenses * (1.15 + rand() * 0.5));
  const profit = revenue - expenses;
  const maxBar = Math.max(expenses, revenue);

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="font-serif text-2xl text-stone-900">{a.title}</h1>
      <p className="text-sm text-stone-500 mt-0.5 mb-6">{a.subtitle}</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-4">
          <span className="text-xs font-medium text-stone-500 uppercase">{a.growth}</span>
          <div className="w-full h-2 bg-stone-200 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-green-800 rounded-full" style={{ width: `${growth}%` }} />
          </div>
          <div className="text-sm font-semibold text-stone-900 mt-1">{growth}%</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl p-4">
          <span className="text-xs font-medium text-stone-500 uppercase">{a.water}</span>
          <div className="flex items-center gap-2 mt-2">
            <Droplet size={16} className="text-sky-700" />
            <span className="text-sm font-semibold text-stone-900">{water.toLocaleString()} L</span>
          </div>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl p-4">
          <span className="text-xs font-medium text-stone-500 uppercase">{a.yieldPred}</span>
          <div className="text-sm font-semibold text-stone-900 mt-2">{yieldPred} {a.perAcreUnit}</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl p-4">
          <span className="text-xs font-medium text-stone-500 uppercase">{a.profit}</span>
          <div className={`text-sm font-semibold mt-2 ${profit >= 0 ? "text-green-800" : "text-orange-700"}`}>&#8377;{profit.toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-stone-500">{a.expenses}</span>
          <span className="text-sm font-medium text-stone-900">&#8377;{expenses.toLocaleString()}</span>
        </div>
        <div className="w-full h-2 bg-stone-200 rounded-full mb-4 overflow-hidden"><div className="h-full bg-orange-700 rounded-full" style={{ width: `${(expenses / maxBar) * 100}%` }} /></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-stone-500">{a.revenue}</span>
          <span className="text-sm font-medium text-stone-900">&#8377;{revenue.toLocaleString()}</span>
        </div>
        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden"><div className="h-full bg-green-800 rounded-full" style={{ width: `${(revenue / maxBar) * 100}%` }} /></div>
      </div>
    </div>
  );
}

// ---------- Notifications ----------

const NOTIF_TEXT_I18N = {
  rain: { EN: "Rain expected in the next few days — plan fertilizer application around it.", TE: "రాబోయే కొద్ది రోజుల్లో వర్షం అవకాశం — ఎరువులు వేయడాన్ని దాని ప్రకారం ప్లాన్ చేయండి.", HI: "अगले कुछ दिनों में बारिश की संभावना — उर्वरक डालने की योजना उसी हिसाब से बनाएं." },
  heat: { EN: "Heatwave warning — irrigate early morning or evening only.", TE: "వడగాలుల హెచ్చరిక — ఉదయం లేదా సాయంత్రం మాత్రమే నీరు పెట్టండి.", HI: "लू की चेतावनी — केवल सुबह या शाम को ही सिंचाई करें." },
  disease: { EN: "Weekly reminder: inspect your crop for early signs of disease.", TE: "వారాంతపు గుర్తు: వ్యాధి తొలి సంకేతాల కోసం మీ పంటను పరిశీలించండి.", HI: "साप्ताहिक याद: अपनी फसल में रोग के शुरुआती लक्षणों की जांच करें." },
  fertilizer: { EN: "Fertilizer dose due — check the Fertilizer Advisor for this week's schedule.", TE: "ఎరువుల మోతాదు సమయం ఆసన్నమైంది — ఈ వారం షెడ్యూల్ కోసం ఎరువుల సలహా చూడండి.", HI: "उर्वरक की खुराक का समय — इस हफ्ते की अनुसूची के लिए उर्वरक सलाह देखें." },
  harvest: { EN: "Estimated harvest window is approaching in about 65 days.", TE: "అంచనా కోత సమయం సుమారు 65 రోజుల్లో సమీపిస్తోంది.", HI: "अनुमानित कटाई का समय लगभग 65 दिनों में आने वाला है." },
};

function NotificationsView({ lang, profile }) {
  const n = NOTIF_LABELS[lang];
  const weather = useMemo(() => buildWeather(profile.location, lang), [profile.location, lang]);
  const initial = [];
  if (weather.rainAlert) initial.push({ id: "rain", icon: Droplets, color: "text-sky-700", text: NOTIF_TEXT_I18N.rain[lang] });
  if (weather.heatAlert) initial.push({ id: "heat", icon: Thermometer, color: "text-orange-700", text: NOTIF_TEXT_I18N.heat[lang] });
  initial.push({ id: "disease", icon: AlertTriangle, color: "text-orange-700", text: NOTIF_TEXT_I18N.disease[lang] });
  initial.push({ id: "fertilizer", icon: FlaskConical, color: "text-amber-800", text: NOTIF_TEXT_I18N.fertilizer[lang] });
  initial.push({ id: "harvest", icon: Wheat, color: "text-green-800", text: NOTIF_TEXT_I18N.harvest[lang] });

  const [items, setItems] = useState(initial);

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="font-serif text-2xl text-stone-900">{n.title}</h1>
      <p className="text-sm text-stone-500 mt-0.5 mb-6">{n.subtitle}</p>

      {items.length === 0 ? (
        <p className="text-sm text-stone-500">{n.empty}</p>
      ) : (
        <div className="space-y-3">
          {items.map((it) => {
            const Ic = it.icon;
            return (
              <div key={it.id} className="bg-white border border-stone-200 rounded-2xl p-4 flex items-start gap-3">
                <Ic size={18} className={`${it.color} shrink-0 mt-0.5`} />
                <p className="text-sm text-stone-900 flex-1">{it.text}</p>
                <button onClick={() => setItems(items.filter((x) => x.id !== it.id))} className="text-stone-500 hover:text-stone-900 text-xs shrink-0">{n.dismiss}</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------- AI Assistant ----------

function getBotReply(text, lang, profile) {
  const a = ASSISTANT_LABELS[lang];
  const q = text.toLowerCase();
  if (/(weather|rain|forecast|hot|heat)/.test(q)) {
    const w = buildWeather(profile.location, lang);
    return `${a.weatherReply} ${w.forecast[0].high}\u00b0C, ${w.forecast[0].cond.label[lang].toLowerCase()}.`;
  }
  if (/(disease|pest|infect|spot|fungus)/.test(q)) return a.diseaseReply;
  if (/(fertilizer|urea|dap|nutrient)/.test(q)) return a.fertilizerReply;
  if (/(price|market|mandi|sell)/.test(q)) return a.priceReply;
  if (/(scheme|loan|subsidy|insurance|kisan)/.test(q)) return a.schemeReply;
  return a.fallback;
}

function AIAssistant({ lang, profile }) {
  const a = ASSISTANT_LABELS[lang];
  const [messages, setMessages] = useState([{ role: "bot", text: a.greeting }]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const micSupported = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

  function send(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = getBotReply(trimmed, lang, profile);
    setMessages((m) => [...m, { role: "user", text: trimmed }, { role: "bot", text: reply }]);
    setInput("");
  }

  function startMic() {
    if (!micSupported) return;
    try {
      const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new Rec();
      rec.lang = SPEECH_LANG[lang] || "en-IN";
      rec.onresult = (ev) => {
        const transcript = ev.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
      };
      rec.onerror = () => setListening(false);
      rec.onend = () => setListening(false);
      setListening(true);
      rec.start();
    } catch (e) {
      setListening(false);
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl flex flex-col" style={{ minHeight: 500 }}>
      <h1 className="font-serif text-2xl text-stone-900">{a.title}</h1>
      <p className="text-sm text-stone-500 mt-0.5 mb-4">{a.subtitle}</p>

      <div className="bg-white border border-stone-200 rounded-2xl p-4 flex-1 flex flex-col gap-3 overflow-y-auto mb-3" style={{ maxHeight: 420 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm flex items-start gap-2 ${msg.role === "user" ? "bg-green-800 text-white" : "bg-stone-100 text-stone-900"}`}>
              <span>{msg.text}</span>
              {msg.role === "bot" && <SpeakButton text={msg.text} lang={lang} className="shrink-0 -mr-1" />}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={startMic}
          disabled={!micSupported}
          title={micSupported ? "Speak" : a.micUnsupported}
          aria-label={micSupported ? "Speak your question" : a.micUnsupported}
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
            micSupported ? (listening ? "bg-orange-50 border-orange-700 text-orange-700 animate-pulse" : "border-stone-200 text-stone-500") : "border-stone-200 text-stone-300 cursor-not-allowed"
          }`}
        >
          <Mic size={16} />
        </button>
        <input
          className="flex-1 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
          placeholder={a.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
        />
        <button onClick={() => send(input)} className="w-10 h-10 rounded-full bg-green-800 text-white flex items-center justify-center shrink-0">
          <Send size={15} />
        </button>
      </div>
      <p className="text-xs text-stone-500 mt-3">{a.disclaimer}</p>
    </div>
  );
}

// ---------- Profile page ----------

function ProfilePage({ lang, profile, onEdit, onLogout }) {
  const p = PROFILE_LABELS[lang];
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="p-6 md:p-8 max-w-md">
      <h1 className="font-serif text-2xl text-stone-900 mb-6">{p.title}</h1>
      <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-green-800 text-white flex items-center justify-center font-serif text-lg">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-stone-900">{profile.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-stone-900"><Sprout size={15} className="text-green-800" /> {profile.crop}</div>
        <div className="flex items-center gap-2 text-sm text-stone-900"><Wheat size={15} className="text-amber-800" /> {profile.land} acres &middot; {profile.soil}</div>
        <div className="flex items-center gap-2 text-sm text-stone-900"><MapPin size={15} className="text-sky-700" /> {profile.location}</div>
      </div>

      <button onClick={onEdit} className="w-full bg-white border border-stone-200 text-stone-900 rounded-lg py-2.5 text-sm font-medium mb-3">{p.edit}</button>

      {!confirming ? (
        <button onClick={() => setConfirming(true)} className="w-full border border-orange-700 text-orange-700 rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2">
          <LogOut size={15} /> {p.logout}
        </button>
      ) : (
        <div className="border border-orange-700 rounded-lg p-3">
          <p className="text-xs text-stone-900 mb-2">{p.logoutConfirm}</p>
          <div className="flex gap-2">
            <button onClick={onLogout} className="flex-1 bg-orange-700 text-white rounded-lg py-2 text-xs font-medium">{p.logout}</button>
            <button onClick={() => setConfirming(false)} className="flex-1 border border-stone-200 rounded-lg py-2 text-xs font-medium">{p.cancel}</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Location switcher (quick-access, like the language switch) ----------

function LocationSwitcher({ profile, lang, onUpdateLocation }) {
  const o = ONBOARD_LABELS[lang];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(profile.location);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const geoSupported = typeof navigator !== "undefined" && "geolocation" in navigator;

  function useMyLocation() {
    if (!geoSupported) return;
    setLocationError(false);
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setValue(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        setLocating(false);
      },
      () => { setLocating(false); setLocationError(true); },
      { timeout: 8000 }
    );
  }

  function save() {
    if (value.trim()) onUpdateLocation(value.trim());
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => { setValue(profile.location); setOpen(!open); }}
        className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-full px-3 py-1 text-xs font-medium text-stone-700 hover:border-green-400 transition-colors max-w-[140px]"
        title={o.changeLocation}
        aria-label={o.changeLocation}
      >
        <MapPin size={12} className="text-green-700 shrink-0" />
        <span className="truncate">{profile.location}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-stone-200 rounded-xl shadow-lg p-3 z-30">
          <label htmlFor="loc-switch-input" className="text-xs font-medium text-stone-500 mb-1 block">{o.changeLocation}</label>
          <input
            id="loc-switch-input"
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            onClick={useMyLocation}
            disabled={!geoSupported}
            className={`flex items-center gap-1.5 text-xs mb-2 ${geoSupported ? "text-green-700 hover:underline" : "text-stone-300"}`}
          >
            <MapPin size={12} /> {locating ? o.locating : o.useLocation}
          </button>
          {locationError && <p className="text-xs text-orange-700 mb-2">{o.locationError}</p>}
          <div className="flex gap-2">
            <button onClick={save} className="flex-1 bg-green-700 text-white rounded-lg py-1.5 text-xs font-medium">{o.save}</button>
            <button onClick={() => setOpen(false)} className="flex-1 border border-stone-200 rounded-lg py-1.5 text-xs font-medium">{PROFILE_LABELS[lang].cancel}</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- App shell ----------

const STORAGE_KEY = "agrilink_session_v1";

function safeStorageGet() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
function safeStorageSet(data) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    /* storage unavailable (e.g. sandboxed preview) — session just won't persist */
  }
}
function safeStorageClear() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    /* ignore */
  }
}

export default function App() {
  const saved = useMemo(() => safeStorageGet(), []);
  const [profile, setProfileState] = useState(saved && saved.profile ? saved.profile : null);
  const [lang, setLangState] = useState(saved && saved.lang ? saved.lang : "EN");
  const [rememberMe, setRememberMe] = useState(!!(saved && saved.profile));
  const [active, setActive] = useState("home");

  function setLang(l) {
    setLangState(l);
    if (rememberMe && profile) safeStorageSet({ profile, lang: l });
  }

  function handleLogin(form) {
    setProfileState(form);
    if (rememberMe) safeStorageSet({ profile: form, lang });
    else safeStorageClear();
  }

  function handleLogout() {
    setProfileState(null);
    setActive("home");
    safeStorageClear();
  }

  function updateLocation(newLocation) {
    const updated = { ...profile, location: newLocation };
    setProfileState(updated);
    if (rememberMe) safeStorageSet({ profile: updated, lang });
  }

  if (!profile) {
    return <Onboarding onSubmit={handleLogin} lang={lang} setLang={setLang} rememberMe={rememberMe} setRememberMe={setRememberMe} />;
  }

  const t = T[lang];
  const activeNav = NAV.find((n) => n.key === active);

  function renderContent() {
    switch (active) {
      case "home": return <DashboardHome profile={profile} lang={lang} onEdit={() => setActive("profile")} />;
      case "disease": return <DiseaseDetection lang={lang} cropHint={profile.crop} />;
      case "recommend": return <CropRecommendation lang={lang} profile={profile} />;
      case "weather": return <SmartWeather lang={lang} profile={profile} />;
      case "fertilizer": return <FertilizerAdvisor lang={lang} profile={profile} />;
      case "market": return <MarketPrices lang={lang} profile={profile} />;
      case "schemes": return <GovtSchemes lang={lang} />;
      case "equipment": return <EquipmentRental lang={lang} />;
      case "marketplace": return <MarketplaceView lang={lang} />;
      case "analytics": return <Analytics lang={lang} profile={profile} />;
      case "notifications": return <NotificationsView lang={lang} profile={profile} />;
      case "assistant": return <AIAssistant lang={lang} profile={profile} />;
      case "profile":
        return (
          <ProfilePage
            lang={lang}
            profile={profile}
            onEdit={() => setProfileState(null)}
            onLogout={handleLogout}
          />
        );
      default:
        return <ComingSoon label={t.nav[active]} icon={activeNav.icon} body={t.comingSoonBody} />;
    }
  }

  return (
    <div className="w-full bg-stone-100 flex text-stone-900">
      {/* Sidebar */}
      <div className="w-[76px] md:w-56 bg-green-800 flex flex-col py-5 shrink-0">
        <div className="flex items-center gap-2 px-4 md:px-5 mb-6">
          <Leaf size={20} className="text-amber-600" />
          <span className="hidden md:block font-serif text-white text-base">AgriLink</span>
        </div>
        <nav className="flex-1 flex flex-col gap-0.5 px-2">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-white/15 text-white" : "text-green-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={17} className="shrink-0" />
                <span className="hidden md:block truncate">{t.nav[item.key]}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 px-6 pt-5">
          {active !== "home" ? (
            <button onClick={() => setActive("home")} className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900">
              <ArrowLeft size={15} /> {t.nav.home}
            </button>
          ) : <span />}

          <div className="flex items-center gap-3">
            <LocationSwitcher profile={profile} lang={lang} onUpdateLocation={updateLocation} />
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-stone-500" />
              <div className="flex bg-white border border-stone-200 rounded-full overflow-hidden">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 text-xs font-medium ${lang === l ? "bg-green-800 text-white" : "text-stone-500"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setActive("profile")}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-serif text-sm ${
                active === "profile" ? "bg-green-900 text-white" : "bg-green-800 text-white"
              }`}
              title={profile.name}
              aria-label={`${profile.name} - open profile`}
            >
              {profile.name.charAt(0).toUpperCase()}
            </button>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
