// Add people here as the team grows. Photos go in public/images/team/.
type Person = {
  name: string;
  role: string;
  photo: string;
  bio: string[];
  credentials: string[];
  links: { label: string; href: string; icon: string }[];
};

export const team: Person[] = [
  {
    // TODO: replace with Aaisha's own bio, surname, credentials and links.
    name: "Aaisha",
    role: "Co-founder",
    photo: "/images/team/aaisha.jpg",
    bio: [
      "Aaisha co-founded Riverius AI to help teams put AI to work in ways that last.",
      "She works with clients from the first conversation to launch, making sure every project starts from a real problem and ends with a team that uses the solution.",
    ],
    credentials: [],
    links: [],
  },
  {
    name: "Mariano Rivera",
    role: "Co-founder and AI Solutions Engineer",
    photo: "/images/team/mariano-rivera.jpg",
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
  { name: "Teletica Canal 7", logo: "/images/academy/logos/teletica.png", note: "Featured on national TV" },
  { name: "Universidad Fidélitas", logo: "/images/academy/logos/fidelitas.png", note: "Guest lecturer" },
  { name: "Upwork", logo: "/images/academy/logos/upwork.webp", note: "Top Rated" },
];

export const principles = [
  { title: "Outcomes over hype", text: "We measure hours saved and errors avoided, not demos.", icon: "ph:target-light" },
  { title: "Builders, not slide decks", text: "The people who scope your project are the people who build it.", icon: "ph:wrench-light" },
  { title: "We teach as we build", text: "Your team learns the system while we make it, so it stays with you.", icon: "ph:chalkboard-teacher-light" },
  { title: "Your data stays yours", text: "Clear rules on where data lives and who can see it, from day one.", icon: "ph:shield-check-light" },
];
