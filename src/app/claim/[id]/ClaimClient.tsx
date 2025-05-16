'use client';

import PaymentCard from '@/components/PaymentCard';
import UnexistingLink from '@/components/UnexistingLink';
import { usePaymentLink } from '@/lib/usePaymentLink';
import type { LinkStatus } from '@/types/payment';

interface Props {
  id: string;
  demo?: string;
}

export default function ClaimClient({ id, demo }: Props) {
  const { data, status } = usePaymentLink(id);

  if (status === 'loading') return <p className="p-8">Loading…</p>;
  if (status === 'error' || !data) return <UnexistingLink id={id} />;

  const link = demo ? { ...data, status: demo as LinkStatus } : data;

  return <PaymentCard link={link} />;
}