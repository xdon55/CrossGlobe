/* eslint-disable */
// Seed premium content for House Land Group.
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const m = {
  heroFacade: 19107852,
  facadeRijswijk: 18059181,
  facadeStripes: 19263277,
  facadeDowntown: 15577446,
  facadeBudapest: 35377959,
  facadeCurved: 38247895,
  facadeGlass1: 1313534,
  cloudReflection: 30635030,
  skyscraperBlue: 6036401,
  glassWindows: 27130478,
  officeGlass: 34637976,
  towerApartments: 14465480,
  officeFacade: 13038579,
  glassWallSky: 11823061,
  cloudsMirror: 13792027,
  glassReveal: 13671765,
  aluminiumFrame: 9729583,
  blueAluShutters: 30728904,
  redFrameWindows: 34247751,
  metalTexture: 2271100,
  craneWhiteBuilding: 14486702,
  constructionSky: 5505131,
  steelFramework: 37687676,
  towerCranes: 10176177,
  interiorChandelier: 8082330,
  interiorWaterView: 7546599,
  interiorApartment: 6444249,
  interiorTallWindows: 11408618,
  engineersHelmets: 8961146,
  engineersBlueprint: 8961133,
  architectsDocs: 8470058,
  femaleArchitects: 9405477,
  warehouseSteel: 36397980,
  warehouseBeams: 36397983,
  warehouseConcrete: 4483610,
};

function px(id: number, w = 1200, h = 900): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
}

const categories = [
  { slug: "aluminium-doors", name: "Aluminium Doors", tagline: "Entrance & access systems", icon: "DoorOpen", image: px(m.redFrameWindows), sortOrder: 1 },
  { slug: "aluminium-windows", name: "Aluminium Windows", tagline: "Tilt-turn, fixed & projected", icon: "AppWindow", image: px(m.blueAluShutters), sortOrder: 2 },
  { slug: "curtain-walls", name: "Curtain Walls", tagline: "Stick & unitised façades", icon: "Building2", image: px(m.cloudReflection), sortOrder: 3 },
  { slug: "sliding-systems", name: "Sliding Systems", tagline: "Lift-slide & folding", icon: "MoveHorizontal", image: px(m.facadeCurved), sortOrder: 4 },
  { slug: "glass", name: "Architectural Glass", tagline: "Insulated & solar control", icon: "Square", image: px(m.glassWallSky), sortOrder: 5 },
  { slug: "hardware", name: "Hardware & Fittings", tagline: "Locks, hinges & operators", icon: "Settings2", image: px(m.aluminiumFrame), sortOrder: 6 },
  { slug: "sealants", name: "Sealants & Adhesives", tagline: "Structural & weather sealing", icon: "Droplets", image: px(m.metalTexture), sortOrder: 7 },
  { slug: "fasteners", name: "Fasteners", tagline: "Stainless fixings", icon: "Link2", image: px(m.steelFramework), sortOrder: 8 },
  { slug: "roofing", name: "Roofing Systems", tagline: "Standing seam & membranes", icon: "Home", image: px(m.constructionSky), sortOrder: 9 },
  { slug: "insulation", name: "Insulation", tagline: "Thermal & acoustic", icon: "Layers", image: px(m.warehouseBeams), sortOrder: 10 },
  { slug: "construction-materials", name: "Cladding & Panels", tagline: "Rainscreen & composite", icon: "Grid3x3", image: px(m.facadeStripes), sortOrder: 11 },
  { slug: "tools", name: "Professional Tools", tagline: "Trade-grade equipment", icon: "Wrench", image: px(m.warehouseSteel), sortOrder: 12 },
];

type ProductSeed = {
  slug: string; name: string; sku: string; categorySlug: string; brand: string;
  shortDescription: string; description: string;
  specs: Record<string, string>;
  features: string[];
  finish: string; material: string; fireRating: string; thermalRating: string;
  applications: string[];
  image: string; gallery: string[];
  price: number | null; currency: string; leadTime: string;
  brochureUrl: string; datasheetUrl: string; cadUrl: string; featured: boolean;
};

