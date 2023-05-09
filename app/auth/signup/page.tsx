import AuthForm from "@/components/auth-form";
import { getServerSideSession } from "@/lib/auth/options";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Sign-Up',
  description: "Don't have an account yet?"
};

export default async function SignUp() {
  const session = await getServerSideSession()

  if (session !== null)
    return redirect("/app")

  return (
    <div className="w-[350px] grid gap-5">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter your email to sign in to create your account
        </p>
      </div>

      <AuthForm />

      <div className="text-center text-sm text-slate-500 dark:text-slate-400">
        <Link href="/auth/signup">Already have an account?</Link>
      </div>
    </div>
  )
}