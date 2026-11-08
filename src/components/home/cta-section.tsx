import Image from "next/image"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* ── Wireframe dome artwork ──────────────────── */}
      <div className="relative h-105 w-full overflow-hidden sm:h-140 lg:h-165">
        {/* The asset is drawn light-on-white; inverted it becomes dark-on-black
            and `mix-blend-screen` composites the grid lines over the page.
            A vertical mask crops the solid-grey lower half of the source file
            so the dome interior stays near-black like the reference. */}
        <Image
          src="/images/cta-bg.png"
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-top brightness-90 contrast-110 mix-blend-screen invert"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 48%, transparent 72%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 48%, transparent 72%)",
          }}
        />

        {/* Tight violet glow at the apex, like the reference lighting */}
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#5850f0]/85 via-[#3b34d8]/30 to-transparent"
          style={{
            maskImage:
              "radial-gradient(52% 42% at 50% 0%, black 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(52% 42% at 50% 0%, black 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
          }}
        />

        {/* Fade the dome into the next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black via-black/80 to-transparent" />

        {/* ── Content ───────────────────────────────── */}
        <div className="absolute inset-x-0 top-[22%] flex flex-col items-center px-4 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.15]">
            Your next role is
            <span className="block">already looking for you</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm text-zinc-400 sm:text-[15px]">
            Build a profile in three minutes. The matches start arriving
            tomorrow morning.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <button
              type="button"
              className="h-12 rounded-lg bg-white px-6 text-[15px] font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              Create a free account
            </button>
            <button
              type="button"
              className="h-12 rounded-lg border border-white/10 bg-[#242429] px-6 text-[15px] font-semibold text-zinc-100 transition-colors hover:border-white/25 hover:bg-[#2e2e33]"
            >
              View pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
