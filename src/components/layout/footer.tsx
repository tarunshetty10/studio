import { Trophy } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="font-headline">GetYourTrials</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Connecting young athletes with opportunities for growth and success.
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="font-bold mb-4 font-headline">For Athletes</h3>
            <ul className="space-y-2">
              <li><Link href="/athletes" className="text-sm hover:underline text-muted-foreground transition-colors hover:text-foreground">Create Profile</Link></li>
              <li><Link href="/clubs" className="text-sm hover:underline text-muted-foreground transition-colors hover:text-foreground">Find Clubs</Link></li>
              <li><Link href="#" className="text-sm hover:underline text-muted-foreground transition-colors hover:text-foreground">Apply for Trials</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="font-bold mb-4 font-headline">For Clubs</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:underline text-muted-foreground transition-colors hover:text-foreground">List Your Club</Link></li>
              <li><Link href="#" className="text-sm hover:underline text-muted-foreground transition-colors hover:text-foreground">Find Athletes</Link></li>
              <li><Link href="#" className="text-sm hover:underline text-muted-foreground transition-colors hover:text-foreground">Manage Trials</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="font-bold mb-4 font-headline">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help-center" className="text-sm hover:underline text-muted-foreground transition-colors hover:text-foreground">Help Center</Link></li>
              <li><Link href="/contact" className="text-sm hover:underline text-muted-foreground transition-colors hover:text-foreground">Contact Us</Link></li>
              <li><Link href="#" className="text-sm hover:underline text-muted-foreground transition-colors hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GetYourTrials. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}