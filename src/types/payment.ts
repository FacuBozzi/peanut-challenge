export type LinkStatus = 'loading' | 'unclaimed' | 'claimed' | 'expired' | 'cancelled';

export interface PaymentLink {
  type: 'send' | 'request';
  amount: number;
  username: string;       // creator or requester
  status: LinkStatus;
}