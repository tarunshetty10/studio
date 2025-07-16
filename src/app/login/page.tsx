import LoginForm from "@/components/features/login-form";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
