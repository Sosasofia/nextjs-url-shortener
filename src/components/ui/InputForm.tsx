"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MdOutlineContentCopy } from "react-icons/md";

export default function InputForm() {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/shorten`, {
        method: "POST",
        body: JSON.stringify({
          url: originalUrl,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      const data = await res.json();
      const url: string = `${baseUrl}/${data.shortenedUrl.short_url}`;
      setShortUrl(url);
      toast.success(data.message, {
        position: "top-center",
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  const copylink = () => {
    navigator.clipboard.writeText(shortUrl!);
    toast.success("Copy to clipboard!", { position: "top-center" });
    setOriginalUrl("");
    setShortUrl(null);
    router.refresh();
  };

  return (
    <div className="space-y-2">
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
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
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
      </form>

      <div className={"relative " + (shortUrl ? "visible" : "invisible")}>
        <input
          type="text"
          value={shortUrl ? shortUrl : ""}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Shorten"
        />
        <button
          onClick={copylink}
          className="absolute end-3 bottom-3 px-2 py-1"
        >
          <MdOutlineContentCopy size={25} />
        </button>
      </div>
    </div>
  );
}
