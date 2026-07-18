// Generates sanity/real-content.ndjson from Dr Rohan Yashraj Gupta's real CV
// (sourced from github.com/RohanYashraj/rohanyashraj.github.io data files).
// Reuses existing document _ids so `sanity dataset import --replace` updates the
// placeholder seed in place. Preserves the uploaded profile photo asset ref.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

let k = 0;
const key = () => `k${(k += 1)}`;
const pt = (...paras) =>
  paras.map((text) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  }));
const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 90);
const year = (s) => (String(s).match(/\b(?:19|20)\d\d\b/) || [""])[0];

const PROFILE_IMAGE_REF =
  "image-9aa7782f47102cd2ab176367fd7253b622a22c18-600x600-png";

const docs = [];

// ── author (preserve — no image on author; photo lives on siteSettings) ──────
docs.push({
  _id: "author",
  _type: "author",
  name: "Dr Rohan Yashraj Gupta",
  credentials: "FIA, FIAI",
  roleTitle: "Actuarial Data Scientist, Accenture",
  email: "rohanyashraj@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/rohanyashraj",
    "https://github.com/RohanYashraj",
    "https://scholar.google.com/",
  ],
  bio: pt(
    "Dr Rohan Yashraj Gupta is a qualified General Insurance actuary (FIA, FIAI) and data scientist. He holds a PhD in Actuarial Science on fraud detection in insurance from the Sri Sathya Sai Institute of Higher Learning.",
    "Across nine years he has worked over health, crop, life and motor insurance — pricing, reserving, experience studies, and machine-learning fraud detection — most recently transitioning Excel raters to Python on the hyperexponential platform at Accenture. He has authored ten research papers and chapters and spoken at thirteen international conferences.",
  ),
});

// ── siteSettings (preserve photo + nav; update copy) ─────────────────────────
docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  siteTitle: "Rohan Yashraj Gupta",
  tagline: "Actuary · Data Scientist · Researcher",
  heroGreeting: "Hello, I'm",
  heroStatement:
    "I price risk, detect insurance fraud with machine learning, and build the models and platforms that put them into production.",
  profileImage: {
    _type: "image",
    alt: "Dr Rohan Yashraj Gupta",
    asset: { _type: "reference", _ref: PROFILE_IMAGE_REF },
  },
  marqueeItems: [
    "Rohan Yashraj Gupta",
    "Actuary & Data Scientist",
    "Fraud Detection",
    "Pricing",
    "Research",
    "2026",
  ],
  primaryCtaLabel: "Contact",
  secondaryCtaLabel: "Resume",
  navLinks: [
    { _key: key(), label: "Highlights", url: "/highlights" },
    { _key: key(), label: "Resume", url: "/resume" },
    { _key: key(), label: "Blog", url: "/blog" },
    { _key: key(), label: "Contact", url: "/contact" },
  ],
  socialLinks: [
    { _key: key(), platform: "linkedin", url: "https://www.linkedin.com/in/rohanyashraj" },
    { _key: key(), platform: "github", url: "https://github.com/RohanYashraj" },
    { _key: key(), platform: "scholar", url: "https://scholar.google.com/" },
    { _key: key(), platform: "email", url: "mailto:rohanyashraj@gmail.com" },
  ],
  footerNote: "Actuary · Data Scientist",
  seo: {
    metaTitle: "Dr Rohan Yashraj Gupta — Actuary & Data Scientist",
    metaDescription:
      "Qualified GI actuary (FIA, FIAI) and data scientist. PhD in Actuarial Science on insurance fraud detection. Pricing, machine learning, and research.",
  },
});

// ── stats ────────────────────────────────────────────────────────────────────
[
  ["stat-years", "Years of experience", 9, "+", 0],
  ["stat-workshops", "Projects completed", 6, undefined, 1],
  ["stat-talks", "Conference presentations", 13, undefined, 2],
  ["stat-papers", "Research publications", 10, undefined, 3],
].forEach(([_id, label, value, suffix, order]) =>
  docs.push({ _id, _type: "stat", label, value, suffix, order }),
);

