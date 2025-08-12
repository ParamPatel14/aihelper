import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-center px-4">
      <main className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to <span className="text-indigo-600">AI Helper</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Your all-in-one platform for intelligent assistance.  
          Get started in seconds by creating an account or signing in.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {session ? (
            <Link
              href="/dashboard"
              className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 transition"
            >
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link
                href="/sign-up"
                className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 transition"
              >
                Get Started
              </Link>
              <Link
                href="/sign-in"
                className="text-lg font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition"
              >
                Sign In →
              </Link>
            </>
          )}

          {/* Resume Builder Button */}
          <Link
            href="/resume-builder"
            className="rounded-md bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-green-500 transition"
          >
            Resume Builder
          </Link>
        </div>
      </main>
    </div>
  );
}
