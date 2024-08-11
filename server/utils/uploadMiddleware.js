
import { GraphQLUpload } from "graphql-upload";
export const Upload = GraphQLUpload;

export const processUpload = async (upload) => {
  const { createReadStream } = await upload;
  const stream = createReadStream();
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  return buffer.toString("base64");
};
