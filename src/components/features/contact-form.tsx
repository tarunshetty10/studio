"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// Using API route instead of Server Action to work over tunnels
import React from "react";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string()
    .min(10, "Message must be at least 10 characters long")
    .max(300, "Message must be no more than 300 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const MAX_CHARS = 300;

export default function ContactForm() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const messageValue = form.watch("message", "");
  const charsLeft = MAX_CHARS - (messageValue?.length || 0);

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok && result.success) {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: result?.error || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMessageInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">CONTACT US</CardTitle>
          <CardDescription>Please fill this form and we will get back to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Your name"
              />
              {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="your.email@example.com"
              />
              {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                {...form.register("message")}
                placeholder="Your message"
                rows={3}
                className="resize-none overflow-hidden"
                onInput={handleMessageInput}
                maxLength={MAX_CHARS}
              />
              <div className="text-right text-sm text-muted-foreground">
                <span className={cn(
                  "transition-colors",
                  { "text-yellow-500": charsLeft <= 50 && charsLeft > 0 },
                  { "text-destructive": charsLeft <= 0 }
                )}>
                  {charsLeft}
                </span> / {MAX_CHARS}
                {charsLeft <= 0 && <span className="text-destructive ml-2">Limit reached</span>}
              </div>
              {form.formState.errors.message && !messageValue && <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>}
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'SUBMIT'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
