// Curated premium architectural photography (Pexels CDN).
// Centralised so imagery stays consistent and optimised across the site.

export function pexels(id: number, w = 1600, h = 1067): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
}

export const media = {
  // Hero / signature facades
  heroFacade: pexels(19107852, 1920, 1280),
  facadeRijswijk: pexels(18059181, 1600, 1067),
  facadeStripes: pexels(19263277, 1200, 1500),
  facadeDowntown: pexels(15577446, 1600, 1067),
  facadeBudapest: pexels(35377959, 1600, 1067),
  facadeCurved: pexels(38247895, 1200, 1500),
  facadeOslo: pexels(19107852, 1200, 1500),
  facadeGlass1: pexels(1313534, 1200, 1500),

  // Curtain wall / skyscrapers
  cloudReflection: pexels(30635030, 1600, 1067),
  skyscraperBlue: pexels(6036401, 1200, 1500),
  glassWindows: pexels(27130478, 1200, 1500),
  officeGlass: pexels(34637976, 1600, 1067),
  towerApartments: pexels(14465480, 1600, 1067),
  officeFacade: pexels(13038579, 1600, 1067),
  glassWallSky: pexels(11823061, 1200, 1500),
  cloudsMirror: pexels(13792027, 1600, 1067),
  glassReveal: pexels(13671765, 1200, 1500),

  // Aluminium / product detail
  aluminiumFrame: pexels(9729583, 1200, 1500),
  blueAluShutters: pexels(30728904, 1200, 1500),
  redFrameWindows: pexels(34247751, 1200, 1500),
  metalTexture: pexels(2271100, 1600, 1067),

  // Construction
  craneWhiteBuilding: pexels(14486702, 1600, 1067),
  constructionSky: pexels(5505131, 1600, 1067),
  steelFramework: pexels(37687676, 1600, 1067),
  towerCranes: pexels(10176177, 1600, 1067),
  cranesSilhouette: pexels(31258538, 1600, 1067),

  // Luxury interiors
  interiorChandelier: pexels(8082330, 1600, 1067),
  interiorWaterView: pexels(7546599, 1600, 1067),
  interiorApartment: pexels(6444249, 1600, 1067),
  interiorTallWindows: pexels(11408618, 1600, 1067),
  interiorBubble: pexels(6908367, 1600, 1067),
  interiorCarpet: pexels(7546213, 1600, 1067),

  // People / engineering
  engineersHelmets: pexels(8961146, 1600, 1067),
  engineersBlueprint: pexels(8961133, 1600, 1067),
  architectsDocs: pexels(8470058, 1600, 1067),
  femaleArchitects: pexels(9405477, 1600, 1067),
  architectsFloorplan: pexels(8482821, 1600, 1067),
  architectsLaptop: pexels(8470777, 1600, 1067),

  // Warehouse / logistics
  warehouseSteel: pexels(36397980, 1600, 1067),
  warehouseBeams: pexels(36397983, 1600, 1067),
  warehouseConcrete: pexels(4483610, 1600, 1067),
  warehouseTruck: pexels(27490857, 1600, 1067),
} as const;

export type MediaKey = keyof typeof media;
