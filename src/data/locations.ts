import { IMAGES } from "./images";

export interface LocationCity {
  id: string;
  name: string;
  slug: string;
  count: number;
  image: string;
  tagline: string;
  description: string;
  featured: boolean;
}

export const LOCATIONS: LocationCity[] = [
  {
    id: "loc-1",
    name: "Amsterdam",
    slug: "amsterdam",
    count: 5,
    image: IMAGES.cities.amsterdam,
    tagline: "UNESCO Canals & Monumental Grandeur",
    description: "The historic capital renowned for 17th-century canal palaces on the Grachtengordel, cultural institutions, and high-growth commercial hubs.",
    featured: true,
  },
  {
    id: "loc-2",
    name: "Rotterdam",
    slug: "rotterdam",
    count: 4,
    image: IMAGES.cities.rotterdam,
    tagline: "Modernist Skyline & Harbor Penthouses",
    description: "Europe's largest port and architectural epicenter, featuring bold high-rises, waterfront penthouses, and avant-garde residential lofts.",
    featured: true,
  },
  {
    id: "loc-3",
    name: "The Hague",
    slug: "the-hague",
    count: 3,
    image: IMAGES.cities.theHague,
    tagline: "Diplomatic Estates & Coastal Grandeur",
    description: "Seat of royal government, international courts of justice, and aristocratic leafy estates in Wassenaar and Benoordenhout.",
    featured: true,
  },
  {
    id: "loc-4",
    name: "Utrecht",
    slug: "utrecht",
    count: 2,
    image: IMAGES.cities.utrecht,
    tagline: "Medieval Wharfs & Central Heritage",
    description: "Beloved for its two-tiered medieval canal wharfs, Dom Tower vistas, and bicycle-first urban planning at the crossroads of the country.",
    featured: true,
  },
  {
    id: "loc-5",
    name: "Eindhoven",
    slug: "eindhoven",
    count: 2,
    image: IMAGES.cities.eindhoven,
    tagline: "Brainport High-Tech & Architectural Eco-Villas",
    description: "The technology and design powerhouse of Europe, characterized by innovative eco-villas and repurposed industrial monuments.",
    featured: true,
  },
  {
    id: "loc-6",
    name: "Haarlem",
    slug: "haarlem",
    count: 2,
    image: IMAGES.cities.haarlem,
    tagline: "Coastal Kennemerland & Dune Mansions",
    description: "Sophisticated boutique town with immediate access to Bloemendaal dunes, classic Spaarne riverfronts, and Amsterdam proximity.",
    featured: true,
  },
  {
    id: "loc-7",
    name: "Leiden",
    slug: "leiden",
    count: 1,
    image: IMAGES.cities.leiden,
    tagline: "Academic Patrician Canals & Courtyards",
    description: "The Netherlands' oldest university seat, famous for Rapenburg patrician canal mansions and historic inner courtyards (hofjes).",
    featured: false,
  },
  {
    id: "loc-8",
    name: "Delft",
    slug: "delft",
    count: 1,
    image: IMAGES.cities.delft,
    tagline: "Vermeer Heritage & Golden Age Canals",
    description: "Intimate historic canals, brick bridges, and centuries of Dutch Golden Age craft just minutes from The Hague and Rotterdam.",
    featured: false,
  },
  {
    id: "loc-9",
    name: "Groningen",
    slug: "groningen",
    count: 1,
    image: IMAGES.cities.groningen,
    tagline: "Northern Vitality & Parkside Manors",
    description: "Dynamic northern cultural beacon with tranquil parkside estates bordering the verdant Noorderplantsoen.",
    featured: false,
  },
  {
    id: "loc-10",
    name: "Maastricht",
    slug: "maastricht",
    count: 1,
    image: IMAGES.cities.maastricht,
    tagline: "Limestone Elegance & European Sophistication",
    description: "Southern culinary and cultural jewel featuring historic marlstone facades, cobbled alleyways, and rolling Limburg hill borders.",
    featured: false,
  },
  {
    id: "loc-11",
    name: "Breda",
    slug: "breda",
    count: 1,
    image: IMAGES.cities.breda,
    tagline: "Nassau Royalty & Woodland Ginneken Enclaves",
    description: "Stately Brabant city with aristocratic Nassau roots, green country estates, and a vibrant gastronomic culture.",
    featured: false,
  },
  {
    id: "loc-12",
    name: "Almere",
    slug: "almere",
    count: 1,
    image: IMAGES.cities.almere,
    tagline: "IJmeer Maritime Coast & Floating Architecture",
    description: "Pioneering Dutch waterfront community celebrated for sustainable floating residences, dunes, and fast connection to Amsterdam.",
    featured: false,
  },
];
