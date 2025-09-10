export type Club = {
  id: number;
  name: string;
  logo: string;
  sport: string;
  location: string;
  verified: boolean;
  description: string;
  foundedYear?: number;
  achievements?: string[];
  photos?: string[];
  videos?: string[];
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
  };
};

export const clubs: Club[] = [
  {
    id: 1,
    name: "Elite Football Academy",
    logo: "https://placehold.co/100x100.png",
    sport: "Football",
    location: "Mumbai, Maharashtra",
    verified: true,
    description:
      "Elite Football Academy focuses on youth development with UEFA-licensed coaches, modern training facilities, and a proven pathway to professional clubs.",
    foundedYear: 2012,
    achievements: [
      "U18 State Champions 2023",
      "3 Players selected for National Camp",
    ],
    photos: [
      "https://placehold.co/800x450.png",
      "https://placehold.co/800x450.png?text=Training+Ground",
      "https://placehold.co/800x450.png?text=Team+Photo",
    ],
    videos: [
      "https://www.w3schools.com/html/mov_bbb.mp4",
    ],
    contact: {
      email: "contact@elitefa.example",
      phone: "+91 98765 43210",
      website: "https://elitefa.example",
      address: "Bandra, Mumbai, Maharashtra",
    },
  },
  {
    id: 2,
    name: "Hoops Dynasty",
    logo: "https://placehold.co/100x100.png",
    sport: "Basketball",
    location: "Mumbai, Maharashtra",
    verified: true,
    description:
      "Premier basketball academy known for fundamentals, athletic performance, and national-level tournament exposure.",
    foundedYear: 2015,
    achievements: ["City League Winners 2022"],
    photos: [
      "https://placehold.co/800x450.png?text=Indoor+Court",
      "https://placehold.co/800x450.png?text=Strength+Session",
    ],
    videos: [],
    contact: {
      email: "hello@hoops.example",
    },
  },
  {
    id: 3,
    name: "Racquet Masters",
    logo: "https://placehold.co/100x100.png",
    sport: "Tennis",
    location: "Mumbai, Maharashtra",
    verified: false,
    description: "High-performance tennis coaching with ITF-certified coaches.",
    photos: ["https://placehold.co/800x450.png?text=Court"],
    videos: [],
  },
  {
    id: 4,
    name: "Cricket Champions",
    logo: "https://placehold.co/100x100.png",
    sport: "Cricket",
    location: "Mumbai, Maharashtra",
    verified: true,
    description: "Grassroots to elite pathway with elite coaching staff and analytics.",
    photos: ["https://placehold.co/800x450.png?text=Nets"],
    videos: [],
  },
  {
    id: 5,
    name: "Mumbai City FC Youth",
    logo: "https://placehold.co/100x100.png",
    sport: "Football",
    location: "Mumbai, Maharashtra",
    verified: true,
    description: "Youth development arm focusing on technical excellence and tactical IQ.",
    photos: ["https://placehold.co/800x450.png?text=Academy"],
    videos: [],
  },
];

export function getClubById(id: number): Club | undefined {
  return clubs.find((c) => c.id === id);
}

