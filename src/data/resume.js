/*
 ** Sourced from Harsh's resume — kept as data so the About page and Footer
 ** stay easy to update without touching component markup.
 */

export const PROFILE = {
  name: "Harsh Maurya",
  role: "Full-Stack Developer & DSA Enthusiast",
  email: "harsh46785@gmail.com",
  phone: "+91 9598658319",
  location: "Noida, India",
  github: "https://github.com/harshbhu1",
  linkedin: "https://www.linkedin.com/in/harsh-maurya-139069237",
  about:
    "Final-year B.Tech (Information Technology) student at H.B.T.U Kanpur, and a full-stack " +
    "web development & DSA enthusiast who enjoys turning rough ideas into working products.",
};

export const TECH_STACK = [
  "HTML",
  "CSS",
  "JavaScript",
  "Node.js",
  "MongoDB",
  "Git & GitHub",
  "Robotics",
  "C++",
  "Data Structures & Algorithms",
  "Python",
  "SQL",
];

export const FRAMEWORKS = ["React.js", "Express.js", "Tailwind CSS", "ROS (Humble)"];

export const LANGUAGES = [
  { name: "Hindi", level: "Native" },
  { name: "English", level: "Fluent" },
];

export const CERTIFICATIONS = [
  "Frontend Development — React",
  "Backend Development — Node.js",
  "Python",
];

/** Shown as plain badges, not links — the resume names these platforms but no profile URL. */
export const CODING_PROFILES = ["LeetCode", "GeeksforGeeks", "CodeChef"];

/**
 * `start`/`end` are YYYYMM integers (null end = ongoing) so the timeline can
 * sort correctly without parsing free-text date ranges at render time.
 */
export const TIMELINE = [
  {
    category: "education",
    title: "Intermediate (12th)",
    org: "S.N. Inter College",
    period: "2017 — 2019",
    location: "Ambedkar Nagar, U.P., India",
    start: 201701,
    end: 201906,
    bullets: ["Scored 79.4%"],
  },
  {
    category: "education",
    title: "B.Tech, Information Technology",
    org: "H.B.T.U Kanpur",
    period: "2021 — Present",
    location: "Kanpur, India",
    start: 202107,
    end: null,
    bullets: ["CGPA: 8.30"],
  },
  {
    category: "co-curricular",
    title: "Web Development Team Member",
    org: "Aagaz (Sports Fest), H.B.T.U Kanpur",
    period: "Mar 2022 — Present",
    location: "Kanpur, India",
    start: 202203,
    end: null,
    bullets: [],
  },
  {
    category: "projects",
    title: "Fast-Food Shop",
    org: "Personal project",
    period: "Apr 2023 — Jun 2023",
    location: "",
    start: 202304,
    end: 202306,
    bullets: ["Full-stack food-ordering webapp — React, Tailwind CSS, Express.js, MongoDB."],
  },
  {
    category: "co-curricular",
    title: "Member",
    org: "Yoga Sub Council, H.B.T.U Kanpur",
    period: "Apr 2023 — Present",
    location: "Kanpur, India",
    start: 202304,
    end: null,
    bullets: [],
  },
  {
    category: "projects",
    title: "Next Tour Place Picker",
    org: "Personal project",
    period: "Aug 2023 — Sep 2023",
    location: "",
    start: 202308,
    end: 202309,
    bullets: ["Recommends the nearest tourist spot based on the user's location — React, Tailwind CSS."],
  },
  {
    category: "experience",
    title: "Full-Stack Developer Intern",
    org: "Testflow",
    period: "Jun 2024 — Aug 2024",
    location: "Remote",
    start: 202406,
    end: 202408,
    bullets: [
      "Shipped features with React, Tailwind CSS, Express.js, and MongoDB.",
      "Worked across teams, sharpening communication and problem-solving on real deliverables.",
    ],
  },
];
