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
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Users, CheckCircle } from "lucide-react";
import { useState } from "react";

const findAthletesSchema = z.object({
  sportType: z.string().min(1, "Sport is required"),
  location: z.string().min(1, "Location is required"),
  position: z.string().min(1, "Position is required"),
  ageGroup: z.string().optional(),
  skillLevel: z.string().optional(),
  description: z.string().optional(),
  contactEmail: z.string().email("Enter a valid email"),
  contactPhone: z.string().optional(),
});

type FindAthletesFormValues = z.infer<typeof findAthletesSchema>;

export default function FindAthletesForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FindAthletesFormValues>({
    resolver: zodResolver(findAthletesSchema),
    defaultValues: {
      sportType: "",
      location: "",
      position: "",
      ageGroup: "",
      skillLevel: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const onSubmit: SubmitHandler<FindAthletesFormValues> = async (data) => {
    if (!db) {
      toast({ title: "Submission failed", description: "App not initialized.", variant: "destructive" });
      return;
    }
    try {
      await addDoc(collection(db, "Athelets Wanted"), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setSubmitted(true);
      toast({ title: "Submitted", description: "Your request was saved for admin review." });
      form.reset();
    } catch (error: any) {
      toast({ title: "Submission failed", description: error?.message || "Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="py-12 md:py-16">
      <Card className="max-w-lg w-full mx-auto p-4 sm:p-6 md:p-8 shadow-2xl bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-headline">Find Athletes</CardTitle>
          <CardDescription className="text-md md:text-lg text-muted-foreground">
            Post your requirements and we will match interested athletes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center flex flex-col items-center gap-4 py-8">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h2 className="text-2xl font-bold font-headline">Thanks! Request received.</h2>
              <p className="text-muted-foreground">Our team will review and reach out soon.</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold font-headline">Requirement Details</h3>
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
                    <FormField control={form.control} name="position" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position *</FormLabel>
                        <FormControl><Input placeholder="e.g., Striker, Point Guard, Bowler" {...field} /></FormControl>
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
                    <FormField control={form.control} name="ageGroup" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age Group</FormLabel>
                        <FormControl><Input placeholder="e.g., U14, U18, Open" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="skillLevel" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Level</FormLabel>
                        <FormControl><Input placeholder="Beginner/Intermediate/Advanced" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Details</FormLabel>
                      <FormControl><Textarea placeholder="Training schedule, duration, stipend, trials info, etc." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
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
                </section>

                <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Submitting..." : "Submit Requirement"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


