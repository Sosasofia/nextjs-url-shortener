import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Url from "@/models/url";
import { isValidHttpUrl, makeShortUrl } from "@/utils/utils";
import { auth } from "@/lib/auth";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  const isValid = isValidHttpUrl(url);
  const authInfo = await auth();

  try {
    await connectMongoDB();

    const user = await User.findOne({ email: authInfo?.user?.email });

    if (!url || !isValid) {
      return NextResponse.json(
        { message: "Url has not been set or is invalid." },
        { status: 400 }
      );
    }

    const savedUrl = await Url.findOne({
      original_url: url,
      user_email: user?.email,
    });

    if (savedUrl) {
      return NextResponse.json(
        {
          shortenedUrl: savedUrl,
          message: "Your url has already been shortened.",
        },
        { status: 200 }
      );
    }

    const short_url: string = makeShortUrl(4);

    const shortenedUrl = await Url.create({
      original_url: url,
      short_url,
      user_email: user?.email,
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
  const authInfo = await auth();

  try {
    await connectMongoDB();

    if (!authInfo) {
      const urls = await Url.find({});

      return NextResponse.json({ data: urls });
    }

    const urls = await Url.find({ user_email: authInfo?.user?.email });

    return NextResponse.json({ data: urls });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
