// Add people here as the team grows. Photos go in src/assets/team/ (square, at least 880px).
import type { ImageMetadata } from "astro";
import aaisha from "../assets/team/aaisha.jpg";
import mariano from "../assets/team/mariano-rivera.jpg";
import teletica from "../assets/logos/teletica.png";
import fidelitas from "../assets/logos/fidelitas.png";
import upwork from "../assets/logos/upwork.webp";

type Person = {
  name: string;
  role: string;
  photo: ImageMetadata;
  bio: string[];
  credentials: string[];
  links: { label: string; href: string; icon: string }[];
};

export const team: Person[] = [
  {
    name: "Aaisha Ali",
    role: "Co-founder & Head of Product and Brand",
    photo: aaisha,
    bio: [
      "Aaisha tripled sales year over year at a SaaS and big data company, bringing in enterprise and government clients. She has facilitated international trade missions with the governments of Canada, Japan and the UAE, and designs the UX and UI of apps, web and SaaS platforms.",
      "At Riverius she shapes the big-picture vision, from bold ideas and the look and feel of every product to the client relationships and partnerships that bring them to life.",
    ],
    credentials: ["Product vision", "UX and UI design", "Brand", "Enterprise and government partnerships"],
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/ali-aaisha/", icon: "ph:linkedin-logo-light" }],
  },
  {
    name: "Mariano Rivera",
    role: "Co-founder & Head of AI",
    photo: mariano,
    bio: [
      "A software engineer and systems architect known for seeing the elegant solution inside complex challenges. Mariano designs the architecture of every Riverius build and personally guides each one from blueprint to launch.",
      "He holds a Bachelor of Science in Computer Systems Engineering and is a certified AI solutions expert and member of CPIC, Costa Rica's professional association of IT engineers. He has been featured on national television and as a guest lecturer at Universidad Fidélitas.",
    ],
    credentials: [
      "B.S. in Computer Systems Engineering",
      "5+ years as a software engineer",
      "Certified AI solutions expert",
      "CPIC member",
      "Top Rated on Upwork",
    ],
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/mriverius", icon: "ph:linkedin-logo-light" },
    ],
  },
];

export const featured = [
  { name: "Teletica Canal 7", logo: teletica, note: "Featured on national TV" },
  { name: "Universidad Fidélitas", logo: fidelitas, note: "Guest lecturer" },
  { name: "Upwork", logo: upwork, note: "Top Rated" },
];

export const principles = [
  { title: "Outcomes over hype", text: "We measure hours saved and errors avoided, not demos.", icon: "ph:target-light" },
  { title: "Builders, not slide decks", text: "The people who scope your project are the people who build it.", icon: "ph:wrench-light" },
  { title: "We teach as we build", text: "Your team learns the system while we make it, so it stays with you.", icon: "ph:chalkboard-teacher-light" },
  { title: "Your data stays yours", text: "Clear rules on where data lives and who can see it, from day one.", icon: "ph:shield-check-light" },
];
