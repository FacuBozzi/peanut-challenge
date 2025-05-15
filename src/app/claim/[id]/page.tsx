'use client';

import PaymentCard from '@/components/PaymentCard';
import { usePaymentLink } from '@/lib/usePaymentLink';
import { useSearchParams } from 'next/navigation';
import type { LinkStatus } from '@/types/payment';

export default function ClaimPage({ params }: { params: { id: string } }) {
  const { data, status } = usePaymentLink(params.id);
  const searchParams = useSearchParams();

  if (status === 'loading') return <p className="p-8">Loading…</p>;
  if (status === 'error' || !data)  return <p className="p-8">Link not found</p>;

  // override in ClaimPage after fetch succeeds
  const demo = searchParams.get('demo') as LinkStatus | null;
  const link  = demo ? { ...data, status: demo } : data;

  return <PaymentCard link={link} />;
}
