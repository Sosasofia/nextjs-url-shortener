import Landing from "@/components/Landing";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 w-full flex-1 h-full">
      <Landing />
    </div>
  );
}
