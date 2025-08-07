import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "../generated/prisma";

// Instantiate Prisma Client
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // Use the Prisma adapter to store user data, sessions, etc. in your database.
  adapter: PrismaAdapter(prisma),

  // Configure one or more authentication providers.
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],

  // Define the session strategy. 'jwt' is recommended for security and performance.
  session: {
    strategy: "jwt",
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  callbacks: {
    // The session callback is called whenever a session is checked.
    async session({ session, token } : { session: any, token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },

    // The JWT callback is called whenever a JSON Web Token is created or updated.
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email ?? undefined,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
      };
    },
  },

  // Specify pages for custom sign-in, sign-out, and error handling.
  pages: {
    signIn: '/sign-in',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (e.g. for email verification)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in
  },

  // Enable debug messages in the console (for development only).
  debug: process.env.NODE_ENV === "development",

  // A secret to sign and encrypt JWTs, cookies, and tokens.
  // Auto-generated when not specified, but good to set for production.
  secret: process.env.NEXTAUTH_SECRET,
};
