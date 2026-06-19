export default {
  nav: {
    brand: 'My Curriculum Vitae',
    links: [
      { name: 'About', id: 'about' },
      { name: 'Projects', id: 'projects' },
      { name: 'Skills', id: 'skills' },
      { name: 'Timeline', id: 'timeline' },
      { name: 'Contact', id: 'contact' },
    ],
  },

  hero: {
    role: 'Data Analyst & Fullstack Web Developer',
    tagline:
      'I build data-driven web experiences and intelligent dashboards that actually move metrics — not just look pretty.',
    cta: { viewWork: 'View Work', contact: 'Contact Me', downloadCV: 'Download CV' },
    social: { github: 'GitHub', linkedin: 'LinkedIn', email: 'Email' },
  },

  about: {
    header: 'About Me',
    bio: [
      `I'm a highly analytical and results-driven Computer Science professional, currently completing my B.Sc. with a <strong>3.19 / 4.0 GPA</strong> at Tanta University. I bridge <em>data analysis</em> and <em>full-stack web development</em> to solve real business problems.`,
      `In my recent Data Analyst role, I used NLP techniques to analyze over <strong>100K+ chatbot interactions</strong>, leading to a <strong>15% improvement</strong> in intent recognition. I also built Tableau dashboards that cut human agent escalations by <strong>10%</strong> and increased conversion rates by <strong>5%</strong>.`,
      `Beyond data, I've shipped production full-stack work. I've freelanced on <strong>4+ e-commerce builds</strong>, including: Grover (grocery web app), Al-Kheima (restaurant landing page), and SuitSupply (clothing store). I care about clean UI, fast performance, and measurable impact.`,
      `I thrive where product, data, and engineering overlap.`,
    ],
    stats: [
      {
        label: 'Education',
        main: 'B.Sc. Computer Science, Tanta University',
        sub: 'GPA 3.19 / 4.0',
      },
      {
        label: 'Data Impact',
        main: '100K+ chats cleaned and analyzed with NLP',
        sub: '+15% intent accuracy, -10% escalations',
      },
      {
        label: 'Product / Growth',
        main: "Curated 12+ Dashboards for Departments' both individual and conjoined Metrics",
        sub: 'performance tracking & action loops',
      },
      {
        label: 'Full-Stack Work',
        main: '5+ shipped E-commerce WebApps',
        sub: 'Sixteen Clothing / SuitSupply / Grover / Al-Kheima',
      },
    ],
    cta: { downloadCV: 'Download CV', contact: 'Contact Me' },
  },

  projects: {
    header: 'Featured Work',
    prev: 'Prev',
    next: 'Next',
    viewSite: 'View Site',
    viewCode: 'View Code',
    items: [
      {
        name: 'Emera Developments',
        desc: 'Professional website for a leading Egyptian construction and real estate company, featuring project showcases, company profile, and contact flows.',
        img: '/projects/emera-img.png',
        stack: ['Nuxt', 'Vue', 'TypeScript', 'TailwindCSS'],
        github: '',
        link: 'https://emera-developments.vercel.app',
      },
      {
        name: 'Clinic Management PWA',
        desc: 'Full-featured Progressive Web App built for El-Shorouk Health Office — managing patient records, appointments, and clinic operations with data persistence backed by PostgreSQL.',
        img: '/projects/clinic-img.png',
        stack: ['Nuxt', 'Vue', 'PostgreSQL'],
        github: '',
      },
      {
        name: 'Grover Grocery App',
        desc: 'Online grocery shopping experience with cart, auth, and real-time live availability.',
        img: '/projects/grover-img.jpg',
        stack: ['HTML', 'CSS Animations', 'Vanilla JS', 'SVG', 'Bootstrap'],
        github: 'https://github.com/Shaf3y01/Grover',
      },
      {
        name: 'SIXTEEN CLOTHING STORE',
        desc: 'Fully responsive storefront for teens and adults. Spiced with animations and transitions. Implemented with auth, cart, and checkout.',
        img: '/projects/sixteen-cs-img.png',
        stack: ['Vanilla JS', 'Owl Carousel', 'jQuery', 'HTML5', 'CSS Animations & Media Query'],
        github: 'https://github.com/Shaf3y01/Clothing-Store',
      },
      {
        name: 'Al-Kheima Restaurant',
        desc: 'High-conversion restaurant landing page and a form focused on testing Flexbox and responsive Media Queries.',
        img: '/projects/kheima-img.png',
        stack: ['Vanilla JS', 'CSS Flexbox', 'HTML5'],
        github: 'https://github.com/Shaf3y01/Al-Kheima',
      },
      {
        name: 'SuitSupply Store',
        desc: 'E-commerce storefront for suits apparel with filtering, variants, and checkout.',
        img: '/projects/suitsupply-img.png',
        stack: ['HTML5', 'CSS & Media Queries', 'Vanilla JS'],
        github: 'https://github.com/Shaf3y01/SuitSupply',
      },
      {
        name: 'M Power Gym',
        desc: 'Innovative gym landing page using CSS animations and Vanilla JS for smooth UI/UX.',
        img: '/projects/mpower-img.png',
        stack: ['HTML5', 'CSS Animations', 'Media Query', 'Vanilla JS'],
        github: 'https://github.com/Shaf3y01/MPowerGym',
      },
      {
        name: 'Company Sales Analysis',
        desc: 'Cleaned, transformed, and analyzed company data for sales insights and better future marketing strategies.',
        img: '/projects/power-bi-project-1.png',
        stack: ['Python', 'Power BI', 'Statistics'],
        github: 'https://github.com/Sha3fy01',
      },
      {
        name: 'NLP Support Insights',
        desc: 'Analyzed 100K+ chatbot messages with NLP to boost intent accuracy by 15% and cut escalations 10%.',
        img: 'https://placehold.co/600x400/FFFFFF/C8A2C8/png?text=DA',
        stack: ['Python', 'NLP', 'Tableau', 'SQL'],
        github: 'https://github.com/your-github/nlp-analytics',
      },
    ],
  },

  skills: {
    header: 'Skills & Stack',
    items: [
      {
        icon: 'mdi:laptop',
        title: 'Full-Stack Web Development',
        description:
          'I design and build complete user experiences - from landing pages and dashboards all the way to checkout flows and performance tuning.',
        bullets: [
          'Vue / Nuxt / TypeScript / Tailwind / Pinia',
          'Progressive Web Apps (PWA) — offline-first & installable',
          'PostgreSQL — relational data modeling & backend persistence',
          'Auth, cart, checkout, real-world product flows',
        ],
        ariaLabel: 'Full-stack web development skills',
      },
      {
        icon: 'mdi:chart-line',
        title: 'Data & Analytics',
        description:
          'I use data to drive product decisions and reduce friction across support and sales funnels.',
        bullets: [
          'NLP on 100K+ chatbot interactions (+15% intent accuracy)',
          'Cut escalations about 10 percent with Tableau dashboards',
          'PostgreSQL / SQL / Python / Tableau',
        ],
        ariaLabel: 'Data and analytics skills',
      },
      {
        icon: 'mdi:rocket-launch-outline',
        title: 'Shipping & Impact',
        description:
          'I build solutions that solve real problems and increase conversion, not just "look nice in a Dribbble shot."',
        bullets: [
          'High-converting restaurant landing page for Al-Kheima',
          'Grover grocery app with cart and live availability',
          'E-commerce storefront with variants and checkout',
        ],
        ariaLabel: 'Shipping and product impact skills',
      },
      {
        icon: 'mdi:account-school-outline',
        title: 'Mentoring & Teaching',
        description:
          'I teach coding and problem-solving to early learners and new developers, focusing on clarity, confidence, and mindset.',
        bullets: [
          'Designed beginner-friendly web dev curriculum for teens',
          'Trained logic using PRIMM (Predict + Run + Investigate + Modify + Make)',
          'Helped students move from "copy code" to "I can build this"',
        ],
        ariaLabel: 'Mentoring and teaching skills',
      },
    ],
  },

  timeline: {
    header: 'Experience & Timeline',
    items: [
      {
        title: 'Data Analyst (NLP / BI)',
        org: 'Product & Support Analytics @Maids.cc',
        date: 'Nov 2024 – May 2025',
        bullets: [
          'Spearheaded NLP analysis of 100K+ customer chatbot interactions, leading to a 15% lift in intent recognition accuracy and enhancing self-service resolution.',
          'Optimized chatbot flow and reporting capabilities, directly resulting in an 18% reduction in human agent escalations and driving a 6.5% increase in conversion rates via support channels.',
          'Designed and deployed 10+ interactive Tableau dashboards for Product, Operations, and Sales, establishing new KPIs for core business functions and improving data-driven decision-making.',
        ],
      },
      {
        title: 'Computer Science Mentor',
        org: 'iSchool / Techy School / STEM Zone',
        date: 'Aug 2023 – Nov 2024',
        bullets: [
          'Successfully utilized PRIMM to foster deep conceptual understanding and problem-solving skills, moving students beyond rote memorization to genuine coding proficiency.',
          'Proven ability to create a dynamic and student-centered learning environment where teens gain confidence by actively running and debugging existing code examples.',
          'Skilled at translating complex CS topics into relatable modules, empowering teens to build their own functional programs after carefully analyzing and adapting provided examples.',
        ],
      },
      {
        title: 'Networks Engineer, Summer Intern',
        org: "WE Telecoms, (Tanta, El-'Agizy)",
        date: 'Jul 26 – Sep 3, 2023',
        bullets: [
          'Successfully completed the intensive Cisco CCNA training program (200-301), mastering network fundamentals, IP connectivity, security concepts, and automation basics.',
          'Developed foundational knowledge in network automation and programmability by exploring Python scripting and interpreting basic JSON data structures, as covered in the CCNA curriculum.',
          'Demonstrated proficiency in monitoring and maintaining network performance by utilizing tools like Cisco Packet Tracer/EVE-NG and interpreting network utility outputs (e.g., ping, traceroute, syslog).',
        ],
      },
      {
        title: 'Full-Stack Web Developer (Freelance)',
        org: 'E-Commerce & Landing Pages',
        date: 'Aug 2022 – Present',
        bullets: [
          'Delivered 4+ production web builds (Grover grocery app, Al-Kheima restaurant landing, SuitSupply store).',
          'Built fast, conversion-focused UIs with Vue/Nuxt + Tailwind and integrated features like cart, checkout, and auth.',
        ],
      },
      {
        title: 'Full-Stack (Nuxt/Laravel) Web Development Diploma',
        org: 'AMIT',
        date: 'Mar 2022 – Aug 2022',
        bullets: [
          'Developed and maintained full-stack web applications by building dynamic, component-based user interfaces with Vue.js and powering them with a robust Laravel (PHP) backend.',
          'Managed application development and databases locally using the XAMPP environment (Apache, MySQL) before deployment.',
          'Graduated Cohort 61, Madinet Nasr.',
        ],
      },
      {
        title: 'B.Sc. Computer Science',
        org: 'Tanta University',
        date: 'Sep 2020 – Jun 2025',
        bullets: [
          'Current GPA: 3.19 / 4.0.',
          'Strong foundation in data analysis, software engineering, and problem solving.',
          '3rd in Top 5 Runners Graduation Project for 2024 Cohort.',
        ],
      },
    ],
  },

  contact: {
    header: "Let's Build Something",
    availability: 'Open to opportunities',
    workTypes: 'Freelance / Intern / Full-time',
    headline: 'Have a product idea, dashboard, or feature you want built?',
    body: 'I ship fast, data-driven web experiences. Whether you need a high-converting landing page, an e-commerce flow, or analytics that actually drive decisions, I can help.',
    cta: { email: 'Email Me', downloadCV: 'Download CV' },
    social: { github: 'GitHub', linkedin: 'LinkedIn', whatsapp: '+20 106 849 3655' },
  },
}
