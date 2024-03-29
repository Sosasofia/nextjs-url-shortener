"use client";

import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Link } from "@/utils/types";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function LinksTable() {
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const getLinks = async () => {
      let allLinks = await fetch("/api/shorten", {
        method: "GET",
      });
      let linksData = await allLinks.json();

      if (allLinks) {
        setLinks(linksData.data);
      }
    };

    getLinks();
  }, []);

  const copylink = (shortUrl: string) => {
    navigator.clipboard.writeText(`${baseUrl}/${shortUrl}`);
    toast.success("Copy to clipboard!", { position: "top-center" });
  };

  const onClick = () => {
    toast.info("Upcoming feature. Soon!", {
      position: "top-center",
    });
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg w-full">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="text-clip py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Original url
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Short
                </th>

                <th scope="col" className="w-12">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="w-12">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {links.map((link, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <a href={link.original_url} target="_blank">
                        {link.original_url}
                      </a>
                    </td>
                    <td className="inline-flex gap-1 py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                      {link.short_url}
                      <MdOutlineContentCopy
                        title="Copy"
                        onClick={() => copylink(link.short_url)}
                        size={15}
                        className="cursor-pointer my-auto"
                      />
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                      <a
                        href="#"
                        onClick={onClick}
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                      <a
                        href="#"
                        onClick={onClick}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
