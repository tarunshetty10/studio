import HelpCenter from "@/components/features/help-center";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function HelpCenterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary text-foreground">
      <Header />
      <main className="flex-grow">
        <HelpCenter />
      </main>
      <Footer />
    </div>
  );
}
