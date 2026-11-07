"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthCard, AuthShell } from "@/components/auth/auth-shell";
import { SignInForm, type SignInData } from "@/components/auth/sign-in-form";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: SignInData) => {
    setError(null);

    const { data: signInData, error: authError } = await authClient.signIn.email({
      email: data.email, // required, The email address of the user.
      password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      rememberMe: data.rememberMe === "on", // If false, the user will be signed out when the browser is closed. (optional) (default: true)
      callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)
    });

    if (authError) {
      setError(authError.message ?? "Failed to sign in. Please try again.");
      return;
    }

    console.log("Signed in:", signInData);

    // Refresh the server components so the session is picked up, then go home.
    router.refresh();
    router.push("/");
  };

  return (
    <AuthShell>
      <AuthCard title="Sign in">
        <SignInForm onSubmit={handleSubmit} error={error} />
      </AuthCard>
    </AuthShell>
  );
}
