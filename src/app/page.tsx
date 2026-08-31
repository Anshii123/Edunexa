import React from 'react';
import { CinematicHero } from '@/components/public/CinematicHero';
import { IntroductionSection } from '@/components/public/IntroductionSection';
import { ImpactStatsSection } from '@/components/public/ImpactStatsSection';
import { FeaturedProgramsSection } from '@/components/public/FeaturedProgramsSection';
import { WhyChooseSection } from '@/components/public/WhyChooseSection';
import { LearningExperienceSection } from '@/components/public/LearningExperienceSection';
import { FacultyShowcaseSection } from '@/components/public/FacultyShowcaseSection';
import { SuccessStoriesSection } from '@/components/public/SuccessStoriesSection';
import { UpcomingEventsSection } from '@/components/public/UpcomingEventsSection';
import { AdmissionsCtaSection } from '@/components/public/AdmissionsCtaSection';
import { ContactPreviewSection } from '@/components/public/ContactPreviewSection';

export default function HomePage() {
  return (
    <div className="space-y-0 pb-0">
      {/* Cinematic Hero (Scroll-driven video scrubbing - Unchanged) */}
      <CinematicHero />

      {/* 1. EduNexa Introduction */}
      <IntroductionSection />

      {/* 2. Impact Statistics */}
      <ImpactStatsSection />

      {/* 3. Featured Programs */}
      <FeaturedProgramsSection />

      {/* 4. Why Choose EduNexa */}
      <WhyChooseSection />

      {/* 5. Learning Experience */}
      <LearningExperienceSection />

      {/* 6. Expert Faculty */}
      <FacultyShowcaseSection />

      {/* 7. Student Success Stories */}
      <SuccessStoriesSection />

      {/* 8. Upcoming Events */}
      <UpcomingEventsSection />

      {/* 9. Admissions Call to Action */}
      <AdmissionsCtaSection />

      {/* 10. Contact Preview */}
      <ContactPreviewSection />
    </div>
  );
}
