import ImageKit from "imagekit";

// console.log(process.env.IMAGEKIT_PRIVATE_KEY);
const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

console.log("IK PRIVATE:", process.env.IMAGEKIT_PRIVATE_KEY);
const uploadFile = async (file, fileName) => {
  try {
    const result = await imageKit.upload({
      file: file,
      fileName: fileName,
    });
    return result;
  } catch (error) {
    console.log("error in uploading file", error);
  }
};

export { uploadFile };
