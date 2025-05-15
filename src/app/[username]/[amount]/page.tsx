'use client';

import PaymentCard from '@/components/PaymentCard';
import type { PaymentLink } from '@/types/payment';
import { use } from 'react';

export default function RequestPage({
  params,
}: {
  params: Promise<{ username: string; amount: string }>;
}) {
  const { username, amount } = use(params);
  
  const link: PaymentLink = {
    type: 'request',
    username: username,
    amount: Number(amount),
    status: 'unclaimed',
  };

  return <PaymentCard link={link} />;
}
