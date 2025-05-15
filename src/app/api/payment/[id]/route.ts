import { NextResponse } from 'next/server';
import type { PaymentLink } from '@/types/payment';

const db: Record<string, PaymentLink> = {
  abc123: { type: 'send', amount: 6969,   username: 'peanut', status: 'unclaimed' },
  xyz789: { type: 'send', amount: 9.99, username: 'kkonrad', status: 'unclaimed'  },
  foo456: { type: 'send', amount: 77,   username: 'alice',  status: 'unclaimed'  },
};

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const link = db[params.id];
  return link
    ? NextResponse.json(link)
    : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
