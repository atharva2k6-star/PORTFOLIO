/**
 * =============================================================================
 * NEXUS CYBERNETIC ARCHITECT - CONFIGURATION FILE
 * =============================================================================
 * Customized for Atharva Dharmadhikari:
 * Full-Stack Developer | AI & Data Analytics Specialist | Creative Visual Designer
 */

const PORTFOLIO_CONFIG = {
    // -------------------------------------------------------------------------
    // 1. PERSONAL IDENTIFICATION & HERO SECTION
    // -------------------------------------------------------------------------
    personal: {
        name: "Atharva Dharmadhikari",
        callsign: "AGENT PROFILE ID: 884-VX",
        authorizationStatus: "AUTHORIZED // LEVEL 5 ARCHITECT",
        systemVersion: "v4.09.26_CORE",
        osName: "PORTFOLIO",
        location: "SATARA / PUNE / REMOTE",
        sector: "SECTOR-07 [ASIA-SOUTH]",
        avatarImage: "assets/images/admin.jpg",
        logoImage: "assets/images/logo.jpg",

        // Dynamic typewriter headline cycling in the hero section
        typingTitles: [
            "FULL-STACK DEVELOPER",
            "AI & DATA ANALYTICS SPECIALIST",
            "CREATIVE VISUAL DESIGNER",
            "RAG & MULTIMODAL AI ARCHITECT"
        ],

        // Hero narrative summary
        bio: "I am a developer and designer passionate about building intelligent systems, data-driven applications, and immersive visual concepts. My work spans AI/ML architecture, full-stack software development, data analytics, and high-fidelity 3D/generative visual branding.",

        // Quick telemetry metrics shown on hero
        /* metrics: [
             { label: "// CORE_FOCUS", value: "AI + DEV", status: "VERIFIED" },
             { label: "// ARCHITECTURES", value: "4+ SYSTEMS", status: "ACTIVE" },
             { label: "// DIAGNOSTIC_ACC", value: "98.4%", status: "OPTIMIZED" },
             { label: "// CLEARANCE", value: "LEVEL 5", status: "AUTHORIZED" }
         ],*/

        // Detail specification box on profile card
        specs: [
            { label: "CORE LANGUAGES:", value: "C++, Java, JavaScript, Python" },
            { label: "AI ARCHITECTURE & RAG:", value: "Claude API, MCP, Multimodal Models" },
            { label: "DATA & ANALYTICS:", value: "Power BI, SQL, Quantitative Models" },
            { label: "CREATIVE & 3D:", value: "Generative AI, Spatial/AR Visuals", highlight: true }
        ]
    },

    // -------------------------------------------------------------------------
    // 2. THEMES & COLOR PALETTES
    // -------------------------------------------------------------------------
    themes: [
        { id: "cyan", name: "Neon Cyan", primary: "#00f0ff", rgb: "0, 240, 255", accent: "#0077ff" },
        { id: "magenta", name: "Cyber Magenta", primary: "#ff0055", rgb: "255, 0, 85", accent: "#ff00bb" },
        { id: "green", name: "Matrix Green", primary: "#00ff66", rgb: "0, 255, 102", accent: "#00cc44" },
        { id: "gold", name: "Solar Gold", primary: "#ffb700", rgb: "255, 183, 0", accent: "#ff7700" },
        { id: "purple", name: "Electric Violet", primary: "#b026ff", rgb: "176, 38, 255", accent: "#7b00ff" }
    ],

    // -------------------------------------------------------------------------
    // 3. SKILLS & TECHNICAL CAPABILITIES MATRIX
    // -------------------------------------------------------------------------
    skills: [
        {
            category: "SOFTWARE & AI ENGINEERING",
            subtitle: "LANGUAGES, ALGORITHMS & RAG ARCHITECTURES",
            icon: "fa-solid fa-brain",
            accentColor: "cyan",
            items: [
                { name: "C++ & Java (Collections, Algorithms)", level: 94 },
                { name: "Claude API (Context Caching, Tool Use)", level: 92 },
                { name: "Model Context Protocol (MCP) & RAG", level: 95 },
                { name: "Multimodal AI & Deep Learning Models", level: 90 },
                { name: "JavaScript (ES6+) & HTML5/CSS3", level: 93 },
                { name: "SQL, Schema Design & Firebase / REST APIs", level: 91 }
            ]
        },
        {
            category: "DATA ANALYTICS & VISUALIZATION",
            subtitle: "QUANTITATIVE ANALYSIS & BUSINESS INTELLIGENCE",
            icon: "fa-solid fa-chart-line",
            accentColor: "purple",
            items: [
                { name: "Power BI Interactive Dashboards", level: 94 },
                { name: "CSV Data Cleaning & Preprocessing", level: 96 },
                { name: "Trend Analysis & Quantitative Classification", level: 91 },
                { name: "Multi-Line & Complex Sales Analytics", level: 89 },
                { name: "Statistical Modeling & Predictive Metrics", level: 87 }
            ]
        },
        {
            category: "DIGITAL DESIGN & VISUAL PRODUCTION",
            subtitle: "3D CONCEPTS & GENERATIVE BRANDING",
            icon: "fa-solid fa-wand-magic-sparkles",
            accentColor: "emerald",
            items: [
                { name: "Generative AI Prompting (Midjourney/Flux/Gemini)", level: 97 },
                { name: "3D Product Concepts & Spatial/AR Visuals", level: 92 },
                { name: "Brand Identity Systems & Visual Strategy", level: 95 },
                { name: "Animated Brand Reveals & Corporate Renders", level: 93 },
                { name: "Visual Storytelling & Creative Direction", level: 94 }
            ]
        }
    ],

    // -------------------------------------------------------------------------
    // 4. DEPLOYED PROJECT ARCHITECTURES (PROJECT VAULT)
    // -------------------------------------------------------------------------
    projectCategories: [
        { id: "all", label: "ALL_SYSTEMS" },
        { id: "ai", label: "AI & HEALTHCARE" },
        { id: "software", label: "SOFTWARE & APPS" },
        { id: "design", label: "3D & BRANDING" }
    ],
    projects: [
        {
            id: "SYS_01",
            category: "ai",
            badge: "// HEALTHCARE AI & COMPUTER VISION",
            title: "Diabetic Retinopathy Screening AI",
            description: "Developed a specialized AI-driven referral model for diabetic retinopathy screening. Executed performance benchmarks and comparative analyses against existing state-of-the-art frameworks (such as MadhuNetrAI) to optimize diagnostic reliability and accuracy.",
            image: "assets/images/project-retinopathy.jpg",
            tags: ["Python", "Deep Learning", "Multimodal AI", "Data Analysis", "Medical CV"],
            liveUrl: "#",
            githubUrl: "#",
            highlightColor: "cyan"
        },
        {
            id: "SYS_02",
            category: "software",
            badge: "// FULL-STACK & DESKTOP ARCHITECTURE",
            title: "Student Management & Attendance Tracking System",
            description: "Built a robust management system to track student records, record attendance, manage duplicates efficiently, and provide structured search and query functionality.",
            image: "assets/images/project-student-sys.jpg",
            tags: ["Java", "TreeSet & Collections", "Data Structures", "UI Development", "SQL"],
            liveUrl: "#",
            githubUrl: "#",
            highlightColor: "pink"
        },
        {
            id: "SYS_03",
            category: "design",
            badge: "// BRAND IDENTITY & AUTOMOTIVE RETAIL",
            title: "Gaurai Motors — Brand Identity & Visual Strategy",
            description: "Designed modern visual branding and promotional specifications for an authorized Tata Motors dealership and service hub in Pusad, Maharashtra, including tagline development ('The Journey Begins Here') and digital marketing concepts.",
            image: "assets/images/GM.jpg",
            tags: ["Brand Identity Systems", "Tata Motors Dealership", "Graphic Design", "Visual Storytelling"],
            liveUrl: "#",
            githubUrl: "#",
            highlightColor: "emerald"
        },
        {
            id: "SYS_04",
            category: "design",
            badge: "// 3D RENDERING & SPATIAL/AR CONCEPTS",
            title: "Dharmadhikari Nath Empire — 3D & AR Visual Reveal",
            description: "Engineered high-fidelity 3D visual concepts, corporate signage renders, and animated brand reveal prompts featuring traditional Maharashtrian jewelry elements.",
            image: "assets/images/DNE.jpg",
            tags: ["Generative AI Pipelines", "3D Rendering Concepts", "Spatial / AR Design", "Jewelry Visuals"],
            liveUrl: "#",
            githubUrl: "#",
            highlightColor: "cyan"
        }
    ],

    // -------------------------------------------------------------------------
    // 5. TIMELINE / SYSTEM LOGS
    // -------------------------------------------------------------------------
    timeline: [
        {
            period: "COMPLETED",
            role: "AI & SOFTWARE ARCHITECT",
            organization: "RESEARCH & DEVELOPMENT MATRIX",
            details: "Engineering multimodal AI referral pipelines, Claude API integration with MCP and RAG, and high-fidelity 3D spatial branding concepts.",
            status: "CURRENT NODE"
        },
        {
            period: "COMPLETED",
            role: "FULL-STACK & ANALYTICS DEVELOPER",
            organization: "SYSTEMS & ENTERPRISE PROJECTS",
            details: "Architected desktop student management systems with optimized Java Collections, and developed Power BI sales analytics dashboards.",
            status: "COMPLETED"
        },
        {
            period: "COMPLETED",
            role: "BRAND STRATEGIST & CREATIVE DESIGNER",
            organization: "GAURAI MOTORS & DHARMADHIKARI EMPIRE",
            details: "Crafted comprehensive brand identity systems, 3D promotional renders, and digital marketing strategies for authorized commercial hubs.",
            status: "MILESTONE"
        }
    ],

    // -------------------------------------------------------------------------
    // 6. INTERACTIVE CLI TERMINAL SETUP
    // -------------------------------------------------------------------------
    terminal: {
        promptUser: "atharva@nexus",
        promptPath: "~$",
        welcomeMessage: [
            "NEXUS OS CLI VERSION 4.09.26 [ATHARVA DHARMADHIKARI CORE]",
            "Systems operational: AI / Full-Stack / Data Analytics / Visual Design.",
            "Type 'help' to review authorized system commands."
        ],
        commands: {
            help: `AVAILABLE COMMANDS:
  help            - Displays list of system commands
  skills          - Prints technical competency matrix (AI, Full-Stack, Analytics, 3D)
  projects        - Lists deployed architectures in the vault
  contact         - Displays transmission coordinates and links
  timeline        - Views career and project history log files
  whoami          - Displays current operator profile
  matrix [on/off] - Launches Matrix holographic code rain mode
  stop            - Stops active Matrix code rain simulation (or 'matrix stop')
  theme <id>      - Switches color theme (cyan, magenta, green, gold, purple)
  audio           - Toggles SFX sound on / off
  scan            - Runs real-time telemetry diagnostics HUD
  clear           - Clears terminal output screen
  sudo <cmd>      - Attempts root execution`,

            whoami: "OPERATOR: ATHARVA DHARMADHIKARI | SPECIALTY: Full-Stack Dev, AI/RAG & Visual Designer | ACCESS: LEVEL 5 ARCHITECT",

            skills: `[TECHNICAL COMPETENCY MATRIX]
>> SOFTWARE & AI ENGINEERING:
   • C++ & Java (Collections, Algorithms), JavaScript (ES6+), HTML5/CSS3
   • Claude API (Context Caching, Tool Use), Model Context Protocol (MCP)
   • Retrieval-Augmented Generation (RAG) & Multimodal AI Models
   • SQL, Database Schema Design, Firebase / REST APIs
>> DATA ANALYTICS & VISUALIZATION:
   • Power BI Interactive Dashboards & CSV Preprocessing
   • Trend Analysis, Quantitative Data Classification, Sales Analytics
>> DIGITAL DESIGN & VISUAL PRODUCTION:
   • Generative AI Prompting (Midjourney/Flux/Gemini Models)
   • 3D Product Concepts, Spatial/AR Visuals & Brand Reveal Systems`,

            projects: `[FEATURED PROJECT ARCHITECTURES]
01. Reliability-Aware Multimodal Referral System [Python, Deep Learning, Medical CV]
02. Student Management & Attendance Tracking System [Java, TreeSet, Collections, UI]
03. Gaurai Motors — Brand Identity & Visual Strategy [Tata Motors Dealership Branding]
04. Dharmadhikari Nath Empire — 3D & AR Visual Reveal [Generative AI, 3D Jewelry AR]`,

            contact: `[TRANSMISSION LINKS]
> Operator     : Atharva Dharmadhikari
> Domains      : Full-Stack Developer | AI & Data Analytics | Creative Visual Designer
> Location     : Satara / Remote // Sector-07 [Asia-South]
> Encryption   : RSA-4096 / GPG Authorized`,

            specs: `[SYSTEM SPECIFICATIONS]
> Host Kernel  : NexusCore-Atharva v4.09-darwin-arm64
> Architecture : Multimodal Neural Engine & Full-Stack Core
> Memory State : 16 GB LPDDR5
> Core Status  : All neural & development nodes operational (NOMINAL)`
        }
    },

    // -------------------------------------------------------------------------
    // 7. CONTACT & SOCIAL NETWORKS
    // -------------------------------------------------------------------------
    contact: {
        email: "atharvadharmadhikari80@gmail.com",
        location: "Pune/ Satara / Remote",
        statusMessage: "Transmissions are queued and answered promptly.",
        copyright: "2026 - ATHARVA DHARMADHIKARI - All Rights Reserved",
        socials: [
            { name: "GitHub", icon: "fa-brands fa-github", url: "https://github.com/atharva2k6-star" },
            { name: "LinkedIn", icon: "fa-brands fa-linkedin", url: "https://www.linkedin.com/in/atharva-dharmadhikari-352538316?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
            //{ name: "X / Twitter", icon: "fa-brands fa-x-twitter", url: "https://x.com/atharvadharmadhikari" },
            { name: "Discord", icon: "fa-brands fa-discord", url: "https://discord.com/users/1530486638969487471" },
            { name: "Instagram", icon: "fa-brands fa-instagram", url: "https://www.instagram.com/ath_arva0624?stkn=cmZkZnVhM2Nnc2xl" }
        ]
    }
};

// Export to window so it is accessible in all modules
if (typeof window !== 'undefined') {
    window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
}
