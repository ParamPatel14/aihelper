"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * A responsive navigation bar that displays different content based on
 * the user's authentication status. It uses the `useSession` hook.
 */
const Navbar = () => {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    setIsDropdownOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
              AI Helper
            </Link>
          </div>

          {/* Right side of Navbar */}
          <div className="flex items-center">
            {/* Loading State */}
            {status === "loading" && (
              <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse"></div>
            )}

            {/* Unauthenticated State */}
            {status === "unauthenticated" && (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Authenticated State */}
            {status === "authenticated" && session && (
              <div className="relative">
                {/* User Avatar - Direct link to Dashboard */}
                <Link href="/dashboard" className="block">
                  <Image
                    className="h-9 w-9 rounded-full cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-colors"
                    src={session.user?.image || `https://avatar.vercel.sh/${session.user?.email}.png`}
                    alt="User profile"
                    width={36}
                    height={36}
                    onClick={() => setIsDropdownOpen(false)} // Close dropdown if open
                  />
                </Link>

                {/* Dropdown for extra actions (optional but good UX) */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="absolute -right-3 -top-1 text-gray-500 hover:text-gray-800"
                  aria-label="User menu"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-semibold truncate">{session.user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;