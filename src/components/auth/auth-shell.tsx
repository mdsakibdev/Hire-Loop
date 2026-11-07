import Link from "next/link"
import type { ReactNode } from "react"
import { XIcon } from "lucide-react"

/** Full-page multicolor gradient backdrop (poster background). */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative isolate flex min-h-dvh flex-1 items-center justify-center overflow-hidden bg-[#060408] px-4 py-12 text-white">
      {/* Gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-44 top-1/4 h-[540px] w-[500px] rounded-full bg-[#ff1e4e]/80 blur-[130px]" />
        <div className="absolute -left-16 top-[58%] h-[440px] w-[400px] rounded-full bg-[#ff7a4d]/70 blur-[140px]" />
        <div className="absolute -right-48 -top-16 h-[560px] w-[560px] rounded-full bg-[#2b2bff]/70 blur-[150px]" />
        <div className="absolute -right-28 top-1/2 h-[500px] w-[460px] rounded-full bg-[#a02bff]/75 blur-[140px]" />
        <div className="absolute inset-x-0 -bottom-28 h-[440px] bg-gradient-to-t from-[#e8eeff]/90 to-transparent" />
      </div>

      {children}
    </main>
  )
}

/** Dark auth card: arc decoration, close button and centered title. */
export function AuthCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-[#170a13] shadow-2xl shadow-black/50 sm:max-w-lg">
      {/* Arc decoration */}
      <div className="pointer-events-none absolute -top-52 left-[-18%] h-96 w-[72%] rounded-full bg-white/[0.05]" />
      <div className="pointer-events-none absolute -top-44 left-[-12%] h-72 w-[62%] rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-44 w-44 rounded-full bg-white/[0.03] blur-sm" />

      {/* Close — back to home */}
      <Link
        href="/"
        aria-label="Close"
        className="absolute top-4 right-4 z-10 grid size-8 place-items-center rounded-full bg-[#ff5457] transition-colors hover:bg-[#ff6d70]"
      >
        <XIcon className="size-4 text-white" />
      </Link>

      <h1 className="pt-14 pb-2 text-center text-4xl font-medium text-white sm:text-5xl">
        {title}
      </h1>

      {children}
    </div>
  )
}
