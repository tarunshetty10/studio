'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Calendar, Mail } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-secondary p-4">
        <div className="container mx-auto max-w-4xl py-8">
          <Card className="shadow-2xl bg-card">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FileText className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl font-headline">Terms of Service</CardTitle>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Effective Date: December 2024</span>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[70vh] pr-4">
                <div className="space-y-6 text-sm leading-relaxed">
                  <div className="bg-background p-4 rounded-lg border">
                    <p className="text-muted-foreground">
                      Welcome to GetYourTrials ("Company," "we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website, platform, and related services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms.
                    </p>
                  </div>

                  <section>
                    <h2 className="text-xl font-semibold font-headline mb-3 text-primary flex items-center justify-center gap-2">
                      <span className="text-2xl">1.</span>
                      <span>Scope of Services</span>
                    </h2>
                    <div className="space-y-3 text-muted-foreground">
                      <p>GetYourTrials is a digital sports platform designed to connect athletes with local clubs for trials and opportunities. Through the Services, users may:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Create and manage personal profiles (athletes) or organization profiles (clubs)</li>
                        <li>Discover clubs and apply for trials</li>
                        <li>Upload highlights and achievements, including YouTube links</li>
                        <li>Receive AI-powered motivational content and marketing support</li>
                        <li>Access AI-enabled assistance through our help center</li>
                      </ul>
                      <p>Access to certain features may require account registration. Users are responsible for maintaining the confidentiality of their login credentials.</p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold font-headline mb-3 text-primary flex items-center justify-center gap-2">
                      <span className="text-2xl">2.</span>
                      <span>User Content & Intellectual Property</span>
                    </h2>
                    <div className="space-y-3 text-muted-foreground">
                      <p>Users may upload or share information including personal details, achievements, highlights, and related content ("User Content").</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Ownership:</strong> Users retain ownership of all User Content they provide.</li>
                        <li><strong>License to Us:</strong> By submitting User Content, users grant us a limited, non-exclusive, worldwide license to host, use, display, and distribute such content solely for the operation of the Services.</li>
                        <li><strong>Responsibilities:</strong> Users are solely responsible for ensuring their content is accurate, lawful, and does not infringe the rights of others.</li>
                        <li><strong>Prohibited Content:</strong> Users may not post unlawful, harmful, or inappropriate material. We reserve the right to remove content or suspend accounts in violation of these Terms.</li>
                        <li><strong>Our IP:</strong> All trademarks, service marks, logos, and platform features remain our exclusive property or that of our licensors.</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold font-headline mb-3 text-primary flex items-center justify-center gap-2">
                      <span className="text-2xl">3.</span>
                      <span>Data & Privacy</span>
                    </h2>
                    <div className="space-y-3 text-muted-foreground">
                      <p>We collect personal information including names, contact details, locations, sports achievements, and related links to deliver our Services.</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Privacy Policy:</strong> All data practices are outlined in our Privacy Policy, which is incorporated into these Terms by reference.</li>
                        <li><strong>Third-Party Processing:</strong> Our Services rely on Firebase, Google Cloud, and related analytics tools for hosting, authentication, and monitoring. These providers may process data subject to their own policies.</li>
                        <li><strong>User Rights:</strong> Users may request data deletion or account removal in accordance with applicable laws.</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold font-headline mb-3 text-primary flex items-center justify-center gap-2">
                      <span className="text-2xl">4.</span>
                      <span>AI Features & Data Use</span>
                    </h2>
                    <div className="space-y-3 text-muted-foreground">
                      <p>The platform uses AI technology to generate motivational content, personalized marketing support, and user assistance.</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Users retain ownership of the prompts and data submitted.</li>
                        <li>Outputs generated are provided for informational and platform-related purposes only.</li>
                        <li>Users may opt-out of having their data used to improve AI models.</li>
                        <li>Harmful, illegal, or abusive use of AI features is strictly prohibited.</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold font-headline mb-3 text-primary flex items-center justify-center gap-2">
                      <span className="text-2xl">5.</span>
                      <span>Limitations, Disclaimers, and Warranties</span>
                    </h2>
                    <div className="space-y-3 text-muted-foreground">
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>No Guarantee of Outcome:</strong> We do not guarantee selection, success in trials, or acceptance by clubs.</li>
                        <li><strong>Service Provided "As Is":</strong> Access to the Services is provided without warranties of any kind.</li>
                        <li><strong>Downtime & Liability:</strong> While hosting is supported by Firebase with a 99.95% uptime commitment, we make no absolute guarantees regarding uninterrupted availability.</li>
                        <li><strong>Third-Party Services:</strong> We are not liable for the actions, services, or policies of third-party platforms such as clubs, YouTube, or Google Cloud.</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold font-headline mb-3 text-primary flex items-center justify-center gap-2">
                      <span className="text-2xl">6.</span>
                      <span>Paid Services (Future Consideration)</span>
                    </h2>
                    <div className="space-y-3 text-muted-foreground">
                      <p>Currently, the Services are free of charge. Should premium features be introduced in the future:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>We will provide at least 14 days' notice before any pricing change.</li>
                        <li>Clear billing and renewal terms will be disclosed.</li>
                        <li>Refund and cancellation policies will be set forth at that time.</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold font-headline mb-3 text-primary flex items-center justify-center gap-2">
                      <span className="text-2xl">7.</span>
                      <span>Termination & Suspension</span>
                    </h2>
                    <div className="space-y-3 text-muted-foreground">
                      <p>We may suspend or terminate user access if:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Terms are violated</li>
                        <li>Inaccurate, fraudulent, or inappropriate content is posted</li>
                        <li>The Services are abused for spam or misconduct</li>
                      </ul>
                      <p>Users are expected to maintain accurate profiles, respect other members, and comply with club rules and requirements.</p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold font-headline mb-3 text-primary flex items-center justify-center gap-2">
                      <span className="text-2xl">8.</span>
                      <span>Governing Law & Dispute Resolution</span>
                    </h2>
                    <div className="space-y-3 text-muted-foreground">
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>These Terms shall be governed by the laws of the jurisdiction where GetYourTrials operates.</li>
                        <li>Minor disputes may be resolved in small claims court.</li>
                        <li>Larger disputes will be settled through binding arbitration.</li>
                        <li>Users waive participation in class or representative actions.</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold font-headline mb-3 text-primary flex items-center justify-center gap-2">
                      <span className="text-2xl">9.</span>
                      <span>Third-Party Services & Obligations</span>
                    </h2>
                    <div className="space-y-3 text-muted-foreground">
                      <p>Our Services integrate with and depend on third-party platforms. By using GetYourTrials, users also agree to comply with:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Google Terms of Service</li>
                        <li>YouTube Terms of Service</li>
                        <li>Any other applicable third-party agreements</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold font-headline mb-3 text-primary flex items-center justify-center gap-2">
                      <span className="text-2xl">10.</span>
                      <span>Updates to Terms</span>
                    </h2>
                    <div className="space-y-3 text-muted-foreground">
                      <p>We may update these Terms from time to time. Users will be notified of material changes at least 14 days before they take effect via email, in-app notifications, or website postings. Continued use after updates constitutes acceptance of the revised Terms.</p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold font-headline mb-3 text-primary flex items-center justify-center gap-2">
                      <span className="text-2xl">11.</span>
                      <span>Contact</span>
                    </h2>
                    <div className="space-y-3 text-muted-foreground">
                      <p>For questions regarding these Terms, please contact us at:</p>
                      <div className="flex items-center gap-2 text-primary">
                        <Mail className="h-4 w-4" />
                        <span>support@getyourtrials.com</span>
                      </div>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}


