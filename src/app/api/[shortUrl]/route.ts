import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/utils/connect-mongo";
import Url from "@/models/url";
import { getValidUrl } from "@/utils/utils";

export async function GET(req: NextRequest) {
  let storedUrl;

  await connectMongoDB();
  const pathname = req.nextUrl.pathname;
  let parts = pathname.split("/");
  let shortUrl = parts[parts.length - 1];
  storedUrl = await Url.findOne({ short_url: shortUrl });

  if (storedUrl) {
    const validUrl = getValidUrl(storedUrl.original_url);
    return NextResponse.redirect(`${validUrl}`);
  } else {
    return NextResponse.redirect(req.nextUrl.origin);
  }
}
