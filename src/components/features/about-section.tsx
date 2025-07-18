import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1595532770655-68b23fe6b2f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGJhc2ViYWxsfGVufDB8fHx8MTc1Mjg1NDE1OHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Young child playing baseball"
              fill
              style={{objectFit: "cover"}}
              className="w-full h-full"
              data-ai-hint="child baseball"
            />
          </div>
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 font-headline text-primary text-glow animate-fade-in-up">
              ABOUT US
            </h1>
            <div className="h-0.5 bg-primary w-24 mb-6 animate-wipe-in" style={{ animationDelay: '200ms' }} />
            <p className="text-lg md:text-xl mb-6 text-foreground/90 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              Our mission is to bridge the gap between talented young athletes and professional sports clubs. We provide a platform for you to showcase your skills, connect with scouts, and find trial opportunities that can launch your career.
            </p>
            <p className="text-muted-foreground animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              We believe that greatness is born in small moments—the extra hour of practice, the courage to apply, and the resilience to come back stronger. We're more than a platform; we're a community celebrating every step of your journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