const products: ProductSeed[] = [
  {
    slug: "cw75-unitised-curtain-wall",
    name: "CW-75 Unitised Curtain Wall System",
    sku: "HLG-CW75-UNIT",
    categorySlug: "curtain-walls",
    brand: "Vela Aluminium",
    shortDescription: "High-performance unitised curtain wall for towers up to 60 storeys with CWf of 0.8 W/m²K.",
    description:
      "The CW-75 is an engineered unitised façade system designed for fast, weather-independent installation on high-rise commercial and residential towers. Factory-glazed panels interlock on site via a patented toggle mechanism, dramatically reducing erection time while delivering exceptional thermal and acoustic performance. Tested to EN 13830 and certified for wind loads up to 2400 Pa.",
    specs: { "System depth": "75 mm", "U-value (CW)": "0.8 W/m²K", "Max glass": "32 mm", "Water tightness": "Class E1200", "Air permeability": "Class AE1200", "Wind load": "2400 Pa", "Fire rating": "EW30" },
    features: ["Factory-glazed panels for site speed", "Triple gasket drainage", "Concealed toggle interlock", "Compatible with solar-control triple glazing"],
    finish: "Powder-coated RAL 7016 / anodised",
    material: "Aluminium EN AW-6063 T5",
    fireRating: "EW30",
    thermalRating: "Uw 0.8 W/m²K",
    applications: ["Commercial towers", "Mixed-use developments", "Hotels", "Cultural institutions"],
    image: px(m.cloudReflection, 1200, 1000),
    gallery: [px(m.cloudReflection), px(m.skyscraperBlue), px(m.officeGlass)],
    price: null, currency: "EUR", leadTime: "6–8 weeks",
    brochureUrl: "#", datasheetUrl: "#", cadUrl: "#", featured: true,
  },
  {
    slug: "a450-thermal-break-entrance-door",
    name: "A450 Thermal-Break Entrance Door",
    sku: "HLG-A450-DR",
    categorySlug: "aluminium-doors",
    brand: "Nordic Façade",
    shortDescription: "Heavy-duty commercial entrance door with multi-point locking and 1.0 W/m²K.",
    description:
      "The A450 is a thermally-broken aluminium entrance door built for high-traffic commercial environments. A polyamide break combined with a reinforced profile achieves outstanding insulation without sacrificing rigidity. Supplied with a concealed electromagnetic closer, multi-point hook-lock and panic hardware options for retail and hospitality entrances.",
    specs: { "Profile depth": "86 mm", "U-value (Ud)": "1.0 W/m²K", "Max leaf": "1300 × 2600 mm", "Air tightness": "Class 4", "Security": "RC2 / RC3" },
    features: ["Polyamide thermal break", "Multi-point hook lock", "Panic & emergency exit options", "Concealed closer"],
    finish: "Anodised / RAL powder coat",
    material: "Aluminium EN AW-6063 T66",
    fireRating: "EI30 optional",
    thermalRating: "1.0 W/m²K",
    applications: ["Retail entrances", "Hotels", "Office lobbies", "Public buildings"],
    image: px(m.redFrameWindows, 1200, 1000),
    gallery: [px(m.redFrameWindows), px(m.facadeRijswijk)],
    price: null, currency: "EUR", leadTime: "3–4 weeks",
    brochureUrl: "#", datasheetUrl: "#", cadUrl: "#", featured: true,
  },
  {
    slug: "aw320-tilt-turn-window",
    name: "AW320 Tilt-Turn Aluminium Window",
    sku: "HLG-AW320",
    categorySlug: "aluminium-windows",
    brand: "Vela Aluminium",
    shortDescription: "Versatile tilt-turn window with slim 78 mm profile and triple-glazing ready.",
    description:
      "The AW320 tilt-turn window combines slim sightlines with robust hardware, offering secure ventilation in tilt mode and full access in turn mode. Designed for residential and hospitality projects demanding both daylight and ventilation control, it accommodates triple-glazed units up to 52 mm for passive-house performance.",
    specs: { "Profile depth": "78 mm", "U-value (Uw)": "0.78 W/m²K", "Max glass": "52 mm", "Hardware": "Multi-point tilt-turn" },
    features: ["Slim 78 mm frame", "Triple glazing ready", "Secure tilt vent mode", "RC2 burglar resistance"],
    finish: "RAL powder coat / woodgrain",
    material: "Aluminium EN AW-6063 T5",
    fireRating: "NPD",
    thermalRating: "0.78 W/m²K",
    applications: ["Apartments", "Hotels", "Schools", "Care homes"],
    image: px(m.blueAluShutters, 1200, 1000),
    gallery: [px(m.blueAluShutters), px(m.glassWindows)],
    price: null, currency: "EUR", leadTime: "2–3 weeks",
    brochureUrl: "#", datasheetUrl: "#", cadUrl: "#", featured: true,
  },
  {
    slug: "hs600-lift-slide-door",
    name: "HS600 Slim Lift-Slide Door",
    sku: "HLG-HS600",
    categorySlug: "sliding-systems",
    brand: "Nordic Façade",
    shortDescription: "Panoramic lift-slide with 6m leaf spans and 20mm interlock.",
    description:
      "The HS600 lift-slide system dissolves the boundary between interior and exterior. With a record-slim 20 mm interlock and single leaf spans up to 6 metres, it is engineered for premium residential villas and hospitality projects. Effortless operation comes from a lift mechanism that raises the sash onto smooth-running rollers.",
    specs: { "Interlock": "20 mm", "Max leaf": "6000 × 2800 mm", "Max glass": "48 mm", "U-value": "0.95 W/m²K" },
    features: ["20 mm slim interlock", "Leaf spans up to 6 m", "Lift-slide hardware", "Flush track option"],
    finish: "Anodised / RAL",
    material: "Aluminium EN AW-6063 T6",
    fireRating: "NPD",
    thermalRating: "0.95 W/m²K",
    applications: ["Villas", "Penthouses", "Hotels", "Restaurants"],
    image: px(m.facadeCurved, 1200, 1000),
    gallery: [px(m.facadeCurved), px(m.interiorWaterView)],
    price: null, currency: "EUR", leadTime: "5–7 weeks",
    brochureUrl: "#", datasheetUrl: "#", cadUrl: "#", featured: true,
  },
  {
    slug: "clariplus-triple-insulated-glass",
    name: "ClariPlus Triple Insulated Glass Unit",
    sku: "HLG-CG-3IGU",
    categorySlug: "glass",
    brand: "ClariGlass",
    shortDescription: "Low-E triple IGU with argon fill and 0.5 W/m²K centre.",
    description:
      "ClariPlus is a high-performance triple insulated glass unit engineered for passive-house and near-zero-energy buildings. A dual low-emissivity coating combined with argon gas fill delivers a centre-of-glass U-value of 0.5 W/m²K while maximising solar transmittance for daylight harvesting.",
    specs: { "Configuration": "3-16-4-16-4", "Ug": "0.5 W/m²K", "Light transmittance": "72%", "Gas fill": "Argon 90%" },
    features: ["Dual low-E coating", "Argon gas fill", "Warm-edge spacer", "Acoustic lamination option"],
    finish: "Clear / low-iron",
    material: "Float glass / tempered",
    fireRating: "Class E",
    thermalRating: "0.5 W/m²K",
    applications: ["Passive houses", "Facades", "Roof glazing", "Conservatories"],
    image: px(m.glassWallSky, 1200, 1000),
    gallery: [px(m.glassWallSky), px(m.glassReveal)],
    price: null, currency: "EUR", leadTime: "2–3 weeks",
    brochureUrl: "#", datasheetUrl: "#", cadUrl: "#", featured: true,
  },
  {
    slug: "structasil-995-structural-silicone",
    name: "StructaSil 995 Structural Silicone",
    sku: "HLG-SS995",
    categorySlug: "sealants",
    brand: "FixTec",
    shortDescription: "Neutral-cure structural silicone for bonded glazing & unitised panels.",
    description:
      "StructaSil 995 is a high-modulus, neutral-cure silicone sealant engineered for structural bonding of glass to aluminium in unitised curtain walls. It offers exceptional adhesion, UV stability and a design strength of 0.14 MPa, meeting the demands of European façade engineering.",
    specs: { "Tensile strength": "0.14 MPa", "Movement capability": "±50%", "Cure": "Neutral oxime", "Shore A": "45" },
    features: ["Structural bond certified", "UV & weather stable", "Neutral cure", "50% movement capability"],
    finish: "Black / grey",
    material: "Silicone",
    fireRating: "Class B",
    thermalRating: "NPD",
    applications: ["Structural glazing", "Unitised panels", "Skylights", "Shop fronts"],
    image: px(m.metalTexture, 1200, 1000),
    gallery: [px(m.metalTexture)],
    price: null, currency: "EUR", leadTime: "In stock",
    brochureUrl: "#", datasheetUrl: "#", cadUrl: "#", featured: false,
  },
  {
    slug: "inox-a2-torx-fastener-set",
    name: "Inox A2 Torx Façade Fastener Set",
    sku: "HLG-INX-A2",
    categorySlug: "fasteners",
    brand: "Struktur",
    shortDescription: "A2 stainless Torx screws with EPDM washers for façade sub-frames.",
    description:
      "A precision-engineered set of A2 (304) stainless steel Torx-head fasteners with integrated EPDM sealing washers, designed for fixing rainscreen and façade sub-frames. Corrosion-resistant and torque-stable, they are the specifier's choice for coastal and urban environments.",
    specs: { "Material": "A2 stainless 304", "Drive": "T40 Torx", "Washer": "EPDM 16 mm", "Corrosion class": "C4" },
    features: ["A2 304 stainless", "Integrated EPDM washer", "Torx T40 drive", "Corrosion class C4"],
    finish: "Passivated",
    material: "Stainless steel A2",
    fireRating: "A1 non-combustible",
    thermalRating: "NPD",
    applications: ["Rainscreen cladding", "Façade sub-frames", "Roofing", "Balconies"],
    image: px(m.steelFramework, 1200, 1000),
    gallery: [px(m.steelFramework)],
    price: null, currency: "EUR", leadTime: "In stock",
    brochureUrl: "#", datasheetUrl: "#", cadUrl: "#", featured: false,
  },
  {
    slug: "seamroof-standing-seam-panel",
    name: "SeamRoof Standing Seam Panel",
    sku: "HLG-SR-SS",
    categorySlug: "roofing",
    brand: "ThermaCore",
    shortDescription: "Pre-coated aluminium standing seam for roofs & facades, 0.7mm.",
    description:
      "SeamRoof is a roll-formed standing seam panel in 0.7 mm pre-coated aluminium, delivering a crisp, continuous architectural line across roofs and façades. Its concealed fixed, double-folded seam offers superior wind uplift resistance and accommodates complex geometries and curved forms.",
    specs: { "Thickness": "0.7 mm", "Panel width": "400/500 mm", "Coating": "PVDF", "Uplift": "Class B" },
    features: ["Concealed fixed seam", "PVDF coating", "Curvable geometry", "Lightweight aluminium"],
    finish: "PVDF coated",
    material: "Aluminium coil",
    fireRating: "A2",
    thermalRating: "NPD",
    applications: ["Pitched roofs", "Curved facades", "Canopies", "Heritage upgrades"],
    image: px(m.constructionSky, 1200, 1000),
    gallery: [px(m.constructionSky)],
    price: null, currency: "EUR", leadTime: "2–4 weeks",
    brochureUrl: "#", datasheetUrl: "#", cadUrl: "#", featured: false,
  },
  {
    slug: "thermax-pir-insulation-board",
    name: "ThermaMax PIR Insulation Board",
    sku: "HLG-TM-PIR",
    categorySlug: "insulation",
    brand: "ThermaCore",
    shortDescription: "Faced PIR board with lambda 0.022 W/mK for façades & roofs.",
    description:
      "ThermaMax is a high-performance polyisocyanurate (PIR) insulation board with a low-emissivity foil facing, achieving a thermal conductivity of just 0.022 W/mK. It is engineered for use within façade, rainscreen and flat-roof build-ups to meet stringent Benelux energy targets.",
    specs: { "Lambda": "0.022 W/mK", "Facing": "Gas-tight foil", "Thickness range": "40–160 mm", "Fire": "Euroclass B-s2,d0" },
    features: ["Lambda 0.022 W/mK", "Gas-tight foil face", "Euroclass B-s2,d0", "Range 40–160 mm"],
    finish: "Foil faced",
    material: "PIR",
    fireRating: "B-s2,d0",
    thermalRating: "0.022 W/mK",
    applications: ["Facades", "Flat roofs", "Rainscreen", "Floors"],
    image: px(m.warehouseBeams, 1200, 1000),
    gallery: [px(m.warehouseBeams)],
    price: null, currency: "EUR", leadTime: "1–2 weeks",
    brochureUrl: "#", datasheetUrl: "#", cadUrl: "#", featured: false,
  },
  {
    slug: "alupanel-a2-cladding-cassette",
    name: "AluPanel A2 Architectural Cladding",
    sku: "HLG-AP-A2",
    categorySlug: "construction-materials",
    brand: "Struktur",
    shortDescription: "Non-combustible A2 aluminium composite rainscreen panels.",
    description:
      "AluPanel A2 is a non-combustible aluminium composite material engineered for high-rise rainscreen cladding. With a mineral core achieving Euroclass A2-s1,d0, it meets the most stringent building regulations while offering a flat, rigid surface for bespoke colours and finishes.",
    specs: { "Thickness": "4 / 6 mm", "Core": "Mineral A2", "Fire": "A2-s1,d0", "Panel size": "1500 × 4000 mm" },
    features: ["Euroclass A2-s1,d0", "Flat rigid surface", "Custom RAL colours", "CNC routable"],
    finish: "PVDF / anodised",
    material: "Aluminium composite",
    fireRating: "A2-s1,d0",
    thermalRating: "NPD",
    applications: ["High-rise cladding", "Feature facades", "Soffits", "Signage"],
    image: px(m.facadeStripes, 1200, 1000),
    gallery: [px(m.facadeStripes), px(m.facadeDowntown)],
    price: null, currency: "EUR", leadTime: "3–5 weeks",
    brochureUrl: "#", datasheetUrl: "#", cadUrl: "#", featured: true,
  },
  {
    slug: "precision-multilock-fittings",
    name: "Precision MultiLock Hardware Kit",
    sku: "HLG-MLK-PRO",
    categorySlug: "hardware",
    brand: "FixTec",
    shortDescription: "RC2 multi-point lock kit with mushroom cams & anti-lift.",
    description:
      "The Precision MultiLock kit is a complete RC2-certified hardware set for aluminium windows and doors. Featuring steel mushroom cams, anti-lift blocks and an integrated striker, it provides robust forced-entry resistance without compromising smooth everyday operation.",
    specs: { "Security": "RC2", "Locking points": "5+ mushroom cams", "Material": "Hardened steel", "Finish": "Silver / black" },
    features: ["RC2 certified", "5+ locking points", "Anti-lift blocks", "Hardened steel cams"],
    finish: "Silver / black",
    material: "Hardened steel",
    fireRating: "NPD",
    thermalRating: "NPD",
    applications: ["Residential windows", "Doors", "Ground-floor openings", "Heritage"],
    image: px(m.aluminiumFrame, 1200, 1000),
    gallery: [px(m.aluminiumFrame)],
    price: null, currency: "EUR", leadTime: "In stock",
    brochureUrl: "#", datasheetUrl: "#", cadUrl: "#", featured: false,
  },
  {
    slug: "powertec-cordless-façade-drill",
    name: "PowerTec Cordless Façade Drill",
    sku: "HLG-PT-CD18",
    categorySlug: "tools",
    brand: "FixTec",
    shortDescription: "Brushless 18V cordless drill for façade & sub-frame installation.",
    description:
      "The PowerTec CD18 is a brushless 18V cordless drill engineered for the demands of façade and sub-frame installation. With 130 Nm of torque, a metal gearbox and an IP54-rated housing, it delivers all-day reliability on exposed construction sites.",
    specs: { "Voltage": "18 V", "Torque": "130 Nm", "Chuck": "13 mm", "Protection": "IP54" },
    features: ["Brushless motor", "130 Nm torque", "IP54 rated", "2 × 5.0Ah batteries"],
    finish: "Industrial grey",
    material: "Metal / composite",
    fireRating: "NPD",
    thermalRating: "NPD",
    applications: ["Façade install", "Cladding", "Roofing", "General construction"],
    image: px(m.warehouseSteel, 1200, 1000),
    gallery: [px(m.warehouseSteel)],
    price: null, currency: "EUR", leadTime: "In stock",
    brochureUrl: "#", datasheetUrl: "#", cadUrl: "#", featured: false,
  },
];

