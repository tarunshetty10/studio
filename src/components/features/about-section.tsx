import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://sdmntprwestus.oaiusercontent.com/files/00000000-9098-6230-90c3-92112e1e1371/raw?se=2025-07-18T15%3A16%3A54Z&sp=r&sv=2024-08-04&sr=b&scid=1d3afd37-eb43-5a69-9158-4ed77debb595&skoid=1e6af1bf-6b08-4a04-8919-15773e7e7024&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-18T13%3A57%3A13Z&ske=2025-07-19T13%3A57%3A13Z&sks=b&skv=2024-08-04&sig=djMDEVpAA96MHIP134zhGXmVsqZU1B90PmPzNPCTjE8%3D"
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
