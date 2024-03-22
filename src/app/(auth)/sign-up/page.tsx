"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineAlternateEmail, MdOutlinePassword } from "react-icons/md";
import { toast } from "sonner";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All inputs are required");
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
        setError(data.error);
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
        {error && <p className="text-lg text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
}
