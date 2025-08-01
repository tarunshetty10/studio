'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Mail, Phone } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[1]) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading || !user) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center bg-secondary">
                <Card className="w-full max-w-lg p-8">
                    <CardHeader className="items-center text-center">
                        <Skeleton className="h-24 w-24 rounded-full mb-4" />
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-6 w-64" />
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
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-secondary p-4">
        <Card className="w-full max-w-lg shadow-2xl bg-card">
            <CardHeader className="items-center text-center p-8">
                 <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                    <AvatarFallback className="text-3xl">{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl font-headline">{user.displayName || 'User Profile'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8 pt-0">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-background">
                    <Mail className="h-5 w-5 text-primary"/>
                    <span className="text-muted-foreground">{user.email}</span>
                </div>
                 <div className="flex items-center gap-4 p-4 rounded-lg bg-background">
                    <Phone className="h-5 w-5 text-primary"/>
                    <span className="text-muted-foreground">{user.phoneNumber || 'No phone number provided'}</span>
                </div>
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
