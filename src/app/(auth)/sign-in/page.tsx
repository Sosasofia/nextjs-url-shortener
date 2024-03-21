"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { MdOutlineAlternateEmail, MdOutlinePassword } from "react-icons/md";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All inputs are required");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      if (res?.ok) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full max-w-6xl flex flex-col m-auto justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 p-4 sm:p-0 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Log in to your account
          </h2>
          <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            href="/sign-up"
          >
            Don&apos;t have an account? Sign-up
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-6 md:mb-8">
            <MdOutlineAlternateEmail className="absolute ml-3" size={24} />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
              className="bg-white rounded pl-12 py-2 md:py-4 focus:outline-none w-full focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center mb-6 md:mb-8">
            <MdOutlinePassword className="absolute ml-3" size={24} />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="bg-white rounded pl-12 py-2 md:py-4 focus:outline-none w-full focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Password"
            />
          </div>
          <button className="w-full inline-flex items-center justify-center h-12 tracking-wide transition duration-200 focus:shadow-outline focus:outline-none active:translate-y-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Sign in
          </button>
        </form>
        {error && <p className="text-lg text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
}
