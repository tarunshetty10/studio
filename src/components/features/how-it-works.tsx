import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Search, CalendarCheck, Trophy } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "1. Create Your Profile",
    description: "Sign up as an athlete and build your profile to showcase your skills, stats, and achievements.",
  },
  {
    icon: Search,
    title: "2. Browse Trials",
    description: "Explore trial opportunities from various sports clubs. Filter by sport, location, and age group.",
  },
  {
    icon: CalendarCheck,
    title: "3. Apply & Attend",
    description: "Apply for trials that match your profile. Get selected and attend the trial to show your talent.",
  },
  {
    icon: Trophy,
    title: "4. Get Scouted",
    description: "Impress the scouts and coaches. The best performers can get offers to join professional teams.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline text-glow">How It Works</h2>
          <p className="text-muted-foreground text-lg">A simple path from aspiring athlete to professional player.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center bg-background hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-xl font-headline">{step.title}</CardTitle>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
