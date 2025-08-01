
"use client";

import ProfilePage from "@/components/features/profile-page";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Profile() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <ProfilePage />
      </main>
      <Footer />
    </div>
  );
}