const brands = [
  { name: "Vela Aluminium", slug: "vela-aluminium", country: "Belgium", description: "Premium engineered aluminium window & façade systems.", initials: "VA" },
  { name: "Nordic Façade", slug: "nordic-facade", country: "Netherlands", description: "Thermally-broken doors and lift-slide specialists.", initials: "NF" },
  { name: "ClariGlass", slug: "clariglass", country: "Germany", description: "High-performance architectural glazing manufacturer.", initials: "CG" },
  { name: "FixTec", slug: "fixtec", country: "Netherlands", description: "Hardware, sealants & cordless trade tooling.", initials: "FT" },
  { name: "ThermaCore", slug: "thermacore", country: "United Kingdom", description: "Insulation, roofing & weatherproofing systems.", initials: "TC" },
  { name: "Struktur", slug: "struktur", country: "Germany", description: "Cladding, composites and structural fasteners.", initials: "ST" },
  { name: "Alucentro", slug: "alucentro", country: "Italy", description: "Bespoke extrusions and architectural profiles.", initials: "AC" },
  { name: "GlasVerk", slug: "glasverk", country: "Netherlands", description: "Specialist processed glass and laminates.", initials: "GV" },
];

const projects = [
  {
    slug: "meridian-tower-amsterdam",
    title: "The Meridian Tower", sector: "Commercial", location: "Amsterdam Zuidas, NL", year: 2024,
    client: "Meridian Developments", architect: "Studio Vossel Architecten", builder: "BESIX Nederland",
    description: "A 42-storey commercial landmark on the Zuidas, clad in 14,000 m² of our CW-75 unitised curtain wall. The project achieved a BREEAM Excellent rating thanks to high-performance solar-control glazing and a thermally-broken façade that cut operational energy by 31%.",
    image: px(m.cloudReflection, 1400, 1050), gallery: [px(m.cloudReflection), px(m.skyscraperBlue), px(m.officeGlass)],
    productsUsed: ["CW-75 Unitised Curtain Wall", "ClariPlus Triple Glazing", "StructaSil 995"], featured: true,
  },
  {
    slug: "harbourlight-residences-rotterdam",
    title: "Harbourlight Residences", sector: "Residential", location: "Rotterdam Kop van Zuid, NL", year: 2023,
    client: "Rotterdam Housing Trust", architect: "De Zwarte Hond", builder: "Bouwcombinatie STC",
    description: "196 luxury apartments overlooking the Maas, featuring panoramic HS600 lift-slide doors and AW320 tilt-turn windows. Floor-to-ceiling glazing maximises daylight while passive-house insulation values ensure year-round comfort.",
    image: px(m.towerApartments, 1400, 1050), gallery: [px(m.towerApartments), px(m.interiorWaterView)],
    productsUsed: ["HS600 Lift-Slide", "AW320 Tilt-Turn", "ThermaMax PIR"], featured: true,
  },
  {
    slug: "delft-innovation-hub",
    title: "Delft Innovation Hub", sector: "Education", location: "Delft TU Campus, NL", year: 2023,
    client: "TU Delft", architect: "Mecanoo", builder: "Heijmans",
    description: "A research and teaching facility wrapped in AluPanel A2 rainscreen cladding and a ventilated double-skin façade. The building serves as a living laboratory for sustainable envelope technology.",
    image: px(m.facadeDowntown, 1400, 1050), gallery: [px(m.facadeDowntown), px(m.facadeStripes)],
    productsUsed: ["AluPanel A2 Cladding", "CW-75 Curtain Wall", "Inox Fasteners"], featured: true,
  },
  {
    slug: "emma-childrens-pavilion",
    title: "Emma Children's Pavilion", sector: "Healthcare", location: "Amsterdam, NL", year: 2022,
    client: "Amsterdam UMC", architect: "Radboud Rooijakkers", builder: "Dura Vermeer",
    description: "A calm, light-filled care pavilion using warm-toned aluminium framing and acoustic laminated glazing to create a healing environment. Systems were specified for hygiene, durability and ease of maintenance.",
    image: px(m.facadeBudapest, 1400, 1050), gallery: [px(m.facadeBudapest), px(m.interiorTallWindows)],
    productsUsed: ["AW320 Tilt-Turn", "A450 Entrance Door", "ClariPlus Acoustic Glass"], featured: false,
  },
  {
    slug: "eindhoven-tech-campus",
    title: "Eindhoven Tech Campus", sector: "Industrial", location: "Eindhoven, NL", year: 2024,
    client: "Brainport Industries", architect: "Ector Hoogstad", builder: "Witteveen+Bos",
    description: "A 58,000 m² advanced manufacturing campus featuring robust standing-seam roofing and high-span curtain walling engineered for heavy industrial use and rapid future reconfiguration.",
    image: px(m.steelFramework, 1400, 1050), gallery: [px(m.steelFramework), px(m.constructionSky)],
    productsUsed: ["SeamRoof Standing Seam", "CW-75 Curtain Wall", "ThermaMax PIR"], featured: false,
  },
  {
    slug: "the-hague-civic-centre",
    title: "The Hague Civic Centre", sector: "Government", location: "The Hague, NL", year: 2021,
    client: "Gemeente Den Haag", architect: "KCAP", builder: "VolkerWessels",
    description: "A civic landmark balancing heritage sensitivity with modern performance. Conservation-grade aluminium fenestration and a unitised façade delivered a 40% reduction in operational carbon.",
    image: px(m.officeGlass, 1400, 1050), gallery: [px(m.officeGlass), px(m.glassWindows)],
    productsUsed: ["CW-75 Curtain Wall", "A450 Entrance Door", "Precision MultiLock"], featured: false,
  },
];

