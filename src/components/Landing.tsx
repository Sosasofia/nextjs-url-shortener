import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="h-full w-full max-w-6xl mx-auto flex items-center justify-between gap-8 px-6">
      <div className="flex flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-2">
          <p className="text-5xl">Create Short URL!</p>
          <span className="text-xl text-gray-400">
            With simple and readable url
          </span>
        </div>

        <div className="flex flex-col">
          <p className="text-gray-600 mb-6 text-lg">
            You need an account to create custom short links.
          </p>
          <div className="flex gap-4">
            <Link
              href="/sign-in"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-full transition duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-6 rounded-full transition duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>

      </div >
      <Image width={400} height={400} src="/hero.svg" alt="hero image" />
    </div >
  );
}
