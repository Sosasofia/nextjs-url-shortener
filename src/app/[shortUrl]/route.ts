import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Url from "@/models/url";
import { getValidUrl } from "@/utils/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ shortUrl: string }> },
) {
  try {
    await connectMongoDB();

    const { shortUrl } = await params;

    const storedUrl = await Url.findOne({ short_url: shortUrl });

    if (storedUrl) {
      const validUrl = getValidUrl(storedUrl.original_url);
      return NextResponse.redirect(new URL(validUrl));
    }

    return NextResponse.redirect(new URL("/not-found", req.nextUrl.origin));
  } catch (error) {
    console.error("Error during redirection route handler:", error);
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }
}
