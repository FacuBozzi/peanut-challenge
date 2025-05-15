import PaymentCard from '@/components/PaymentCard';
import type { PaymentLink } from '@/types/payment';

export default function RequestPage({
  params,
}: {
  params: { username: string; amount: string };
}) {
  const link: PaymentLink = {
    type: 'request',
    username: params.username,
    amount: Number(params.amount),
    status: 'unclaimed',
  };

  return <PaymentCard link={link} />;
}
