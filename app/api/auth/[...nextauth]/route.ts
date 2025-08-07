import { authOptions } from "@/app/lib/auth";
import NextAuth from "next-auth";


// The handler function initializes NextAuth.js with your configuration options.
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests.
// This single file handles all authentication-related API calls.
export { handler as GET, handler as POST };