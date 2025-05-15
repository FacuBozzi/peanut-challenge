import { useEffect, useState } from 'react';
import type { PaymentLink } from '@/types/payment';

export function usePaymentLink(id: string | null) {
  const [data, setData]   = useState<PaymentLink | null>(null);
  const [status, setStat] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    if (!id) return;
    fetch(`/api/payment/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => { setData(d); setStat('ready'); })
      .catch(() => setStat('error'));
  }, [id]);

  return { data, status };
}
