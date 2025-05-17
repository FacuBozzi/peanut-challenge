"use client";

import { twMerge } from "tailwind-merge";
import type { PaymentLink } from "@/types/payment";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "700"] });

const statusStyle: Record<PaymentLink["status"], string> = {
  loading: "bg-gray-200 text-gray-500 animate-pulse",
  unclaimed: "bg-[#fe91e6] text-yellow-800",
  claimed: "bg-green-100 text-green-800",
  expired: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-800",
};

export default function PaymentCard({ link }: { link: PaymentLink }) {
  const frame = "flex justify-center rounded-2xl bg-white p-4";
  const inner = twMerge(
    "relative w-200 flex flex-col items-center space-y-4 border-3 border-black !text-black p-6",
    statusStyle[link.status]
  );

  return (
    <div className={frame}>
      <div className={inner}>
        {/* top‐left logo */}
        <div className="w-40 self-start flex items-center">
          <Image
            src="/peanut-brand/peanut-icon.svg"
            width={100}
            height={100}
            alt="Peanut"
            className="h-9"
          />
          <Image
            src="/peanut-brand/peanut-logo.svg"
            width={100}
            height={100}
            alt="Peanut"
            className="h-6"
          />
        </div>

        {/* username */}
        <h2 className={`text-5xl font-bold ${montserrat.className} font-bold`}>
          {link.username}
        </h2>

        {/* action text */}
        <p className={`text-3xl ${montserrat.className} font-medium`}>
          {link.type === "send" ? "is sending you" : "is requesting"}
        </p>

        {/* big text amount */}
        <p
          className={`${twMerge(
            "text-white",
          )} relative inline-block [-webkit-text-stroke:3px_black]`}
          style={{ fontSize: "140px", fontFamily: "'Knerd Filled', sans-serif" }}
        >
          <span
            aria-hidden="true"
            className="absolute top-[3px] left-[3px]
           text-transparent 
           [-webkit-text-stroke:3px_#000]"
          >
            ${link.amount}
          </span>

          <span className="relative text-white">${link.amount}</span>
        </p>

        {/* {link.status === 'unclaimed' ? (
          <button className="w-full py-2 rounded-xl bg-black text-white hover:opacity-80">
            {link.type === 'send' ? 'Claim now' : 'Pay now'}
          </button>
        ) : (
          <p className="italic text-sm">Status: {link.status}</p>
        )} */}
      </div>
    </div>
  );
}
