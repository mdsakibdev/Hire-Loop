"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

import { GoogleAuthButton } from "@/components/auth/google-auth-button"
import { authInputClass, authLabelClass } from "@/components/auth/sign-up-form"

export type SignInData = {
  email: string
  password: string
  /** "on" when the remember-me checkbox is checked. */
  rememberMe?: string
}

/**
 * Collects all form inputs into a plain object.
 */
function collectFormData(event: FormEvent<HTMLFormElement>): SignInData {
  const data = Object.fromEntries(
    new FormData(event.currentTarget)
  ) as Record<string, string>
  return data as SignInData
}

export function SignInForm({onSubmit,error: authError,}: {
  onSubmit: (data: SignInData) => Promise<void> | void
  error?: string | null
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = collectFormData(event)

    setError(null)

    setIsLoading(true)
    try {
      await onSubmit(data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 pt-6 pb-8 sm:px-10 sm:pt-8">
      <label htmlFor="email" className={authLabelClass}>
        Email Address:
      </label>
      <Input
        id="email"
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        autoComplete="email"
        className={authInputClass}
      />

      <label htmlFor="password" className={`${authLabelClass} mt-4`}>
        Password:
      </label>
      <Input
        id="password"
        name="password"
        type="password"
        required
        placeholder="••••••••"
        autoComplete="current-password"
        className={authInputClass}
      />

      {/* Remember me */}
      <label className="mt-5 flex cursor-pointer items-center gap-3 text-[15px] text-zinc-100">
        <Checkbox
          name="rememberMe"
          className="data-checked:border-pink-500 data-checked:bg-pink-500 data-checked:text-white"
        />
        <span>Remember me for 30 days</span>
      </label>

      {(error ?? authError) && (
        <p className="mt-3 text-sm text-red-400">{error ?? authError}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-8 h-12 w-full rounded-lg bg-linear-to-r from-[#c13575] via-[#dc4188] to-[#f26da8] text-lg font-medium text-white transition-opacity hover:opacity-90 focus-visible:ring-3 focus-visible:ring-pink-400/50 focus-visible:outline-none disabled:opacity-60"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>

      {/* Google */}
      <div className="mt-3">
        <GoogleAuthButton
          label="Sign in with Google"
          onClick={() => console.log("Continue with Google clicked")}
        />
      </div>

      {/* Toggle: switch to sign-up */}
      <p className="mt-6 text-center text-[15px] text-zinc-300">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-white underline underline-offset-4"
        >
          Sign up
        </Link>
      </p>
    </form>
  )
}
