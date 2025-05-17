import { buildOgMetadata } from '@/lib/buildOgMetadata';
import RequestPageClient from './RequestPageClient';
import type { Metadata } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

type RequestParams = Promise<{
  username: string;
  amount: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: RequestParams;
}): Promise<Metadata> {
  const { username, amount } = await params;

  return buildOgMetadata({
    siteUrl: SITE,
    type: 'request', // Explicit type for request links
    username: username,
    amount: Number(amount),
  });
}

export default async function RequestPage({
  params,
}: {
  params: RequestParams;
}) {
  const { username, amount } = await params;
  return (
    <RequestPageClient 
      username={username} 
      amount={amount} 
    />
  );
}