import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB, clientPromise } from "./mongodb";
import User from "@/models/user";
import { authConfig } from "./auth.config";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid email or password";
}
class MissingCredentialsError extends CredentialsSignin {
  code = "Please provide both email and password";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new MissingCredentialsError();
        }

        await connectMongoDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new InvalidLoginError();
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!passwordsMatch) {
          throw new InvalidLoginError();
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});
