/**
 * PORTFOLIO DATA SOURCE (Single Source of Truth)
 * ==============================================
 * This file centralizes all resume-related data for the portfolio.
 * 
 * TO UPDATE THIS FILE FOR FUTURE RESUME REVISIONS:
 * 1. Open this file (portfolio-data.js).
 * 2. Update the corresponding section below (personalInfo, education, experience, projects, technicalSkills).
 * 3. If a new resume PDF is provided, update `personalInfo.resumePdf` with the filename.
 * 4. The website will automatically render the updated content while keeping all design, animations,
 *    and styling 100% intact.
 */

const PORTFOLIO_DATA = {
  // 1. Personal & Profile Information
  personalInfo: {
    name: "Isha",
    title: "AI / ML Developer",
    profileImage: "profile.png",
    resumePdf: "resume_new.pdf",
    email: "ishavishwas2002@gmail.com",
    linkedin: "https://linkedin.com/in/isha-8a556b23a",
    github: "https://github.com/IshaVishwas",
    summary:
      "Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning, with experience in developing technology solutions, evaluating emerging tools, and translating ideas into practical applications. Strong understanding of AI/ML, software development, and product functionality, with an interest in product planning, requirement analysis, problem-solving, and cross-functional collaboration."
  },

  // 2. Academic Pathway (Chronological order: 10th -> 12th -> B.Tech)
  education: [
    {
      id: "secondary",
      tag: "10th Standard",
      tagIcon: "fa-solid fa-school",
      degree: "Secondary Education (10th)",
      institution: "St. Mary's School",
      board: "ICSE",
      score: "Percentage: 94.6%",
      duration: "2018 – 2019"
    },
    {
      id: "senior-secondary",
      tag: "12th Standard",
      tagIcon: "fa-solid fa-school",
      degree: "Senior Secondary Education (12th)",
      institution: "RAN Public School",
      board: "CBSE",
      score: "Percentage: 90%",
      duration: "2020 – 2021"
    },
    {
      id: "undergraduate",
      tag: "Undergraduate",
      tagIcon: "fa-solid fa-graduation-cap",
      degree: "B.Tech in Computer Science (Artificial Intelligence & Machine Learning)",
      institution: "UPES, Dehradun",
      board: "UPES",
      score: "CGPA: 8.7/10",
      duration: "August 2023 – Present"
    }
  ],

  // 3. Experience & Internships (Xebia first, then Arsalley)
  experience: [
    {
      id: "xebia",
      tag: "Internship",
      tagIcon: "fa-solid fa-briefcase",
      role: "AI & Technology Intern",
      company: "Xebia IT Architects",
      duration: "June 2026 – July 2026",
      bullets: [
        "Designed and prototyped web interfaces, translating UI concepts into responsive layouts using AI-assisted tools like Antigravity and Stitch.",
        "Evaluated emerging technology tools through weekly assessments, analyzing their functionality, usability, and potential applications in workflows."
      ],
      certificateUrl: "Xebia_Certificate.pdf"
    },
    {
      id: "arsalley",
      tag: "Internship",
      tagIcon: "fa-solid fa-briefcase",
      role: "Web Development Intern",
      company: "Arsalley",
      duration: "June 2025 – July 2025",
      bullets: [
        "Developed and tested 3+ web application modules using frontend and backend technologies.",
        "Identified and resolved 10+ software bugs, improving application performance and system reliability."
      ],
      certificateUrl: "Copy of completion letter Arsalley.pdf"
    }
  ],

  // 4. Featured Projects (Both projects from latest resume)
  projects: [
    {
      id: "deepfake-detection",
      title: "Deepfake Detection System",
      badge: "Multimodal AI",
      badgeIcon: "fa-solid fa-shield-halved",
      techStack: ["Python", "PyTorch", "OpenCV", "Librosa"],
      bullets: [
        "Developed a multimodal deep-learning system to detect deepfake content using facial images and voice signals.",
        "Implemented CNN-based analysis of manipulated facial frames and extracted 40+ audio features using Librosa.",
        "Combined predictions from audio and visual models for final classification."
      ]
    },
    {
      id: "context-compression",
      title: "Dynamic Context Compression Engine",
      badge: "LLM & RAG",
      badgeIcon: "fa-solid fa-layer-group",
      techStack: ["Python", "LangChain", "LangGraph", "Embeddings", "Vector Retrieval", "LLMs", "RAG"],
      bullets: [
        "Identified the challenge of managing long conversational contexts and developed an LLM-based solution using RAG, embeddings, and vector retrieval.",
        "Designed an adaptive compression pipeline using importance scoring, semantic similarity, and deduplication to reduce redundancy while preserving relevant information.",
        "Developed an end-to-end workflow covering retrieval, compression, context reconstruction, and memory updates to improve contextual information management."
      ]
    }
  ],

  // 5. Technical Skills (Exact categories and skills from latest resume)
  technicalSkills: [
    {
      category: "Product & Analytical Skills",
      icon: "fa-solid fa-chart-line",
      skills: [
        "Problem-Solving",
        "Requirement Analysis",
        "Product Evaluation",
        "Technical Documentation"
      ]
    },
    {
      category: "Programming",
      icon: "fa-solid fa-code",
      skills: [
        "Python",
        "C++"
      ]
    },
    {
      category: "AI/ML & Emerging Technologies",
      icon: "fa-solid fa-brain",
      skills: [
        "Machine Learning",
        "Deep Learning",
        "NLP",
        "RAG",
        "LLMs",
        "Computer Vision"
      ]
    },
    {
      category: "Frameworks & Tools",
      icon: "fa-solid fa-screwdriver-wrench",
      skills: [
        "FastAPI",
        "Django",
        "LangChain",
        "LangGraph",
        "PyTorch",
        "TensorFlow",
        "Git",
        "GitHub"
      ]
    },
    {
      category: "Databases",
      icon: "fa-solid fa-database",
      skills: [
        "SQL",
        "PostgreSQL",
        "ChromaDB"
      ]
    },
    {
      category: "Core Concepts",
      icon: "fa-solid fa-microchip",
      skills: [
        "Software Development Lifecycle",
        "Database Management Systems",
        "Object-Oriented Programming"
      ]
    }
  ]
};

// Export for browser and Node.js environments
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
