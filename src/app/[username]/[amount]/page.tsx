import { buildOgMetadata } from '@/lib/buildOgMetadata';
import RequestPageClient from './RequestPageClient';
import type { Metadata } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const res  = await fetch(`${SITE}/api/payment/${params.id}`).catch(() => null);
  const link = res && res.ok ? await res.json() : null;

  return buildOgMetadata({
    siteUrl: SITE,
    type: link ? 'send' : 'generic',
    username: link?.username,
    amount:   link?.amount,
  });
}

export default function RequestPage({
  params,
}: {
  params: { username: string, amount: string  };
}) {
  return (
    <RequestPageClient username={params.username} amount={params.amount} />
  );
}