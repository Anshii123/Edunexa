import { MediaAsset, MediaCategory, MediaRegistrySchema } from './types';

export const MEDIA_REGISTRY: MediaRegistrySchema = {
  // 1. Campus Architecture & Grounds
  campus: {
    mainQuad: {
      id: 'camp-main-quad',
      category: 'campus',
      title: 'Main Academic Quad & Central Innovation Building',
      alt: 'EduNexa central campus architecture with modern glass facades and green lawns',
      url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80',
      caption: 'The central academic plaza and technology quad',
      aspectRatio: '16/10',
      tags: ['architecture', 'quad', 'exterior'],
    },
    libraryExterior: {
      id: 'camp-lib-ext',
      category: 'campus',
      title: 'EduNexa Central Research Library',
      alt: 'Modern illuminated university library building at twilight',
      url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
      caption: '24/7 Central Research Library housing 15,000+ specialized volumes',
      aspectRatio: '16/9',
      tags: ['library', 'study', 'night'],
    },
    campusWalkway: {
      id: 'camp-walkway',
      category: 'campus',
      title: 'Scholars Walkway & Academic Colonnade',
      alt: 'Spacious stone walkway leading to EduNexa main entrance',
      url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
      caption: 'The main avenue welcoming students each morning',
      aspectRatio: '16/9',
      tags: ['walkway', 'entrance'],
    },
  },

  // 2. Classrooms & High-Tech Facilities
  classrooms: {
    tieredAmphitheater: {
      id: 'cls-amphi',
      category: 'classrooms',
      title: 'Smart Tiered Lecture Amphitheater A-102',
      alt: 'Modern university lecture amphitheater with interactive displays and ergonomic tiered seating',
      url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      caption: 'Acoustically tuned lecture pod for physics and calculus masterclasses',
      aspectRatio: '16/10',
      tags: ['amphitheater', 'lecture', 'smart-class'],
    },
    medicalSimulationLab: {
      id: 'cls-med-lab',
      category: 'classrooms',
      title: '3D Bio-Simulation & Medical Anatomy Suite',
      alt: 'Advanced biological laboratory with modern research equipment and microscopy screens',
      url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Virtual anatomical dissection and human physiology simulation center',
      aspectRatio: '16/10',
      tags: ['medical', 'biology', 'lab'],
    },
    computingCluster: {
      id: 'cls-comp-lab',
      category: 'classrooms',
      title: 'High-Performance Cloud & AI Engineering Cluster',
      alt: 'Computer science programming lab with dual high-resolution monitors and developer workstations',
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      caption: 'High-speed gigabit developer lab for distributed computing capstones',
      aspectRatio: '16/10',
      tags: ['computing', 'software', 'ai-lab'],
    },
    twilightStudyPod: {
      id: 'cls-study-pod',
      category: 'classrooms',
      title: 'Twilight Study Cabins & 1-on-1 Mentorship Desks',
      alt: 'Quiet library study pod with soft warm lighting and wooden bookshelves',
      url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
      caption: 'Sound-isolated quiet booths dedicated to problem-solving and mentoring',
      aspectRatio: '16/10',
      tags: ['study', 'mentorship', 'quiet-zone'],
    },
  },

  // 3. Students & Collaborative Learning
  students: {
    collaborativeGroup: {
      id: 'stu-collab',
      category: 'students',
      title: 'Olympiad Cohort Problem-Solving Session',
      alt: 'Diverse students collaborating around a study table with notes and laptops',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      caption: 'Peer learning and collaborative proof workshops at the Innovation Quad',
      aspectRatio: '4/3',
      tags: ['collaboration', 'students', 'learning'],
    },
    focusedStudy: {
      id: 'stu-focused',
      category: 'students',
      title: 'Deep Focus Diagnostic Session',
      alt: 'Student focused on solving physics problems with textbook in modern study hall',
      url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
      caption: 'Timed exam simulation and conceptual diagnostic prep',
      aspectRatio: '4/3',
      tags: ['focus', 'exam-prep'],
    },
    peerDiscussion: {
      id: 'stu-discussion',
      category: 'students',
      title: 'Post-Lecture Discussion Desk',
      alt: 'Students smiling and reviewing lecture slides together after class',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      caption: 'Mentors and students deconstructing challenging problem sets',
      aspectRatio: '4/3',
      tags: ['peer', 'discussion'],
    },
  },

  // 4. Faculty & Master Educators
  faculty: {
    arthurSterling: {
      id: 'fac-arthur',
      category: 'faculty',
      title: 'Dr. Arthur Sterling • Head of Physics',
      alt: 'Portrait of Dr. Arthur Sterling, Theoretical Physics educator',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      caption: 'Ph.D. Theoretical Physics, MIT • Former Olympiad Coach',
      aspectRatio: '1/1',
      tags: ['physics', 'faculty'],
    },
    elenaRostova: {
      id: 'fac-elena',
      category: 'faculty',
      title: 'Dr. Elena Rostova • Dean of Medical Sciences',
      alt: 'Portrait of Dr. Elena Rostova, Molecular Genetics educator',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      caption: 'M.D., Ph.D. Molecular Genetics, Cambridge',
      aspectRatio: '1/1',
      tags: ['medical', 'faculty'],
    },
    marcusVance: {
      id: 'fac-marcus',
      category: 'faculty',
      title: 'Prof. Marcus Vance • Director of Computing & AI',
      alt: 'Portrait of Prof. Marcus Vance, Computer Science & AI researcher',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      caption: 'M.S. Computer Science, Stanford • Ex-Staff Engineer Google',
      aspectRatio: '1/1',
      tags: ['computing', 'ai', 'faculty'],
    },
    sarahLin: {
      id: 'fac-sarah',
      category: 'faculty',
      title: 'Prof. Sarah Lin • Senior Faculty in Mathematics',
      alt: 'Portrait of Prof. Sarah Lin, Applied Mathematics educator',
      url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80',
      caption: 'Ph.D. Applied Mathematics, UC Berkeley',
      aspectRatio: '1/1',
      tags: ['mathematics', 'faculty'],
    },
  },

  // 5. Courses & Program Catalog
  courses: {
    stemOlympiad: {
      id: 'crs-stem',
      category: 'courses',
      title: 'Advanced STEM & Competitive Olympiad Pathway',
      alt: 'Physics and mathematical optics equipment in research laboratory',
      url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Flagship 2-Year Integrated STEM Olympiad Cohort',
      aspectRatio: '16/9',
      tags: ['stem', 'physics', 'olympiad'],
    },
    softwareAi: {
      id: 'crs-ai',
      category: 'courses',
      title: 'Full-Stack Software Engineering & Applied AI',
      alt: 'Code editor and cloud deployment architecture on high-res screen',
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      caption: 'Professional engineering boot-track with FAANG mock capstones',
      aspectRatio: '16/9',
      tags: ['software', 'fullstack', 'ai'],
    },
    medicalFoundation: {
      id: 'crs-med',
      category: 'courses',
      title: 'Pre-Med Clinical Excellence & Biology Foundation',
      alt: 'Medical research and anatomical molecular models',
      url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
      caption: 'Premier pre-med entrance preparation with 3D virtual dissection',
      aspectRatio: '16/9',
      tags: ['medical', 'biology', 'pre-med'],
    },
    executiveAnalytics: {
      id: 'crs-analytics',
      category: 'courses',
      title: 'Executive Leadership & Business Analytics',
      alt: 'Business analytics charts and predictive financial modeling dashboard',
      url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      caption: 'Case study modeling and predictive AI analytics for leaders',
      aspectRatio: '16/9',
      tags: ['management', 'analytics'],
    },
  },

  // 6. Events & Masterclasses
  events: {
    openHouse: {
      id: 'ev-open-house',
      category: 'events',
      title: 'EduNexa National Open Campus & Masterclass Day',
      alt: 'Students and faculty assembled in university amphitheater for seminar',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
      caption: 'Live masterclasses with faculty and guided campus walkthrough',
      aspectRatio: '16/9',
      tags: ['open-house', 'masterclass'],
    },
    problemSolvingMasterclass: {
      id: 'ev-problem-solving',
      category: 'events',
      title: 'High Performance Problem Solving Strategies in Physics',
      alt: 'Professor solving mathematical equations on large whiteboard during workshop',
      url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
      caption: 'Deconstructing multivariable Olympiad challenge problems',
      aspectRatio: '16/9',
      tags: ['workshop', 'physics'],
    },
  },

  // 7. Success Stories & Alumni
  successStories: {
    julianThorne: {
      id: 'succ-julian',
      category: 'successStories',
      title: 'Julian Thorne • AIR 04 Olympiad Ranker',
      alt: 'Portrait of Julian Thorne, MIT Class of 2029 scholar',
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
      caption: 'Admitted to MIT Class of 2029 • All-India Rank 04',
      aspectRatio: '1/1',
      tags: ['alumni', 'olympiad', 'mit'],
    },
    priyaNarayanan: {
      id: 'succ-priya',
      category: 'successStories',
      title: 'Priya Narayanan • National Rank 12 Medical',
      alt: 'Portrait of Priya Narayanan, AIIMS medical scholar',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      caption: 'Admitted to AIIMS • 715/720 Medical Entrance Score',
      aspectRatio: '1/1',
      tags: ['alumni', 'medical', 'aiims'],
    },
    liamOConnor: {
      id: 'succ-liam',
      category: 'successStories',
      title: 'Liam O’Connor • L5 Distributed Systems Architect',
      alt: 'Portrait of Liam O’Connor, Senior Software Engineer',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      caption: 'Placed as L5 Distributed Systems Engineer at CloudScale',
      aspectRatio: '1/1',
      tags: ['alumni', 'software', 'tech'],
    },
  },

  // 8. Gallery Collection
  gallery: [
    {
      id: 'gal-1',
      category: 'gallery',
      title: 'Smart Tiered Lecture Amphitheater Pods',
      alt: 'Lecture amphitheater with laser projection and student workstations',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
      caption: 'Tiered Amphitheater A-102',
      aspectRatio: '16/10',
    },
    {
      id: 'gal-2',
      category: 'gallery',
      title: 'Advanced AI & Computing Systems Lab',
      alt: 'Computing center with dual monitors and high-speed network infrastructure',
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
      caption: 'Computing Cluster Lab 4',
      aspectRatio: '16/10',
    },
    {
      id: 'gal-3',
      category: 'gallery',
      title: '3D Anatomical Dissection & Bio-Simulation Suite',
      alt: 'Medical research lab with precision anatomical microscopes',
      url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
      caption: 'Medical Sciences Suite 2',
      aspectRatio: '16/10',
    },
    {
      id: 'gal-4',
      category: 'gallery',
      title: 'Twilight Study & 1-on-1 Mentor Desks',
      alt: 'Quiet library study booths with warm wooden finish',
      url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80',
      caption: 'Twilight Study Cabins',
      aspectRatio: '16/10',
    },
    {
      id: 'gal-5',
      category: 'gallery',
      title: 'Central Science & Innovation Quad Colonnade',
      alt: 'University central campus building with modern architectural glass facade',
      url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80',
      caption: 'Central Innovation Quad',
      aspectRatio: '16/10',
    },
    {
      id: 'gal-6',
      category: 'gallery',
      title: 'Annual Rankers & Scholars Convocation Ceremony',
      alt: 'Graduation and scholarship award felicitation ceremony',
      url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=80',
      caption: 'Annual Rankers Felicitation',
      aspectRatio: '16/10',
    },
  ],
};

// Safe lookup helper function
export function getMedia(
  category: keyof Omit<MediaRegistrySchema, 'gallery'>,
  key: string
): MediaAsset {
  const categoryAssets = MEDIA_REGISTRY[category];
  if (categoryAssets && categoryAssets[key]) {
    return categoryAssets[key];
  }

  // Graceful fallback asset
  return {
    id: `fallback-${category}-${key}`,
    category,
    title: 'EduNexa Academic Asset',
    alt: 'EduNexa Institute high-quality educational environment',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16/9',
  };
}

export function getGalleryMedia(): MediaAsset[] {
  return MEDIA_REGISTRY.gallery;
}
