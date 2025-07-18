"use client";

import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
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
                "text-foreground/80 hover:text-foreground transition-colors hover:text-glow",
                pathname === link.href && "text-foreground text-glow"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/login" className="hover:text-glow">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/signup" className="hover:text-glow">Sign Up</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
