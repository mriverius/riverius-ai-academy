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
    role: "Co-founder and Creative Director",
    photo: aaisha,
    bio: [
      "Aaisha is the creative mind behind Riverius. She shapes strategy, brand identity and positioning, so every AI system we build has a clear purpose and a voice of its own.",
      "She leads strategy with clients and students alike: where to focus, how to stand out and how the work should look and feel. Where Mariano builds the technology, Aaisha gives it direction and a brand people remember.",
    ],
    credentials: ["Strategy", "Brand identity", "Creative direction", "Positioning"],
    links: [],
  },
  {
    name: "Mariano Rivera",
    role: "Co-founder and AI Solutions Engineer",
    photo: mariano,
    bio: [
      "Mariano builds AI automations and agents every day. He's a systems engineer with more than five years in software, and a certified AI solutions expert.",
      "He co-founded Riverius to make AI feel like clarity, not complexity, and teaches professionals to build it themselves through Riverius AI Academy.",
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
      { label: "YouTube", href: "https://youtube.com/@mriverius", icon: "ph:youtube-logo-light" },
      { label: "Instagram", href: "https://instagram.com/mriverius", icon: "ph:instagram-logo-light" },
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
