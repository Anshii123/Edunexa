'use client';

import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Input,
  Select,
  Textarea,
  Checkbox,
  Radio,
  FormField,
  SectionHeading,
  Tabs,
  Breadcrumbs,
  Pagination,
  Avatar,
  Spinner,
  Skeleton,
  CardSkeleton,
  TableSkeleton,
  EmptyState,
  ErrorState,
  Alert,
} from '@/components/ui';
import {
  Sparkles,
  ArrowRight,
  Search,
  Mail,
  Lock,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Award,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState('buttons');
  const [demoInput, setDemoInput] = useState('');
  const [demoError, setDemoError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);
  const [radioVal, setRadioVal] = useState('hybrid');
  const [checkVal, setCheckVal] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Design System Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-900 tracking-tight font-display">
          Design Language & Components
        </h1>
        <p className="text-lg text-slate-600">
          A cohesive, architectural, and accessible component ecosystem crafted for premium educational academies, coaching institutes, and professional training centers.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-20 z-30 py-3 bg-white/90 backdrop-blur-md border-y border-black/[0.08] shadow-sm">
        <Tabs
          activeId={activeTab}
          onChange={setActiveTab}
          variant="pills"
          items={[
            { id: 'typography', label: '1. Typography' },
            { id: 'colors', label: '2. Colors & Tokens' },
            { id: 'buttons', label: '3. Buttons & Badges' },
            { id: 'cards', label: '4. Cards & Editorial' },
            { id: 'forms', label: '5. Form Suite' },
            { id: 'navigation', label: '6. Navigation' },
            { id: 'states', label: '7. Loading, Empty & Error' },
          ]}
        />
      </div>

      {/* =========================================================================
         1. TYPOGRAPHY SYSTEM
         ========================================================================= */}
      {activeTab === 'typography' && (
        <section className="space-y-10">
          <SectionHeading
            eyebrow="Typography Architecture"
            title="Type Scale & Hierarchical Roles"
            description="Precision typographic hierarchy pairing Space Grotesk for architectural headlines and Inter for high-legibility educational content."
            align="left"
            theme="light"
          />

          <Card variant="default">
            <CardContent className="space-y-8 divide-y divide-black/[0.08]">
              <div className="pt-4 space-y-2">
                <div className="text-xs uppercase tracking-wider font-bold text-indigo-600">Display / Hero Headline</div>
                <div className="text-3xl sm:text-5xl font-bold text-navy-900 font-display">
                  Architecting Future Rankers & Scholars
                </div>
                <p className="text-xs text-slate-500 font-mono">font-family: Space Grotesk | font-size: 2.5rem – 4rem | font-weight: 800</p>
              </div>

              <div className="pt-6 space-y-2">
                <div className="text-xs uppercase tracking-wider font-bold text-indigo-600">Heading 1 / Page Title</div>
                <div className="text-2xl sm:text-4xl font-bold text-navy-900 font-display">
                  Advanced STEM & Medical Sciences Foundation
                </div>
                <p className="text-xs text-slate-500 font-mono">font-family: Space Grotesk | font-size: 2rem – 2.75rem | font-weight: 700</p>
              </div>

              <div className="pt-6 space-y-2">
                <div className="text-xs uppercase tracking-wider font-bold text-indigo-600">Heading 2 / Section Title</div>
                <div className="text-xl sm:text-3xl font-bold text-navy-900 font-display">
                  Distinguished Faculty & Research Mentors
                </div>
                <p className="text-xs text-slate-500 font-mono">font-family: Space Grotesk | font-size: 1.5rem – 2rem | font-weight: 700</p>
              </div>

              <div className="pt-6 space-y-2">
                <div className="text-xs uppercase tracking-wider font-bold text-indigo-600">Heading 3 / Card Header</div>
                <div className="text-lg sm:text-xl font-bold text-navy-900 font-display">
                  Rotational Mechanics & Differential Calculus
                </div>
                <p className="text-xs text-slate-500 font-mono">font-family: Space Grotesk | font-size: 1.25rem | font-weight: 600</p>
              </div>

              <div className="pt-6 space-y-2">
                <div className="text-xs uppercase tracking-wider font-bold text-indigo-600">Body Large & Standard Body</div>
                <p className="text-lg text-slate-700 font-sans">
                  Body Large: Our curriculum is designed with modular problem sets that develop first-principles reasoning and clinical diagnostics.
                </p>
                <p className="text-base text-slate-600 font-sans">
                  Standard Body: Every student receives an assigned mentor who reviews weekly test metrics and tailors remedial problem modules.
                </p>
                <p className="text-sm text-slate-500 font-sans">
                  Body Small: Diagnostic assessments are conducted every Saturday under timed examination conditions.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      )}


      {/* =========================================================================
         2. COLOR SYSTEM
         ========================================================================= */}
      {activeTab === 'colors' && (
        <section className="space-y-10">
          <SectionHeading
            eyebrow="Curated Palette"
            title="Harmonious 2026 Color Architecture"
            description="Deep Midnight Navy foundation, Warm Off-White canvas, Rich Indigo primary, Electric Violet accents, and Soft Cyan highlights."
            align="left"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Deep Midnight Navy */}
            <Card variant="default">
              <CardHeader>
                <CardTitle>Midnight Navy</CardTitle>
                <CardDescription>Hero & Contrast Surfaces (20%)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-14 rounded-xl bg-navy-950 flex items-center px-4 text-xs font-mono text-white justify-between shadow-md">
                  <span>Navy 950</span>
                  <span>#0B1020</span>
                </div>
                <div className="h-14 rounded-xl bg-navy-900 flex items-center px-4 text-xs font-mono text-white justify-between">
                  <span>Navy 900</span>
                  <span>#0F172A</span>
                </div>
                <div className="h-14 rounded-xl bg-navy-800 flex items-center px-4 text-xs font-mono text-white justify-between">
                  <span>Navy 800</span>
                  <span>#1E293B</span>
                </div>
              </CardContent>
            </Card>

            {/* Rich Indigo & Violet */}
            <Card variant="default">
              <CardHeader>
                <CardTitle>Indigo & Violet</CardTitle>
                <CardDescription>Primary Brand & Ambient Accents (15%)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-14 rounded-xl bg-indigo-700 flex items-center px-4 text-xs font-mono text-white justify-between shadow-md">
                  <span>Indigo 700</span>
                  <span>#4338CA</span>
                </div>
                <div className="h-14 rounded-xl bg-indigo-600 flex items-center px-4 text-xs font-mono text-white justify-between">
                  <span>Indigo 600</span>
                  <span>#4F46E5</span>
                </div>
                <div className="h-14 rounded-xl bg-violet-600 flex items-center px-4 text-xs font-mono text-white justify-between">
                  <span>Violet 600</span>
                  <span>#7C3AED</span>
                </div>
              </CardContent>
            </Card>

            {/* Canvas & Accents */}
            <Card variant="default">
              <CardHeader>
                <CardTitle>Canvas & Accents</CardTitle>
                <CardDescription>Warm Off-White, Cyan & Charcoal (65%)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-14 rounded-xl bg-[#F8F7F4] border border-black/15 flex items-center px-4 text-xs font-mono text-navy-900 justify-between">
                  <span>Canvas Base</span>
                  <span>#F8F7F4</span>
                </div>
                <div className="h-14 rounded-xl bg-cyan-400 flex items-center px-4 text-xs font-mono text-navy-950 font-bold justify-between shadow-sm">
                  <span>Cyan 400</span>
                  <span>#22D3EE</span>
                </div>
                <div className="h-14 rounded-xl bg-charcoal-900 flex items-center px-4 text-xs font-mono text-white justify-between">
                  <span>Charcoal 900</span>
                  <span>#111827</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* =========================================================================
         3. BUTTONS & BADGES
         ========================================================================= */}
      {activeTab === 'buttons' && (
        <section className="space-y-10">
          <SectionHeading
            eyebrow="Interactive Elements"
            title="Button & Badge Variants"
            description="Accessible interactive triggers with deliberate hover transitions, keyboard focus rings, and loading state spinners."
            align="left"
          />

          <Card variant="default">
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Primary, Secondary, Outline, Ghost, Gold, Danger, and Subtle</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Primary CTA
              </Button>
              <Button variant="secondary">Secondary Action</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Trigger</Button>
              <Button variant="gold" leftIcon={<Award className="w-4 h-4" />}>
                Scholarship Action
              </Button>
              <Button variant="danger">Cancel / Delete</Button>
              <Button variant="subtle">Subtle Badge CTA</Button>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <CardTitle>Button Sizes & Dynamic States</CardTitle>
              <CardDescription>Consistent sizing scales and integrated loading feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Button size="xs" variant="primary">Extra Small (xs)</Button>
                <Button size="sm" variant="primary">Small (sm)</Button>
                <Button size="md" variant="primary">Medium Default (md)</Button>
                <Button size="lg" variant="primary">Large Hero (lg)</Button>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-4">
                <Button
                  variant="primary"
                  isLoading={isLoadingDemo}
                  onClick={() => {
                    setIsLoadingDemo(true);
                    setTimeout(() => setIsLoadingDemo(false), 2000);
                  }}
                >
                  {isLoadingDemo ? 'Verifying Credentials...' : 'Test Loading State'}
                </Button>
                <Button variant="secondary" disabled>
                  Disabled Button
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <CardTitle>Badge Indicators</CardTitle>
              <CardDescription>Used for status, course categories, batch tags, and rankings</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Badge variant="brand" dot pulse>Live Batch</Badge>
              <Badge variant="gold" dot>National Rank #01</Badge>
              <Badge variant="emerald" dot>Enrolled & Active</Badge>
              <Badge variant="rose" dot>Registration Closing</Badge>
              <Badge variant="default">Foundation Cohort</Badge>
              <Badge variant="slate">Archived Syllabus</Badge>
              <Badge variant="outline">Hybrid Mode</Badge>
            </CardContent>
          </Card>
        </section>
      )}

      {/* =========================================================================
         4. CARDS & EDITORIAL
         ========================================================================= */}
      {activeTab === 'cards' && (
        <section className="space-y-10">
          <SectionHeading
            eyebrow="Structural Layouts"
            title="Card & Editorial Layout Primitives"
            description="Card elevations with subtle 1px architectural borders avoiding excessive rounded bubbly aesthetics."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Default Card */}
            <Card variant="default">
              <CardHeader>
                <Badge variant="brand" size="sm">Core Architecture</Badge>
                <CardTitle className="mt-2">Standard Slate Card</CardTitle>
                <CardDescription>Used for high-density academic information and course modules.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="type-body-sm">
                  Clean 1px border with dark slate backdrop that respects dark mode standards without excessive glare.
                </p>
              </CardContent>
              <CardFooter>
                <span className="type-caption">Updated 2 days ago</span>
                <Button size="xs" variant="ghost">Learn More</Button>
              </CardFooter>
            </Card>

            {/* Elevated Glass Card */}
            <Card variant="glass">
              <CardHeader>
                <Badge variant="gold" size="sm">Glassmorphic Depth</Badge>
                <CardTitle className="mt-2">Frosted Glass Card</CardTitle>
                <CardDescription>Blurs background ambient lighting for focus and hierarchy.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="type-body-sm">
                  Subtle 14px backdrop filter with 8% border translucency for modern institutional aesthetics.
                </p>
              </CardContent>
              <CardFooter>
                <span className="type-caption">Live Module</span>
                <Button size="xs" variant="subtle">Access</Button>
              </CardFooter>
            </Card>

            {/* Editorial Card */}
            <Card variant="editorial">
              <CardHeader>
                <Badge variant="emerald" size="sm">Editorial Accent</Badge>
                <CardTitle className="mt-2">Editorial University Card</CardTitle>
                <CardDescription>Inspired by classical university journals and architectural pillars.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="type-body-sm">
                  Features a crisp 4px accent border for primary notices, flagship achievements, and key curriculum tracks.
                </p>
              </CardContent>
              <CardFooter>
                <span className="type-caption">Official Circular</span>
                <Button size="xs" variant="secondary">View</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      )}

      {/* =========================================================================
         5. FORM SUITE
         ========================================================================= */}
      {activeTab === 'forms' && (
        <section className="space-y-10">
          <SectionHeading
            eyebrow="Form Suite"
            title="Inputs, Controls & Accessible Validation"
            description="Type-safe, fully accessible inputs with built-in error handling and helper annotations."
            align="left"
          />

          <Card variant="default">
            <CardHeader>
              <CardTitle>Interactive Form Components</CardTitle>
              <CardDescription>Toggle error states to preview inline validation feedback.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 max-w-2xl">
              <div className="flex items-center gap-3">
                <Button
                  size="xs"
                  variant={demoError ? 'danger' : 'secondary'}
                  onClick={() => setDemoError(!demoError)}
                >
                  {demoError ? 'Disable Error State' : 'Trigger Validation Error State'}
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Student Full Name"
                  required
                  error={demoError ? 'Please enter a valid legal name' : null}
                  helperText="As it appears on academic certificates"
                >
                  <Input
                    placeholder="Alexander Vance"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    error={demoError}
                    leftIcon={<BookOpen className="w-4 h-4" />}
                  />
                </FormField>

                <FormField
                  label="Academic Email"
                  required
                  error={demoError ? 'Institutional email is required' : null}
                >
                  <Input
                    type="email"
                    placeholder="alex@student.edunexa.edu"
                    error={demoError}
                    leftIcon={<Mail className="w-4 h-4" />}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Target Coaching Cohort">
                  <Select>
                    <option>STEM & Olympiad Elite (2-Year)</option>
                    <option>Software Engineering & Applied AI</option>
                    <option>Pre-Med Clinical Biology</option>
                    <option>Executive Analytics Bootcamp</option>
                  </Select>
                </FormField>

                <FormField label="Search Program Database">
                  <Input
                    placeholder="Search by subject or exam..."
                    leftIcon={<Search className="w-4 h-4" />}
                  />
                </FormField>
              </div>

              <FormField
                label="Student Statement of Purpose / Queries"
                helperText="Maximum 500 characters"
              >
                <Textarea placeholder="Share your academic goals or scholarship request..." />
              </FormField>

              {/* Checkboxes & Radio Controls */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="text-xs font-semibold text-slate-300">Delivery Modality & Preferences:</div>
                <div className="space-y-3">
                  <Radio
                    name="mode"
                    checked={radioVal === 'hybrid'}
                    onChange={() => setRadioVal('hybrid')}
                    label="Hybrid Classroom + Live Interactive Pods"
                    description="Access physical lecture amphitheaters with cloud streaming replay archives."
                  />
                  <Radio
                    name="mode"
                    checked={radioVal === 'online'}
                    onChange={() => setRadioVal('online')}
                    label="100% Online Cohort with 1-on-1 Mentor Desks"
                    description="Flexible evening timings designed for remote scholars."
                  />
                </div>

                <div className="pt-2">
                  <Checkbox
                    checked={checkVal}
                    onChange={() => setCheckVal(!checkVal)}
                    label="Apply for National Scholarship Assessment Test (NSTHE)"
                    description="Opt-in to be evaluated for up to 100% merit-based tuition fee remission."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* =========================================================================
         6. NAVIGATION & METADATA
         ========================================================================= */}
      {activeTab === 'navigation' && (
        <section className="space-y-10">
          <SectionHeading
            eyebrow="Navigation & Primitives"
            title="Tabs, Breadcrumbs, Pagination & Avatars"
            description="Structural elements for traversing courses, portals, and student records."
            align="left"
          />

          <Card variant="default">
            <CardHeader>
              <CardTitle>Breadcrumbs</CardTitle>
            </CardHeader>
            <CardContent>
              <Breadcrumbs
                items={[
                  { label: 'Programs', href: '/courses' },
                  { label: 'STEM & Olympiads', href: '/courses' },
                  { label: 'Advanced Rotational Dynamics' },
                ]}
              />
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <CardTitle>Pagination</CardTitle>
            </CardHeader>
            <CardContent>
              <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={setCurrentPage}
              />
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <CardTitle>Avatars & Status Indicators</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <Avatar
                size="xl"
                status="online"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              />
              <Avatar
                size="lg"
                status="busy"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
              />
              <Avatar size="md" status="online" name="Marcus Vance" />
              <Avatar size="sm" name="Arthur Sterling" />
              <Avatar size="xs" name="Elena Rostova" />
            </CardContent>
          </Card>
        </section>
      )}

      {/* =========================================================================
         7. STATES: LOADING, EMPTY, ERROR
         ========================================================================= */}
      {activeTab === 'states' && (
        <section className="space-y-10">
          <SectionHeading
            eyebrow="System States"
            title="Loading, Empty & Error Resilience"
            description="Polished visual states for async operations, network interruptions, and blank states."
            align="left"
          />

          {/* Inline Alerts */}
          <div className="space-y-3">
            <Alert variant="info" title="Scholarship Registration Window Open">
              The deadline to submit NSTHE 2026 diagnostic papers is closing in 5 days.
            </Alert>
            <Alert variant="success" title="Admission Lead Enrolled Successfully">
              Student ID NEXA-2026-9912 generated and credentials dispatched.
            </Alert>
            <Alert variant="warning" title="Twilight Doubt Session Room Relocation">
              Today's physics problem desk has been moved to Amphitheater B-201.
            </Alert>
            <Alert variant="error" title="Payment Gateway Authentication Timeout">
              Your banking provider did not acknowledge the fee transaction. No charges were made.
            </Alert>
          </div>

          {/* Skeleton Loaders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-semibold text-slate-400 mb-3">Card Skeleton Loader:</div>
              <CardSkeleton />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 mb-3">Table Skeleton Loader:</div>
              <TableSkeleton rows={3} />
            </div>
          </div>

          {/* Empty & Error State Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default">
              <CardContent className="p-8">
                <EmptyState
                  title="No Study Materials Found"
                  description="You have completed all assigned lecture modules for this quarter. Check back next Monday for fresh problem banks."
                  action={<Button size="sm" variant="secondary">Browse Supplementary Notes</Button>}
                />
              </CardContent>
            </Card>

            <Card variant="default">
              <CardContent className="p-8">
                <ErrorState
                  title="Failed to Load Diagnostic Metrics"
                  description="The live test analytics engine is currently syncing with the grading database."
                  onRetry={() => alert('Retrying connection...')}
                />
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
