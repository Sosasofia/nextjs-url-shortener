import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export const { auth } = NextAuth(authConfig);

export const proxy = auth((req) => {});

export const config = {
  matcher: ["/dashboard"],
};
