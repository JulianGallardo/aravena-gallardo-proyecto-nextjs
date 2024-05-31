"use server";

export const getImageUrl = async (publicId: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      reject(new Error("CLOUDINARY_CLOUD_NAME is not defined"));
      return;
    }

    const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
    resolve(imageUrl);
  });
};
