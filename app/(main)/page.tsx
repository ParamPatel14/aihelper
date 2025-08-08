import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 text-center px-4">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to AI Helper
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Your all-in-one platform for intelligent assistance. Get started in seconds by creating an account or signing in.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {session ? (
            <Link
              href="/dashboard"
              className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go to Dashboard &rarr;
            </Link>
          ) : (
            <>
              <Link
                href="/sign-up"
                className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get Started
              </Link>
              <Link
                href="/sign-in"
                className="text-lg font-semibold leading-6 text-gray-900 hover:text-gray-700"
              >
                Sign In <span aria-hidden="true">&rarr;</span>
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}