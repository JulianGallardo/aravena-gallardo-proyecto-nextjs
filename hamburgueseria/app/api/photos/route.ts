import cloudinary from "../../../cloudinary/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data } = body;
    const uploadedResponse = await cloudinary.uploader.upload(data);
    return NextResponse.json({ url: uploadedResponse.secure_url });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
