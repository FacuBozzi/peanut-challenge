/* app/api/og/route.ts */
import { ImageResponse } from '@vercel/og';
import { PaymentCardOG } from '@/og/PaymentCardOG';
import type { NextRequest } from 'next/server';
import type { PaymentLink } from '@/types/payment';

export const runtime = 'edge';

// TODO: REMOVE THIS CODE
/* ------- preload fonts (Knerd & Montserrat) ------- */
// const knerdFilled = fetch(
//   `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/fonts/knerd-filled.ttf`
// ).then(res => res.arrayBuffer());

// const knerdOutline = fetch(
//   `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/fonts/knerd-outline.ttf`
// ).then(res => res.arrayBuffer());

// const montserratMedium = fetch(
//   `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/fonts/montserrat-medium.ttf`
// ).then(res => res.arrayBuffer());

// const montserratSemibold = fetch(
//   `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/fonts/montserrat-semibold.ttf`
// ).then(res => res.arrayBuffer());

export async function GET(req: NextRequest) {
  // grab the full origin (protocol + host + port)
  const origin = new URL(req.url).origin;

  // fetch the four fonts in parallel
  const [knerdFilled, knerdOutline, montserratMedium, montserratSemibold] =
    await Promise.all([
      fetch(`${origin}/fonts/knerd-filled.ttf`).then(r => r.arrayBuffer()),
      fetch(`${origin}/fonts/knerd-outline.ttf`).then(r => r.arrayBuffer()),
      fetch(`${origin}/fonts/montserrat-medium.ttf`).then(r => r.arrayBuffer()),
      fetch(`${origin}/fonts/montserrat-semibold.ttf`).then(r => r.arrayBuffer()),
    ]);

  const { searchParams } = new URL(req.url);
  const type = (searchParams.get("type") ?? "generic") as
    | "send"
    | "request"
    | "generic";
  const username = searchParams.get("username") ?? "Peanut";
  const amount = Number(searchParams.get("amount") ?? 0);

  if (type === "generic") {
    return new ImageResponse(
      <div style={{ /* … */ }}>Peanut Protocol</div>,
      {
        width: 1200,
        height: 630,
        fonts: [{ name: "Montserrat", data: montserratMedium, style: "normal" }],
      }
    );
  }

  const link: PaymentLink = { type, username, amount, status: "unclaimed" };
  return new ImageResponse(
    <PaymentCardOG
      link={link}
      iconSrc={`${origin}/peanut-brand/peanut-icon.svg`}
      logoSrc={`${origin}/peanut-brand/peanut-logo.svg`}
    />,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Knerd Filled", data: knerdFilled, style: "normal" },
        { name: "Knerd Outline", data: knerdOutline, style: "normal" },
        { name: "Montserrat Medium", data: montserratMedium, style: "normal" },
        { name: "Montserrat SemiBold", data: montserratSemibold, style: "normal" },
      ],
    }
  );
}

