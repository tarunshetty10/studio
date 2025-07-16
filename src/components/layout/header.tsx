import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-headline">GetYourTrials</span>
        </Link>
        <nav className="flex items-center gap-2 md:gap-4">
          <Button variant="outline" asChild>
            <Link href="#">For Athletes</Link>
          </Button>
          <Button asChild>
            <Link href="#">For Sports Clubs</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
