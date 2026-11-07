import type { Metadata } from "next";

import { AuthCard, AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in — HireLoop",
};

export default function SignInPage() {
  return (
    <AuthShell>
      <AuthCard title="Sign in">
        <SignInForm />
      </AuthCard>
    </AuthShell>
  );
}
