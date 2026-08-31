import { MEDIA_REGISTRY, getMedia } from '@/lib/media/registry';
import { MediaAsset } from '@/lib/media/types';

export interface HomepageData {
  introduction: {
    badge: string;
    headline: string;
    subheadline: string;
    paragraphs: string[];
    stats: { label: string; value: string; detail: string }[];
    images: {
      main: MediaAsset;
      secondary: MediaAsset;
      caption: string;
    };
  };
  impactStats: {
    badge: string;
    title: string;
    subtitle: string;
    metrics: {
      number: string;
      suffix: string;
      label: string;
      description: string;
      accent: 'brand' | 'gold' | 'emerald' | 'purple';
    }[];
  };
  whyChoose: {
    badge: string;
    title: string;
    subtitle: string;
    pillars: {
      id: string;
      number: string;
      title: string;
      tagline: string;
      description: string;
      iconName: string;
      features: string[];
    }[];
  };
  learningExperience: {
    badge: string;
    title: string;
    subtitle: string;
    pillars: {
      title: string;
      description: string;
      media: MediaAsset;
      badge: string;
      specs: string[];
    }[];
  };
  admissionsCta: {
    badge: string;
    title: string;
    subtitle: string;
    steps: { number: string; title: string; desc: string }[];
    scholarshipHighlight: {
      title: string;
      amount: string;
      description: string;
    };
  };
  contactPreview: {
    badge: string;
    title: string;
    subtitle: string;
    campusName: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    tourAvailable: boolean;
  };
}

