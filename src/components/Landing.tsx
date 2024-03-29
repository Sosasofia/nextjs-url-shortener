import Image from "next/image";
import InputForm from "./ui/InputForm";

export default async function Landing() {
  return (
    <div className="h-full w-full max-w-6xl flex place-items-center gap-8">
      <div className="flex flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-2">
          <p className="text-5xl">Create Short URL!</p>
          <span className="text-xl text-gray-400">
            With simple and readable url
          </span>
        </div>
        <InputForm />
      </div>
      <Image width={400} height={400} src="/hero.svg" alt="hero image" />
    </div>
  );
}
