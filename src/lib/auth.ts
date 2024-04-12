import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongoClient";
import connectMongoDB from "@/lib/mongodb";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { Adapter } from "next-auth/adapters";
import { getServerSession } from "next-auth";
import User from "@/models/user";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},

      async authorize(credentials: any) {
        const { email, password } = credentials;

        await connectMongoDB();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User does not exist");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          throw new Error("Incorrect credentials");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}
