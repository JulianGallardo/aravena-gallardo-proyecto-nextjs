import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const uploadedResponse = await cloudinary.uploader.upload(body.data, {
      public_id: `${body.publicId}`,
      folder: 'byteburgers',
    });
    return NextResponse.json({ url: uploadedResponse.secure_url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json({
      status: 500,
      error: "Error uploading to Cloudinary",
    });
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
    const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/byteburgers/${publicId}`;

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
