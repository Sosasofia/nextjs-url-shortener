import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="w-full mt-12 max-w-6xl grid place-items-center grid-cols-2">
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
          <p className="text-5xl">Create Short URL!</p>
          <span className="text-xl text-gray-400">
            With simple and readable url
          </span>
        </div>

        <form>
          <label
            htmlFor="shorten"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Shorten
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Link href="/" className="flex ">
                <Image src="/link.svg" width={25} height={25} alt="url icon" />
              </Link>
            </div>
            <input
              type="shorten"
              id="shorten"
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
      </div>
      <Image width={500} height={500} src="/hero.svg" alt="hero image"></Image>
    </div>
  );
}
