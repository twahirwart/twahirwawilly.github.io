export type StolenObject = {
  id: string;
  title: string;
  objectType: string;
  origin: string;
  period: string;
  date: string;
  material: string;
  dimensions: string;
  description: string;
  lastKnownLocation: string;
  caseReference: string;
  image: string;
  tags: string[];
};

export const stolenObjects: StolenObject[] = [
  {
    id: "st-001",
    title: "Ritual Mask (Fragment)",
    objectType: "Mask",
    origin: "West Africa",
    period: "19th century",
    date: "c. 1880",
    material: "Wood, pigments",
    dimensions: "28 × 18 cm",
    description:
      "A carved wooden mask fragment with traces of red pigment. The object is documented in a regional inventory and reported missing after a private collection transfer.",
    lastKnownLocation: "Private collection, Europe",
    caseReference: "UNESCO-MSO-1880-001",
    image: "/objects/ritual-mask.svg",
    tags: ["wood", "ritual", "mask"],
  },
  {
    id: "st-002",
    title: "Terracotta Figurine", 
    objectType: "Figurine",
    origin: "Mediterranean",
    period: "Classical period",
    date: "4th–3rd century BCE",
    material: "Terracotta",
    dimensions: "16 × 7 cm",
    description:
      "Small terracotta figurine with a worn surface. Reported stolen from storage during cataloguing.",
    lastKnownLocation: "Museum storage",
    caseReference: "UNESCO-MSO-0320-002",
    image: "/objects/terracotta-figurine.svg",
    tags: ["terracotta", "figurine"],
  },
  {
    id: "st-003",
    title: "Illuminated Manuscript Leaf",
    objectType: "Manuscript",
    origin: "Middle East",
    period: "Medieval",
    date: "c. 1250",
    material: "Ink on parchment",
    dimensions: "24 × 17 cm",
    description:
      "A single leaf from an illuminated manuscript featuring geometric ornamentation. Removed from an album and circulated in the antiquities market.",
    lastKnownLocation: "Unknown",
    caseReference: "UNESCO-MSO-1250-003",
    image: "/objects/manuscript-leaf.svg",
    tags: ["parchment", "illumination", "manuscript"],
  },
  {
    id: "st-004",
    title: "Bronze Statuette",
    objectType: "Statuette",
    origin: "South Asia",
    period: "Early modern",
    date: "c. 1600",
    material: "Bronze",
    dimensions: "22 × 9 cm",
    description:
      "Bronze statuette with a dark patina. Last documented during a loan; later discovered missing from return shipment.",
    lastKnownLocation: "In transit",
    caseReference: "UNESCO-MSO-1600-004",
    image: "/objects/bronze-statuette.svg",
    tags: ["bronze", "statuette"],
  },
  {
    id: "st-005",
    title: "Ceramic Vessel (Painted)",
    objectType: "Vessel",
    origin: "Central America",
    period: "Pre-Columbian",
    date: "c. 900",
    material: "Ceramic",
    dimensions: "19 × 19 cm",
    description:
      "A painted ceramic vessel with abstract motifs. Reported stolen from a site museum after forced entry.",
    lastKnownLocation: "Site museum",
    caseReference: "UNESCO-MSO-0900-005",
    image: "/objects/ceramic-vessel.svg",
    tags: ["ceramic", "painted"],
  },
  {
    id: "st-006",
    title: "Stone Relief Panel",
    objectType: "Relief",
    origin: "Southeast Asia",
    period: "Angkor era",
    date: "c. 1100",
    material: "Sandstone",
    dimensions: "48 × 64 cm",
    description:
      "Relief panel with floral banding. Cut from architectural context and trafficked as a decorative element.",
    lastKnownLocation: "Unknown",
    caseReference: "UNESCO-MSO-1100-006",
    image: "/objects/stone-relief.svg",
    tags: ["stone", "relief", "architecture"],
  },
  {
    id: "st-007",
    title: "Textile Fragment",
    objectType: "Textile",
    origin: "North Africa",
    period: "Late antique",
    date: "c. 600",
    material: "Wool, linen",
    dimensions: "30 × 22 cm",
    description:
      "Woven textile fragment with a repeating border. Missing following an exhibition de-installation.",
    lastKnownLocation: "Exhibition gallery",
    caseReference: "UNESCO-MSO-0600-007",
    image: "/objects/textile-fragment.svg",
    tags: ["textile", "woven"],
  },
  {
    id: "st-008",
    title: "Gold Pendant",
    objectType: "Jewellery",
    origin: "Northern Europe",
    period: "Early medieval",
    date: "c. 800",
    material: "Gold",
    dimensions: "4.2 × 3.0 cm",
    description:
      "Small gold pendant with granulation details. Stolen during a burglary; distinctive repairs noted in records.",
    lastKnownLocation: "Regional museum",
    caseReference: "UNESCO-MSO-0800-008",
    image: "/objects/gold-pendant.svg",
    tags: ["gold", "jewellery"],
  },
];

export function getStolenObjectById(id: string): StolenObject | undefined {
  return stolenObjects.find((o) => o.id === id);
}

export const objectTypes = Array.from(
  new Set(stolenObjects.map((o) => o.objectType))
).sort();

export const origins = Array.from(new Set(stolenObjects.map((o) => o.origin))).sort();
