import SignupForm from "@/components/features/signup-form";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
}
