"use client";

import AboutSection from "@/components/features/about-section";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}