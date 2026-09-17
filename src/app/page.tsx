import React from 'react';
import { CinematicHero } from '@/components/public/CinematicHero';
import { IntroductionSection } from '@/components/public/IntroductionSection';
import { LearningExperienceSection } from '@/components/public/LearningExperienceSection';
import { FeaturedProgramsSection } from '@/components/public/FeaturedProgramsSection';
import { StudentExperienceSection } from '@/components/public/StudentExperienceSection';
import { TeacherExperienceSection } from '@/components/public/TeacherExperienceSection';
import { CampusCommunitySection } from '@/components/public/CampusCommunitySection';
import { SuccessStoriesSection } from '@/components/public/SuccessStoriesSection';
import { AdmissionsCtaSection } from '@/components/public/AdmissionsCtaSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBF9]">
      {/* 1. Hero: Preserved Video + Clear Skillora Brand Introduction */}
      <CinematicHero />

      {/* 2. Introduction: Strong Statement & Pedagogy Philosophy */}
      <IntroductionSection />

      {/* 3. Learning Experience: Asymmetric Facility & Pedagogy Compositions */}
      <LearningExperienceSection />

      {/* 4. Courses & Cohorts: Featured Flagship Course + Supporting Curricula */}
      <FeaturedProgramsSection />

      {/* 5. Student Experience: Learning, Practice, Interaction, Progress & Peer Culture */}
      <StudentExperienceSection />

      {/* 6. Teacher Experience: Course Authoring, Mentorship Desks & Diagnostic Analytics */}
      <TeacherExperienceSection />

      {/* 7. Campus & Community: Authentic Photography of Collaboration & Student Life */}
      <CampusCommunitySection />

      {/* 8. Success Stories: Student Hall of Fame & Outcomes */}
      <SuccessStoriesSection />

      {/* 9. Final CTA: Clean, Minimal Admissions & Scholarship Action */}
      <AdmissionsCtaSection />
    </div>
  );
}
