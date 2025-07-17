import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://placehold.co/1920x1080.png"
        >
          <source src="https://firebasestorage.googleapis.com/v0/b/genkit-llm-3a479.appspot.com/o/157833-875933923_small.mp4?alt=media&token=c23b3136-1e0e-4735-a6a9-0099450c058c" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-headline animate-fade-in-up">
          Unlock Your Potential. Find Your Trial.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          The ultimate platform connecting young athletes with professional sports clubs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <Button size="lg" asChild className="transition-transform hover:scale-105">
            <Link href="/athletes">Register as Athlete</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild className="transition-transform hover:scale-105">
            <Link href="#">Register a Club</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
