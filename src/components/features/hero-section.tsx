import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white">
      <Image
        src="https://placehold.co/1600x900.png"
        alt="Athlete celebrating"
        data-ai-hint="athlete soccer"
        fill
        className="object-cover -z-10"
        priority
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-headline animate-fade-in-up">
          Unlock Your Potential. Find Your Trial.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          The ultimate platform connecting young athletes with professional sports clubs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <Button size="lg" asChild className="transition-transform hover:scale-105">
            <Link href="#">Register as Athlete</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild className="transition-transform hover:scale-105">
            <Link href="#">Register a Club</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
