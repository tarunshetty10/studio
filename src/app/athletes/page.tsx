"use client";

import AthleteRegistrationForm from "@/components/features/athlete-registration-form";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import AuthGuard from "@/components/auth/auth-guard";

export default function AthleteRegistrationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <AuthGuard>
          <AthleteRegistrationForm />
        </AuthGuard>
      </main>
      <Footer />
    </div>
  );
}
