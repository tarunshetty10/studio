import { Trophy } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">GetYourTrials</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} GetYourTrials. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-sm hover:underline text-muted-foreground transition-colors hover:text-foreground">Privacy Policy</Link>
          <Link href="#" className="text-sm hover:underline text-muted-foreground transition-colors hover:text-foreground">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