// ── education ────────────────────────────────────────────────────────────────
docs.push({
  _id: "edu-phd",
  _type: "education",
  qualification: "Doctor of Philosophy (PhD)",
  institution: "Sri Sathya Sai Institute of Higher Learning (SSSIHL)",
  field: "Actuarial Science — fraud detection in insurance",
  start: "Jun 2017",
  end: "May 2021",
  note:
    "Thesis on fraud detection in motor and health insurance using actuarial and data-science techniques. Generated 450+ business rules and automated rule-generation with machine learning and data visualisation; built Python/R models on 100,000+ records achieving 95%+ accuracy. Presented at multiple conferences and published in journals.",
  order: 0,
});
docs.push({
  _id: "edu-masters",
  _type: "education",
  qualification: "MSc (Mathematics), specialisation in Actuarial Science",
  institution: "Sri Sathya Sai Institute of Higher Learning (SSSIHL)",
  field: "Mathematics & Actuarial Science",
  start: "Jun 2017",
  end: "Apr 2019",
  note: "Pursued actuarial science alongside a mathematics master's.",
  order: 1,
});

// ── experience ───────────────────────────────────────────────────────────────
const experience = [
  {
    _id: "exp-accenture",
    role: "Actuarial Data Scientist",
    org: "Accenture Solutions Pvt. Ltd.",
    location: "India",
    start: "Jul 2023",
    end: "Present",
    current: true,
    bullets: [
      "Lead the transition of Excel-based raters to Python solutions on the hyperexponential cloud platform for North America.",
      "Implemented Agile methodologies to optimise project management and team workflow.",
    ],
  },
  {
    _id: "exp-rsa",
    role: "Actuarial Data Science Consultant",
    org: "RSA Actuarial Services",
    location: "India",
    start: "Dec 2022",
    end: "Jun 2023",
    bullets: [
      "Built and deployed a machine-learning model to prioritise fraudulent cases, boosting the fraud application success rate by 20%.",
      "Ran a comprehensive Full-Time Equivalent (FTE) analysis to identify and recover previously neglected resource benefits.",
      "Authored SIRA-based business rules that cut potentially fraudulent applications by 70%.",
    ],
  },
  {
    _id: "exp-swissre",
    role: "Actuarial Analyst",
    org: "Swiss Re",
    location: "",
    start: "Jun 2021",
    end: "Dec 2022",
    bullets: [
      "Supported pricing and experience studies for 30+ quotes across L&H products (Life, CI, Disability, Hospitalisation).",
      "Performed impact testing on terms-of-trade assumptions for whole-of-life assurance products; monitored critical-illness capacity across 70+ quotes.",
      "Executed experience studies in R to derive A/E ratios, enabling cost revisions aligned with actual claims data.",
      "Developed R and Excel models for premium-trend analysis, L&H data visualisation and profit-commission insights.",
      "Collaborated with claims and underwriting on the launch of three new critical-illness products.",
      "Presented pricing strategies to team leads and clients, and delivered a technical talk on machine learning with decision trees.",
    ],
  },
  {
    _id: "exp-tech-consultant",
    role: "Actuarial Consultant",
    org: "Tech Actuarial",
    location: "",
    start: "Jun 2019",
    end: "Jun 2021",
    bullets: [
      "Performed claims analytics in Python & R for India's largest group-health scheme (Ayushman Bharat), analysing 200,000+ records; built an RShiny dashboard improving claims-management efficiency by 20% and reducing fraudulent claims by 5% during COVID-19.",
      "Automated daily crop-yield collection via Python web scraping (3M+ data points, ~90% faster) and built ARIMA models and a futures dashboard covering six crops and 12 scenarios.",
      "Priced four cancer-product packages across 28 Indian states and built a dashboard comparing L&H risk metrics over 100+ scenarios.",
      "Streamlined Defined Benefit pension valuations in Excel with a 10x runtime reduction.",
      "Authored 30+ consulting pitch presentations over two years.",
    ],
  },
  {
    _id: "exp-cas-intern",
    role: "Student Central Summer Internship",
    org: "Casualty Actuarial Society",
    location: "USA",
    start: "Jun 2020",
    end: "Aug 2020",
    bullets: [
      "Completed an intensive six-week P&C program covering data visualisation, pricing, reserving and predictive modelling.",
      "Delivered four projects using Cognalysis Multirate software; recognised as a 'CAS Spotlight Candidate'.",
    ],
  },
  {
    _id: "exp-tech-research",
    role: "Research Associate",
    org: "Tech Actuarial",
    location: "",
    start: "Jun 2017",
    end: "May 2019",
    bullets: [
      "Researched and developed fraud-detection frameworks for group-health insurance schemes.",
      "Integrated actuarial and data-science methodologies to enhance detection capabilities.",
    ],
  },
].map((e, i) => ({ _type: "experience", order: i, ...e }));
docs.push(...experience);

