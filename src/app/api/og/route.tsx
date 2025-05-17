/* app/api/og/route.ts */
import { ImageResponse } from '@vercel/og';
import { PaymentCardOG } from '@/og/PaymentCardOG';
import type { NextRequest } from 'next/server';
import type { PaymentLink } from '@/types/payment';

export const runtime = 'edge';

/* ------- preload fonts (Knerd & Montserrat) ------- */
const knerdFilled = fetch(
  `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/fonts/knerd-filled.ttf`
).then(res => res.arrayBuffer());

const knerdOutline = fetch(
  `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/fonts/knerd-outline.ttf`
).then(res => res.arrayBuffer());

const montserratMedium = fetch(
  `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/fonts/montserrat-medium.ttf`
).then(res => res.arrayBuffer());

const montserratSemibold = fetch(
  `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/fonts/montserrat-semibold.ttf`
).then(res => res.arrayBuffer());

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = (searchParams.get('type') ?? 'generic') as 'send' | 'request' | 'generic';
  const username = searchParams.get('username') ?? 'Peanut';
  const amount   = Number(searchParams.get('amount') ?? 0);

  /* 1. If invalid link -> generic banner */
  if (type === 'generic') {
    return new ImageResponse(
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: '#fe91e6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 64,
          fontWeight: 700,
          color: '#fff',
        }}
      >
        Peanut Protocol
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'Montserrat', data: await montserratMedium, style: 'normal' },
        ],
      }
    );
  }

  /* 2. Build link object and render PaymentCardOG */
  const link: PaymentLink = {
    type,
    username,
    amount,
    status: 'unclaimed',
  };

  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return new ImageResponse(
    <PaymentCardOG
      link={link}
      iconSrc={`${site}/peanut-brand/peanut-icon.svg`}
      logoSrc={`${site}/peanut-brand/peanut-logo.svg`}
    />,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Knerd Filled',      data: await knerdFilled,      style: 'normal' },
        { name: 'Knerd Outline',     data: await knerdOutline, style: 'normal' },
        { name: 'Montserrat Medium', data: await montserratMedium, style: 'normal' },
        { name: 'Montserrat SemiBold', data: await montserratSemibold, style: 'normal' },
      ],
    }
  );
}
