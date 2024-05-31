import cloudinary from "@/cloudinary/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const uploadedResponse = await cloudinary.uploader.upload(body.data, {
      public_id: `${body.publicId}`,
    });
    return NextResponse.json({ url: uploadedResponse.secure_url });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong uploading the image" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const publicId = searchParams.get("publicId");

  if (!publicId) {
    return NextResponse.json(
      { error: "Public ID is required" },
      { status: 400 }
    );
  }

  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
