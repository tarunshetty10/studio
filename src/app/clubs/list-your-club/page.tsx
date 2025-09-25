import ClubListingForm from "@/components/features/club-listing-form";
import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-end pt-6">
        <Button asChild variant="ghost" size="icon" aria-label="Go to home">
          <Link href="/">
            <Home className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      <ClubListingForm />
    </div>
  );
}


