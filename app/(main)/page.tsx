import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../lib/auth";


export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to AI Helper
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Your intelligent assistant for everything.
        </p>
        {session && (
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700"
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}