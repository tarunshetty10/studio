"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Trophy, ShieldCheck, Building } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { clubs as sharedClubs } from "@/data/clubs";

const searchSchema = z.object({
  sport: z.string().min(1, "Please select a sport"),
  location: z.string().min(1, "Location is required"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

const mockClubs = sharedClubs.map(c => ({
  id: c.id,
  name: c.name,
  logo: c.logo,
  sport: c.sport,
  location: c.location,
  verified: c.verified,
}));

export default function ClubFinder() {
  const [foundClubs, setFoundClubs] = useState<typeof mockClubs>([]);
  const [searched, setSearched] = useState(false);
  
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      location: "",
      sport: "",
    },
  });

  const onSubmit: SubmitHandler<SearchFormValues> = (data) => {
    console.log("Searching for clubs with data:", data);
    // Simulate API call
    const filteredClubs = mockClubs.filter(
      (club) =>
        club.sport.toLowerCase() === data.sport.toLowerCase() &&
        club.location.toLowerCase().includes(data.location.toLowerCase())
    );
    setFoundClubs(filteredClubs);
    setSearched(true);
  };

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 shadow-2xl bg-card mb-12">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-headline text-center">Find Your Club</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <FormField
                  control={form.control}
                  name="sport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Trophy/> Sport</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a sport" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Football">Football</SelectItem>
                          <SelectItem value="Basketball">Basketball</SelectItem>
                          <SelectItem value="Tennis">Tennis</SelectItem>
                          <SelectItem value="Cricket">Cricket</SelectItem>
                          <SelectItem value="Athletics">Athletics</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><MapPin/> Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="md:col-span-1 w-full">
                  <Search className="mr-2" /> Find Clubs
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {searched && foundClubs.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foundClubs.map((club) => (
              <Card key={club.id} className="bg-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Image
                      src={club.logo}
                      alt={`${club.name} logo`}
                      width={64}
                      height={64}
                      className="rounded-lg border"
                      data-ai-hint="club logo"
                    />
                    <div className="flex-grow">
                      <CardTitle className="text-xl font-headline flex items-center gap-2">
                        {club.name}
                        {club.verified && <ShieldCheck className="w-5 h-5 text-green-500" />}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1"><Building /> {club.sport}</p>
                      <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1"><MapPin /> {club.location}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                      <Link href={`/clubs/${club.id}`}>View Details</Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {searched && foundClubs.length === 0 && (
            <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No clubs found for your search criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
}
