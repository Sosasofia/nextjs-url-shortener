import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Url from "@/models/url";
import { isValidHttpUrl, makeShortUrl } from "@/utils/utils";
import { auth } from "@/lib/auth";

const CODE_LENGTH = 7;

async function getUniqueShortCode(): Promise<string> {
  const MAX_RETRIES = 5;
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    const code = makeShortUrl(CODE_LENGTH);

    const existing = await Url.findOne({ short_url: code }).lean();

    if (!existing) {
      return code;
    }

    attempts++;
  }

  throw new Error(
    "Database is heavily saturated. Failed to generate unique code.",
  );
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized. You must be logged in to shorten links." },
      { status: 401 },
    );
  }

  const { url } = await req.json();
  const isValid = isValidHttpUrl(url);

  try {
    await connectMongoDB();

    if (!url || !isValid) {
      return NextResponse.json(
        { message: "Url has not been set or is invalid." },
        { status: 400 },
      );
    }

    const savedUrl = await Url.findOne({
      original_url: url,
      user_email: session.user.email,
    });

    if (savedUrl) {
      return NextResponse.json(
        {
          shortenedUrl: savedUrl,
          message: "Your url has already been shortened.",
        },
        { status: 200 },
      );
    }

    const short_url = await getUniqueShortCode();

    const shortenedUrl = await Url.create({
      original_url: url,
      short_url,
      user_email: session.user.email,
    });

    return NextResponse.json(
      { shortenedUrl, message: "Your url has been shortened." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Link creation error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const authInfo = await auth();

  try {
    await connectMongoDB();

    if (!authInfo || !authInfo.user) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 },
      );
    }

    const urls = await Url.find({ user_email: authInfo?.user?.email });

    return NextResponse.json({ data: urls });
  } catch (error) {
    console.error("Fetch URLs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 },
    );
  }
}
