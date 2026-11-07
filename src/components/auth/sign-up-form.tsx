"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

import { GoogleAuthButton } from "@/components/auth/google-auth-button"

/* Shared styling for the dark violet inputs */
export const authInputClass =
  "h-11 rounded-md border-0 bg-[#2b0f36] px-4 text-[15px] text-white placeholder:text-purple-200/40 focus-visible:ring-2 focus-visible:ring-pink-400/50"

export const authLabelClass = "mb-1.5 block text-[15px] text-zinc-100"

export type SignUpData = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  /** "on" when the terms checkbox is checked (required inputs only). */
  terms?: string
}

/**
 * Collects all form inputs into a plain object.
 */
function collectFormData(event: FormEvent<HTMLFormElement>): SignUpData {
  const data = Object.fromEntries(
    new FormData(event.currentTarget)
  ) as Record<string, string>
  return data as SignUpData
}

export function SignUpForm({onSubmit,}: {onSubmit: (data: SignUpData) => Promise<void> | void}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = collectFormData(event)

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setError(null)
    
    console.log("Sign-up form data:", data)

    setIsLoading(true)
    try {
      await onSubmit(data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 pt-6 pb-8 sm:px-10 sm:pt-8">
      <label htmlFor="fullName" className={authLabelClass}>
        Full Name:
      </label>
      <Input
        id="fullName"
        name="fullName"
        type="text"
        required
        placeholder="Your full name"
        autoComplete="name"
        className={authInputClass}
      />

      <label htmlFor="email" className={`${authLabelClass} mt-4`}>
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

      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-6">
        <div>
          <label htmlFor="password" className={authLabelClass}>
            Password:
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            autoComplete="new-password"
            className={authInputClass}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className={authLabelClass}>
            Confirm Password:
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            placeholder="••••••••"
            autoComplete="new-password"
            className={authInputClass}
          />
        </div>
      </div>

      {/* Terms agreement */}
      <label className="mt-5 flex cursor-pointer items-center gap-3 text-[15px] text-zinc-100">
        <Checkbox
          name="terms"
          required
          className="data-checked:border-pink-500 data-checked:bg-pink-500 data-checked:text-white"
        />
        <span>
          I agree to all statements in{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-white"
          >
            Terms of service
          </Link>
        </span>
      </label>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-8 h-12 w-full rounded-lg bg-linear-to-r from-[#c13575] via-[#dc4188] to-[#f26da8] text-lg font-medium text-white transition-opacity hover:opacity-90 focus-visible:ring-3 focus-visible:ring-pink-400/50 focus-visible:outline-none disabled:opacity-60"
      >
        {isLoading ? "Creating account..." : "Sign up"}
      </button>

      {/* Google */}
      <div className="mt-3">
        <GoogleAuthButton
          label="Sign up with Google"
          onClick={() => console.log("Continue with Google clicked")}
        />
      </div>

      {/* Toggle: switch to sign-in */}
      <p className="mt-6 text-center text-[15px] text-zinc-300">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-white underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}
