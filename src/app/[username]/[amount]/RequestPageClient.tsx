'use client';

import PaymentCard from '@/components/PaymentCard';
import { buildOgMetadata } from '@/lib/buildOgMetadata';
import type { PaymentLink } from '@/types/payment';
import type { Metadata } from 'next';

export default function RequestPageClient({
  username,
  amount,
}: {
  username: string;
  amount: string;
}) {
  const link: PaymentLink = {
    type: 'request',
    username: username,
    amount: Number(amount),
    status: 'unclaimed',
  };

  return <PaymentCard link={link} />;
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function generateMetadata(
  { params }: { params: { username: string; amount: string } }
): Metadata {
  return buildOgMetadata({
    siteUrl: SITE,
    type: 'request',
    username: params.username,
    amount: Number(params.amount),
  });
}