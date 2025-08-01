
"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { app } from "@/lib/firebase";
import { getUserData } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";
import Link from "next/link";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const result = await getUserData(currentUser.uid);
        if (result.success && result.data) {
          setUserData(result.data as UserData);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const getInitials = (firstName?: string, lastName?: string) => {
    if (firstName && lastName) {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  if (loading) {
    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader className="flex flex-col items-center text-center">
                    <Skeleton className="h-24 w-24 rounded-full mb-4" />
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-5 w-64" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-6 w-6" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-6 w-6" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                     <div className="flex items-center gap-4">
                        <Skeleton className="h-6 w-6" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Please log in to view your profile.</h2>
        <Button asChild>
            <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
            <CardHeader className="flex flex-col items-center text-center bg-muted/30 p-8 rounded-t-lg">
                <Avatar className="h-24 w-24 mb-4 text-3xl">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(userData?.firstName, userData?.lastName)}
                    </AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl font-bold">
                    {userData ? `${userData.firstName} ${userData.lastName}` : "User Profile"}
                </CardTitle>
                <CardDescription className="text-lg">{userData?.email}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                 <div className="flex items-center gap-4 text-lg">
                    <User className="w-6 h-6 text-primary" />
                    <span>{userData ? `${userData.firstName} ${userData.lastName}` : "N/A"}</span>
                </div>
                 <div className="flex items-center gap-4 text-lg">
                    <Mail className="w-6 h-6 text-primary" />
                    <span>{userData?.email}</span>
                </div>
                 <div className="flex items-center gap-4 text-lg">
                    <Phone className="w-6 h-6 text-primary" />
                    <span>{userData?.phone || "N/A"}</span>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
