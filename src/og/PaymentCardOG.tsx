import type { PaymentLink } from '@/types/payment';
import { twMerge } from 'tailwind-merge';

/* <img> instead of next/image since this is a server component */
const PeanutLogo = () => (
  <div className="w-40 flex items-center">
    <img src="https://img.notionusercontent.com/s3/prod-files-secure%2Fb08e0384-3fae-465c-8ce5-c02ee949214b%2F45d5f652-1f57-4372-bb0b-2059bddc0ab6%2FGroup_88.svg/size/?exp=1747509308&sig=pbF6OFSrI89QFBaIHJ9OpCZ1aQXCorH4XUQKJbbuBAc&id=1f383811-7579-801f-a74d-dadccb8fe9dd&table=block"
         width={36} height={36} alt="Peanut icon" />
    <img src="https://img.notionusercontent.com/s3/prod-files-secure%2Fb08e0384-3fae-465c-8ce5-c02ee949214b%2F49b10fc1-1813-4f5e-96e1-1d4822c8e540%2FGroup_91.svg/size/?exp=1747509326&sig=Yv6IwmY4Dj1ymd7A_j4aVrff36rR4YMjUxIo2hga2LE&id=1f383811-7579-804d-bb7f-dabc1b42f373&table=block"
         width={70} height={18} alt="Peanut logo" className="ml-2" />
  </div>
);

const statusStyle: Record<PaymentLink['status'], string> = {
  loading:    'bg-gray-200 text-gray-500',
  unclaimed:  'bg-[#fe91e6] text-black',
  claimed:    'bg-green-100 text-green-800',
  expired:    'bg-gray-100 text-gray-600',
  cancelled:  'bg-red-100 text-red-800',
};

export function PaymentCardOG({ link }: { link: PaymentLink }) {
  const frame = 'flex justify-center rounded-2xl bg-white p-4';
  const inner = twMerge(
    'relative w-[450px] flex flex-col items-center space-y-4 border-[3px] border-black p-6',
    statusStyle[link.status]
  );

  return (
    <div className={frame}>
      <div className={inner}>
        <PeanutLogo />

        <h2 className="text-5xl font-bold font-montserrat">{link.username}</h2>

        <p className="text-3xl font-montserrat font-medium">
          {link.type === 'send' ? 'is sending you' : 'is requesting'}
        </p>

        <p className="relative inline-block text-[140px] font-knerd-filled text-white leading-none">
          <span
            aria-hidden
            className="absolute top-[3px] left-[3px] text-transparent [-webkit-text-stroke:3px_#000]"
          >
            ${link.amount}
          </span>
          <span className="relative">${link.amount}</span>
        </p>
      </div>
    </div>
  );
}
