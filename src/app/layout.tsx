import React from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RoleSwitcher } from '@/components/common/RoleSwitcher';
import { AuthProvider } from '@/lib/auth/AuthContext';

export const metadata: Metadata = {
  title: 'EduNexa | Premier Academic Institute & Research Academy',
  description: 'A prestigious educational academy for competitive entrance preparation, advanced STEM foundations, clinical medical sciences, and senior technology leadership.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#FBF9F5] text-charcoal-900 antialiased flex flex-col selection:bg-brand-600 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <RoleSwitcher />
        </AuthProvider>
      </body>
    </html>
  );
}

