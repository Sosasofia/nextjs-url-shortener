import { getCurrentUser } from "@/lib/session";
import LinksTable from "@/components/LinksTable";
import InputForm from "@/components/ui/InputForm";
import Url from "@/models/url";

export default async function Dashboard() {
  const user = await getCurrentUser();
  const rawLinks = await Url.find({ user_email: user?.email }).lean();
  const initialLinks = JSON.parse(JSON.stringify(rawLinks));

  return (
    <div className="flex flex-col items-center justify-between p-12">
      <div className="h-full w-full max-w-6xl flex flex-col place-items-center ">
        <div className="flex flex-col gap-y-8 w-full mb-10">
          <div className="flex flex-col gap-y-2">
            <p className="text-2xl">Hi, {user?.email}!</p>
            <h2 className="text-5xl">Short your URL!</h2>
          </div>
          <InputForm />
        </div>
        <LinksTable initialLinks={initialLinks} />
      </div>
    </div>
  );
}
