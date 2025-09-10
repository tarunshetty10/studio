"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

type ApplyForTrialsButtonProps = {
  clubId: number;
  clubName: string;
};

export default function ApplyForTrialsButton({ clubId, clubName }: ApplyForTrialsButtonProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);

  const applicationDocId = useMemo(() => {
    const uid = auth?.currentUser?.uid;
    return uid ? `${uid}_${clubId}` : undefined;
  }, [clubId, auth?.currentUser?.uid]);

  useEffect(() => {
    const checkState = async () => {
      if (!auth || !db) {
        setLoading(false);
        return;
      }
      const user = auth.currentUser;
      if (!user) {
        setNeedsAuth(true);
        setLoading(false);
        return;
      }
      try {
        const appRef = doc(db, "athletes", user.uid, "applications", String(clubId));
        const appSnap = await getDoc(appRef);
        setApplied(appSnap.exists());
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    checkState();
  }, [clubId]);

  const handleApply = async () => {
    if (!auth || !db) return;
    const user = auth.currentUser;
    if (!user) {
      setNeedsAuth(true);
      return;
    }
    setLoading(true);
    try {
      // Ensure athlete profile exists
      const athleteRef = doc(db, "athletes", user.uid);
      const athleteSnap = await getDoc(athleteRef);
      if (!athleteSnap.exists()) {
        toast({
          title: "Complete your profile",
          description: "Please create an athlete profile before applying.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Create application document
      const applicationRef = doc(db, "athletes", user.uid, "applications", String(clubId));
      await setDoc(applicationRef, {
        clubId,
        clubName,
        athleteUid: user.uid,
        athlete: athleteSnap.data(),
        status: "submitted",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });

      setApplied(true);
      toast({ title: "Applied", description: `Your application to ${clubName} was submitted.` });
    } catch (error: any) {
      toast({ title: "Failed to apply", description: error?.message || "Try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (needsAuth) {
    return (
      <div className="space-y-2">
        <Button asChild className="w-full" variant="default">
          <Link href="/login"><LogIn className="mr-2"/> Login to Apply</Link>
        </Button>
        <Button asChild className="w-full" variant="secondary">
          <Link href="/signup"><UserPlus className="mr-2"/> Create Account</Link>
        </Button>
      </div>
    );
  }

  return (
    <Button className="w-full" size="lg" onClick={handleApply} disabled={loading || applied}>
      {applied ? "Applied" : (loading ? "Applying..." : "Apply for Trials")}
    </Button>
  );
}


