export const site = {
  name: "CrossGlobe",
  legalName: "CrossGlobe B.V.",
  tagline: "Premium Aluminium & Building Materials",
  phone: "+31 10 200 4400",
  phoneHref: "tel:+31102004400",
  emergencyPhone: "+31 6 2477 9100",
  email: "info@crossglobe.nl",
  quoteEmail: "quotes@crossglobe.nl",
  address: {
    street: "Havenstraat 142",
    city: "Rotterdam",
    postal: "3011 WT",
    country: "Netherlands",
  },
  vat: "NL8597.34.221.B01",
  kvk: "87364420",
  iban: "NL24 RABO 0123 4567 89",
  hours: "Mon–Fri 07:30–17:30 · Sat 09:00–13:00",
  whatsapp: "31624779100",
  social: {
    linkedin: "https://www.linkedin.com/company/crossglobe",
    instagram: "https://www.instagram.com/crossglobe",
    youtube: "https://www.youtube.com/@crossglobe",
  },
};

export const languages = [
  { code: "EN", label: "English", href: "/" },
  { code: "NL", label: "Nederlands", href: "/nl" },
  { code: "DE", label: "Deutsch", href: "/de" },
  { code: "FR", label: "Français", href: "/fr" },
];

// Primary navigation (Products uses a mega-menu panel)
export const mainNav = [
  {
    label: "Products",
    href: "/products",
    mega: true,
  },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

// Mega-menu product groups (mirrors seeded categories)
export const megaMenu = [
  {
    title: "Aluminium Systems",
    blurb: "Engineered façade, window & door systems",
    accent: "from-brand-600 to-brand-800",
    icon: "Layers",
    items: [
      { label: "Aluminium Doors", href: "/products?category=aluminium-doors" },
      { label: "Aluminium Windows", href: "/products?category=aluminium-windows" },
      { label: "Curtain Walls", href: "/products?category=curtain-walls" },
      { label: "Sliding Systems", href: "/products?category=sliding-systems" },
    ],
  },
  {
    title: "Glazing & Hardware",
    blurb: "Performance glass, seals & precision fittings",
    accent: "from-copper-500 to-copper-700",
    icon: "Square",
    items: [
      { label: "Architectural Glass", href: "/products?category=glass" },
      { label: "Hardware & Fittings", href: "/products?category=hardware" },
      { label: "Sealants & Adhesives", href: "/products?category=sealants" },
      { label: "Fasteners", href: "/products?category=fasteners" },
    ],
  },
  {
    title: "Construction Materials",
    blurb: "Structure, insulation & weatherproofing",
    accent: "from-ink-600 to-brand-900",
    icon: "Building2",
    items: [
      { label: "Roofing Systems", href: "/products?category=roofing" },
      { label: "Insulation", href: "/products?category=insulation" },
      { label: "Cladding & Panels", href: "/products?category=construction-materials" },
      { label: "View all materials", href: "/products" },
    ],
  },
  {
    title: "Tools & Accessories",
    blurb: "Trade-grade tooling for professionals",
    accent: "from-brand-500 to-brand-700",
    icon: "Wrench",
    items: [
      { label: "Professional Tools", href: "/products?category=tools" },
      { label: "Mounting & Fixings", href: "/products?category=fasteners" },
      { label: "Safety & PPE", href: "/products?category=tools" },
      { label: "Browse catalogue", href: "/products" },
    ],
  },
];

export const stats = [
  { label: "Years of engineering", value: 28, suffix: "+" },
  { label: "Projects delivered", value: 6400, suffix: "+" },
  { label: "Countries served", value: 19, suffix: "" },
  { label: "Partner brands", value: 120, suffix: "+" },
];

export const coreValues = [
  {
    icon: "ShieldCheck",
    title: "Engineering Integrity",
    body: "Every system is load-tested, certified and traceable to its European conformity declaration.",
  },
  {
    icon: "Leaf",
    title: "Sustainable by Design",
    body: "80% recycled aluminium, Cradle-to-Cradle pathways and EPDs for every architectural system.",
  },
  {
    icon: "Globe2",
    title: "Global Sourcing",
    body: "Direct factory partnerships across 11 countries secure specification-grade stock and pricing.",
  },
  {
    icon: "Clock",
    title: "Reliable Logistics",
    body: "Five Benelux distribution hubs deliver 96% of orders within 48 hours across the region.",
  },
];
