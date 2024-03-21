import { NextAuthOptions } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectMongoDB from "@/utils/connect-mongo";
import User from "@/models/user";

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
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
  ],
};
