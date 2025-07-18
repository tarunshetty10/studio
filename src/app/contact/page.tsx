import ContactForm from "@/components/features/contact-form";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}