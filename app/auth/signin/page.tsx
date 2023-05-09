import AuthForm from "@/components/auth-form";
import { getServerSession } from "next-auth";
import { headers, cookies } from 'next/headers'
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Sign-In',
  description: "Already have an account?"
};

export default async function SignIn() {
  const session = await getServerSession()

  if (session !== null)
    return redirect("/app")

  return (
    <div className="w-[350px] grid gap-5">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter your email to sign in to your account
        </p>
      </div>

      <AuthForm />

      <div className="text-center text-sm text-slate-500 dark:text-slate-400">
        <Link href="/auth/signup">Don't have an account yet?</Link>
      </div>
    </div>
  )
}