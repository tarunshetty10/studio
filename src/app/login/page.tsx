import AthleteRegistrationForm from "@/components/features/athlete-registration-form";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <AthleteRegistrationForm />
      </main>
      <Footer />
    </div>
  );
}
