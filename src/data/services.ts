// The three phases, shown on the home page ("One team, start to finish") and on /services.
export type Phase = {
  slug: string;
  verb: string;
  headline: string;
  summary: string;
  how: string;
  deliverables: string[];
  icon: string;
  visual: "scan" | "build" | "bloom";
};

export const phases: Phase[] = [
  {
    slug: "audit",
    verb: "Audit & Roadmap",
    headline: "See exactly where AI fits.",
    summary: "We study how your business runs, identify the opportunities with the clearest return, and deliver a roadmap shaped for your industry and your goals.",
    how: "We map your processes, talk with the people doing the work and see where their time goes. You receive a prioritized roadmap with the investment and the return of every opportunity.",
    deliverables: [
      "Leadership alignment workshop",
      "Team and stakeholder interviews",
      "ROI model for each opportunity",
      "Prioritized AI roadmap",
      "AI readiness report",
    ],
    icon: "ph:compass-light",
    visual: "scan",
  },
  {
    slug: "implement",
    verb: "Implement",
    headline: "Systems crafted to work from day one.",
    summary: "AI agents, automations and custom software, designed and engineered by our team and connected to the tools you already use.",
    how: "We validate with a focused proof of concept, then engineer it for production. We connect your data and tools, set clear rules on who can access what, and our lead engineer reviews every build.",
    deliverables: [
      "Solution architecture",
      "AI agents, automations and custom software",
      "Integration with the tools you already use",
      "Proof of concept to production",
      "Security, governance and reliability",
    ],
    icon: "ph:cube-transparent-light",
    visual: "build",
  },
  {
    slug: "train",
    verb: "Train & Support",
    headline: "Your team, leading with confidence.",
    summary: "Hands-on workshops, AI education and ongoing support, so your systems keep evolving as your business grows.",
    how: "We launch with a pilot group, train your people hands-on through workshops and Riverius AI Academy, and follow real usage. Then we keep refining your systems and building what comes next.",
    deliverables: [
      "Hands-on workshops",
      "AI education for leaders and teams",
      "Pilot and phased rollout",
      "Ongoing support and optimization",
      "Usage tracking and continuous improvement",
    ],
    icon: "ph:plant-light",
    visual: "bloom",
  },
];

// Home "What becomes possible": the outcome is the card title, the label names the solution.
export const capabilities = [
  {
    title: "Every call answered, every lead welcomed",
    text: "Voice agents that answer calls, qualify leads and book appointments around the clock.",
    label: "Voice AI agents",
    icon: "ph:phone-call-light",
  },
  {
    title: "Conversations in your brand voice",
    text: "Chat and WhatsApp agents that greet, guide and convert, any hour, in your tone.",
    label: "Chat & WhatsApp agents",
    icon: "ph:chat-circle-dots-light",
  },
  {
    title: "Your company's knowledge, in seconds",
    text: "AI trained on your own documents, policies and data, giving your team and clients accurate answers instantly.",
    label: "Knowledge assistants (RAG)",
    icon: "ph:books-light",
  },
  {
    title: "Operations that flow on their own",
    text: "Automations that connect your apps and handle repetitive work, freeing your people for the work that matters most.",
    label: "Workflow automation",
    icon: "ph:flow-arrow-light",
  },
  {
    title: "Software shaped around how you work",
    text: "Web platforms, SaaS products, apps and internal tools, engineered for your business.",
    label: "Custom software",
    icon: "ph:code-light",
  },
];

// Home "Our solutions in depth".
export const solutions = [
  {
    name: "AI Voice Agents",
    lead: "A voice that's always there for your customers.",
    text: "Natural-sounding voice agents that answer every call, qualify leads, book appointments and handle routine requests around the clock, in your brand's voice. Your team gains time for the conversations that call for a human touch.",
    idealFor: ["Reception and front desk", "Sales inquiries", "Appointment scheduling", "Support lines"],
    icon: "ph:phone-call-light",
  },
  {
    name: "AI Agents",
    lead: "Digital teammates that get work done.",
    text: "Agents that research, draft, route, follow up and update your systems, with your people approving what matters most.",
    idealFor: ["Lead qualification", "Sales follow-up", "CRM updates", "Reporting", "Employee onboarding"],
    icon: "ph:sparkle-light",
  },
  {
    name: "Knowledge Assistants",
    lead: "Your company's knowledge, answered in seconds.",
    text: "AI that learns from your own documents, policies and data, so your team and clients receive accurate, sourced answers instantly.",
    idealFor: ["Internal help desks", "HR and policy questions", "Customer self-service", "Sales enablement"],
    icon: "ph:books-light",
  },
  {
    name: "Chat & WhatsApp Agents",
    lead: "Conversations that convert, wherever your customers are.",
    text: "Intelligent agents for WhatsApp, web chat and social messages that answer questions, recommend, take bookings and guide customers to purchase, at any hour, in your tone.",
    idealFor: ["Customer service", "E-commerce", "Bookings", "Lead capture"],
    icon: "ph:chat-circle-dots-light",
  },
  {
    name: "Workflow Automation",
    lead: "Operations that flow on their own.",
    text: "Automations that connect your apps and carry repetitive work from start to finish: data entry, reports, approvals and hand-offs.",
    idealFor: ["Finance and admin", "Operations", "Sales ops", "HR"],
    icon: "ph:flow-arrow-light",
  },
  {
    name: "AI Audit & Roadmap",
    lead: "Clarity before you invest.",
    text: "A strategic review of your operations, data and tools that reveals where AI creates the most value, delivered as a prioritized roadmap with clear returns.",
    idealFor: ["Leadership teams beginning their AI journey", "Teams ready to scale beyond early pilots"],
    icon: "ph:compass-light",
  },
  {
    name: "Custom Software & Platforms",
    lead: "Technology shaped around how you work.",
    text: "Web platforms, SaaS products, mobile apps and internal tools, designed and engineered with AI where it adds the most value.",
    idealFor: ["New digital products", "Client portals", "Internal systems"],
    icon: "ph:code-light",
  },
];
