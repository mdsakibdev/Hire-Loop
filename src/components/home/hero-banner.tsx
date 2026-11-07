import Image from "next/image"
import type { ReactNode } from "react"
import {
  Briefcase,
  Building2,
  Flame,
  Globe,
  MapPinIcon,
  SearchIcon,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "DevOps Engineer",
]

const stats: { icon: ReactNode; value: string; label: string }[] = [
  {
    icon: (
      <span className="relative inline-flex">
        <Briefcase className="size-5" />
        <SearchIcon className="absolute -right-1.5 bottom-0 size-3 bg-[#1e1e22] text-white" />
      </span>
    ),
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: <Building2 className="size-5" />,
    value: "12K",
    label: "Companies",
  },
  {
    icon: (
      <span className="relative inline-flex">
        <Globe className="size-5" />
        <SearchIcon className="absolute -right-1.5 bottom-0 size-3 bg-[#1e1e22] text-white" />
      </span>
    ),
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: <Star className="size-5" />,
    value: "97%",
    label: "Satisfaction Rate",
  },
]

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#050505] pb-10 pt-14 text-white sm:pt-20 lg:pt-24">
      {/* ── Top content ─────────────────────────────── */}
      <div className="relative z-20 mx-auto w-full max-w-3xl px-4 text-center">
        {/* Badge */}
        <div className="flex items-center justify-center gap-3">
          <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-zinc-700 sm:block" />
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900 py-1.5 pr-4 pl-1.5">
            <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-red-600">
              <Flame className="size-3.5 text-white" />
            </span>
            <span className="text-sm font-semibold text-white">90,000+</span>
            <span className="font-mono text-[11px] tracking-[0.18em] text-zinc-400 uppercase">
              New jobs this month
            </span>
          </span>
          <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-zinc-700 sm:block" />
        </div>

        {/* Headline */}
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:mt-5 sm:text-base sm:leading-7">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          action="/browse-jobs"
          method="get"
          className="mx-auto mt-7 flex max-w-xl items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-900/80 p-1.5 backdrop-blur-sm sm:mt-9"
        >
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2">
            <SearchIcon className="size-4 shrink-0 text-zinc-500" />
            <input
              type="text"
              name="q"
              placeholder="Job title, skill or company"
              className="h-8 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </div>

          <span className="h-5 w-px shrink-0 bg-white/10" />

          <div className="hidden min-w-0 flex-1 items-center gap-2 rounded-md px-2 sm:flex">
            <MapPinIcon className="size-4 shrink-0 text-zinc-500" />
            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              className="h-8 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </div>

          <Button
            type="submit"
            aria-label="Search jobs"
            className="size-9 shrink-0 rounded-lg bg-indigo-500 hover:bg-indigo-600"
          >
            <SearchIcon className="size-4 text-white" />
          </Button>
        </form>

        {/* Trending positions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-6">
          <span className="text-xs text-zinc-500">Trending Position</span>
          {trendingPositions.map((position) => (
            <span
              key={position}
              className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 transition-colors hover:border-indigo-500/50 hover:text-white"
            >
              {position}
            </span>
          ))}
        </div>
      </div>

      {/* ── Globe + stats ───────────────────────────── */}
      {/* Globe visual — shown in a fixed-height frame that crops off the
          image's empty upper sky; its pink/white top and side edges are
          faded into the page background with overlay gradients */}
      <div className="relative mt-6 h-105 overflow-hidden sm:mt-0 sm:h-140 lg:h-165">
        <Image
          src="/images/globe.png"
          alt="Globe glowing over the horizon"
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_50%]"
        />

        {/* Blend the image edges into the page background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-[55%] bg-linear-to-b from-[#050505] via-[#050505]/70 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-[#050505] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-[#050505] to-transparent" />
        </div>

        {/* Caption over the glow */}
        <div className="absolute inset-x-0 top-[26%] z-10 px-4 text-center sm:top-[50%]">
          <p className="text-3xl font-medium sm:text-4xl lg:text-5xl">
            Assisting over{" "}
            <span className="font-semibold text-white">15,000</span> job
            seekers
            <span className="block text-zinc-300 lg:mt-4">
              find their dream positions.
            </span>
          </p>
        </div>
      </div>

        {/* Stats cards — overlapping the globe bottom */}
        <div className="relative z-20 mx-auto -mt-20 grid w-full max-w-5xl grid-cols-2 gap-3 px-3 sm:-mt-24 sm:gap-4 sm:px-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-linear-to-b from-[#050505] via-[#101011] to-[#1c1c1e] p-4 pb-5 sm:p-5 sm:pb-6"
            >
              <span className="flex text-zinc-100">{stat.icon}</span>
              <p className="mt-9 text-3xl font-semibold text-white sm:mt-11 sm:text-4xl lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-zinc-300 sm:mt-3 sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
    </section>
  )
}
