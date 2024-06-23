import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
  },
  url: {
    secure: false,
  },
});

export default cloudinary;
