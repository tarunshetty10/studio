
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Trophy, CheckCircle, LogIn, UserPlus, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { registerAthlete } from "@/app/actions";
import React, { useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const athleteSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  age: z.coerce.number().min(1, "Age is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone Number is required"),
  location: z.string().min(1, "Location is required"),
  primarySport: z.string().min(1, "Primary Sport is required"),
  highestLevel: z.string().min(1, "Highest Level Played is required"),
  experience: z.coerce.number().min(0, "Years of Experience is required"),
  achievements: z.string().optional(),
  about: z.string().optional(),
  youtubeUrl: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
});

type AthleteFormValues = z.infer<typeof athleteSchema>;

export default function AthleteRegistrationForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const form = useForm<AthleteFormValues>({
    resolver: zodResolver(athleteSchema),
    defaultValues: {
      fullName: "",
      age: 0,
      email: "",
      phone: "",
      location: "",
      primarySport: "",
      highestLevel: "",
      experience: 0,
      achievements: "",
      about: "",
      youtubeUrl: "",
    },
  });

  const handleRegistrationSubmit = async (data: AthleteFormValues) => {
    const result = await registerAthlete(data);
    if (result.success) {
      toast({
        title: "Registration Submitted!",
        description: "Your profile has been saved. We'll be in touch!",
      });
      form.reset();
      setIsSubmitted(true);
    } else {
      toast({
        title: "Registration Failed",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const onSubmit: SubmitHandler<AthleteFormValues> = (data) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setShowAuthDialog(true);
      return;
    }
    handleRegistrationSubmit(data);
  };

  const handleTextareaInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <>
      <div className="py-12 md:py-16">
        <Card className="max-w-lg w-full mx-auto p-4 sm:p-6 md:p-8 shadow-2xl bg-card">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-headline">Athlete Registration</CardTitle>
            <CardDescription className="text-md md:text-lg text-muted-foreground">
              Create your profile to connect with local sports clubs and showcase your talent
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center flex flex-col items-center gap-4 py-8">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <h2 className="text-2xl font-bold font-headline">Athlete Registered</h2>
                  <p className="text-muted-foreground">You can now start applying to clubs.</p>
                  <Button asChild className="mt-4">
                      <Link href="/clubs">Find Clubs</Link>
                  </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <User className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold font-headline">Personal Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="age" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age *</FormLabel>
                          <FormControl><Input type="number" placeholder="Your age" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl><Input placeholder="Your phone number" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="location" render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Location (City, State) *</FormLabel>
                          <FormControl><Input placeholder="e.g., Mumbai, Maharashtra" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </section>

                  <Separator />

                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold font-headline">Sports Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="primarySport" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Sport *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select your sport" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="football">Football</SelectItem>
                                <SelectItem value="basketball">Basketball</SelectItem>
                                <SelectItem value="tennis">Tennis</SelectItem>
                                <SelectItem value="cricket">Cricket</SelectItem>
                                <SelectItem value="athletics">Athletics</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="highestLevel" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Highest Level Played *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select your level" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="youth">Youth</SelectItem>
                                    <SelectItem value="high-school">High School</SelectItem>
                                    <SelectItem value="college">College</SelectItem>
                                    <SelectItem value="semi-pro">Semi-Pro</SelectItem>
                                    <SelectItem value="professional">Professional</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="experience" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <FormControl><Input type="number" placeholder="e.g., 5" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="achievements" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Key Achievements</FormLabel>
                          <FormControl><Textarea className="resize-none overflow-hidden" onInput={handleTextareaInput} placeholder="List your major achievements, awards, or recognitions..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="about" render={({ field }) => (
                        <FormItem>
                          <FormLabel>About You</FormLabel>
                          <FormControl><Textarea className="resize-none overflow-hidden" onInput={handleTextareaInput} placeholder="Tell us about yourself, your goals, and what makes you unique..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </section>

                  <Separator />

                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Youtube className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold font-headline">Sports Highlights</h3>
                    </div>
                     <FormField control={form.control} name="youtubeUrl" render={({ field }) => (
                        <FormItem>
                          <FormLabel>YouTube Highlights URL</FormLabel>
                          <FormControl><Input placeholder="https://www.youtube.com/watch?v=..." {...field} /></FormControl>
                           <p className="text-sm text-muted-foreground">Upload your highlights to YouTube and paste the video URL here.</p>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </section>
                  
                  <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Registering...' : 'Register as Athlete'}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Already registered? Your profile will be reviewed and you'll be contacted for suitable opportunities.
                  </p>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Authentication Required</AlertDialogTitle>
            <AlertDialogDescription>
              You need to be logged in to register as an athlete. Please log in or create an account to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-start">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button asChild>
                <Link href="/login"><LogIn/> Login</Link>
            </Button>
            <Button asChild variant="secondary">
                <Link href="/signup"><UserPlus/> Sign Up</Link>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
