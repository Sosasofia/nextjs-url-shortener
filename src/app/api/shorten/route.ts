import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/utils/connect-mongo";
import Url from "@/models/url";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body = await req.json();

    if (body.url) {
      const short_url: string = makeShortUrl(4);

      let newUrl = new Url({
        original_url: body.url,
        short_url,
      });
      const shortenUrl = await Url.create(newUrl);

      return NextResponse.json(
        { shortenUrl, message: "Your url has been shorten" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Url has not been set" },
      { status: 400 }
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

const makeShortUrl = (length: any) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
