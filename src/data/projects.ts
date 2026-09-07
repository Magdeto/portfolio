export interface Project {
  slug: string
  title: string
  tags: string
  year: string
  placeholder: string
  coverImage?: string
}

export interface Subsection {
  subtitle?: string
  subtitleSecondary?: string
  subtitleBody?: string
  subtitleBullets?: string[]

}

export interface CaseSection {
  label: string
  body: string
  sectionImage?: string
  subsections?: Subsection[]
  personas?: Persona[]
  personaColor?: string
  FindingColor?: string
  highlight?: string
  findings?: Finding[]
}

export interface Persona {
  name: string
  meta: string
  description: string
  image?: string
}

export interface Finding {
  number: string
  title: string
  body: string
}

export interface CaseScreen {
  title: string
  text: string
  placeholder: string
  image?: string // 
}

export interface CaseStudyData {
  heroLabels: string[]
  heroTitle: string
  role: string
  team: string
  year: string
  intro: string[]
  coverImage?: string
  showcaseImage?: string
  sections: CaseSection[]
  screens?: CaseScreen[]
  bullets: string[]
  galleryImages?: string[]

}

// ─────────────────────────────────────────────
// PROJECT LIST  (carousel + routing)
// ─────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: 'gen-ai-efteling',
    title: 'Gen-AI for Efteling',
    tags: 'Frontend · UX/UI · Gen-AI',
    year: '2024',
    placeholder: 'Efteling cover',
    coverImage: '/images/efteling-final.png',
  },
  {
    slug: 'art-detective',
    title: 'Art Detective',
    tags: 'UX/UI · iOS Design',
    year: '2025',
    placeholder: 'Art Detective cover',
    coverImage: '/images/art-detective-final.png',
  },
  {
    slug: 'vr-learning',
    title: 'Multiplayer VR Learning',
    tags: 'Game Design · Prototyping · Virtual Reality',
    year: '2026',
    placeholder: 'VR Learning Cover',
    coverImage: '/images/VR-Cover.png'
  },
  {
    slug: 'data-visualization',
    title: 'Interactive Data Visualization',
    tags: 'UX Design · Data Viz',
    year: '2023',
    placeholder: 'Data Viz cover',
    coverImage: '/images/trend-radar-final.png',
  },
]

// ─────────────────────────────────────────────
// CASE STUDY CONTENT
// ─────────────────────────────────────────────

