export const HOME_ASSETS = {
  logo: "/logo.png",
  lifestyle: "/brand-lifestyle.jpg",
  products: {
    sunglasses: "/sunglasses.png",
    antiRadiation: "/anti-radiation.jpg",
    smartGlasses: "/smart-glasses.jpg",
    photochromic: "/photochromic.jpg",
  },
} as const;

export const PRODUCTS = [
  {
    name: "Sunglasses",
    description: "Rimless tinted lenses with a faceted edge for everyday sun.",
    image: HOME_ASSETS.products.sunglasses,
  },
  {
    name: "Anti-Radiation Glasses",
    description: "Blue-tinted lenses made for long hours on screens.",
    image: HOME_ASSETS.products.antiRadiation,
  },
  {
    name: "Smart Glasses",
    description: "Built-in cameras and audio, backed by a 5-year warranty.",
    image: HOME_ASSETS.products.smartGlasses,
  },
  {
    name: "Photochromic Lenses",
    description: "Lenses that shift from clear to tinted as the light changes.",
    image: HOME_ASSETS.products.photochromic,
  },
] as const;
