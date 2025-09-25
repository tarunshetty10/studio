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
    logo: "/clubs/elite/logo.jpg",
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
      "/clubs/elite/photo1.jpg",
      "/clubs/elite/photo2.jpg",
      "/clubs/elite/photo3.jpg",
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
    id: 7,
    name: "SG5 Football Academy",
    logo: "/clubs/sg5/logo.jpg",
    sport: "Football",
    location: "Mumbai (Powai, Andheri, Goregaon, Malad, Borivali & Mira Road)",
    verified: true,
    description:
      "Premier grassroots and youth development football academy in Mumbai with training centers across Powai, Andheri, Goregaon, Malad, Borivali & Mira Road. Structured programs develop players technically, physically, and mentally. Known for combining passion with professional-level coaching; competes in MFA Youth Premier League and Elite Division; hosts tournaments like the SG5 Cup; a trusted pathway for young footballers.",
    foundedYear: 2020,
    achievements: [
      "Youth success in the MFA Youth Premier League (U-9)",
      "Organizes SG5 Cup providing competitive exposure",
      "Active community engagement and motivational initiatives",
    ],
    photos: [
      "/clubs/sg5/photo1.jpg",
      "/clubs/sg5/photo2.jpg",
      "/clubs/sg5/photo3.jpg",
    ],
    videos: [],
    contact: {
      email: "getyourtrialsofficial@gmail.com",
      address: "Multiple centers across Mumbai",
    },
  },
  {
    id: 8,
    name: "JAC Cricket Academy",
    logo: "/clubs/jac/logo.jpg",
    sport: "Cricket",
    location: "Mumbai Metropolitan Region (Mira Road East & Bhayandar, Thane)",
    verified: true,
    description:
      "Premier cricket coaching academy with indoor nets, video analysis, and side-arm specialist training. Offers group and personal coaching for ages 5+ with flexible hours (7 AM–11 PM). Head coaches: Jayesh Chandankar and Asrlal Sheikh with a strong team of ~16 certified coaches. Transparent pricing from ₹2,000/month to ₹18,000/year; no registration fee.",
    foundedYear: 2021,
    achievements: [
      "U-12 Youth Cricket Bash (Aug 29, 2025)",
      "Mira-Bhayander Premier League 2025 (Semi-Final, June 5, 2025)",
    ],
    photos: [
      "/clubs/jac/photo1.jpg",
      "/clubs/jac/photo2.jpg",
      "/clubs/jac/photo3.jpg",
    ],
    videos: [],
    contact: {
      email: "getyourtrialsofficial@gmail.com",
      address: "Mira Road East & Bhayandar, Thane",
    },
  },
  {
    id: 9,
    name: "Samarth Cricket Academy",
    logo: "/clubs/samarth/logo.jpg",
    sport: "Cricket",
    location: "Mira Road East, Mumbai, Maharashtra",
    verified: true,
    description:
      "Local cricket coaching centre offering structured coaching with typical sessions 7–9 AM and 4–6 PM, monthly fees ₹2,000–₹3,000, and participation in local competitions.",
    foundedYear: 2023,
    achievements: [
      "Mira Bhayandar Premier League 2025 champions",
    ],
    photos: [
      "/clubs/samarth/photo1.jpg",
    ],
    videos: [],
    contact: {
      email: "getyourtrialsofficial@gmail.com",
      address: "Mira Road East, Mumbai",
    },
  },
  {
    id: 2,
    name: "Hoops Dynasty",
    logo: "/clubs/hoops/logo.jpg",
    sport: "Basketball",
    location: "Mumbai, Maharashtra",
    verified: true,
    description:
      "Premier basketball academy known for fundamentals, athletic performance, and national-level tournament exposure.",
    foundedYear: 2015,
    achievements: ["City League Winners 2022"],
    photos: [
      "/clubs/hoops/photo1.jpg",
      "/clubs/hoops/photo2.jpg",
    ],
    videos: [],
    contact: {
      email: "hello@hoops.example",
    },
  },
  {
    id: 3,
    name: "Racquet Masters",
    logo: "/clubs/racquet/logo.jpg",
    sport: "Tennis",
    location: "Mumbai, Maharashtra",
    verified: false,
    description: "High-performance tennis coaching with ITF-certified coaches.",
    photos: ["/clubs/racquet/photo1.jpg"],
    videos: [],
  },
  {
    id: 4,
    name: "Cricket Champions",
    logo: "/clubs/cricket-champions/logo.jpg",
    sport: "Cricket",
    location: "Mumbai, Maharashtra",
    verified: true,
    description: "Grassroots to elite pathway with elite coaching staff and analytics.",
    photos: ["/clubs/cricket-champions/photo1.jpg"],
    videos: [],
  },
  {
    id: 5,
    name: "Mumbai City FC Youth",
    logo: "/clubs/mumbai-city/logo.jpg",
    sport: "Football",
    location: "Mumbai, Maharashtra",
    verified: true,
    description: "Youth development arm focusing on technical excellence and tactical IQ.",
    photos: ["/clubs/mumbai-city/photo1.jpg"],
    videos: [],
  },
  {
    id: 6,
    name: "Spurz Football Academy",
    logo: "/clubs/spurz/logo.jpg",
    sport: "Football",
    location: "Mumbai, Maharashtra",
    verified: true,
    description:
      "Spurz Football Academy is committed to delivering quality football coaching with a focus on youth development through engaging training programs. The academy showcases its dynamic journey through regular content updates and community-driven initiatives.",
    foundedYear: 2017,
    achievements: [
      "Coach @saahiill_shaikh_ appointed head coach of India U17 for FC Bayern Youth Cup in Germany",
      "Under-18s Runners-up at recent 5v5 championship",
      "Strong performances in Leno Premier League and Independence Cup",
    ],
    photos: [
      "/clubs/spurz/photo1.jpg",
      "/clubs/spurz/photo2.jpg",
      "/clubs/spurz/photo3.jpg",
    ],
    videos: [],
    contact: {
      email: "getyourtrialsofficial@gmail.com",
      website: "https://instagram.com/spurz_football_academy_",
      address: "Mumbai, Maharashtra",
    },
  },
];

export function getClubById(id: number): Club | undefined {
  return clubs.find((c) => c.id === id);
}