const blogPosts = [
  {
    slug: "specifying-unitised-curtain-walls",
    title: "Specifying Unitised Curtain Walls for High-Rise Efficiency",
    excerpt: "How factory-glazed unitised façades compress construction programmes and raise performance standards on towers above 20 storeys.",
    content: "Unitised curtain walls have transformed high-rise envelope delivery across Europe. By shifting glazing and framing assembly into a controlled factory environment, project teams gain predictable quality, accelerated erection and improved safety on site.\n\nFor specifiers, the key considerations are panelisation strategy, the interlock mechanism and the drainage philosophy. The CW-75 system uses a triple-gasket drained system tested to EN 13830, giving water tightness to E1200 and air permeability AE1200 — values essential for exposed coastal towers in the Benelux.\n\nA well-engineered unitised approach can reduce on-site labour by up to 60% compared with stick systems, while thermal performance is protected by avoiding weather-dependent site sealing.",
    category: "Aluminium Guides", author: "Lars van Dijk", authorRole: "Head of Façade Engineering",
    image: px(m.cloudReflection, 1400, 900), publishedAt: new Date("2025-09-18"), readTime: 7,
    tags: ["Curtain Walls", "Façades", "Specification"],
  },
  {
    slug: "achieving-passive-house-u-values",
    title: "Achieving Passive-House U-Values with Aluminium Fenestration",
    excerpt: "Aluminium systems can meet the most demanding energy targets. Here is how triple glazing and thermal breaks deliver U-values below 0.8 W/m²K.",
    content: "For decades, aluminium was considered thermally inferior to PVC or timber. Modern polyamide thermal-break technology has overturned that assumption, making aluminium the material of choice for architects seeking both performance and slender sightlines.\n\nThe combination of a multi-chamber polyamide break, warm-edge spacers and argon-filled triple glazing allows our AW320 window to reach a Uw of 0.78 W/m²K — comfortably within passive-house territory.\n\nBeyond the headline U-value, specifiers must consider psi-values at the glass edge, installation quality and the overall building envelope balance to truly deliver near-zero-energy performance.",
    category: "Energy Efficiency", author: "Sofia Janssen", authorRole: "Technical Sustainability Lead",
    image: px(m.blueAluShutters, 1400, 900), publishedAt: new Date("2025-08-29"), readTime: 6,
    tags: ["Energy Efficiency", "Windows", "Sustainability"],
  },
  {
    slug: "rainscreen-cladding-after-grenfell",
    title: "Specifying Non-Combustible Rainscreen Cladding",
    excerpt: "Euroclass A2 is now the baseline for high-rise cladding across the Benelux. We explain the materials and testing specifiers must demand.",
    content: "Following regulatory changes across Europe, non-combustible rainscreen cladding is the baseline expectation for buildings above defined heights. The AluPanel A2 system, with a mineral core achieving Euroclass A2-s1,d0, gives architects complete confidence.\n\nCrucially, the cladding panel is only one element of the build-up. The cavity barriers, insulation and fixings must all be specified to the same fire standard to avoid creating a hidden weakness.\n\nAlways request full system-level fire test evidence rather than component certificates alone.",
    category: "Industry News", author: "Marco de Wit", authorRole: "Product Compliance Manager",
    image: px(m.facadeStripes, 1400, 900), publishedAt: new Date("2025-08-02"), readTime: 5,
    tags: ["Cladding", "Fire Safety", "Regulation"],
  },
  {
    slug: "the-business-case-for-trade-accounts",
    title: "The Business Case for a Trade Account",
    excerpt: "From project pricing to approval workflows, a trade account transforms procurement for contractors managing multiple live sites.",
    content: "For contractors and developers juggling multiple concurrent projects, procurement efficiency directly protects margin. A House Land Group trade account unlocks dedicated project pricing, multi-user access, approval workflows and consolidated invoicing.\n\nThe platform supports BOQ uploads and drawing attachments, allowing teams to request a single consolidated quotation rather than piecemeal orders. Approval workflows ensure project managers retain spend control across multiple site teams.\n\nCombined with our 48-hour Benelux delivery promise, trade accounts consistently reduce procurement overhead and keep sites on programme.",
    category: "Buying Guides", author: "Emma Bakker", authorRole: "Trade & Accounts Director",
    image: px(m.engineersHelmets, 1400, 900), publishedAt: new Date("2025-07-14"), readTime: 5,
    tags: ["Trade", "Procurement", "Buying Guide"],
  },
  {
    slug: "bim-files-and-the-digital-twin",
    title: "BIM Files and the Path to the Digital Twin",
    content: "We publish BIM objects for every major system, accelerating the journey from concept design to a fully coordinated digital twin.\n\nAccurate BIM content reduces coordination clashes, speeds quantity take-off and embeds performance data directly into the model. Our parametric BIM objects include thermal properties, fire ratings and maintenance data — everything a design team needs downstream.\n\nFor contractors, model coordination combined with our BOQ upload quotation system creates a seamless bridge from design intent to delivered materials.",
    excerpt: "Accurate BIM objects reduce coordination clashes and embed performance data directly into the model. Here is why we publish BIM for every system.",
    category: "Architect Advice", author: "Lars van Dijk", authorRole: "Head of Façade Engineering",
    image: px(m.architectsDocs, 1400, 900), publishedAt: new Date("2025-06-20"), readTime: 6,
    tags: ["BIM", "Architecture", "Digital"],
  },
  {
    slug: "sustainable-aluminium-cradle-to-cradle",
    title: "Sustainable Aluminium: A Cradle-to-Cradle Pathway",
    content: "Aluminium is infinitely recyclable without loss of properties. Our systems use 80% recycled content, dramatically reducing embodied carbon.\n\nBy specifying recycled-content aluminium, Cradle-to-Cradle certified systems and EPD-backed products, specifiers can cut envelope embodied carbon by more than 70% compared with primary metal.\n\nEnd-of-life take-back completes the circle — we collect and remelt de-commissioned systems, closing the material loop and supporting circular-economy ambitions across the Benelux.",
    excerpt: "Infinitely recyclable and increasingly circular — how recycled-content aluminium is cutting embodied carbon on European projects.",
    category: "Sustainability", author: "Sofia Janssen", authorRole: "Technical Sustainability Lead",
    image: px(m.facadeBudapest, 1400, 900), publishedAt: new Date("2025-05-30"), readTime: 6,
    tags: ["Sustainability", "Circular Economy", "Aluminium"],
  },
];

