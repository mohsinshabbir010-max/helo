/* NEXORA — content data for course pages and the AI agent demo.
   Edit here: course details, instructors, and demo scenarios. */

window.NEXORA_CONFIG = {
  whatsapp: "923135760708", // digits only with country code
  email: "mohsinshabbir010@gmail.com",
};

window.NEXORA_COURSES = {
  "ai-agents": {
    track: "AI Agent Course",
    title: "AI Agents & Automation Mastery",
    description:
      "Design, build and deploy AI agents that do real work — answering customers, processing documents and running business workflows end to end. You finish with three working agents and the skills to sell them as a service.",
    duration: "12 weeks · 3 sessions/week",
    level: "Beginner to Advanced",
    format: "On-campus + live online",
    certificate: "NEXORA Certified AI Automation Specialist",
    learn: [
      "How AI agents plan, use tools and remember context",
      "Prompt engineering patterns that hold up in production",
      "Building workflows with automation platforms and code",
      "Connecting AI APIs to email, sheets, CRMs and chat",
      "Designing AI assistants for real business roles",
      "Retrieval: letting agents answer from your own documents",
      "Testing, guardrails and cost control for AI systems",
      "Packaging and pricing AI solutions for clients",
    ],
    projects: [
      ["Customer support agent", "Answers FAQs from a knowledge base and hands off to a human when unsure."],
      ["Invoice processing workflow", "Reads PDF invoices, extracts totals and updates a spreadsheet automatically."],
      ["Business research assistant", "Gathers, summarises and reports on competitors for a weekly brief."],
    ],
    instructor: {
      initials: "AI",
      role: "Lead AI Engineer, NEXORA Labs",
      bio: "Builds production AI agents for NEXORA clients and teaches the systems behind them — not just the tools.",
    },
    curriculum: [
      ["Weeks 1–2", "AI foundations & prompt engineering", ["How large language models work", "Prompt patterns: roles, examples, structure", "Evaluating outputs and fixing failure modes"]],
      ["Weeks 3–4", "AI tools & assistants", ["Choosing the right AI tool for the job", "Building custom assistants with instructions and files", "AI for writing, analysis and research"]],
      ["Weeks 5–6", "Working with AI APIs", ["API keys, requests and responses", "Structured outputs and function calling", "Handling errors, limits and costs"]],
      ["Weeks 7–8", "Automation & workflows", ["Triggers, actions and data mapping", "Automating email, sheets and CRM updates", "Human-in-the-loop approvals"]],
      ["Weeks 9–10", "Building AI agents", ["Agent loops: plan, act, observe", "Tool use and memory", "Retrieval from company documents"]],
      ["Weeks 11–12", "Capstone & AI business solutions", ["Scoping an AI project with a client", "Deploying and monitoring your agent", "Final presentation and certification review"]],
    ],
  },

  computer: {
    track: "Computer Courses",
    title: "Computer Skills & Office Professional",
    description:
      "From your first file to confident, job-ready computer skills. Master MS Office, advanced Excel, design basics and the fundamentals of web development and programming.",
    duration: "10 weeks · 3 sessions/week",
    level: "Beginner",
    format: "On-campus + live online",
    certificate: "NEXORA Certified Office Professional",
    learn: [
      "Basic computer skills: files, internet, email and safety",
      "Professional documents in Microsoft Word",
      "Presentations that persuade in PowerPoint",
      "Advanced Excel: formulas, lookups, pivot tables, dashboards",
      "Graphic design basics for social posts and flyers",
      "How websites work and building your first page",
      "Programming fundamentals: logic, variables, loops",
      "Typing speed and productivity shortcuts",
    ],
    projects: [
      ["Business report pack", "A formatted Word report with a matching PowerPoint summary."],
      ["Sales dashboard in Excel", "Pivot tables and charts that update from raw data."],
      ["Personal website", "A one-page site built with HTML and CSS."],
    ],
    instructor: {
      initials: "CS",
      role: "Senior Computer Skills Trainer",
      bio: "Has taught hundreds of first-time learners and office teams to work faster and with confidence.",
    },
    curriculum: [
      ["Weeks 1–2", "Computer essentials", ["Operating system, files and folders", "Internet, email and online safety", "Typing and keyboard shortcuts"]],
      ["Weeks 3–4", "Word & PowerPoint", ["Styles, tables and professional layouts", "CVs, letters and reports", "Slide design and presenting"]],
      ["Weeks 5–7", "Excel — basic to advanced", ["Formulas and cell references", "XLOOKUP, IF, SUMIFS and data cleaning", "Pivot tables, charts and dashboards"]],
      ["Week 8", "Graphic design basics", ["Layout, colour and type", "Designing posts and flyers", "Exporting for print and web"]],
      ["Weeks 9–10", "Web & programming fundamentals", ["HTML and CSS basics", "Programming logic with simple exercises", "Final project and certification"]],
    ],
  },

  marketing: {
    track: "Digital Marketing",
    title: "Performance Digital Marketing",
    description:
      "Learn to bring customers online and prove it with numbers. SEO, Google and Meta ads, content, email and analytics — run as real campaigns with real budgets in mind.",
    duration: "10 weeks · 3 sessions/week",
    level: "Beginner to Intermediate",
    format: "On-campus + live online",
    certificate: "NEXORA Certified Digital Marketer",
    learn: [
      "SEO: keywords, on-page optimisation and local search",
      "Google Ads: search, display and conversion tracking",
      "Meta Ads: audiences, creatives and scaling",
      "Content marketing that earns attention",
      "Email marketing sequences that convert",
      "Analytics: reading GA4 and reporting results",
      "Lead generation funnels for service businesses",
      "Building a full marketing strategy and budget",
    ],
    projects: [
      ["SEO audit & plan", "A complete audit and 90-day SEO plan for a real local business."],
      ["Paid ads campaign", "Google and Meta campaign structure with tracking and a test budget."],
      ["Marketing strategy deck", "Channel mix, funnel, budget and KPIs presented to a panel."],
    ],
    instructor: {
      initials: "DM",
      role: "Head of Growth Marketing",
      bio: "Runs paid and organic campaigns for NEXORA clients and teaches what actually moves revenue.",
    },
    curriculum: [
      ["Weeks 1–2", "Marketing foundations & strategy", ["Customers, offers and positioning", "Funnels and customer journeys", "Setting goals and KPIs"]],
      ["Weeks 3–4", "SEO & content marketing", ["Keyword research and search intent", "On-page and local SEO", "Content planning and writing"]],
      ["Weeks 5–6", "Google Ads", ["Search campaign structure", "Bidding, budgets and quality score", "Conversion tracking"]],
      ["Weeks 7–8", "Meta Ads & email", ["Audiences and creative testing", "Retargeting and scaling", "Email sequences and automation"]],
      ["Weeks 9–10", "Analytics & lead generation", ["GA4 reports and dashboards", "Landing pages and lead magnets", "Capstone campaign presentation"]],
    ],
  },

  freelancing: {
    track: "Freelancing",
    title: "Freelancing Career Accelerator",
    description:
      "Turn a skill into income. Set up winning Upwork and Fiverr profiles, write proposals clients reply to, price with confidence and build a personal brand that brings repeat work.",
    duration: "8 weeks · 2 sessions/week",
    level: "All levels",
    format: "On-campus + live online",
    certificate: "NEXORA Certified Freelance Professional",
    learn: [
      "Choosing a profitable service and niche",
      "Upwork profile optimisation and job search",
      "Fiverr gigs that rank and convert",
      "Proposal writing with proven structures",
      "Client acquisition beyond the platforms",
      "Personal branding on LinkedIn and social media",
      "Portfolio building with case studies",
      "Pricing, contracts, payments and client communication",
    ],
    projects: [
      ["Complete Upwork & Fiverr setup", "Optimised profile, three gigs and a portfolio reviewed by mentors."],
      ["Proposal library", "Ten tailored proposal templates for your service."],
      ["Personal brand kit", "LinkedIn profile, content plan and case-study portfolio."],
    ],
    instructor: {
      initials: "FL",
      role: "Top-Rated Freelancer & Mentor",
      bio: "Built a full-time international client base and now mentors students through their first contracts.",
    },
    curriculum: [
      ["Weeks 1–2", "Foundations & niche", ["How freelance marketplaces work", "Picking a service clients pay for", "Setting income goals"]],
      ["Weeks 3–4", "Upwork & Fiverr", ["Profiles, gigs and SEO on platforms", "Finding the right jobs", "Winning your first reviews"]],
      ["Weeks 5–6", "Proposals & clients", ["Proposal writing frameworks", "Discovery calls and scoping", "Client communication and delivery"]],
      ["Weeks 7–8", "Brand, pricing & growth", ["Portfolio and personal branding", "Pricing, payments and contracts", "Repeat clients and referrals"]],
    ],
  },

  social: {
    track: "Social Media",
    title: "Social Media & Content Creator Pro",
    description:
      "Grow brands and personal audiences on Facebook, Instagram, TikTok, YouTube and LinkedIn. Plan content, shoot and edit reels and short videos, and run ads that turn views into customers.",
    duration: "8 weeks · 3 sessions/week",
    level: "Beginner to Intermediate",
    format: "On-campus + live online",
    certificate: "NEXORA Certified Social Media Manager",
    learn: [
      "Platform playbooks: Facebook, Instagram, TikTok, YouTube, LinkedIn",
      "Social media strategy and content calendars",
      "Content creation: hooks, scripts and storytelling",
      "Shooting and editing reels and short videos on your phone",
      "YouTube channel setup, thumbnails and SEO",
      "Community management and brand voice",
      "Social media advertising and boosting",
      "Reporting growth to clients and managers",
    ],
    projects: [
      ["30-day content calendar", "A complete plan with scripts and designs for a real brand."],
      ["Reels & shorts portfolio", "Five edited short videos with measured performance."],
      ["Social ads campaign", "An ad set with targeting, creatives and a results report."],
    ],
    instructor: {
      initials: "SM",
      role: "Social Media Strategist & Creator",
      bio: "Manages brand accounts for NEXORA clients and creates short-form content that performs.",
    },
    curriculum: [
      ["Weeks 1–2", "Strategy & platforms", ["Audience, goals and positioning", "How each platform's algorithm rewards content", "Building a content calendar"]],
      ["Weeks 3–4", "Content creation", ["Hooks, scripts and storytelling", "Design templates and brand consistency", "Captions and hashtags"]],
      ["Weeks 5–6", "Reels, TikTok & YouTube", ["Filming on a phone like a pro", "Editing short videos", "YouTube setup and thumbnails"]],
      ["Weeks 7–8", "Ads, community & reporting", ["Meta and TikTok ads basics", "Community management", "Analytics and client reporting"]],
    ],
  },
};

