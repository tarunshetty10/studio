import ClubFinder from "@/components/features/club-finder";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function ClubsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <ClubFinder />
      </main>
      <Footer />
    </div>
  );
}
