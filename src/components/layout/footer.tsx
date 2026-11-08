import Image from "next/image"
import Link from "next/link"
import { ShellIcon,} from "lucide-react"
import type { ComponentType } from "react"

/** Brand icons (removed from lucide) drawn as lucide-style stroke SVGs. */
type IconProps = { className?: string }

function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const linkColumns = [
  {
    heading: "Product",
    links: [
      { label: "Job discovery", href: "/browse-jobs" },
      { label: "Worker AI", href: "#" },
      { label: "Companies", href: "#" },
      { label: "Salary data", href: "#" },
    ],
  },
  {
    heading: "Navigations",
    links: [
      { label: "Help center", href: "#" },
      { label: "Career library", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Brand Guideline", href: "#" },
      { label: "Newsroom", href: "#" },
    ],
  },
]

const socials: { label: string; href: string; icon: ComponentType<{ className?: string }>; highlighted?: boolean }[] = [
  {
    label: "Facebook",
    href: "#",
    icon: FacebookIcon,
    /** The middle (Threads) tile is highlighted purple in the reference. */
    highlighted: false,
  },
  {
    label: "Threads",
    href: "#",
    icon: ShellIcon,
    highlighted: true,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: LinkedinIcon,
    highlighted: false,
  },
]

export function Footer() {
  return (
    <footer className="bg-black px-4 pt-16 pb-10 text-white sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* ── Top: brand / tagline + link columns ───── */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand block */}
          <div className="max-w-xs">
            <Image
              src="/images/logo.png"
              alt="Hire Loop"
              width={154}
              height={44}
              className="h-9 w-auto"
            />
            <p className="mt-6 text-[15px] leading-relaxed text-zinc-400">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-10 sm:grid-cols-3 lg:gap-x-24">
            {linkColumns.map((column) => (
              <div key={column.heading}>
                <h3 className="text-[15px] font-semibold text-[#7b6cf0]">
                  {column.heading}
                </h3>
                <ul className="mt-7 flex flex-col gap-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[15px] text-zinc-300 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom row: socials + legal ─────────────── */}
        <div className="mt-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`flex size-10 items-center justify-center rounded-xl transition-colors ${
                    social.highlighted
                      ? "bg-[#5443e3] hover:bg-[#6454f0]"
                      : "bg-[#1d1d20] hover:bg-[#2a2a2e]"
                  }`}
                >
                  <Icon className="size-4.5 text-white" />
                </a>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 sm:justify-end">
            <p className="text-sm text-zinc-500">
              Copyright 2026 
            </p>
            <Link
              href="#"
              className="text-sm text-zinc-300 transition-colors hover:text-white"
            >
              Terms &amp; Policy - Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
