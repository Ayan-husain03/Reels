import ImageKit from "@imagekit/nodejs";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  url: process.env.IMAGEKIT_URL,
});

const uploadFile = async (file, fileName) => {
  try {
    const result = await imageKit.files.upload({
      file: file,
      fileName: fileName,
    });
    return result;
  } catch (error) {
    console.log("error in uploading file", error);
  }
};

export default uploadFile;
