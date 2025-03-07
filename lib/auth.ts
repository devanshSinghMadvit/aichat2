import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { google } from "googleapis";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/drive.readonly",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      session.accessToken = token.access_token as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// Function to get authenticated Drive client
export async function getDriveClient(accessToken: string) {
  const authClient = new google.auth.OAuth2();
  authClient.setCredentials({ access_token: accessToken });
  return google.drive({ version: "v3", auth: authClient });
}