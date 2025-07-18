"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/athletes", label: "Athletes" },
    { href: "/clubs", label: "Sports Clubs" },
    { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-headline text-glow">GetYourTrials</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link-underline text-foreground/80 hover:text-foreground transition-colors",
                pathname === link.href ? "active text-foreground text-glow" : "hover:text-glow"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/login" className="hover:text-glow">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/signup" className="hover:text-glow">Sign Up</Link>
            </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                  <Trophy className="h-6 w-6 text-primary" />
                  <span className="font-headline text-glow">GetYourTrials</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium",
                        pathname === link.href ? "text-primary" : "text-foreground/80"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-4 mt-auto">
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