// ── milestones ───────────────────────────────────────────────────────────────
[
  ["ms-phd", "PhD in Actuarial Science", "2021", "Doctoral research on fraud detection in motor and health insurance at SSSIHL.", 0],
  ["ms-asa", "Associate, Society of Actuaries (ASA)", "2022", "", 1],
  ["ms-soa", "SOA research report published", "2024", "Interpretable machine-learning methods for health-insurance fraud detection, with the Society of Actuaries Research Institute.", 2],
  ["ms-fellow", "Fellowship — FIA & FIAI", "2024", "Qualified as a General Insurance actuary: Fellow of the IFoA (2024) and the Institute of Actuaries of India (2025).", 3],
  ["ms-talks", "13 international conference talks", "2025", "Invited speaker at CAS, IFoA, IAI, ASTIN and more.", 4],
].forEach(([_id, title, y, description, order]) =>
  docs.push({ _id, _type: "milestone", title, year: y, description, order }),
);

// ── skill groups ─────────────────────────────────────────────────────────────
[
  ["skill-actuarial", "Data Science & Actuarial", ["Qualified GI Actuary", "Predictive modelling", "Pricing & reserving", "Experience studies", "Technology transformation", "hyperexponential"], 0],
  ["skill-ai", "Technical", ["Python", "R", "SQL", "VBA / Excel", "Git / GitHub / GitLab", "Machine learning"], 1],
  ["skill-platforms", "Web apps & dashboards", ["RShiny", "Next.js / React", "Flask", "PowerBI"], 2],
  ["skill-speaking", "Communication & collaboration", ["Public speaking", "Stakeholder management", "Team collaboration"], 3],
].forEach(([_id, groupName, skills, order]) =>
  docs.push({ _id, _type: "skillGroup", groupName, skills, order }),
);

// ── credentials ──────────────────────────────────────────────────────────────
[
  ["cred-fia", "Fellow (FIA)", "Institute and Faculty of Actuaries", "2024", 0],
  ["cred-fiai", "Fellow (FIAI)", "Institute of Actuaries of India", "2025", 1],
  ["cred-asa", "Associate (ASA)", "Society of Actuaries", "2022", 2],
].forEach(([_id, name, issuer, y, order]) =>
  docs.push({ _id, _type: "credential", name, issuer, year: y, order }),
);

