import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ApplyForTrialsButton from "@/components/features/apply-for-trials-button";
import { MapPin, Building, ShieldCheck, Calendar, Award } from "lucide-react";
import { getClubById } from "@/data/clubs";

type PageProps = {
  params: { id: string };
};

export default function ClubDetailsPage({ params }: PageProps) {
  const numericId = Number(params.id);
  const club = getClubById(numericId);

  if (!club) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card">
                <CardHeader className="flex flex-row items-start gap-4">
                  <Image
                    src={club.logo}
                    alt={`${club.name} logo`}
                    width={96}
                    height={96}
                    className="rounded-lg border"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-2xl md:text-3xl font-headline flex items-center gap-2">
                      {club.name}
                      {club.verified && (
                        <ShieldCheck className="w-6 h-6 text-green-500" />
                      )}
                    </CardTitle>
                    <div className="text-muted-foreground mt-2 space-y-1">
                      <p className="flex items-center gap-2"><Building /> {club.sport}</p>
                      <p className="flex items-center gap-2"><MapPin /> {club.location}</p>
                      {club.foundedYear && (
                        <p className="flex items-center gap-2"><Calendar /> Founded {club.foundedYear}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-base md:text-lg">{club.description}</p>
                </CardContent>
              </Card>

              {club.photos && club.photos.length > 0 && (
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle>Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {club.photos.map((src, idx) => (
                        <Image
                          key={idx}
                          src={src}
                          alt={`Photo ${idx + 1}`}
                          width={800}
                          height={450}
                          className="rounded-lg border object-cover w-full h-auto"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {club.videos && club.videos.length > 0 && (
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle>Videos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {club.videos.map((src, idx) => (
                        <video key={idx} controls className="w-full rounded-lg border">
                          <source src={src} />
                        </video>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="lg:col-span-1 space-y-6">
              {club.achievements && club.achievements.length > 0 && (
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Award /> Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
                      {club.achievements.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-card sticky top-6">
                <CardHeader>
                  <CardTitle>Apply for Trials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Interested in joining {club.name}? Submit your profile to be considered for upcoming trials.
                  </p>
                  <ApplyForTrialsButton clubId={club.id} clubName={club.name} />
                  {club.contact?.email && (
                    <p className="text-xs text-muted-foreground">
                      Or email: <span className="underline">{club.contact.email}</span>
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


