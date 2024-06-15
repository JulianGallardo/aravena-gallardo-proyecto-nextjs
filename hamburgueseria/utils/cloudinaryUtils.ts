"use server";

export const getImageUrl = async (name: string): Promise<string> => {
  const publicId = name.toLowerCase().replace(/\s/g, "");
  return new Promise<string>((resolve, reject) => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      reject(new Error("CLOUDINARY_CLOUD_NAME is not defined"));
      return;
    }

    const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/byteburgers/${publicId}`;
    resolve(imageUrl);
  });
};
