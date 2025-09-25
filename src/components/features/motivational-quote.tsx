"use client";

import { useState } from "react";
import { generateMotivationalQuote } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MotivationalQuote() {
  const [topic, setTopic] = useState("perseverance");
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setQuote("");
    try {
      const res = await fetch('/api/ai/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || 'Failed to generate');
      setQuote(result.quote);
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error?.message || "Failed to generate a quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-3xl mx-auto shadow-lg border-2 border-primary/20">
          <CardHeader className="text-center">
            <Sparkles className="mx-auto h-10 w-10 text-primary mb-2" />
            <CardTitle className="text-3xl font-headline text-glow">Need a Boost?</CardTitle>
            <CardDescription className="text-lg">Generate a motivational quote to keep you going.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="w-full">
                <Label htmlFor="topic" className="sr-only">Topic</Label>
                <Input
                  id="topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., teamwork, winning"
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : "Generate Quote"}
              </Button>
            </form>
            {(isLoading || quote) && (
              <div className="bg-primary/10 p-6 rounded-lg text-center min-h-[100px] flex items-center justify-center transition-all duration-300">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                ) : (
                  <p className="text-xl font-medium text-primary italic">"{quote}"</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
