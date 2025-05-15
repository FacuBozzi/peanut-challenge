'use client';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { PaymentLink } from '@/types/payment';

const statusStyle: Record<PaymentLink['status'], string> = {
  loading:    'bg-gray-200 text-gray-500 animate-pulse',
  unclaimed:  'bg-yellow-100 text-yellow-800',
  claimed:    'bg-green-100 text-green-800',
  expired:    'bg-gray-100 text-gray-600',
  cancelled:  'bg-red-100 text-red-800',
};

export default function PaymentCard({ link }: { link: PaymentLink }) {
  const css = twMerge(
    'max-w-sm mx-auto mt-12 rounded-2xl shadow p-6 space-y-4',
    statusStyle[link.status],
  );

  return (
    <div className={css}>
      <h1 className="text-2xl font-bold">
        {link.type === 'send' ? '💸 Claim money!' : '💰 Pay request'}
      </h1>

      <p className="text-lg">
        <span className="font-semibold">{link.username}</span> {link.type === 'send' ? 'sent you' : 'is requesting'}
        &nbsp;<span className="font-mono">${link.amount}</span>
      </p>

      {link.status === 'unclaimed' && (
        <button className="w-full py-2 rounded-xl bg-black text-white hover:opacity-80">
          {link.type === 'send' ? 'Claim now' : 'Pay now'}
        </button>
      )}

      {link.status !== 'unclaimed' && (
        <p className="italic text-sm">Status: {link.status}</p>
      )}
    </div>
  );
}
