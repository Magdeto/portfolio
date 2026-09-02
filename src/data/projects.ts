export interface Project {
  slug: string
  title: string
  tags: string
  year: string
  placeholder: string
  coverImage?: string
}

export interface CaseSection {
  label: string
  body: string
  sectionImage?: string
  subtitle?: string
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
  screens: CaseScreen[]
  bullets: string[]
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
    tags: 'UX/UI · Motion',
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
    tags: 'Visual · Data',
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
        body: 'How do you build something a 4-6 year old can use completely on their own? Efteling wanted an AI-powered storytelling experience, but the real design challenge was not the AI. It was designing for a user who cannot type, has a short attention span, and is still developing fine motor skills.',
      },
      {
        label: 'Research',
        body: 'We ran interviews with both out primary and secondary target audiences - children and parents - to understand what exactly kids do on their phones, what is their screentime limit (if such) generally understand the interaction model of a child with their phone. As a result, I built an empathy map to get past assumptions. Two findings drove the whole design direction:\n\n• Kids in this age group can reliably type, so any product asking them to type would fail before it started\n• Existing kids\' apps that worked shared four things: dead-simple navigation, oversized touch targets, voice-over narration, and unmistakable feedback when something\'s tapped',
        sectionImage: '/images/HMW-ArtDetective.png',
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
    heroLabels: ['UX/UI', 'Front-end'],
    heroTitle: 'Art Detective',
    role: 'UX/UI Design & Front-end',
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
        body: 'Assigned as a short sprint project. The task: design a mobile iOS app that lets users identify and learn about artworks using image recognition - essentially Shazam for art. A 2-week rapid sprint covering brainstorming, prototyping, and development. The goal was a working core concept, no add-on features. The result: Rijksmuseum Art Detective. Designed for adolescents, specifically to bridge the gap in art history knowledge by making museum exploration feel like a social-media experience they are already familiar with. The app is built for use in crowded spaces like museum floors, so speed and simplicity mattered more than depth',
      },
      {
        label: 'Research',
        body: 'Mapped the competitive landscape, including AR/VR apps, virtual museum tours, and web-based applications, to identify gaps and overlaps. In parallel, ran "How Might We" workshops to reframe the problem around technical constraints, legal considerations, and creative direction.',
        sectionImage: '/images/HMW-ArtDetective.png'
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
    role: 'User Experience and Research, VR Interface Designer',
    team: 'Back-end and Full-Stack Engineers, in collaboration with Heijmans.',
    showcaseImage: '/images/HeijmansDemo (2).png',
    year: '2026',
    intro: [
      'A project focused on fostering on-time, safe and mutual communication between construction workers on site. The task sounded simple: "How can we stimulate speaking up to prevent accidents...but in VR.',
    ],
    sections: [
      {
        label: 'Context',
        body: 'Communication is important on the jobsite, especially for preventing dangerous accidents from happening. But communication within the team is difficult, especially with cultural differences. This may relate to hierarchy, uncertainty, social pressure or simply a lack of practice. This project is used as a proof-of-concept to test if there is a way to encourage coworkers to communicate despite those hurdles.',
      },
      {
        label: 'Research',
        body: 'Started from a behavioral research report on Dutch and international construction workers (CBS, TNO, Bouwend Nederland), which gave me early insight on motivation, risk attitude, digital literacy, and hierarchy across worker types. Validated those hypotheses with an expert interview with a safety coordinator at Heijmans. He confirmed: subcontractors feel disconnected from the core team, fear of being called a "zeikerd" (crybabies) stops people from speaking up\, language barriers with foreign workers are a live problem, and how you address someone changes whether safety messaging actually lands.Combined both inputs into three personas:\n Jan de Vries - veteran Dutch foreman, 47, direct Heijmans employee, informal norm-setter on site \n Daan Visser - Dutch newcomer, 22, 4 months in, MBO Bouw background, mirrors senior behavior to earn acceptance \n ' 
      },
      {
        label: 'Research Questions',
        subtitle: 'What factors influence construction workers\' willingness to speak up on a construction site?',
        body:'  How can different accidents happen on a construction site?How are the safety issues currently addressed on the Heijmans sites? How are the safety issues currently addressed at competitors? What multiplayer framework is best for easily setting up VR multiplayer games in Unity?',
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
    screens: [
      {
        title: 'Environment Overview',
        text: 'Replace with screen description.',
        placeholder: 'VR Learning — Screen 1',
        image: 'images/HeijmansDemo (2).png'
      },
      {
        title: 'Multiplayer Interaction',
        text: 'Replace with screen description.',
        placeholder: 'VR Learning — Screen 2',
        image: '', // ← '/images/vr-screen-2.png'
      },
      {
        title: 'Task / Scenario',
        text: 'Replace with screen description.',
        placeholder: 'VR Learning — Screen 3',
        image: '', // ← '/images/vr-screen-3.png'
      },
      {
        title: 'Debrief / Results',
        text: 'Replace with screen description.',
        placeholder: 'VR Learning — Screen 4',
        image: '', // ← '/images/vr-screen-4.png'
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
        body: 'Replace with your context text.',
      },
      {
        label: 'Research',
        body: 'Replace with your research text.',
      },
      {
        label: 'Process',
        body: 'Replace with your process text.',
      },
      {
        label: 'Key Decisions',
        body: 'Replace with your key decisions text.',
      },
      {
        label: 'Outcome / Reflection',
        body: 'Replace with your outcome / reflection text.',
      },
    ],
    screens: [
      {
        title: 'Radar Overview',
        text: 'Replace with screen description.',
        placeholder: 'Data Viz — Screen 1',
        image: '', // ← '/images/dataviz-screen-1.png'
      },
      {
        title: 'Trend Detail',
        text: 'Replace with screen description.',
        placeholder: 'Data Viz — Screen 2',
        image: '', // ← '/images/dataviz-screen-2.png'
      },
      {
        title: 'Filter / Explore',
        text: 'Replace with screen description.',
        placeholder: 'Data Viz — Screen 3',
        image: '', // ← '/images/dataviz-screen-3.png'
      },
      {
        title: 'Expert vs Naïve View',
        text: 'Replace with screen description.',
        placeholder: 'Data Viz — Screen 4',
        image: '', // ← '/images/dataviz-screen-4.png'
      },
    ],
    bullets: [
      'Replace with takeaway or highlight.',
      'Replace with takeaway or highlight.',
      'Replace with takeaway or highlight.',
      'Replace with takeaway or highlight.',
      'Replace with takeaway or highlight.',
    ],
  },
}
