import Link from "next/link";

interface UnexistingLinkProps {
  id: string;
}

export default function UnexistingLink({ id }: UnexistingLinkProps) {
  return (
    <div className="max-w-sm mx-auto mt-12 rounded-2xl shadow p-6 space-y-4 bg-red-50 text-red-800">
      <h1 className="text-2xl font-bold">❌ Payment Link Not Found</h1>
      <p className="text-lg">
        The payment link you&apos;re trying to access doesn&apos;t exist or has been removed.
      </p>
      <p className="text-sm">
        Please check that you have the correct link or contact the person who sent it to you.
      </p>
      <p className="text-sm">
        Link ID: <span className="font-mono">{id}</span>
      </p>
      <Link 
        href="/"
        className="block w-full py-2 rounded-xl bg-black text-white hover:opacity-80 text-center"
      >
        Go to Home
      </Link>
    </div>
  )
}