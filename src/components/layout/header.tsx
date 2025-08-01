"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Trophy, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import ProfileButton from "./profile-button";
import { Skeleton } from "../ui/skeleton";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/athletes", label: "Athletes" },
    { href: "/clubs", label: "Sports Clubs" },
    { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const renderAuthButtons = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      );
    }

    if (user) {
      return <ProfileButton />;
    }

    return (
      <>
        <Button variant="ghost" asChild>
          <Link href="/login" className="hover:text-glow">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/signup" className="hover:text-glow">Sign Up</Link>
        </Button>
      </>
    );
  };
  
  const renderMobileAuthButtons = () => {
    if (loading) {
      return (
        <div className="flex flex-col gap-4 mt-auto">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      );
    }
    if (user) {
      return (
        <div className="flex flex-col gap-4 mt-auto">
          <Button asChild>
            <Link href="/profile">Profile</Link>
          </Button>
          <Button variant="secondary" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-4 mt-auto">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  };

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
          {renderAuthButtons()}
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
              <div className="flex flex-col h-full p-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-6">
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
                {renderMobileAuthButtons()}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
