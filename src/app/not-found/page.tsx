import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-8xl font-bold text-gray-200 dark:text-gray-800">404</h1>
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Link not found
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Oops! The short link you clicked doesn&apos;t seem to exist or may have been deleted by the owner.
                    </p>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide text-white transition duration-200 bg-blue-500 rounded-full hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                    >
                        Go back home
                    </Link>
                </div>

            </div>
        </div>
    );
}