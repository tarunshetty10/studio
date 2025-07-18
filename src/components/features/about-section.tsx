import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://img.freepik.com/premium-photo/young-girl-holding-football-smiling_911319-3559.jpg"
          alt="Young girl holding a football"
          fill
          style={{objectFit: "cover"}}
          className="w-full h-full"
          data-ai-hint="girl football"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="md:col-start-2 text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline text-glow">
            ABOUT US
          </h1>
          <hr className="border-primary w-24 mb-6" />
          <p className="text-lg md:text-xl mb-6">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.
          </p>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
          </p>
        </div>
      </div>
    </section>
  );
}