// ── publications (book + research papers + conference presentations) ──────────
const research = [
  ["Using Interpretable Machine Learning Methods: An Application to Health Insurance Fraud Detection", "Society of Actuaries Research Institute", "Jan 2024", "paper", "https://www.soa.org/resources/research-reports/2024/interpretable-ml-methods/"],
  ["Application of CART-Based Modeling in Motor Insurance Fraud", "Taylor & Francis", "Aug 2021", "chapter", "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003187059-17/application-cart-based-modeling-motor-insurance-fraud-rohan-yashraj-gupta-satya-sai-mudigonda-phani-krishna-kandala-pallav-kumar-baruah"],
  ["A Comparative Study of Various Machine Learning and Deep Learning Fraud-Detection Models for Universal Health Coverage Schemes", "Intl. Journal of Engineering Trends & Technology", "Feb 2021", "paper", "https://www.ijettjournal.org/Volume-69/Issue-3/IJETT-V69I3P216.pdf"],
  ["TGANs with Machine Learning Models in Automobile Insurance Fraud Detection and a Comparative Study with Other Data-Imbalance Techniques", "Intl. Journal of Recent Technology & Engineering", "Feb 2021", "paper", "https://www.researchgate.net/publication/349095432_TGANs_with_Machine_Learning_Models_in_Automobile_Insurance_Fraud_Detection_and_Comparative_Study_with_Other_Data_Imbalance_Techniques"],
  ["Implementation of Correlation and Regression Models for Health Insurance Fraud in a COVID-19 Environment using Actuarial and Data-Science Techniques", "Intl. Journal of Recent Technology & Engineering", "Sep 2020", "paper", "https://www.ijrte.org/wp-content/uploads/papers/v9i3/C4686099320.pdf"],
  ["Implementation of a Predictive Model for Fraud Detection in Motor Insurance using Gradient Boosting and Validation with Actuarial Models", "IEEE Xplore", "Aug 2020", "paper", "https://ieeexplore.ieee.org/document/9167733"],
  ["A Proposed Model for Measuring Protection of Policyholders' Interest at Industry Level", "IRDAI", "Dec 2019", "paper", "https://www.policyholder.gov.in/uploads/CEDocuments/December%202019.1.pdf"],
  ["Integrating Actuarial Models with Neural Networks for Building a Fraud-Detection Model for Automobile Insurance", "Journal of Emerging Technologies & Innovative Research", "Jun 2019", "paper", "https://www.jetir.org/papers/JETIR1908D44.pdf"],
  ["A Proposed Method with a Use Case to Facilitate the Decision of Implementing New Technology in Insurance Organisations to Improve Operational Efficiency", "Journal of Emerging Technologies & Innovative Research", "Jun 2019", "paper", "https://www.jetir.org/papers/JETIR1908D45.pdf"],
  ["A Framework for Comprehensive Fraud Management using Actuarial Techniques", "Intl. Journal of Scientific & Engineering Research", "Mar 2019", "paper", "https://www.citefactor.org/journal/pdf/A-Framework-for-Comprehensive-Fraud-Management-using-Actuarial-Techniques.pdf"],
];
const presentations = [
  ["Speaker, 24th Global Conference of Actuaries", "Institute of Actuaries of India · Mumbai", "Mar 2025"],
  ["Speaker, 2024 IFoA India Conference", "Institute and Faculty of Actuaries", "Dec 2024"],
  ["Speaker, 2024 CAS Teaching Summit for General Insurance", "Casualty Actuarial Society", "Oct 2024"],
  ["Speaker, 23rd Global Conference of Actuaries", "Institute of Actuaries of India · Mumbai", "Feb 2024"],
  ["Speaker, National Seminar 2024 — CADS, SSSIHL", "Sri Sathya Sai Institute of Higher Learning", "Feb 2024"],
  ["Speaker, International CAS Webinar Series 2023", "Casualty Actuarial Society", "Jun 2023"],
  ["Speaker, 22nd Global Conference of Actuaries", "Institute of Actuaries of India", "Mar 2023"],
  ["Speaker, 2022 ASTIN Actuarial Colloquia", "IAA & ASTIN", "Jun 2022"],
  ["Speaker, 2022 CANW Spring Meeting", "Casualty Actuarial Society · Seattle, USA", "May 2022"],
  ["Speaker, 2022 CAS Spring Meeting", "Casualty Actuarial Society · Florida, USA", "May 2022"],
  ["Speaker, 3rd Insurance Data Science Conference", "University of London", "Jun 2021"],
  ["Speaker, International Virtual Conference on Distributed Computing, Intelligence & Applications 2020", "Kalasalingam University", "Jun 2020"],
  ["Speaker, Kalasalingam Global Conference 2019", "Kalasalingam University", "Dec 2019"],
];

