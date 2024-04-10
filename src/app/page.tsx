import Landing from "@/components/Landing";
import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col items-center justify-between p-12 h-full">
      <Landing user={user} />
    </div>
  );
}
