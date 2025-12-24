import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/sendEmail';

export async function GET() {
  await sendEmail({
    to: 'carlosrsantos2001@gmail.com',
    subject: 'DailyIngrish Test',
    html: `<h1>Hello!</h1><p>Email system is working 🚀</p>`,
  });

  return NextResponse.json({ ok: true });
}
