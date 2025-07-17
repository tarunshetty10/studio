"use client";

import { useState } from "react";
import { personalizeMarketingContent } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2 } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

type Inputs = {
  userGoals: string;
  pastBehavior: string;
  baseMarketingContent: string;
};

export default function PersonalizedMarketing() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Inputs>({
    defaultValues: {
      userGoals: "Looking for professional football trials in Europe.",
      pastBehavior: "Viewed 10 club profiles, applied to 2 trials.",
      baseMarketingContent: "Find your next trial and get scouted by top clubs. Sign up now for exclusive access to opportunities."
    }
  });
  const [personalizedContent, setPersonalizedContent] = useState("");
  const { toast } = useToast();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setPersonalizedContent("");
    try {
      const result = await personalizeMarketingContent(data);
      setPersonalizedContent(result.personalizedContent);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to personalize content. Please try again.",
        variant: "destructive",
      });
      console.error(err);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <Wand2 className="mx-auto h-10 w-10 text-primary mb-2" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline">AI-Powered Personalization</h2>
            <p className="text-muted-foreground text-lg">Dynamically adapt marketing language based on user behavior or stated goals.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-lg bg-background">
            <CardHeader>
              <CardTitle>Personalization Tool</CardTitle>
              <CardDescription>Enter user data to generate tailored marketing copy.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userGoals">User Goals</Label>
                  <Input id="userGoals" placeholder="e.g., Get a scholarship" {...register("userGoals", { required: "User goals are required." })} />
                  {errors.userGoals && <p className="text-sm text-destructive">{errors.userGoals.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pastBehavior">Past Behavior</Label>
                  <Input id="pastBehavior" placeholder="e.g., Viewed 5 soccer trials" {...register("pastBehavior", { required: "Past behavior is required." })} />
                  {errors.pastBehavior && <p className="text-sm text-destructive">{errors.pastBehavior.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="baseMarketingContent">Base Marketing Content</Label>
                  <Textarea id="baseMarketingContent" placeholder="Enter base marketing copy here" rows={4} {...register("baseMarketingContent", { required: "Base content is required." })} />
                  {errors.baseMarketingContent && <p className="text-sm text-destructive">{errors.baseMarketingContent.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Personalize Content
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="sticky top-24">
            <Card className="h-full shadow-lg bg-background">
              <CardHeader>
                <CardTitle>Personalized Result</CardTitle>
                <CardDescription>The AI-generated content will appear here.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="bg-muted rounded-lg p-6 text-muted-foreground flex items-center justify-center">
                      {isSubmitting ? (
                          <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                      ) : personalizedContent ? (
                          <p className="text-foreground text-base">{personalizedContent}</p>
                      ) : (
                          <p className="italic">Your personalized marketing content will be shown here...</p>
                      )}
                  </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
