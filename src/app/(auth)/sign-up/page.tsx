"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthCard, AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm, type SignUpData } from "@/components/auth/sign-up-form";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: SignUpData) => {
    setError(null);

    const { data: signUpData, error: authError } = await authClient.signUp.email({
      name: data.fullName, // required, The name of the user.
      email: data.email, // required, The email address of the user.
      password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      role: data.role, // additional field — "seeker" | "recruiter" | "admin" (typed via the server config in src/lib/auth.ts)

      callbackURL: "/", // An optional URL to redirect to after the user signs up.
    });

    if (authError) {
      setError(authError.message ?? "Failed to create account. Please try again.");
      return;
    }

    console.log("Signed up:", signUpData);

    // Refresh the server components so the session is picked up, then go home.
    router.refresh();
    router.push("/");
  };

  return (
    <AuthShell>
      <AuthCard title="Sign up">
        <SignUpForm onSubmit={handleSubmit} error={error} />
      </AuthCard>
    </AuthShell>
  );
}
