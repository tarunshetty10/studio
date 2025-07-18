"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/features/hero-section";
import HowItWorks from "@/components/features/how-it-works";
import MotivationalQuote from "@/components/features/motivational-quote";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <MotivationalQuote />
      </main>
      <Footer />
    </div>
  );
}