"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Trophy, CheckCircle } from "lucide-react";
import { useState } from "react";

const clubSchema = z.object({
  sportType: z.string().min(1, "Sport is required"),
  clubName: z.string().min(1, "Club name is required"),
  location: z.string().min(1, "Location is required"),
  achievements: z.string().optional(),
  instagramUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  youtubeUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  contactEmail: z.string().email("Enter a valid email"),
  contactPhone: z.string().optional(),
  description: z.string().optional(),
});

type ClubFormValues = z.infer<typeof clubSchema>;

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function ClubListingForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ClubFormValues>({
    resolver: zodResolver(clubSchema),
    defaultValues: {
      sportType: "",
      clubName: "",
      location: "",
      achievements: "",
      instagramUrl: "",
      youtubeUrl: "",
      contactEmail: "",
      contactPhone: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<ClubFormValues> = async (data) => {
    if (!db) {
      toast({ title: "Submission failed", description: "App not initialized.", variant: "destructive" });
      return;
    }
    try {
      const docId = slugify(data.clubName);
      await setDoc(
        doc(db, "list-your-club", docId),
        {
          ...data,
          clubName: data.clubName.trim(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      setSubmitted(true);
      toast({ title: "Submitted", description: "Your club request was sent to admins." });
      form.reset();
    } catch (error: any) {
      toast({ title: "Submission failed", description: error?.message || "Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="py-12 md:py-16">
      <Card className="max-w-lg w-full mx-auto p-4 sm:p-6 md:p-8 shadow-2xl bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-headline">List Your Club</CardTitle>
          <CardDescription className="text-md md:text-lg text-muted-foreground">
            Share your club details so our team can review and publish it
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center flex flex-col items-center gap-4 py-8">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h2 className="text-2xl font-bold font-headline">Thanks! We received it.</h2>
              <p className="text-muted-foreground">We'll review your submission shortly.</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold font-headline">Club Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="sportType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sport *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select sport" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="football">Football</SelectItem>
                            <SelectItem value="basketball">Basketball</SelectItem>
                            <SelectItem value="cricket">Cricket</SelectItem>
                            <SelectItem value="tennis">Tennis</SelectItem>
                            <SelectItem value="athletics">Athletics</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="clubName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Club Name *</FormLabel>
                        <FormControl><Input placeholder="e.g., Mumbai City FC Academy" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Location *</FormLabel>
                        <FormControl><Input placeholder="City, State" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="instagramUrl" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram URL</FormLabel>
                        <FormControl><Input placeholder="https://instagram.com/yourclub" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="youtubeUrl" render={({ field }) => (
                      <FormItem>
                        <FormLabel>YouTube URL</FormLabel>
                        <FormControl><Input placeholder="https://youtube.com/@yourclub" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="achievements" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Achievements</FormLabel>
                        <FormControl><Input placeholder="Championships, cups, awards" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="contactEmail" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email *</FormLabel>
                        <FormControl><Input type="email" placeholder="club@email.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="contactPhone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl><Input placeholder="Optional" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>About the Club</FormLabel>
                      <FormControl><Textarea placeholder="Brief description, programs offered, age groups, fees, etc." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </section>

                <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Submitting..." : "Submit Club Details"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


