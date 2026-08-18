import ImageKit, { toFile } from "@imagekit/nodejs";

const imagekit = new ImageKit({ privateKey: process.env.IMAGEKIT_PRIVATE_KEY });

function hasImageKitConfig() {
  return Boolean(process.env.IMAGEKIT_PRIVATE_KEY);
}

function createFileName(originalName = "upload") {
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
    return `chat-${Date.now()}-${safeName}`;
}

async function uploadChatMedia(file) { 
  const fileName = createFileName(file.originalname);

  const result = await imagekit.files.upload({
    file: toFile(file.buffer, fileName, { type: file.mimetype }),
    fileName,
    folder: "//chat",
  });

  return result.url;
}

export { uploadChatMedia, hasImageKitConfig };