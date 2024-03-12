import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/utils/connect-mongo";
import Url from "@/models/url";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  let storedUrl;

  try {
    await connectMongoDB();
    const pathname = req.nextUrl.pathname;
    let parts = pathname.split("/");
    let shortUrl = parts[parts.length - 1];
    storedUrl = await Url.findOne({ short_url: shortUrl });

    // if (storedUrl) {
    //   return NextResponse.json({ storedUrl });
    // }

    return NextResponse.json({ message: `Url not found` }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  } finally {
    redirect(`${storedUrl.original_url}`);
  }
}
