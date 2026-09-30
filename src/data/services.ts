export type Phase = {
  slug: string;
  verb: string;
  headline: string;
  summary: string;
  how: string;
  duration: string;
  deliverables: string[];
  icon: string;
  visual: "scan" | "build" | "bloom";
};

export const phases: Phase[] = [
  {
    slug: "identify",
    verb: "Identify",
    headline: "Decide what's actually worth building",
    summary: "We learn how work really happens in your organization and find the few opportunities with a clear return.",
    how: "We map your processes, interview the people doing the work and measure where time is lost. You get a short, prioritized list with the cost and payoff of every idea.",
    duration: "2 to 4 weeks",
    deliverables: [
      "Leadership alignment workshop",
      "Team and stakeholder interviews",
      "ROI model for each initiative",
      "Prioritization map",
      "AI readiness report",
    ],
    icon: "ph:compass-light",
    visual: "scan",
  },
  {
    slug: "build",
    verb: "Build",
    headline: "Build it right, so it works from day one",
    summary: "We design and integrate the solution into the systems you already use, with security and governance built in.",
    how: "We validate with a small proof of concept, then harden it for production. We connect your data and tools, and set clear rules on who can access what.",
    duration: "6 to 10 weeks",
    deliverables: [
      "Scoping and technical architecture",
      "Data and systems integration",
      "Proof of concept to production",
      "Security, governance and reliability",
      "Performance tuning",
    ],
    icon: "ph:cube-transparent-light",
    visual: "build",
  },
  {
    slug: "adopt",
    verb: "Adopt",
    headline: "Make AI part of how work gets done",
    summary: "We stay with your team until the tool is a habit, not another abandoned project.",
    how: "We launch with a pilot group, train your people hands-on through Riverius AI Academy and track real usage. We refine until your team can run it on its own.",
    duration: "Ongoing",
    deliverables: [
      "Pilot and phased rollout",
      "Hands-on, no-code training",
      "Workflow integration support",
      "Usage tracking and continuous improvement",
    ],
    icon: "ph:plant-light",
    visual: "bloom",
  },
];

export const capabilities = [
  {
    title: "AI agents",
    text: "Agents that research, draft, route and follow up, with a human approving what matters.",
    icon: "ph:sparkle-light",
  },
  {
    title: "Workflow automation",
    text: "Reports, data entry and hand-offs that run on their own.",
    icon: "ph:flow-arrow-light",
  },
  {
    title: "Knowledge assistants",
    text: "Answers grounded in your documents, policies and systems.",
    icon: "ph:books-light",
  },
  {
    title: "Voice and chat",
    text: "WhatsApp, web and phone assistants that speak like your brand.",
    icon: "ph:chat-circle-dots-light",
  },
  {
    title: "Team training",
    text: "Practical, no-code AI training for every level, through Riverius AI Academy.",
    icon: "ph:graduation-cap-light",
  },
];
