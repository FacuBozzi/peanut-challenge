'use client';

import PaymentCard from '@/components/PaymentCard';
import { usePaymentLink } from '@/lib/usePaymentLink';
import { useSearchParams } from 'next/navigation';
import type { LinkStatus } from '@/types/payment';
import { use } from 'react';
import UnexistingLink from '@/components/UnexistingLink';
import type { Metadata } from 'next';
import { buildOgMetadata } from '@/lib/buildOgMetadata';

export default function ClaimPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, status } = usePaymentLink(id);
  const searchParams = useSearchParams();

  if (status === 'loading') return <p className="p-8">Loading…</p>;
  if (status === 'error' || !data)  return <UnexistingLink id={id}/>;

  // override in ClaimPage after fetch succeeds
  const demo = searchParams.get('demo') as LinkStatus | null;
  const link  = demo ? { ...data, status: demo } : data;

  return <PaymentCard link={link} />;
}

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