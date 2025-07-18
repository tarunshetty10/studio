"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Settings, MessageSquareQuote, Briefcase, Search, Loader2 } from 'lucide-react';
import { answerHelpQuestion } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const searchSchema = z.object({
  query: z.string().min(3, "Please enter at least 3 characters"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

const helpTopics = [
  {
    icon: Rocket,
    title: 'Get Started',
    description: 'Learn how to create your profile and start your journey on our platform.',
  },
  {
    icon: Settings,
    title: 'Account Settings',
    description: 'Manage your profile, notifications, and other account preferences.',
  },
  {
    icon: MessageSquareQuote,
    title: 'FAQ',
    description: 'Find answers to frequently asked questions about trials and clubs.',
  },
  {
    icon: Briefcase,
    title: 'Troubleshooting',
    description: 'Having an issue? Find solutions to common technical problems.',
  },
];

const suggestedQuestions = [
    "How do I create an athlete profile?",
    "What kind of sports are available?",
    "How can I find trials near me?",
];

export default function HelpCenter() {
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const { toast } = useToast();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
  });

  const handleSuggestedQuestion = (question: string) => {
    form.setValue("query", question);
    onSubmit({ query: question });
  };

  const onSubmit: SubmitHandler<SearchFormValues> = async (data) => {
    setIsLoading(true);
    setAnswer("");
    try {
      const result = await answerHelpQuestion({ question: data.query });
      setAnswer(result.answer);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get an answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">
            What can we help you with?
          </h1>
          <div 
            className="max-w-2xl mx-auto mt-8"
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
          >
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="relative">
                <Input
                  {...form.register("query")}
                  placeholder="Ask a question or search by keyword"
                  className="w-full h-14 pl-6 pr-14 text-lg bg-background text-primary-foreground"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
                </Button>
              </div>
              {form.formState.errors.query && <p className="text-sm text-yellow-300 mt-2">{form.formState.errors.query.message}</p>}
            </form>
            <div className={`transition-opacity duration-300 ${isSearchHovered ? 'opacity-100' : 'opacity-0'}`}>
                {isSearchHovered && (
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {suggestedQuestions.map((q) => (
                            <Button key={q} variant="outline" size="sm" onClick={() => handleSuggestedQuestion(q)} disabled={isLoading}>
                                {q}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          {(isLoading || answer) && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4 font-headline text-center">Answer</h2>
              <Card className="max-w-4xl mx-auto shadow-lg">
                <CardContent className="p-6">
                  {isLoading ? (
                    <div className="flex justify-center items-center min-h-[100px]">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    </div>
                  ) : (
                    <p className="text-lg text-foreground">{answer}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline text-glow">Find Answers</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpTopics.map((topic, index) => (
              <Card key={index} className="text-left bg-background hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <topic.icon className="h-6 w-6 text-primary" />
                  </div>
                   <h3 className="text-xl font-bold font-headline">{topic.title}</h3>
                </div>
                <p className="text-muted-foreground">{topic.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
