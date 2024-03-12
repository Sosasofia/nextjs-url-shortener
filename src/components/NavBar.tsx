"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function NavBar() {
  const onClick = () => {
    toast.info("Upcoming feature. Soon!", {
      position: "top-center",
    });
  };

  return (
    <div className="sticky top-0 z-50 h-16">
      <header className="h-16 flex items-center">
        <div className="w-full mx-auto max-w-screen-xl p-6 flex items-center justify-between border-b border-gray-300">
          <Link href="/" className="flex ">
            <Image src="/link.svg" width={30} height={30} alt="url icon" />
          </Link>
          <div>
            {/* TODO dark/light mode switch */}
            <button onClick={onClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            </button>
          </div>
          <div>
            <Link onClick={onClick} href={"#"} className="hover:underline">
              Log in
            </Link>
            <Link
              onClick={onClick}
              href={"#"}
              className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
