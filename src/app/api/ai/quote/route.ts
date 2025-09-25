import { NextRequest, NextResponse } from 'next/server';
import { generateMotivationalQuote as generateMotivationalQuoteFlow } from '@/ai/flows/generate-motivational-quote';

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    const key = process.env.GOOGLE_GENAI_API_KEY
      || process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY
      || process.env.NEXT_PUBLIC_GEMINI_API_KEY
      || process.env.GEMINI_API_KEY;
    if (!key) {
      return NextResponse.json({ error: 'Gemini API key is missing on server.' }, { status: 500 });
    }
    const result = await generateMotivationalQuoteFlow({ topic });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to generate quote' }, { status: 500 });
  }
}


