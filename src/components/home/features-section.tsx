import type { LucideIcon } from "lucide-react"
import {
  BarChart3Icon,
  BookmarkIcon,
  Building2Icon,
  FileTextIcon,
  GemIcon,
  MousePointerClickIcon,
  SearchIcon,
  TrendingUpIcon,
} from "lucide-react"

type Feature = {
  title: string
  description: string
  icon: LucideIcon
  /** "pink" matches the magenta accent tile from the reference design (last card). */
  accent?: "violet" | "pink"
}

const features: Feature[] = [
  {
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
    icon: SearchIcon,
  },
  {
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    icon: BarChart3Icon,
  },
  {
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
    icon: Building2Icon,
  },
  {
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
    icon: BookmarkIcon,
  },
  {
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process.",
    icon: MousePointerClickIcon,
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    icon: FileTextIcon,
  },
  {
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
    icon: GemIcon,
  },
  {
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
    icon: TrendingUpIcon,
    accent: "pink",
  },
]

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-[#101013] p-5 transition-colors hover:border-white/15 sm:gap-5 sm:p-6">
      {/* Icon tile with a soft violet glow — pink variant for highlighted cards */}
      <span
        className={`grid size-12 shrink-0 place-items-center rounded-xl sm:size-12 ${
          feature.accent === "pink"
            ? "bg-linear-to-br from-[#43163e] via-[#2c1029] to-[#1b0d1a] text-pink-200 shadow-[0_0_20px_rgba(236,72,153,0.25)]"
            : "bg-linear-to-br from-[#241b3f] via-[#191327] to-[#100d18] text-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.22)]"
        }`}
      >
        <Icon className="size-5.5" />
      </span>

      <div className="min-w-0">
        <h3 className="text-base font-semibold text-white sm:text-lg">
          {feature.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
          {feature.description}
        </p>
      </div>
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section className="bg-white/20 py-14 text-white sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        {/* Eyebrow */}
        <p className="flex items-center justify-center gap-2.5 text-xs font-semibold tracking-[0.24em] text-[#8b7cf6] uppercase">
          <span className="size-1.5 rotate-45 rounded-[1px] bg-[#8b7cf6]" />
          Features Job
          <span className="size-1.5 rotate-45 rounded-[1px] bg-[#8b7cf6]" />
        </p>

        {/* Headline */}
        <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-balance sm:mt-5 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          Everything you need
          <span className="block">to succeed</span>
        </h2>

        {/* Feature grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
