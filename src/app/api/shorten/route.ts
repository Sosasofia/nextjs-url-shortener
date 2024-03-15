import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/utils/connect-mongo";
import Url from "@/models/url";
import { isValidHttpUrl, makeShortUrl } from "@/utils/utils";

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  const isValid = isValidHttpUrl(url);

  try {
    await connectMongoDB();

    if (!url || !isValid) {
      return NextResponse.json(
        { message: "Url has not been set or is invalid." },
        { status: 400 }
      );
    }

    const short_url: string = makeShortUrl(4);

    const shortenedUrl = await Url.create({
      original_url: url,
      short_url,
    });

    return NextResponse.json(
      { shortenedUrl, message: "Your url has been shortened." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const urls = await Url.find({});
    return NextResponse.json({ data: urls });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
