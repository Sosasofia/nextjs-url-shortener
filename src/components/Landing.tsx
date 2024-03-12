"use client";

import Image from "next/image";
import { useState } from "react";

export default function Landing() {
  const [urlState, setUrlState] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`/api/shorten`, {
        method: "POST",
        body: JSON.stringify({
          url: urlState,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      const data = await res.json();
      const url: string = `${baseUrl}/${data.shortenUrl.short_url}`;
      setShortUrl(url);
    } catch (error: any) {
      // Capture the error message to display to the user
      setError(error.message);
      console.error(error);
    }
  };

  const copylink = (e: React.FormEvent) => {
    navigator.clipboard.writeText(shortUrl!);
  };

  return (
    <div className="w-full mt-12 max-w-6xl grid place-items-center grid-cols-2">
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
          <p className="text-5xl">Create Short URL!</p>
          <span className="text-xl text-gray-400">
            With simple and readable url
          </span>
        </div>

        {shortUrl ? (
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Image src="/link.svg" width={25} height={25} alt="url icon" />
            </div>
            <input
              type="text"
              value={shortUrl}
              onChange={(e) => setUrlState(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Shorten"
              required
            />

            <button
              onClick={copylink}
              className=" absolute end-2.5 bottom-2.5  px-4 py-2 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <label
              htmlFor="shorten"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Shorten
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Image src="/link.svg" width={25} height={25} alt="url icon" />
              </div>
              <input
                type="text"
                value={urlState}
                onChange={(e) => setUrlState(e.target.value)}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Shorten"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Shorten
              </button>
            </div>
            {error && (
              <div className="m-2 text-red-500 capitalize">{error}</div>
            )}
          </form>
        )}
      </div>
      <Image width={500} height={500} src="/hero.svg" alt="hero image"></Image>
    </div>
  );
}
