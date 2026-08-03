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
}

export interface CaseScreen {
  title: string
  text: string
  placeholder: string
  image?: string // ← add '/images/your-screen.png' here
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
    tags: 'Front-end · Prototyping',
    year: '2026',
    placeholder: 'VR Learning cover',
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
        body: 'We ran interviews (in Dutch, since the target group is Dutch-speaking children) and built an empathy map to get past assumptions. Two findings drove the whole design direction:\n\n• Kids in this age group can reliably type, so any product asking them to type would fail before it started\n• Existing kids\' apps that worked shared four things: dead-simple navigation, oversized touch targets, voice-over narration, and unmistakable feedback when something\'s tapped',
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
        title: 'Home Feed',
        text: 'Replace with screen description.',
        placeholder: 'Art Detective — Screen 1',
        image: '', // ← '/images/art-detective-screen-1.png'
      },
      {
        title: 'Artwork Detail',
        text: 'Replace with screen description.',
        placeholder: 'Art Detective — Screen 2',
        image: '', // ← '/images/art-detective-screen-2.png'
      },
      {
        title: 'Quiz / Challenge',
        text: 'Replace with screen description.',
        placeholder: 'Art Detective — Screen 3',
        image: '', // ← '/images/art-detective-screen-3.png'
      },
      {
        title: 'Profile / Progress',
        text: 'Replace with screen description.',
        placeholder: 'Art Detective — Screen 4',
        image: '', // ← '/images/art-detective-screen-4.png'
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

  // ── Multiplayer VR Learning ──────────────────────────────────────────────
  'vr-learning': {
    heroLabels: ['Front-end', 'Prototyping'],
    heroTitle: 'Multiplayer VR Learning on the Construction Site',
    role: 'Front-end & Prototyping',
    team: 'Replace with team.',
    year: '2023',
    intro: [
      'Replace with project intro paragraph.',
      'Replace with second intro paragraph.',
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
        title: 'Environment Overview',
        text: 'Replace with screen description.',
        placeholder: 'VR Learning — Screen 1',
        image: '', // ← '/images/vr-screen-1.png'
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
      'Replace with takeaway or highlight.',
      'Replace with takeaway or highlight.',
      'Replace with takeaway or highlight.',
      'Replace with takeaway or highlight.',
      'Replace with takeaway or highlight.',
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