/* AI agent demo — each step lights a capability index (see .caps list order):
   0 Understand, 1 Automate, 2 Documents, 3 Analyze, 4 Workflows, 5 Connect tools, 6 Reports, 7 Assist */
window.NEXORA_AGENT = [
  {
    tab: "Monthly sales report",
    prompt: "Pull this month's orders, compare them with last month, and email a short summary to the sales team.",
    steps: [
      ["Understood: monthly comparison + email summary", "plan", 0],
      ["Read 1,284 orders from Sales.xlsx", "sheets", 2],
      ["Compared revenue, products and regions", "analysis", 3],
      ["Wrote a one-page report with charts", "docs", 6],
      ["Emailed summary to sales@ team", "email", 1],
    ],
    result: {
      title: "Sales summary — sent",
      points: ["Revenue up 18.4% vs last month", "Top product: Premium plan", "3 at-risk accounts flagged"],
      bars: [42, 55, 48, 63, 58, 77, 86],
    },
  },
  {
    tab: "Lead follow-up",
    prompt: "Reply to every new website lead within 5 minutes and book a call with the qualified ones.",
    steps: [
      ["Understood: respond, qualify, schedule", "plan", 0],
      ["Watched website form for new leads", "forms", 5],
      ["Scored 26 leads by budget and need", "analysis", 3],
      ["Sent personalised replies to all 26", "email", 7],
      ["Booked 9 calls and updated the CRM", "calendar", 4],
    ],
    result: {
      title: "Leads handled — 9 calls booked",
      points: ["Average reply time: 2 min", "9 qualified calls on calendar", "CRM updated automatically"],
      bars: [30, 46, 38, 52, 61, 58, 72],
    },
  },
  {
    tab: "Invoice processing",
    prompt: "Extract totals from this week's 42 PDF invoices, match them to purchase orders, and flag anything that doesn't add up.",
    steps: [
      ["Understood: extract, match, flag mismatches", "plan", 0],
      ["Read 42 PDF invoices", "docs", 2],
      ["Matched invoices to purchase orders", "erp", 5],
      ["Updated the accounts workflow", "workflow", 4],
      ["Generated exceptions report for finance", "report", 6],
    ],
    result: {
      title: "Invoices reconciled",
      points: ["39 matched automatically", "3 mismatches flagged for review", "About 6 hours of manual work saved"],
      bars: [88, 92, 90, 94, 93, 96, 97],
    },
  },
];