const testimonials = [
  { name: "Jeroen Visser", role: "Principal Architect", company: "Studio Vossel Architecten", quote: "House Land Group's technical team feel like an extension of our studio. Their CW-75 specification support was decisive in delivering the Meridian Tower on programme.", rating: 5, initials: "JV" },
  { name: "Annabel de Koning", role: "Procurement Director", company: "VolkerWessels", quote: "The trade portal and consolidated BOQ quoting transformed how our team buys across 14 live sites. Lead times are reliable and pricing is transparent.", rating: 5, initials: "AK" },
  { name: "Dr. Pieter Mulder", role: "Facilities Lead", company: "TU Delft", quote: "Documentation quality — CAD, BIM and EPDs — is the best we have experienced. It made coordination on the Innovation Hub genuinely effortless.", rating: 5, initials: "PM" },
  { name: "Naomi Hendriks", role: "Managing Director", company: "Hendriks Bouw", quote: "From sample to delivery, the service is impeccable. They understand that on a residential project, a single delayed door set can stall a whole phase.", rating: 5, initials: "NH" },
  { name: "Thomas Bauer", role: "Project Engineer", company: "Witteveen+Bos", quote: "Genuinely engineering-led. When we needed a bespoke standing-seam geometry, their team produced calculations and samples within days.", rating: 5, initials: "TB" },
  { name: "Isabella Romano", role: "Sustainability Consultant", company: "DGMR", quote: "Their recycled-content aluminium and EPDs gave our client the embodied-carbon reduction we needed for BREEAM Outstanding.", rating: 5, initials: "IR" },
];