export const caseStudyData: Record<string, CaseStudyData> = {

  // ── Gen-AI for Efteling ──────────────────────────────────────────────────
  'gen-ai-efteling': {
    heroLabels: ['UX Research', 'UX Design', 'UI Design'],
    heroTitle: 'Gen-AI Storytelling for Efteling',
    role: 'UX Research and Design',
    team: 'Back-end engineer, front-end programmer, in collaboration with Mach8 + Livewall for Efteling',
    year: '2024',
    coverImage: '',
    showcaseImage: '/images/efteling-final.png',
    intro: [
      'An interactive web application targeting children 4–6 years-old to generate their own stories and personalize the story narrative. Backed up with research and numerous user tests, the final product was an intuitive and accessible design, aligning with the target audience literacy and cognitive levels.',
      "Interface which implements VoiceOver feature, Voice Recognition and optimized button hit-areas tailored to a child's motor abilities.",
    ],
    sections: [
      {
        label: 'Context',
        highlight: 'How do you build something a 4-6 year old can use completely on their own?',
        body: 'Efteling wanted an AI-powered storytelling experience, but the real design challenge was not the AI. It was designing for a user who cannot type, has a short attention span, and is still developing fine motor skills.',
      },
      {
        label: 'Research',
        body: 'We ran interviews with both out primary and secondary target audiences - children and parents - to understand what exactly kids do on their phones, what is their screentime limit (if such) generally understand the interaction model of a child with their phone. As a result, I built an empathy map to get past assumptions. Two findings drove the whole design direction:',
        
        subsections: [
          {
          subtitle: 'Literacy levels',
          subtitleBody: 'Kids in this age group can\'t reliably type, so any product asking them to type would fail before it started',
          },
          {
          subtitle: 'Benchmark',
          subtitleBody: 'Existing kids\' apps that worked shared four things: dead-simple navigation, oversized touch targets, voice-over narration, and unmistakable feedback when something\'s tapped',
          },
        ],
      },
      {
        label: 'Process',
        body: 'Started with paper sketches, close to a ChatGPT-style interface. Client feedback changed the direction fast: if the child is the actual user, not the parent, the product can\'t rely on typing at all. That single constraint pushed Speech-to-Text from a nice-to-have into the core interaction.',
      },
      {
        label: 'Outcome',
        body: 'Final prototype went to client pitch, followed by an advisory report covering WCAG accessibility alignment and GDPR data considerations, work I led on the research side.'      },
    ],
    screens: [
      {
        title: 'Home Screen',
        text: 'Replace with screen description.',
        placeholder: 'Efteling — Screen 1',
        image: '/images/openingScreen.png',
      },
      {
        title: 'Character Selection',
        text: 'Choose main character to be the main protagonist',
        placeholder: 'Efteling — Screen 2',
        image: '/images/chooseCharacter.png'
      },
      {
        title: 'Speak to the character',
        text: 'Speach-to-Text recognition alloowing voice dictation .',
        placeholder: 'Efteling — Screen 3',
        image: '/images/speakCharacter.png',
      },
      {
        title: 'Parental Control',
        text: 'Replace with screen description.',
        placeholder: 'Efteling — Screen 4',
        image: '/images/parentControl.png'
      },
    ],
    bullets: [
      'Voice-over added to read stories aloud',
      'Text input field removed entirely',
      'Speech-to-Text became the primary input method',
    ],
  },

  // ── Art Detective ────────────────────────────────────────────────────────
  'art-detective': {
    heroLabels: ['UX/UI', 'iOS Design/Development'],
    heroTitle: 'Art Detective',
    role: 'UX/UI Design & iOS Design and Development',
    team: 'Duo Project',
    year: '2024',
    coverImage: '/images/art-detective-final.png',
    showcaseImage: '/images/art-detective-final.png',
    intro: [
      'Designed to engage adolescents and bridging the gap of art history knowledge by adopting familiarity with social-media-like experiences. Designed and coded in Duo.',
    ],
    sections: [
      {
        label: 'Context',
        highlight: 'Learn about artworks using image recognition - essentially Shazam for art. ',
        body: 'Assigned as a short sprint project. The task: design a mobile iOS app that lets users identify and learn about art. A 2-week rapid sprint covering brainstorming, prototyping, and development. The goal was a working core concept, no add-on features. The result: Rijksmuseum Art Detective. Designed for adolescents, specifically to bridge the gap in art history knowledge by making museum exploration feel like a social-media experience they are already familiar with. The app is built for use in crowded spaces like museum floors, so speed and simplicity mattered more than depth',
      },
      {
        label: 'Research',
        body: 'Mapped the competitive landscape, including AR/VR apps, virtual museum tours, and web-based applications, to identify gaps and overlaps. In parallel, ran "How Might We" workshops to reframe the problem around technical constraints, legal considerations, and creative direction.',
        subsections: 
        [
          {
          subtitleSecondary: 'How Might We...',
          },
        ],
         findings: [
          {
          number: '01',
          title: 'Create an image recognition tool and method can we use?', 
          body:'Integrate Google image recognition API to detect the artwork.',
        },
          {
          number: '02',
          title: 'Keep our users curious when scanning an artwork?', 
          body:'Add visual effects to the painting as an overlay or \"Did you know..?\" pop-ups. Overlay the artwork\'s original setting fresco in it\'s historic context using AR',
        },
        {
          number: '03',
          title: 'Protect users\' privacy?', 
          body:'Integrate Google image recognition API to detect the artwork.',
        },
      ],
      FindingColor: '#f3ead5'
      },
      {
        label: 'Process',
        body: 'Started with sketches and lo-fi wireframes to lock the basic layout before development. Once the structure was solidified, I moved into visual design.',
        sectionImage: '/images/ArtDetectiveLoFi.png'
      },
      {
        label: 'Outcome / Reflection',
        body: 'Shipped a working MVP with three core screens: Homescreen, Scanner, and an info overlay for the scanned artwork. Tested with university students with no navigation issues found. The concept held up well as a proof-of-concept. With more time, I\'d push the social-media angle further, something like a face-swap feature layered onto scanned artworks, turning a museum visit into something you experience and share with a friend in real time, rather than a solo scan-and-read loop.',
      },
    ],
    screens: [
      {
        title: 'Welcome Screen',
        text: 'General overview about the painting includign Year, Artist and Title.',
        placeholder: 'Art Detective — Screen 1',
        image: '/images/WelcomeScreen.png'
      },
      {
        title: 'Home Screen',
        text: 'Home Screen with highlighed artists and instand Call-To-Action button to scan and personalized Welcome message',
        placeholder: 'Art Detective — Screen 2',
        image: '/images/Homescreen.png'
      },
      {
        title: 'Scan in progress',
        text: 'Scanner screen with bouding box as a cue.',
        placeholder: 'Art Detective — Screen 3',
        image: '/images/Scanner.png'
      },
      {
        title: 'Overlay Opened',
        text: 'General overview about the painting includign Year, Artist and Title.',
        placeholder: 'Art Detective — Screen 4',
        image: '/images/overlay.png'
      },
    ],
    bullets: [
    ],
  },

  // ── Multiplayer VR Learning ──────────────────────────────────────────────
  'vr-learning': {
    heroLabels: ['User Research', 'Prototyping', 'Virtual Reality'],
    heroTitle: 'Multiplayer VR Learning on the Construction Site',
    role: 'User Experience Design and UX Research',
    team: 'Back-end and Full-Stack Engineers, in collaboration with Heijmans.',
    showcaseImage: '/images/HeijmansDemo (2).png',
    year: '2026',
    intro: [
      'A project focused on fostering on-time, safe and mutual communication between construction workers on site. The task sounded simple: "How can we stimulate speaking up to prevent accidents...but in VR.',
    ],
    sections: [
      {
        label: 'Context',
        highlight: 'Communication is important on the jobsite, especially for preventing dangerous accidents from happening.',
        body: 'But communication within the team is difficult, especially with cultural differences. This may relate to hierarchy, uncertainty, social pressure or simply a lack of practice. This project is used as a proof-of-concept to test if there is a way to encourage coworkers to communicate despite those hurdles.',
      },
      {
        label: 'Research',
        body: 'Started from a behavioral research report on Dutch and international construction workers (CBS, TNO, Bouwend Nederland), which gave me early insight on motivation, risk attitude, digital literacy, and hierarchy across worker types. Validated those hypotheses with an expert interview with a safety coordinator at Heijmans. He confirmed: subcontractors feel disconnected from the core team, fear of being called a "zeikerd" (crybabies) stops people from speaking up\, language barriers with foreign workers are a live problem, and how you address someone changes whether safety messaging actually lands.Combined both inputs into three personas:',
        subsections: [
          {
          subtitleSecondary: 'target personas',
          subtitleBody: 'Jan de Vries - veteran Dutch foreman, 47, direct Heijmans employee, informal norm-setter on site \n Daan Visser - Dutch newcomer, 22, 4 months in, MBO Bouw background, mirrors senior behavior to earn acceptance \n ',
          },
        ],
        personas: [
        {
          name: 'Jan de Vries',
          meta: '47 · veteran Dutch foreman · direct employee',
          description: 'Values safety deeply but rationalizes risk through experience - "nothing has gone wrong yet" becomes a mental shortcut of its own.',
          image: '/images/JanPersona.png',
        },
        {
          name: 'Bogdan Ivanov',
          meta: '34 · General Worker · International subcontractor',
          description: 'Higher power-distance background means he rarely questions a supervisor\'s decision. Language barriers in the VR interface are a real obstacle',
          image: '/images/BogdanPerson.png',
        },
        {
          name: 'Daan Visser',
          meta: '34 · Newcomer · Direct employee',
          description: 'Team loyalty vs. speaking up - wants to flag unsafe situations but fears looking weak, inexperienced, or disloyal to the crew.',
          image: '/images/DaanPersona.png',

        },
      ],
      },
      {
  label: 'Research Questions',
  body: '',
  subsections: [
    {
      subtitle: "What factors influence construction workers' willingness to speak up on a construction site?",
      subtitleBody: 'Construction workers’ willingness to speak up is shaped by psychological safety, workplace hierarchy, team culture, communication quality, time pressure, leadership, and safety awareness. Workers are more likely to intervene when they feel supported, trust their supervisors, and can practise proactive communication in a safe environment.'
    },
    {subtitle: 'How are the safety issues currently addressed on the Heijmans sites vs. competitor\'s sites?', 
      subtitleBody: 'Heijmans addresses safety through its GO! programme, which combines a mobile reporting app, pre-task risk self-checks (LMRA), daily safety conversations supported by GO! Coaches, and a three-step card system for unsafe behaviour. More broadly, construction companies use clear safety rules, reporting processes, accountability measures, emergency-response requirements, and the involvement of workers and subcontractors to build a proactive safety culture.',
    },
    {
      subtitle: 'How can different accidents happen on a construction site?',
      subtitleBody: 'Construction site accidents often result from a combination of human error, unsafe conditions, poor communication, and inadequate safety management. These factors can lead to falls, equipment and maintenance incidents, highlighting the need for clearer communication and more effective safety training, including VR-based learning.',
    },
  ]
},

  
      {
        label: 'Key Decisions',
        body: 'Replace with your key decisions text.',
      },
      {
        label: 'Outcome / Reflection',
        body: 'Replace with your outcome / reflection text.',
        sectionImage: '/images/HeijmansDemo (1).png'
      },
    ],
    bullets: [
    ],
  },

  // ── Interactive Data Visualization ──────────────────────────────────────
  'data-visualization': {
    heroLabels: ['Visual', 'Data'],
    heroTitle: 'Interactive Data Visualization',
    role: 'Visual Design & Data',
    team: 'Group Project for Vanderlande',
    year: '2023',
    coverImage: '/images/trend-radar-final.png',
    intro: [
      'Industrial project in collaboration with Vanderlande, focused on designing an interactive solution for displaying Trend Radar data. Developed as a web application to facilitate communication between internal and external audiences, the project tackled the central challenge: "How can we satisfy both naïve and expert users?"',
    ],
    sections: [
      {
        label: 'Context',
        body: 'Industry project for Vanderlande, solving how to display trend radar data in an interactive, easy-to-understand way that works for both internal and external audiences. Final deliverables: an iOS app and a website. Team ran Scrum across four sprints: Research, Design & Iteration, Development, and Final Polish.',
      },
      {
        label: 'Research',
        body: 'Ran user research and persona work to understand both audiences, mapped the funnel journey, and benchmarked existing trend radar tools and data viz patterns to see what conventions already existed.',
        subsections: [
        {
          subtitleSecondary: 'Tool\'s core purposes',
        }
        ],
        findings: [
          {
          number: '01',
          title: 'Informs employees of upcoming shifts', 
          body:'Flags upcoming technological shifts worth tracking allowing employee to expand their skillset and stay current.',
        },
                {
          number: '02',
          title: 'Shows factors affecting company performance', 
          body:'Maps the specific factors influencing company performance, which feeds directly into investment and innovation decisions.',
        },
                {
          number: '03',
          title: 'Demonstrates readiness to potential clients', 
          body:'It doubles as a communication asset: proof that Vanderlande is actively tracking and adapting to emerging trends, which matters more to a prospect evaluating long-term reliability than the raw trend data itself.',
        },
      ],
      },
      {
        label: 'Process',
        body: 'Two distinct groups with different mental models going in.',
          subsections: [
          {
            subtitleSecondary: 'Target Personas',
            subtitleBody:'Internal employees, who use the trend radar to track upcoming technologies and how they might affect company positioning. External clients, who use it to assess whether Vanderlande is staying ahead of emerging tech. ',
          },
        ],

        personas: [
          {
          name: 'James Henderson',
          meta: '39 · External User · CEO',
          description: 'Less concerned with the trend data itself and more focused on outcomes, case studies, ROI, and profitability, using the tool to gauge whether Vanderlande is a credible long-term partner.',
          
          }, 
          {
          name: 'Chrissy Daniels',
          meta: '32 · Internal Employee · Department Head',
          description: 'Uses the tool to track technological advancements, guide skill development, and support high-stakes decisions like whether to invest in a department or innovation direction.',
          }
        ],
        personaColor:  'linear-gradient(135deg, #feba001a 0%, #c16a00 100%)',
      },
      {
        label: 'Prototype',
        body: 'Once defined, I started wireframing',
        sectionImage: '/images/wireframesVanderlande.png',
      },
      {
        label: 'User Testing',
        // subsections: [
        //   {
        //     subtitle: 'Internal users already had an established mental model of what a trend radar is, external users mostly didn\'t, which shaped how we tested',
        //   },
        // ],
        body: 'Ran two rounds of usability testing, mostly with students unaffiliated with the project. In Figma, I built frames showing a trend radar with one trend selected, and asked participants three questions directly on the screen: what\'s the impact level, what\'s the expected adoption time, what\'s the trend type. Sequence order was alternated across participants to control for a learning effect between the four concepts (three circular, one scatter bubble)',
        // sectionImage: '/images/radarBases.png',
       subsections: [
          {
            subtitle: 'Key insights',
            subtitleBullets: [
              'Dense legends and complex filters (Concepts 1 and 2) slowed comprehension significantly.',
              'A recurring misread: users judged impact and adoption time by how many dots clustered in a section rather than the position of the specific dot, meaning a crowded quadrant was misread as "the answer" even when the relevant dot sat elsewhere.',
              "The scatter bubble concept performed best with users who had no prior context, likely because it's a familiar chart type.",
              "Once users understood what a trend radar was for, Concept 4's less conventional layout outperformed everything else, both in speed and accuracy.",
            ],
            },
        ],
      
      },
      {
        label: 'Outcome / Reflection',
        body: 'Replace with your outcome / reflection text.',
      },
      
    ],
    galleryImages: ['/images/r1.png', '/images/r2.png', '/images/r3.png', '/images/r4.png', '/images/r5.png', '/images/r6.png', '/images/r7.png', ],

      

    bullets: [
      'Replace with takeaway or highlight.',
      'Replace with takeaway or highlight.',
      'Replace with takeaway or highlight.',
      'Replace with takeaway or highlight.',
      'Replace with takeaway or highlight.',
    ],
  },
}
