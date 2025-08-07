import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "../generated/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}


const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  
  adapter: PrismaAdapter(prisma),

  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
     CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        // Find the user in the database by their email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If no user is found, or if the user doesn't have a password (i.e., they signed up with OAuth)
        if (!user || !user.password) {
          console.log("No user found or user has no password");
          return null;
        }

        // Use bcrypt to compare the provided password with the stored hash
        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          console.log("Password is not valid");
          return null;
        }

        // If authentication is successful, return the user object
        console.log("Authentication successful, returning user.");
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
    
  ],

  
  session: {
    strategy: "jwt",
  },

  
  callbacks: {
    
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = typeof token.id === "string" ? token.id : undefined;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
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
        picture: dbUser.image,
      };
    },
  },

  
  pages: {
    signIn: '/sign-in',
    
  },

 
  debug: process.env.NODE_ENV === "development",

 
  secret: process.env.NEXTAUTH_SECRET,
};