export const HOMEPAGE_DATA: HomepageData = {
  introduction: {
    badge: 'Institutional Heritage & Pedagogy',
    headline: 'Where Academic Rigor Meets Transformative Mentorship',
    subheadline: 'For over 18 years, EduNexa has engineered a benchmark pedagogy for aspiring Olympiad rankers, future physicians, and software pioneers.',
    paragraphs: [
      'EduNexa was founded with a singular conviction: exceptional results are never accidental. They are the deliberate outcome of structured first-principles learning, obsessive doubt-clearance culture, and mentors who teach with relentless passion.',
      'Our integrated campus model combines smart tiered amphitheaters, advanced 3D anatomical dissection suites, and high-concurrency cloud computing pods with continuous AI-backed performance analytics.',
    ],
    stats: [
      { label: 'Olympiad Gold Medalists', value: '45+', detail: 'International STEM honors' },
      { label: 'Top 100 National Ranks', value: '120+', detail: 'Across competitive entrances' },
      { label: 'Faculty Pedigree', value: 'Top 1%', detail: 'Ex-MIT, Stanford, AIIMS' },
    ],
    images: {
      main: MEDIA_REGISTRY.students.collaborativeGroup,
      secondary: MEDIA_REGISTRY.students.peerDiscussion,
      caption: 'Collaborative learning seminar at the Innovation Quad Lecture Pod A-102',
    },
  },
  impactStats: {
    badge: 'Proven Benchmark Outcomes',
    title: 'Quantifiable Distinction Across Every Cohort',
    subtitle: 'Our students consistently outrank national averages, securing coveted seats in premier universities and tier-1 tech firms.',
    metrics: [
      {
        number: '98.4',
        suffix: '%',
        label: 'Competitive Selection Rate',
        description: 'Scholars qualifying for premier STEM, Medical, and Engineering institutes on their first attempt.',
        accent: 'emerald',
      },
      {
        number: '120',
        suffix: '+',
        label: 'Top 100 National Ranks',
        description: 'Single-digit and double-digit rankers across national Olympiads and engineering exams.',
        accent: 'gold',
      },
      {
        number: '1.4',
        suffix: 'M+',
        label: 'Scholarships Granted ($)',
        description: 'Merit-based tuition remissions disbursed via the National Scholarship Talent Hunt (NSTHE).',
        accent: 'brand',
      },
      {
        number: '4,200',
        suffix: '+',
        label: 'Distinguished Alumni Network',
        description: 'Scholars currently studying at MIT, Stanford, AIIMS, and working as staff architects at Google & Meta.',
        accent: 'purple',
      },
    ],
  },
  whyChoose: {
    badge: 'The EduNexa Advantage',
    title: 'The Six Pillars of Academic Mastery',
    subtitle: 'A holistic learning ecosystem engineered to eliminate conceptual blindspots and build unshakable problem-solving confidence.',
    pillars: [
      {
        id: 'pillar-1',
        number: '01',
        title: 'Master Faculty Mentorship',
        tagline: 'Direct teaching by Olympiad coaches and domain researchers.',
        description: 'Every lecture is delivered by senior educators with decades of subject depth who demystify complex multivariable concepts.',
        iconName: 'GraduationCap',
        features: ['1-on-1 weekly mentor check-ins', 'Daily twilight doubt resolution desks', 'Tailored problem difficulty scaling'],
      },
      {
        id: 'pillar-2',
        number: '02',
        title: 'AI Diagnostic Precision',
        tagline: 'Micro-gap analysis across 4,000+ concept nodes.',
        description: 'Our proprietary diagnostic engine evaluates test attempt patterns, identifying exact micro-topics where time or accuracy was lost.',
        iconName: 'Target',
        features: ['Personalized remedial question banks', 'Time-per-question velocity analytics', 'Predictive national percentile modeling'],
      },
      {
        id: 'pillar-3',
        number: '03',
        title: 'Proprietary 40-Volume Curriculum',
        tagline: 'Comprehensive theory, graded drills, and multi-concept challenges.',
        description: 'Authored in-house and updated annually to reflect evolving examination blueprints and competitive Olympiad standards.',
        iconName: 'BookOpen',
        features: ['Step-by-step conceptual proofs', 'Archived 10-year question deconstructions', 'Formula sheets & memory recall maps'],
      },
      {
        id: 'pillar-4',
        number: '04',
        title: 'State-of-the-Art Physical Campus',
        tagline: 'Architectural environments optimized for high concentration.',
        description: 'Air-conditioned tiered amphitheaters, dedicated quiet study pods, high-speed fiber computing labs, and full medical simulation center.',
        iconName: 'Building2',
        features: ['Smart digital interactive whiteboards', 'Acoustically engineered study rooms', '24/7 campus security & library access'],
      },
      {
        id: 'pillar-5',
        number: '05',
        title: 'Rigorous Timed Test Series',
        tagline: 'Simulating actual exam pressure every weekend.',
        description: 'Weekly full-syllabus simulations under authentic proctored conditions develop exam temperament, time budgeting, and mental endurance.',
        iconName: 'Trophy',
        features: ['Immediate same-day rank publication', 'Video solutions by subject leads', 'Negative marking risk mitigation drills'],
      },
      {
        id: 'pillar-6',
        number: '06',
        title: 'Merit Scholarship Security',
        tagline: 'Up to 100% tuition remission through NSTHE.',
        description: 'We ensure financial constraints never hinder brilliant minds from accessing India and the world’s finest coaching pedagogy.',
        iconName: 'Award',
        features: ['Transparent diagnostic scoring tiers', 'Renewal based on consistent semester ranks', 'Hostel and material fee subsidies'],
      },
    ],
  },
  learningExperience: {
    badge: 'Immersive Infrastructure',
    title: 'An Environment Designed for Peak Intellectual Focus',
    subtitle: 'From virtual dissection suites to twilight problem pods, every corner of EduNexa stimulates curiosity and deep work.',
    pillars: [
      {
        title: 'Smart Tiered Lecture Amphitheaters',
        description: 'Equipped with multi-camera live broadcast arrays, acoustic dampening, and high-lumen laser projectors for visual conceptual clarity.',
        media: MEDIA_REGISTRY.classrooms.tieredAmphitheater,
        badge: 'Lecture Pods',
        specs: ['Seats 60 with ergonomic desks', 'Dual 4K interactive displays', 'Instant session recording archives'],
      },
      {
        title: '3D Bio-Simulation & Medical Suites',
        description: 'Pre-med students explore interactive organ models, cellular pathways, and virtual surgical procedures under the guidance of senior MDs.',
        media: MEDIA_REGISTRY.classrooms.medicalSimulationLab,
        badge: 'Medical Labs',
        specs: ['Holographic anatomy stations', 'High-res electron microscopy displays', 'Clinical scenario diagnostic suites'],
      },
      {
        title: 'High-Performance Cloud & AI Clusters',
        description: 'High-speed gigabit workstations where engineering cohorts architect microservices, build LLM pipelines, and run distributed algorithms.',
        media: MEDIA_REGISTRY.classrooms.computingCluster,
        badge: 'Computing Labs',
        specs: ['Dedicated GPU compute access', 'Dual 27-inch developer monitors', 'Direct GitHub CI/CD testbeds'],
      },
      {
        title: 'Twilight Study Pods & 1-on-1 Desks',
        description: 'Quiet, private study cabins open till late evening where students solve complex assignments with resident teaching assistants on standby.',
        media: MEDIA_REGISTRY.classrooms.twilightStudyPod,
        badge: 'Study Havens',
        specs: ['Sound-isolated single & duo pods', '24/7 faculty doubt resolution desk', 'Curated reference library of 15,000+ volumes'],
      },
    ],
  },
  admissionsCta: {
    badge: 'Admissions Open 2026-2027',
    title: 'Take the First Step Toward Your Academic Vanguard',
    subtitle: 'Enroll today to claim your complimentary diagnostic assessment, personalized curriculum roadmap, and scholarship eligibility.',
    steps: [
      { number: '01', title: 'Submit Online Profile', desc: 'Fill in your academic background and preferred program mode in under 2 minutes.' },
      { number: '02', title: 'Take Diagnostic (NSTHE)', desc: '90-minute conceptual test evaluated for up to 100% tuition scholarships.' },
      { number: '03', title: 'Counseling & Roadmap', desc: '1-on-1 strategy meeting with a senior subject dean to customize your milestone schedule.' },
      { number: '04', title: 'Batch Onboarding', desc: 'Receive physical kit, student credentials, and start learning with your cohort.' },
    ],
    scholarshipHighlight: {
      title: 'National Scholarship & Talent Hunt (NSTHE 2026)',
      amount: '$1.4M+',
      description: 'Awarded to the top 15% performers in our nationwide diagnostic test.',
    },
  },
  contactPreview: {
    badge: 'Campus Desk & Counseling',
    title: 'Visit Our Innovation Campus or Schedule a Call',
    subtitle: 'Our academic counselors are available Monday through Saturday to answer questions regarding batches, hostels, and syllabi.',
    campusName: 'Main Innovation & Academic Quad',
    address: '450 Innovation Parkway, Academic District, Tech Corridor',
    phone: '+1 (800) 555-NEXA / +1 (800) 555-6392',
    email: 'admissions@edunexa.edu',
    hours: 'Monday – Saturday: 8:00 AM – 8:00 PM EST',
    tourAvailable: true,
  },
};
