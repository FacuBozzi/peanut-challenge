import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

// edge function
export const runtime = "edge";

// You can swap this out for next/font/local later
const knerdFilled = fetch(
  new URL("../../fonts/knerd-filled.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

console.log("interSemiBold", knerdFilled);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // collect dynamic bits -> /api/og?username=kkonrad&amount=6969
  const username = searchParams.get("username");
  const amount = searchParams.get("amount");
  const type = searchParams.get("type"); // 'send' | 'request'
  const fallback = !username || !amount;

  /* fallback */
  if (fallback) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#f472b6",
          }}
        >
          <h1
            style={{
              fontSize: "3.75rem",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            Peanut Protocol
          </h1>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  /* dynamic image */
  return new ImageResponse(
    (
      <div
        tw="flex flex-col items-center justify-center w-full h-full"
        style={{ backgroundColor: "#ff7ad0" /* peanut pink */ }}
      >
        <span tw="absolute top-10 left-12 font-bold text-white text-lg tracking-widest">
          PEANUT
        </span>

        <h2 tw="mb-6 text-5xl font-bold text-black">
          {username}
          <span tw="block text-2xl font-normal mt-2">
            {type === "send" ? "is sending you" : "is requesting"}
          </span>
        </h2>

        <p tw="text-8xl font-extrabold text-white drop-shadow-lg">${amount}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Knerd",
          data: await knerdFilled,
          style: "normal",
        },
      ],
    }
  );
}
