import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { sendAdminContactEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body || {};
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const payload = { name, email, message, createdAt: new Date().toISOString() };
    let contactId: string | undefined;
    try {
      if (adminDb) {
        const ref = await adminDb.collection('contacts').add(payload);
        contactId = ref.id;
        await adminDb.collection('Customer Service').add({ ...payload, contactRefId: contactId });
      } else if (db) {
        const ref = await addDoc(collection(db, 'contacts'), payload);
        contactId = ref.id;
        await addDoc(collection(db, 'Customer Service'), { ...payload, contactRefId: contactId });
      }
    } catch (e) {
      // continue; we still respond success even if DB write fails
      console.warn('Contact DB write failed:', (e as any)?.message || e);
    }

    try {
      await sendAdminContactEmail({ name, email, message });
    } catch (e) {
      console.warn('Contact email failed:', (e as any)?.message || e);
    }

    return NextResponse.json({ success: true, id: contactId });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to submit contact form' }, { status: 500 });
  }
}


