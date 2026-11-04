// Homepage content, copied verbatim from app/page.tsx (review/final-release,
// d1d3faa) so the layout variants show the real copy. Lab only.

// Step cards: production card design (restored 2 Nov 2026), copy as bullets.
export const steps = [
  {
    n: "1",
    icon: "search" as const,
    name: "Business and workflow assessment",
    points: [
      "Find bottlenecks, repetitive tasks, and information flows.",
      "Establish where AI can deliver practical business value.",
    ],
  },
  {
    n: "2",
    icon: "connect" as const,
    name: "AI system design and integration",
    points: [
      "Design an AI-enabled workflow around your business needs.",
      "Integrate it with the tools, systems, and data your team already uses.",
      "Consider POPIA-related data protection as part of the design.",
    ],
  },
  {
    n: "3",
    icon: "chart" as const,
    name: "Optimisation and handover",
    points: [
      "Measure performance against an agreed baseline.",
      "Refine the workflow and document how it works.",
      "Equip your team to use and manage it.",
    ],
  },
];

export const capabilities = [
  {
    icon: "compass" as const,
    name: "Business and AI strategy",
    lead: "Understand the problem before building the solution.",
    items: [
      "Business and workflow analysis",
      "AI opportunity identification and prioritisation",
      "Systems architecture and implementation roadmaps",
    ],
  },
  {
    icon: "browser" as const,
    name: "Digital systems and integration",
    lead: "Build the digital foundations your business needs to work better.",
    items: [
      "Websites, web applications, and e-commerce platforms",
      "AI integration across business systems and data sources",
      "Connected infrastructure that evolves with the business",
    ],
  },
  {
    icon: "signal" as const,
    name: "Data-informed growth systems",
    lead: "Turn business information into better decisions and more effective customer processes.",
    items: [
      "Customer journey and revenue process analysis",
      "Data-informed marketing and growth strategy",
      "AI-enabled lead management, engagement, and follow-up",
    ],
  },
];
