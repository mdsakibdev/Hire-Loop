"use client";

import { authClient } from "@/lib/auth-client";

import { AuthCard, AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm, type SignUpData } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  const handleSubmit = async (data: SignUpData) => {
    const { data: signUpData, error } = await authClient.signUp.email({
      name: data.fullName, // required, The name of the user.
      email: data.email, // required, The email address of the user.
      password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.

      callbackURL: "/", // An optional URL to redirect to after the user signs up.
    });

    console.log(signUpData, error);
  };

  return (
    <AuthShell>
      <AuthCard title="Sign up">
        <SignUpForm onSubmit={handleSubmit} />
      </AuthCard>
    </AuthShell>
  );
}
