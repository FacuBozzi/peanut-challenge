import { buildOgMetadata } from '@/lib/buildOgMetadata';
import ClaimClient from './ClaimClient';
import type { Metadata } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const res  = await fetch(`${SITE}/api/payment/${id}`).catch(() => null);
  const link = res && res.ok ? await res.json() : null;

  return buildOgMetadata({
    siteUrl: SITE,
    type: link ? 'send' : 'generic',
    username: link?.username,
    amount:   link?.amount,
  });
}

export default async function ClaimPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ demo?: string }>;
}) {
  const { id } = await params;
  const { demo } = await searchParams;
  return (
    <ClaimClient id={id} demo={demo} />
  );
}