const industries = [
  { slug: "residential", name: "Residential", tagline: "Homes, villas & apartments", description: "Slimline windows, panoramic doors and warm façades for residential projects of every scale.", image: px(m.interiorWaterView, 1200, 900), icon: "Home" },
  { slug: "commercial", name: "Commercial", tagline: "Offices & towers", description: "Unitised curtain walls and high-performance entrances for commercial landmarks.", image: px(m.cloudReflection, 1200, 900), icon: "Building2" },
  { slug: "industrial", name: "Industrial", tagline: "Manufacturing & logistics", description: "Robust roofing, cladding and fasteners engineered for heavy industrial use.", image: px(m.steelFramework, 1200, 900), icon: "Factory" },
  { slug: "healthcare", name: "Healthcare", tagline: "Hospitals & care", description: "Hygienic, acoustic and durable systems for healing environments.", image: px(m.facadeBudapest, 1200, 900), icon: "HeartPulse" },
  { slug: "education", name: "Education", tagline: "Schools & campuses", description: "Daylight-rich, low-maintenance envelopes for schools and universities.", image: px(m.facadeDowntown, 1200, 900), icon: "GraduationCap" },
  { slug: "retail", name: "Retail", tagline: "Shops & malls", description: "Showcase glazing, secure entrances and eye-catching facades.", image: px(m.redFrameWindows, 1200, 900), icon: "ShoppingBag" },
  { slug: "hospitality", name: "Hospitality", tagline: "Hotels & restaurants", description: "Elegant fenestration and acoustic comfort for memorable guest experiences.", image: px(m.interiorChandelier, 1200, 900), icon: "UtensilsCrossed" },
  { slug: "infrastructure", name: "Infrastructure", tagline: "Stations & transit", description: "Durable, vandal-resistant systems for transport and public infrastructure.", image: px(m.towerCranes, 1200, 900), icon: "TrainFront" },
  { slug: "government", name: "Government", tagline: "Civic & public", description: "Secure, sustainable and dignified solutions for civic landmarks.", image: px(m.officeGlass, 1200, 900), icon: "Landmark" },
];

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  console.log("Clearing existing content…");
  await db.delete(schema.testimonials);
  await db.delete(schema.blogPosts);
  await db.delete(schema.projects);
  await db.delete(schema.products);
  await db.delete(schema.brands);
  await db.delete(schema.industries);
  await db.delete(schema.categories);

  console.log("Inserting categories…");
  await db.insert(schema.categories).values(categories);
  console.log("Inserting products…");
  await db.insert(schema.products).values(products);
  console.log("Inserting brands…");
  await db.insert(schema.brands).values(brands);
  console.log("Inserting projects…");
  await db.insert(schema.projects).values(projects);
  console.log("Inserting blog posts…");
  await db.insert(schema.blogPosts).values(blogPosts);
  console.log("Inserting testimonials…");
  await db.insert(schema.testimonials).values(testimonials);
  console.log("Inserting industries…");
  await db.insert(schema.industries).values(industries);

  console.log("✅ Seed complete.");
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
