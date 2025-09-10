'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Mail, Phone, Pencil } from 'lucide-react';
import { useState, useEffect as useReactEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [athlete, setAthlete] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const form = useForm<{ fullName: string; location: string; primarySport: string; highestLevel: string; experience: number; phone?: string; achievements?: string; about?: string; youtubeUrl?: string }>();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useReactEffect(() => {
    if (!user || !db) return;
    const ref = doc(db, 'athletes', user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      setAthlete(snap.exists() ? snap.data() : null);
    });
    return () => unsub();
  }, [user]);

  useReactEffect(() => {
    if (athlete) {
      form.reset({
        fullName: athlete.fullName || '',
        location: athlete.location || '',
        primarySport: athlete.primarySport || '',
        highestLevel: athlete.highestLevel || '',
        experience: typeof athlete.experience === 'number' ? athlete.experience : Number(athlete.experience) || 0,
        phone: athlete.phone || '',
        achievements: athlete.achievements || '',
        about: athlete.about || '',
        youtubeUrl: athlete.youtubeUrl || ''
      });
    }
  }, [athlete, form]);

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
                    <span className="text-muted-foreground">{(athlete && athlete.phone) || user.phoneNumber || 'No phone number provided'}</span>
                </div>
                {athlete && (
                  <div className="space-y-3 p-4 rounded-lg bg-background relative">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Athlete Profile</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-muted-foreground">
                      <div><span className="font-medium">Full name:</span> {athlete.fullName || <span className="italic">Not provided</span>}</div>
                      <div><span className="font-medium">Location:</span> {athlete.location || <span className="italic">Not provided</span>}</div>
                      <div><span className="font-medium">Primary sport:</span> {athlete.primarySport || <span className="italic">Not provided</span>}</div>
                      <div><span className="font-medium">Highest level:</span> {athlete.highestLevel || <span className="italic">Not provided</span>}</div>
                      <div><span className="font-medium">Experience:</span> {typeof athlete.experience !== 'undefined' ? `${athlete.experience} years` : <span className="italic">Not provided</span>}</div>
                      <div><span className="font-medium">Key achievements:</span> {athlete.achievements ? <span className="whitespace-pre-line">{athlete.achievements}</span> : <span className="italic">Not provided</span>}</div>
                      <div><span className="font-medium">About:</span> {athlete.about ? <span className="whitespace-pre-line">{athlete.about}</span> : <span className="italic">Not provided</span>}</div>
                      <div><span className="font-medium">YouTube highlights:</span> {athlete.youtubeUrl ? (<a className="text-primary underline" href={athlete.youtubeUrl} target="_blank" rel="noreferrer">View</a>) : <span className="italic">Not provided</span>}</div>
                    </div>
                    <Button
                      aria-label="Edit profile"
                      className="absolute bottom-3 right-3 h-12 w-12 rounded-full p-0 shadow-lg"
                      onClick={() => setIsEditOpen(true)}
                    >
                      <Pencil className="h-5 w-5" />
                    </Button>
                  </div>
                )}
            </CardContent>
        </Card>
      </main>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Athlete Profile</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!user || !db) return;
              const values = form.getValues();
              await setDoc(
                doc(db, 'athletes', user.uid),
                {
                  fullName: values.fullName,
                  location: values.location,
                  primarySport: values.primarySport,
                  highestLevel: values.highestLevel,
                  experience: Number(values.experience) || 0,
                  phone: values.phone || '',
                  achievements: values.achievements || '',
                  about: values.about || '',
                  youtubeUrl: values.youtubeUrl || '',
                  updatedAt: serverTimestamp(),
                },
                { merge: true }
              );
              setIsEditOpen(false);
            }}
          >
            <div className="grid grid-cols-1 gap-3">
              <Input placeholder="Full name" {...form.register('fullName')} />
              <Input placeholder="Phone" {...form.register('phone')} />
              <Input placeholder="Location" {...form.register('location')} />
              <Select onValueChange={(v) => form.setValue('primarySport', v)} defaultValue={form.getValues('primarySport')}>
                <SelectTrigger><SelectValue placeholder="Primary sport" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="cricket">Cricket</SelectItem>
                  <SelectItem value="athletics">Athletics</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(v) => form.setValue('highestLevel', v)} defaultValue={form.getValues('highestLevel')}>
                <SelectTrigger><SelectValue placeholder="Highest level" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="youth">Youth</SelectItem>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="semi-pro">Semi-Pro</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
              <Input type="number" placeholder="Experience (years)" {...form.register('experience', { valueAsNumber: true })} />
              <Textarea placeholder="Key achievements" {...form.register('achievements')} />
              <Textarea placeholder="About you" {...form.register('about')} />
              <Input placeholder="YouTube highlights URL" {...form.register('youtubeUrl')} />
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="secondary" onClick={() => setIsEditOpen(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
}
