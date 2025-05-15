import PaymentCard from '@/components/PaymentCard';
import { usePaymentLink } from '@/lib/usePaymentLink';

export default function ClaimPage({ params }: { params: { id: string } }) {
  const { data, status } = usePaymentLink(params.id);

  if (status === 'loading') return <p className="p-8">Loading…</p>;
  if (status === 'error'  || !data) return <p className="p-8">Link not found</p>;

  return <PaymentCard link={data} />;
}
