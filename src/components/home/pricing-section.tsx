"use client"

import { useState } from "react"
import {
  ArrowRightIcon,
  BarChart3Icon,
  CrownIcon,
  PlusIcon,
  ZapIcon,
} from "lucide-react"

type Plan = {
  name: string
  icon: typeof CrownIcon
  monthlyPrice: number
  /** Applied on top of the monthly price when Yearly is selected (‑25%). */
  yearlyDiscount: number
  intro: string
  features: string[]
  /** Styling of the small icon tile next to the plan name. */
  tile: "violet" | "dark"
  /** The highlighted middle card in the reference design. */
  highlight?: boolean
}

const plans: Plan[] = [
  {
    name: "Starter",
    icon: CrownIcon,
    monthlyPrice: 0,
    yearlyDiscount: 0.25,
    intro: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    tile: "violet",
  },
  {
    name: "Growth",
    icon: BarChart3Icon,
    monthlyPrice: 17,
    yearlyDiscount: 0.25,
    intro: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    tile: "violet",
    highlight: true,
  },
  {
    name: "Premium",
    icon: ZapIcon,
    monthlyPrice: 99,
    yearlyDiscount: 0.25,
    intro: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    tile: "dark",
  },
]

function PlanCard({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  const price = yearly
    ? Math.round(plan.monthlyPrice * (1 - plan.yearlyDiscount))
    : plan.monthlyPrice
  const Icon = plan.icon

  return (
    <div
      className={`flex flex-col rounded-[20px] border p-6 ${
        plan.highlight
          ? "border-white/15 bg-linear-to-b from-[#1c1c20] to-[#131316] shadow-[0_0_50px_rgba(255,255,255,0.06)]"
          : "border-white/10 bg-[#111113]"
      }`}
    >
      {/* Header: icon + name on the left, price on the right */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span
            className={`grid size-10 shrink-0 place-items-center rounded-[10px] ${
              plan.tile === "violet"
                ? "bg-linear-to-br from-[#6d5ae0] to-[#3b2d8f] text-white shadow-[0_0_18px_rgba(109,90,224,0.35)]"
                : "bg-[#1f1f23] text-white"
            }`}
          >
            <Icon className="size-5" />
          </span>
          <h3 className="text-lg font-medium text-white">{plan.name}</h3>
        </div>

        <p className="flex items-baseline gap-1.5">
          <span className="text-4xl font-semibold tracking-tight text-white">
            ${price}
          </span>
          <span className="text-[11px] text-zinc-500">/month</span>
        </p>
      </div>

      {/* Intro line */}
      <p className="mt-8 text-[15px] font-semibold text-white">{plan.intro}</p>

      {/* Feature list */}
      <ul className="mt-4 flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span className="grid size-5 shrink-0 place-items-center rounded-[6px] border border-white/15 bg-black">
              <PlusIcon className="size-3 text-white" />
            </span>
            <span className="text-[15px] text-zinc-400">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA — pushed to the card bottom with a guaranteed minimum gap above it */}
      <div className="mt-auto pt-10">
        <button
          type="button"
          className={`flex h-12 w-full items-center justify-between rounded-xl px-5 text-[15px] font-medium transition-colors ${
            plan.highlight
              ? "bg-white text-black hover:bg-zinc-200"
              : "border border-white/10 bg-[#1a1a1d] text-white hover:border-white/25 hover:bg-[#232327]"
          }`}
        >
          Choose This Plan
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}

export function PricingSection() {
  const [yearly, setYearly] = useState(false)

  return (
    <section className="bg-[#050505] py-14 text-white sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Eyebrow */}
        <p className="flex items-center justify-center gap-2.5 text-sm font-semibold tracking-[0.28em] text-[#7b6cf6] uppercase">
          <span className="size-1.5 bg-[#7b6cf6]" />
          Pricing
          <span className="size-1.5 bg-[#7b6cf6]" />
        </p>

        {/* Headline */}
        <h2 className="mt-4 text-center text-4xl font-semibold tracking-tight text-balance sm:mt-5 sm:text-5xl lg:leading-[1.15]">
          Pay for the leverage,
          <span className="block">not the listings</span>
        </h2>

        {/* Billing toggle */}
        <div className="mt-14 flex justify-center sm:mt-16">
          <div className="flex items-center gap-1.5 rounded-full bg-[#1b1b1e] p-1.5">
            <button
              type="button"
              onClick={() => setYearly(false)}
              aria-pressed={!yearly}
              className={`rounded-full px-5 py-2 text-[15px] transition-colors ${
                !yearly
                  ? "bg-white font-medium text-black"
                  : "text-zinc-200 hover:text-white"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setYearly(true)}
              aria-pressed={yearly}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-[15px] transition-colors ${
                yearly
                  ? "bg-white font-medium text-black"
                  : "text-zinc-200 hover:text-white"
              }`}
            >
              Yearly
              <span className="rounded-full bg-[#e01fd0] px-2 py-1 text-[11px] leading-none font-semibold text-white">
                25%
              </span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} yearly={yearly} />
          ))}
        </div>
      </div>
    </section>
  )
}