docs.push({
  _id: "pub-book",
  _type: "publication",
  title: "Agentic AI for Actuaries",
  venue: "ACTEX / ArchiMedia",
  year: "2026",
  type: "chapter",
  order: 0,
});
research.forEach(([title, venue, date, type, url], i) =>
  docs.push({
    _id: `pub-r${String(i + 1).padStart(2, "0")}`,
    _type: "publication",
    title,
    venue,
    year: year(date),
    type,
    url,
    order: i + 1,
  }),
);
presentations.forEach(([title, venue, date], i) =>
  docs.push({
    _id: `pub-p${String(i + 1).padStart(2, "0")}`,
    _type: "publication",
    title,
    venue,
    year: year(date),
    type: "presentation",
    order: 100 + i,
  }),
);

// ── highlights (from the 6 showcase projects) ────────────────────────────────
const highlights = [
  ["hl-book", "Interpretable ML for Insurance Fraud (SOA)", "research", "2024-01-15", true,
    "A framework for interpretable machine-learning algorithms for fraud detection in health insurance.",
    "This research delivers a framework for interpretable machine-learning tailored to fraud detection in health insurance. Machine-learning algorithms build intricate models by discerning patterns in data, but the risk of overfitting demands rigorous testing; this work brings transparency to the models that flag suspicious claims.",
    "https://www.soa.org/resources/research-reports/2024/interpretable-ml-methods/"],
  ["hl-conference", "ML + Business Rules for Fraud Detection (CAS)", "research", "2023-06-01", false,
    "Integrating machine-learning models with business-rule triggers to detect unusual patterns in health-insurance claims.",
    "Health-insurance fraud costs the industry billions annually. This work integrates machine-learning models with business-rule triggers to identify unusual claim patterns and flag them for investigation — a combination that improved performance across all models tested.",
    ""],
  ["hl-phd", "Insurance Fraud Classifier", "research", "2021-05-01", true,
    "A machine-learning model that assesses the probability of fraud in motor-insurance claims.",
    "Built as part of doctoral research, this robust fraud-detection model lets users assess the probability of fraud in motor-insurance claims, improving the accuracy and efficiency of fraud detection in the insurance domain.",
    ""],
  ["hl-pricing-platform", "Health Claims Analytics", "client", "2020-06-01", true,
    "Pricing, real-time claims analytics and fraud detection for a state health scheme covering ~800M people.",
    "In partnership with a P&C insurer in India, this two-person-year engagement designed a pricing methodology, a real-time claims-analytics dashboard and fraud detection for a state-level group-health scheme covering roughly 800 million people, with insights to optimise reinsurance capacity.",
    ""],
  ["hl-crop", "Crop Revenue Protection", "client", "2020-03-01", false,
    "A hedging mechanism protecting farmers' revenue from price fluctuations, with the Government of India.",
    "Working with a department of the Government of India, this two-person-year engagement designed a hedging mechanism to protect farmers' revenue against crop-price fluctuations.",
    ""],
  ["hl-teaching", "Cancer Pool Pricing", "client", "2021-03-01", false,
    "A medical-indemnity insurance solution for the Indian middle class, priced across cancer types, states and ages.",
    "This project developed a medical-indemnity insurance solution for the Indian middle class. Analysing cancer types, incidence rates and treatment costs, it produced an optimal pricing strategy and a dashboard showing premium, frequency and severity across options, states and age groups.",
    ""],
];
highlights.forEach(([_id, title, category, date, featured, summary, body, url]) =>
  docs.push({
    _id,
    _type: "highlight",
    title,
    slug: { _type: "slug", current: slug(title) },
    category,
    date,
    summary,
    featured,
    body: pt(body),
    ...(url ? { links: [{ _key: key(), label: "Read more", url }] } : {}),
  }),
);

const ndjson = docs.map((d) => JSON.stringify(d)).join("\n") + "\n";
const out = join(dirname(fileURLToPath(import.meta.url)), "..", "sanity", "real-content.ndjson");
writeFileSync(out, ndjson);
console.log(`Wrote ${docs.length} documents to sanity/real-content.ndjson`);
const counts = docs.reduce((m, d) => ((m[d._type] = (m[d._type] || 0) + 1), m), {});
console.log(counts);
