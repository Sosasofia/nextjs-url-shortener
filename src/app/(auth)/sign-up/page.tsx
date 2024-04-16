"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { MdOutlineAlternateEmail, MdOutlinePassword } from "react-icons/md";
import { toast } from "sonner";

const baseUrl = process.env.NEXTAUTH_URL;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All inputs are required");
      return;
    }

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        const form = e.target;
        form.reset();
        toast.success(data.message + "Please sign in to your account", {
          position: "top-center",
        });

        router.push("/sign-in");
      } else {
        toast.error(data.error);
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="h-full max-w-6xl flex flex-col m-auto justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 p-4 sm:p-0 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h2>
          <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            href="/sign-in"
          >
            Already have an account? Sign-in
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-6 md:mb-8">
            <MdOutlineAlternateEmail className="absolute ml-3" size={24} />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
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
            Create
          </button>
        </form>

        <div className="relative w-full flex flex-col justify-center">
          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 text-center">Or</p>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
          >
            <div className="flex items-center justify-center">
              <Image
                src={"/images/icons/google.png"}
                width="25"
                height="25"
                alt="Google"
                className="mr-4"
              />
              Sign In with Google
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
