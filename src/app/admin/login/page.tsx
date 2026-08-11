import Link from "next/link";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";
import { LoginForm } from "@/components/LoginForm";

export default async function AdminLoginPage() {
  const session = await readSession();
  if (session?.role === "admin") {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6] px-4 text-[#111827]">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-center text-xl font-bold">SSMM Admin</h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Sign in with an admin account to continue.
        </p>
        {session ? (
          <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-center text-sm text-amber-800">
            Currently signed in as <strong>{session.username}</strong> (user). Enter admin
            credentials to switch.
          </p>
        ) : null}
        <div className="mt-6">
          <LoginForm
            requireAdmin
            successHref="/admin"
            labels={{
              username: "Username",
              password: "Password",
              submit: "Admin sign in",
              error: "Invalid admin credentials",
            }}
          />
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          <Link href="/dashboard/new-order" className="text-indigo-600 hover:underline">
            Back to panel
          </Link>
        </p>
      </div>
    </div>
  );
}
